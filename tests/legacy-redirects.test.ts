import test from "node:test";
import assert from "node:assert/strict";

import { LEGACY_REDIRECTS, resolveLegacyPath, normalisePathname } from "../src/lib/legacy-redirects.ts";

test("historic article URLs map directly to root-level slugs", () => {
  assert.equal(
    resolveLegacyPath("/blog/why-you-need-an-architect-in-nigeria"),
    "/why-you-need-an-architect-in-nigeria",
  );
  assert.equal(resolveLegacyPath("/blog/some-slug/"), "/some-slug");
});

test("the pagination path is never treated as an article slug", () => {
  assert.equal(resolveLegacyPath("/blog/page"), null);
  assert.equal(resolveLegacyPath("/blog/page/2"), null);
});

test("the required minimum mappings all resolve", () => {
  assert.equal(resolveLegacyPath("/about-us"), "/about");
  assert.equal(resolveLegacyPath("/contact-us"), "/contact");
  assert.equal(resolveLegacyPath("/our-services"), "/services");
  assert.equal(resolveLegacyPath("/news"), "/blog");
});

test("trailing slashes resolve to the same destination", () => {
  assert.equal(resolveLegacyPath("/about-us/"), "/about");
  assert.equal(normalisePathname("/about-us/"), "/about-us");
  assert.equal(normalisePathname("/"), "/");
});

test("unknown legacy URLs are not guessed at", () => {
  for (const unknown of [
    "/our-services/architecture-firm-in-lagos",
    "/our-services/architectural-building-fire-safety-consultants-in-nigeria",
    "/portfolio/beechwood",
    "/tag/architecture",
    "/some/made/up/path",
  ]) {
    assert.equal(resolveLegacyPath(unknown), null, `${unknown} must stay unmapped`);
  }
});

test("no redirect source is also a redirect destination (no chains)", () => {
  const sources = new Set(LEGACY_REDIRECTS.map((entry) => entry.source));
  const chained = LEGACY_REDIRECTS.filter((entry) => sources.has(entry.destination));
  assert.deepEqual(chained, [], "a destination that is also a source would create a redirect chain");
});

test("no redirect loops back to itself", () => {
  const loops = LEGACY_REDIRECTS.filter((entry) => entry.source === entry.destination);
  assert.deepEqual(loops, []);
});

test("every source is listed exactly once", () => {
  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const entry of LEGACY_REDIRECTS) {
    if (seen.has(entry.source)) duplicates.push(entry.source);
    seen.add(entry.source);
  }
  assert.deepEqual(duplicates, []);
});

test("sources and destinations are normalised, root-relative paths", () => {
  for (const entry of LEGACY_REDIRECTS) {
    assert.ok(entry.source.startsWith("/"), `${entry.source} must start with /`);
    assert.ok(entry.destination.startsWith("/"), `${entry.destination} must start with /`);
    assert.equal(entry.source, normalisePathname(entry.source));
    assert.equal(entry.destination, normalisePathname(entry.destination));
  }
});

test("no legacy destination points at the homepage", () => {
  const toHome = LEGACY_REDIRECTS.filter((entry) => entry.destination === "/");
  assert.deepEqual(toHome, [], "missing pages must not be swept to the homepage");
});
