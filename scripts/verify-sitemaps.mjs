#!/usr/bin/env node
/**
 * Smoke-test every sitemap route against a running server.
 *
 * Read-only. Start the production build first, then:
 *   node scripts/verify-sitemaps.mjs --base http://localhost:3000
 *
 * Verifies, for each route: HTTP status, content type, XML declaration,
 * stylesheet processing instruction, root element, production hostname, URL
 * count and absence of duplicates. Exits non-zero on any failure.
 */

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const BASE = (baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:3000").replace(/\/+$/, "");

const CANONICAL_ORIGIN = "https://www.buildingpractice.biz";
const CMS_HOST = "blog.buildingpractice.biz";
const DEAD_HOST = "thebuildingpractice.com";
const STYLESHEET_PI = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>';

const CHILDREN = [
  "page-sitemap.xml",
  "service-sitemap.xml",
  "project-sitemap.xml",
  "team-sitemap.xml",
  "article-sitemap.xml",
];

const failures = [];
const rows = [];

function fail(route, message) {
  failures.push(`${route}: ${message}`);
}

function expect(route, condition, message) {
  if (!condition) fail(route, message);
}

function tags(xml, tag) {
  return [...xml.matchAll(new RegExp(`<${tag}>([^<]*)</${tag}>`, "g"))].map((m) => m[1]);
}

async function fetchRoute(route) {
  const res = await fetch(`${BASE}${route}`, { redirect: "manual" });
  const body = await res.text();
  return { status: res.status, contentType: res.headers.get("content-type") ?? "", body };
}

// --- Sitemap index ---------------------------------------------------------

const index = await fetchRoute("/sitemap.xml");
expect("/sitemap.xml", index.status === 200, `expected 200, got ${index.status}`);
expect("/sitemap.xml", /xml/.test(index.contentType), `content-type was "${index.contentType}"`);
expect("/sitemap.xml", index.body.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), "missing XML declaration");
expect("/sitemap.xml", index.body.includes(STYLESHEET_PI), "missing stylesheet processing instruction");
expect("/sitemap.xml", index.body.includes("<sitemapindex"), "root element is not <sitemapindex>");
expect("/sitemap.xml", !index.body.includes("<urlset"), "index must not contain a <urlset>");

const childLocs = tags(index.body, "loc");
expect("/sitemap.xml", new Set(childLocs).size === childLocs.length, "duplicate child sitemap listed");
for (const loc of childLocs) {
  expect("/sitemap.xml", loc.startsWith(`${CANONICAL_ORIGIN}/`), `child on wrong host: ${loc}`);
}
const listed = childLocs.map((loc) => loc.replace(`${CANONICAL_ORIGIN}/`, ""));
for (const child of CHILDREN) {
  expect("/sitemap.xml", listed.filter((l) => l === child).length === 1, `${child} not listed exactly once`);
}
expect("/sitemap.xml", listed.length === CHILDREN.length, `expected ${CHILDREN.length} children, got ${listed.length}`);

rows.push({ route: "/sitemap.xml", status: index.status, contentType: index.contentType, root: "sitemapindex", count: childLocs.length, duplicates: 0 });

// --- Child sitemaps --------------------------------------------------------

const allUrls = [];

for (const child of CHILDREN) {
  const route = `/${child}`;
  const res = await fetchRoute(route);

  expect(route, res.status === 200, `expected 200, got ${res.status}`);
  expect(route, /xml/.test(res.contentType), `content-type was "${res.contentType}"`);
  expect(route, res.body.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), "missing XML declaration");
  expect(route, res.body.includes(STYLESHEET_PI), "missing stylesheet processing instruction");
  expect(route, res.body.includes("<urlset"), "root element is not <urlset>");
  expect(route, !res.body.includes("<sitemapindex"), "child must not contain a <sitemapindex>");

  const locs = tags(res.body, "loc").filter((loc) => !loc.includes("/wp-content/"));
  const duplicates = locs.length - new Set(locs).size;
  expect(route, duplicates === 0, `${duplicates} duplicate URL(s)`);

  for (const loc of locs) {
    if (!loc.startsWith(`${CANONICAL_ORIGIN}/`) && loc !== CANONICAL_ORIGIN) {
      fail(route, `URL on wrong host: ${loc}`);
      break;
    }
    if (loc.includes(DEAD_HOST) || loc.includes(CMS_HOST) || loc.includes("?") || loc.includes("#")) {
      fail(route, `invalid URL: ${loc}`);
      break;
    }
  }

  // Image entries, where present, must be real https media URLs.
  const imageLocs = [...res.body.matchAll(/<image:loc>([^<]*)<\/image:loc>/g)].map((m) => m[1]);
  for (const img of imageLocs) {
    if (!img.startsWith("https://")) {
      fail(route, `non-https image URL: ${img}`);
      break;
    }
  }
  if (imageLocs.length > 0) {
    expect(route, res.body.includes("xmlns:image="), "image data present without the image namespace");
  } else {
    expect(route, !res.body.includes("xmlns:image="), "image namespace declared without image data");
  }

  allUrls.push(...locs);
  rows.push({
    route,
    status: res.status,
    contentType: res.contentType,
    root: "urlset",
    count: locs.length,
    duplicates,
    images: imageLocs.length,
  });
}

// --- Cross-sitemap duplicate detection -------------------------------------

const combinedUnique = new Set(allUrls);
if (combinedUnique.size !== allUrls.length) {
  const counts = new Map();
  for (const u of allUrls) counts.set(u, (counts.get(u) ?? 0) + 1);
  const dupes = [...counts.entries()].filter(([, n]) => n > 1).map(([u]) => u);
  fail("combined", `${allUrls.length - combinedUnique.size} duplicate URL(s) across children: ${dupes.slice(0, 5).join(", ")}`);
}

// --- Stylesheet ------------------------------------------------------------

const xsl = await fetchRoute("/sitemap.xsl");
expect("/sitemap.xsl", xsl.status === 200, `expected 200, got ${xsl.status}`);
expect("/sitemap.xsl", /xsl|xml/.test(xsl.contentType), `content-type was "${xsl.contentType}"`);
expect("/sitemap.xsl", xsl.body.includes("<xsl:stylesheet"), "not an XSL stylesheet");
expect("/sitemap.xsl", xsl.body.includes('match="s:sitemapindex"'), "no sitemapindex template");
expect("/sitemap.xsl", xsl.body.includes('match="s:urlset"'), "no urlset template");
rows.push({ route: "/sitemap.xsl", status: xsl.status, contentType: xsl.contentType, root: "xsl:stylesheet", count: "-", duplicates: "-" });

// --- robots.txt ------------------------------------------------------------

const robots = await fetchRoute("/robots.txt");
expect("/robots.txt", robots.status === 200, `expected 200, got ${robots.status}`);
expect("/robots.txt", robots.body.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`), "primary sitemap not referenced");
for (const child of CHILDREN) {
  expect("/robots.txt", !robots.body.includes(child), `child sitemap ${child} must not be listed in robots.txt`);
}
rows.push({ route: "/robots.txt", status: robots.status, contentType: robots.contentType, root: "-", count: "-", duplicates: "-" });

// --- Report ----------------------------------------------------------------

console.log(`\nSitemap smoke test against ${BASE}\n`);
console.log(
  ["route", "status", "root", "urls", "dupes", "images", "content-type"]
    .map((h) => h.padEnd(h === "route" ? 26 : h === "content-type" ? 0 : 8))
    .join(""),
);
for (const row of rows) {
  console.log(
    [
      String(row.route).padEnd(26),
      String(row.status).padEnd(8),
      String(row.root).padEnd(8),
      String(row.count).padEnd(8),
      String(row.duplicates).padEnd(8),
      String(row.images ?? "-").padEnd(8),
      row.contentType,
    ].join(""),
  );
}

const total = allUrls.length;
console.log(`\ncombined URLs across children: ${total}`);
console.log(`combined unique URLs:          ${combinedUnique.size}`);

if (failures.length > 0) {
  console.error(`\nFAILED: ${failures.length} problem(s)\n`);
  for (const failure of failures) console.error(`  x ${failure}`);
  console.error("");
  process.exit(1);
}

console.log("\nAll sitemap smoke checks passed.\n");
