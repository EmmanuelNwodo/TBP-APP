#!/usr/bin/env node
/**
 * Static SEO regression guard.
 *
 * Checks the invariants that the crawlability audit found broken, without
 * needing a running server: the canonical origin, the absence of the dead
 * domain, robots/sitemap correctness, redirect-table integrity and the
 * removal of the public diagnostic endpoint.
 *
 * Run with: npm run validate:seo
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CANONICAL_ORIGIN = "https://www.buildingpractice.biz";
const DEAD_HOST = "thebuildingpractice.com";

const failures = [];
const passes = [];

function check(name, condition, detail = "") {
  if (condition) {
    passes.push(name);
  } else {
    failures.push(detail ? `${name}\n    ${detail}` : name);
  }
}

function read(relative) {
  return readFileSync(path.join(ROOT, relative), "utf8");
}

function walk(dir, predicate, found = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry === ".git") continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, predicate, found);
    else if (predicate(full)) found.push(full);
  }
  return found;
}

// 1. The canonical origin is the single source of truth.
const seo = read("src/lib/seo.ts");
check(
  "seo.ts declares the canonical production origin",
  seo.includes(`"${CANONICAL_ORIGIN}"`),
  `expected ${CANONICAL_ORIGIN} in src/lib/seo.ts`,
);
check("seo.ts reads NEXT_PUBLIC_SITE_URL", seo.includes("NEXT_PUBLIC_SITE_URL"));
check("seo.ts rejects preview hosts", seo.includes(".vercel.app"));

// 2. The dead host appears nowhere as a website origin.
const sourceFiles = walk(path.join(ROOT, "src"), (f) => /\.(ts|tsx|css|mjs)$/.test(f));
const deadHostHits = [];
for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, index) => {
    if (!line.includes(DEAD_HOST)) return;
    // A verified email address is allowed; a website origin is not.
    const isEmailOnly = /@thebuildingpractice\.com/.test(line) && !/https?:\/\/[^\s"']*thebuildingpractice\.com/.test(line);
    if (isEmailOnly) return;
    // The resolver deliberately names the dead host in order to block it.
    if (/host ===/.test(line)) return;
    deadHostHits.push(`${path.relative(ROOT, file)}:${index + 1}: ${line.trim().slice(0, 120)}`);
  });
}
check(
  "no source file uses the dead domain as a website origin",
  deadHostHits.length === 0,
  deadHostHits.join("\n    "),
);

// 3. robots.txt source.
const robots = read("src/app/robots.ts");
check("robots uses SITE_URL for the sitemap declaration", robots.includes("${SITE_URL}/sitemap.xml"));
check("robots disallows /admin", robots.includes('"/admin"'));
check("robots does not disallow the whole site", !/disallow:\s*"\/"/i.test(robots));
check("robots allows crawling", robots.includes('allow: "/"'));
check(
  "robots references only the primary sitemap index",
  robots.includes("${SITE_URL}/sitemap.xml") &&
    !/page-sitemap|service-sitemap|project-sitemap|team-sitemap|article-sitemap/.test(robots),
);

// 4. Sitemap: a sitemap index plus grouped child sitemaps, all route handlers.
const inventory = read("src/lib/sitemap/inventory.ts");
const sitemapXml = read("src/lib/sitemap/xml.ts");

check(
  "the metadata-API sitemap was replaced by route handlers",
  !existsSync(path.join(ROOT, "src/app/sitemap.ts")) &&
    existsSync(path.join(ROOT, "src/app/sitemap.xml/route.ts")),
);
check("the sitemap index renders <sitemapindex>", sitemapXml.includes("<sitemapindex"));
check("child sitemaps render <urlset>", sitemapXml.includes("<urlset "));
check("every sitemap references the shared stylesheet", sitemapXml.includes("xml-stylesheet"));
check("the stylesheet route exists", existsSync(path.join(ROOT, "src/app/sitemap.xsl/route.ts")));

for (const child of ["page", "service", "project", "team", "article"]) {
  check(
    `${child}-sitemap.xml route exists`,
    existsSync(path.join(ROOT, `src/app/${child}-sitemap.xml/route.ts`)),
  );
}

check("sitemap URLs are built from the canonical origin", inventory.includes("siteUrl"));
check(
  "the inventory does not fabricate modification dates",
  !/new Date\(\)/.test(inventory) && !/Date\.now\(\)/.test(inventory),
);
check("article lastmod comes from the CMS modification date", inventory.includes("article.modified"));
check("duplicate URLs are rejected centrally", inventory.includes("appears in both"));
check("empty child sitemaps are never published", inventory.includes("group.urls.length > 0"));
for (const forbidden of ["/admin", "/api/", "/test-wordpress"]) {
  check(`sitemap excludes ${forbidden}`, inventory.includes(`"${forbidden}"`));
}
check(
  "sitemap rejects non-canonical hosts, query strings and fragments",
  inventory.includes('parsed.protocol !== "https:"') && inventory.includes("parsed.search"),
);

// 5. Redirect table integrity (also covered by the unit tests).
const redirects = read("src/lib/legacy-redirects.ts");
check("redirect table exists and is exported", redirects.includes("export const LEGACY_REDIRECTS"));
const config = read("next.config.ts");
check("next.config wires up the redirect table", config.includes("LEGACY_REDIRECTS"));
check("next.config redirects /blog/:slug to /:slug", config.includes('source: "/blog/:slug"'));
check("all application redirects are permanent", !/permanent:\s*false/.test(config));

// 6. The public diagnostic endpoint is gone.
check(
  "the /test-wordpress diagnostic route is removed",
  !existsSync(path.join(ROOT, "src/app/test-wordpress")),
);

// 7. The splash screen no longer emits a heading.
const splash = read("src/components/layout/SplashScreen.tsx");
const splashCode = splash.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
check("splash screen renders no <h1>", !/<h1[\s>]/.test(splashCode));

// 8. The archive passes summaries, not article bodies, to the client.
const grid = read("src/components/blog/BlogGrid.tsx");
check("blog cards receive BlogPostSummary, not BlogPost", grid.includes("BlogPostSummary") && !/posts:\s*BlogPost\[\]/.test(grid));
check("blog pagination renders real links", grid.includes("<Link") && grid.includes("/blog/page/"));
check("blog archive route for pagination exists", existsSync(path.join(ROOT, "src/app/(site)/blog/page/[page]/page.tsx")));

// 8b. No summary-path CMS request may download article bodies.
const blogLib = read("src/lib/blog.ts");
const cardFields = /export const CARD_FIELDS = "([^"]+)"/.exec(blogLib)?.[1] ?? "";
check(
  "card field list excludes article content",
  cardFields.length > 0 && !cardFields.includes("content"),
  `CARD_FIELDS = "${cardFields}"`,
);
check(
  "only the article request asks for a body",
  (blogLib.match(/_fields: CARD_FIELDS,/g) ?? []).length >= 3 &&
    (blogLib.match(/_fields: ARTICLE_FIELDS,/g) ?? []).length === 1,
);
check(
  "the embed still receives featured media and category terms",
  cardFields.includes("_links") && cardFields.includes("_embedded") &&
    blogLib.includes('const SUMMARY_EMBED = "wp:featuredmedia,wp:term"'),
);
check("the sitemap index request carries no content field", !/getPostIndex[\s\S]{0,400}content/.test(blogLib));

// 8c. Cards no longer show a reading time derived from a body they never load.
const summaryType = /export type BlogPostSummary = \{[\s\S]*?\};/.exec(read("src/types/blog.ts"))?.[0] ?? "";
check("BlogPostSummary carries no readTime", summaryType.length > 0 && !summaryType.includes("readTime"));
check("blog cards render no reading-time label", !grid.includes("readTime"));
check("homepage blog preview renders no reading-time label", !read("src/components/home/BlogPreview.tsx").includes("readTime"));
check(
  "archive counts are labelled as page-scoped",
  grid.includes("on this") && grid.includes("Filter this page"),
);

// 9. No blanket robots directive in the root layout.
const layout = read("src/app/layout.tsx");
check(
  "root layout emits no site-wide robots directive",
  !/robots:\s*\{\s*index:\s*true/.test(layout),
);

// 10. Dead-domain emails are not used in structured data.
check("root layout JSON-LD uses the verified contact email", layout.includes("SITE_CONTACT_EMAIL"));

const total = passes.length + failures.length;
if (failures.length > 0) {
  console.error(`\nSEO validation FAILED: ${failures.length} of ${total} checks\n`);
  for (const failure of failures) console.error(`  x ${failure}`);
  console.error("");
  process.exit(1);
}

console.log(`\nSEO validation passed: ${passes.length}/${total} checks\n`);
for (const pass of passes) console.log(`  ok ${pass}`);
console.log("");
