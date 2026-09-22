#!/usr/bin/env node
/**
 * Inspect a running build: raw initial HTML, response headers and redirects.
 *
 * Read-only. Start the production server first, then:
 *   node scripts/audit-live.mjs --base http://localhost:3000
 *   node scripts/audit-live.mjs --base http://localhost:3000 --sitemap
 *
 * `--sitemap` additionally crawls every URL in /sitemap.xml against the same
 * build and reports the status-code distribution.
 */

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const BASE = (baseIndex >= 0 ? args[baseIndex + 1] : "http://localhost:3000").replace(/\/+$/, "");
const CRAWL_SITEMAP = args.includes("--sitemap");
const CANONICAL_ORIGIN = "https://www.buildingpractice.biz";
const DEAD_HOST = "thebuildingpractice.com";

const ROUTES = [
  "/",
  "/services",
  "/services/architectural-design",
  "/services/interior-design",
  "/services/construction-management",
  "/blog",
  "/blog/page/2",
  "/robots.txt",
  "/sitemap.xml",
  "/test-wordpress",
  "/this-slug-does-not-exist-at-all",
];

function countMatches(html, pattern) {
  return (html.match(pattern) ?? []).length;
}

/**
 * /sitemap.xml is a sitemap index, so follow it into each child sitemap and
 * return the real page URLs. Image locs are skipped: they are media on the CMS
 * origin, not indexable pages.
 */
async function collectSitemapUrls() {
  const indexBody = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const children = [...indexBody.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  const urls = [];
  for (const child of children) {
    const childPath = child.replace(CANONICAL_ORIGIN, "");
    const childBody = await (await fetch(BASE + childPath)).text();
    urls.push(
      ...[...childBody.matchAll(/<loc>([^<]+)<\/loc>/g)]
        .map((m) => m[1])
        .filter((u) => !u.includes("/wp-content/")),
    );
  }

  return { children, urls, indexBody };
}

function firstMatch(html, pattern) {
  const match = pattern.exec(html);
  return match ? match[1] : null;
}

async function inspect(path) {
  const res = await fetch(BASE + path, { redirect: "manual" });
  const status = res.status;
  const location = res.headers.get("location");
  const contentType = res.headers.get("content-type") ?? "";
  const xRobots = res.headers.get("x-robots-tag");

  const row = {
    path,
    status,
    location,
    xRobotsTag: xRobots,
  };

  if (!contentType.includes("text/html")) {
    const body = await res.text();
    row.bytes = body.length;
    if (path === "/robots.txt") row.body = body.trim();
    if (path === "/sitemap.xml") {
      const { children, urls: locs } = await collectSitemapUrls();
      row.childSitemaps = children.length;
      row.sitemapUrls = locs.length;
      row.sitemapUnique = new Set(locs).size;
      row.sitemapDeadHost = locs.filter((u) => u.includes(DEAD_HOST)).length;
      row.sitemapWrongHost = locs.filter((u) => !u.startsWith(CANONICAL_ORIGIN)).length;
      row.sitemapWithLastmod = countMatches(body, /<lastmod>/g);
    }
    return row;
  }

  const html = await res.text();
  row.bytes = html.length;
  row.title = firstMatch(html, /<title>([^<]*)<\/title>/);
  row.canonical = firstMatch(html, /<link rel="canonical" href="([^"]*)"/);
  row.robotsMeta = [...html.matchAll(/<meta name="robots" content="([^"]*)"/g)].map((m) => m[1]);
  row.h1Count = countMatches(html, /<h1[\s>]/g);
  row.h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)]
    .map((m) => m[1].replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 60));
  row.jsonLdBlocks = countMatches(html, /application\/ld\+json/g);
  row.jsonLdDeadHost = html.includes(`${DEAD_HOST}`) ? "PRESENT" : "none";
  row.deadHostAnywhere = countMatches(html, new RegExp(DEAD_HOST, "g"));
  row.paginationLinks = [...html.matchAll(/href="(\/blog\/page\/\d+)"/g)].map((m) => m[1]);
  row.articleCards = countMatches(html, /class="[^"]*BlogGrid_card__/g);
  return row;
}

const results = [];
for (const route of ROUTES) {
  try {
    results.push(await inspect(route));
  } catch (error) {
    results.push({ path: route, error: error.message });
  }
}

// A historic article URL and a live article, resolved from the sitemap.
let sampleArticle = null;
try {
  const { urls: locs } = await collectSitemapUrls();
  const known = new Set([
    "/", "/about", "/services", "/projects", "/reviews", "/team", "/contact",
    "/careers", "/blog", "/locations", "/privacy",
  ]);
  const articlePath = locs
    .map((u) => u.replace(CANONICAL_ORIGIN, ""))
    .find((p) => p && !known.has(p) && !/^\/(team|services|projects)\//.test(p));
  if (articlePath) {
    sampleArticle = articlePath;
    results.push(await inspect(articlePath));
    results.push(await inspect(`/blog${articlePath}`));
  }
} catch (error) {
  results.push({ path: "(article sample)", error: error.message });
}

console.log(JSON.stringify({ base: BASE, sampleArticle, results }, null, 2));

if (CRAWL_SITEMAP) {
  const { urls: locs } = await collectSitemapUrls();
  const unique = [...new Set(locs)];
  const statuses = new Map();
  const problems = [];

  const queue = [...unique];
  const workers = Array.from({ length: 8 }, async () => {
    for (;;) {
      const url = queue.shift();
      if (!url) return;
      const path = url.replace(CANONICAL_ORIGIN, "") || "/";
      try {
        const res = await fetch(BASE + path, { redirect: "manual" });
        statuses.set(res.status, (statuses.get(res.status) ?? 0) + 1);
        if (res.status !== 200) {
          problems.push({ path, status: res.status, location: res.headers.get("location") });
        }
      } catch (error) {
        statuses.set("ERR", (statuses.get("ERR") ?? 0) + 1);
        problems.push({ path, status: "ERR", detail: error.message });
      }
    }
  });
  await Promise.all(workers);

  console.log(
    JSON.stringify(
      {
        sitemapCrawl: {
          total: locs.length,
          unique: unique.length,
          duplicates: locs.length - unique.length,
          onDeadHost: locs.filter((u) => u.includes(DEAD_HOST)).length,
          offCanonicalHost: locs.filter((u) => !u.startsWith(CANONICAL_ORIGIN)).length,
          statusDistribution: Object.fromEntries(statuses),
          nonOk: problems.slice(0, 40),
        },
      },
      null,
      2,
    ),
  );
}
