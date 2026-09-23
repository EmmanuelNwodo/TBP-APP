/**
 * Module resolution hooks for `node --test`.
 *
 * The application resolves `@/…` through the bundler's path alias and imports
 * `.json` data files directly. Neither works under a bare Node process, which
 * is why the sitemap tests previously could only reach the pure rendering
 * functions and never the route handlers themselves. These hooks close that
 * gap so a test can import `src/app/page-sitemap.xml/route.ts` and call the
 * real `GET`, rather than asserting against a reimplementation of it.
 *
 * Test-only: nothing here is part of the deployed application.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SRC = path.resolve(import.meta.dirname, "..", "..", "src");

/** Extensions the bundler would try, in the same order. */
const SUFFIXES = ["", ".ts", ".tsx", ".json", "/index.ts", "/index.tsx"];

function firstExisting(base) {
  for (const suffix of SUFFIXES) {
    const candidate = base + suffix;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return pathToFileURL(candidate).href;
    }
  }

  return null;
}

export function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const url = firstExisting(path.join(SRC, specifier.slice(2)));
    if (url) return { url, shortCircuit: true };
  }

  // The bundler also resolves extensionless relative imports such as
  // `./inventory`. Node does not, so the same suffix list is applied before
  // falling through to the default resolver.
  if ((specifier.startsWith("./") || specifier.startsWith("../")) && context.parentURL?.startsWith("file:")) {
    const parent = path.dirname(fileURLToPath(context.parentURL));
    const url = firstExisting(path.resolve(parent, specifier));
    if (url) return { url, shortCircuit: true };
  }

  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  // Node requires an import attribute for JSON. The application relies on the
  // bundler's `resolveJsonModule` instead, so the data files are handed over
  // as ordinary modules here rather than rewriting every import in `src/`.
  if (url.startsWith("file:") && url.endsWith(".json")) {
    const raw = fs.readFileSync(fileURLToPath(url), "utf8");
    return {
      format: "module",
      shortCircuit: true,
      source: "export default JSON.parse(" + JSON.stringify(raw) + ");",
    };
  }

  return nextLoad(url, context);
}
