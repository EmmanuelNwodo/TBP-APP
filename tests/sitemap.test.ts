import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  allUrls,
  assertInventoryIsSound,
  buildSitemapGroups,
  INCLUDE_BLOG_PAGINATION,
  isCanonicalLoc,
  latestModified,
  type SitemapArticle,
  type SitemapGroup,
} from "../src/lib/sitemap/inventory.ts";
import { escapeXml, renderSitemapIndex, renderUrlSet, STYLESHEET_PATH } from "../src/lib/sitemap/xml.ts";
import { SITEMAP_STYLESHEET } from "../src/lib/sitemap/stylesheet.ts";

const SITE = "https://www.buildingpractice.biz";
const ROOT = path.resolve(import.meta.dirname, "..");

/** Load the real repository data sources, so counts are not hand-maintained. */
function loadJson<T>(relative: string): T {
  return JSON.parse(readFileSync(path.join(ROOT, relative), "utf8")) as T;
}

const services = loadJson<{ slug: string }[]>("src/data/services.json");
const projects = loadJson<{ slug: string }[]>("src/data/projects.json");
const team = loadJson<{ id: string }[]>("src/data/team.json");

/** 286 published articles, matching the verified live WordPress inventory. */
const articles: SitemapArticle[] = Array.from({ length: 286 }, (_, index) => ({
  id: index + 1,
  slug: `article-${index + 1}`,
  modified: `2026-0${(index % 9) + 1}-15T10:00:00Z`,
  // Only some articles have a featured image, matching WordPress reality.
  imageUrl: index % 3 === 0 ? `https://blog.buildingpractice.biz/wp-content/uploads/img-${index}.jpg` : null,
}));

function groups(): SitemapGroup[] {
  return buildSitemapGroups({ siteUrl: SITE, services, projects, team, articles });
}

function byId(id: string): SitemapGroup {
  const group = groups().find((g) => g.id === id);
  assert.ok(group, `group ${id} must exist`);
  return group;
}

/** Minimal namespace-aware extraction of repeated elements. */
function extractAll(xml: string, tag: string): string[] {
  return [...xml.matchAll(new RegExp(`<${tag}>([^<]*)</${tag}>`, "g"))].map((m) => m[1]);
}

// --- Inventory shape -------------------------------------------------------

test("every expected child group is present and none is empty", () => {
  const ids = groups().map((g) => g.id);
  assert.deepEqual(ids, ["page", "service", "project", "team", "article"]);
  for (const group of groups()) {
    assert.ok(group.urls.length > 0, `${group.id} must not be empty`);
  }
});

test("all 23 service-detail URLs are present exactly once", () => {
  const locs = byId("service").urls.map((u) => u.loc);
  assert.equal(locs.length, 23);
  assert.equal(new Set(locs).size, 23);
  for (const service of services) {
    assert.ok(locs.includes(`${SITE}/services/${service.slug}`), `missing ${service.slug}`);
  }
});

test("every project-detail URL is present exactly once", () => {
  const locs = byId("project").urls.map((u) => u.loc);
  assert.equal(locs.length, projects.length);
  assert.equal(new Set(locs).size, projects.length);
  for (const project of projects) {
    assert.ok(locs.includes(`${SITE}/projects/${project.slug}`));
  }
});

test("every team-member URL is present exactly once", () => {
  const locs = byId("team").urls.map((u) => u.loc);
  assert.equal(locs.length, team.length);
  assert.equal(new Set(locs).size, team.length);
  for (const member of team) {
    assert.ok(locs.includes(`${SITE}/team/${member.id}`));
  }
});

test("the locations landing page is in the page group, not a landing-page group", () => {
  const locs = byId("page").urls.map((u) => u.loc);
  assert.ok(locs.includes(`${SITE}/locations`));
  assert.equal(groups().find((g) => g.id === ("landing" as never)), undefined);
});

test("collection index pages live in the page group", () => {
  const locs = byId("page").urls.map((u) => u.loc);
  for (const index of ["/services", "/projects", "/team", "/blog"]) {
    assert.ok(locs.includes(`${SITE}${index}`), `${index} belongs in page-sitemap`);
  }
});

test("every live article is present exactly once", () => {
  const locs = byId("article").urls.map((u) => u.loc);
  assert.equal(locs.length, articles.length);
  assert.equal(new Set(locs).size, articles.length);
});

test("the combined inventory matches the verified 426-URL baseline", () => {
  const urls = allUrls(groups());
  // 11 standalone pages + 23 services + 63 projects + 43 team + 286 articles.
  assert.equal(urls.length, 11 + services.length + projects.length + team.length + articles.length);
  assert.equal(urls.length, 426);
});

test("no canonical URL is duplicated across child sitemaps", () => {
  const urls = allUrls(groups());
  assert.equal(new Set(urls).size, urls.length);
});

test("a duplicate across groups is rejected rather than published", () => {
  assert.throws(
    () =>
      assertInventoryIsSound(
        [
          { id: "page", file: "page-sitemap.xml", title: "Pages", urls: [{ loc: `${SITE}/about` }] },
          { id: "service", file: "service-sitemap.xml", title: "Services", urls: [{ loc: `${SITE}/about` }] },
        ],
        SITE,
      ),
    /appears in both/,
  );
});

test("blog pagination follows the audited inventory", () => {
  const locs = byId("page").urls.map((u) => u.loc);
  const paginated = locs.filter((loc) => loc.includes("/blog/page/"));
  if (INCLUDE_BLOG_PAGINATION) {
    assert.ok(paginated.length > 0);
  } else {
    assert.equal(paginated.length, 0, "audited production inventory contains no pagination URLs");
  }
});

// --- Exclusions ------------------------------------------------------------

test("excluded and non-canonical URLs never validate", () => {
  for (const bad of [
    `${SITE}/admin`,
    `${SITE}/admin/blog`,
    `${SITE}/api/health`,
    `${SITE}/test-wordpress`,
    `${SITE}/services?utm_source=x`,
    `${SITE}/services#anchor`,
    "http://www.buildingpractice.biz/about",
    "https://buildingpractice.biz/about",
    "https://thebuildingpractice.com/about",
    "https://blog.buildingpractice.biz/some-article",
  ]) {
    assert.equal(isCanonicalLoc(bad, SITE), false, `${bad} must be rejected`);
  }
});

test("no group contains an excluded, redirected or non-canonical URL", () => {
  const urls = allUrls(groups());
  for (const loc of urls) {
    assert.ok(loc.startsWith(`${SITE}/`) || loc === `${SITE}/`, `${loc} must use the canonical origin`);
    assert.ok(!loc.includes("thebuildingpractice.com"));
    assert.ok(!loc.includes("blog.buildingpractice.biz"));
    assert.ok(!loc.includes("?") && !loc.includes("#"));
    assert.ok(!loc.startsWith("http://"));
  }
  // Known redirect sources and retired slugs must never appear.
  for (const retired of ["/about-us", "/contact-us", "/our-services", "/news", "/portfolio", "/our-team"]) {
    assert.ok(!urls.includes(`${SITE}${retired}`), `${retired} is a redirect source`);
  }
  assert.ok(!urls.some((u) => u.includes("/test-wordpress")));
  assert.ok(!urls.some((u) => u.includes("/admin")));
});

// --- Last-modified rules ---------------------------------------------------

test("article lastmod uses the genuine WordPress modification date", () => {
  for (const entry of byId("article").urls) {
    assert.ok(entry.lastModified, "every article carries its WordPress modified date");
  }
  assert.equal(byId("article").urls[0].lastModified, articles[0].modified);
});

test("URLs without a trustworthy date receive no lastmod", () => {
  for (const id of ["page", "service", "project", "team"]) {
    for (const entry of byId(id).urls) {
      assert.equal(entry.lastModified, undefined, `${entry.loc} must not invent a date`);
    }
  }
});

test("the index lastmod is the latest genuine date inside a child", () => {
  assert.equal(latestModified(byId("page")), undefined);
  const newest = articles.map((a) => a.modified!).sort().at(-1);
  assert.equal(latestModified(byId("article")), newest);
});

// --- XML output ------------------------------------------------------------

test("the index is a valid sitemapindex listing each child exactly once", () => {
  const xml = renderSitemapIndex(groups(), SITE);

  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'));
  assert.ok(!xml.includes("<urlset"));

  const locs = extractAll(xml, "loc");
  assert.deepEqual(locs, [
    `${SITE}/page-sitemap.xml`,
    `${SITE}/service-sitemap.xml`,
    `${SITE}/project-sitemap.xml`,
    `${SITE}/team-sitemap.xml`,
    `${SITE}/article-sitemap.xml`,
  ]);
  assert.equal(new Set(locs).size, locs.length, "each child listed exactly once");
});

test("every sitemap references the shared stylesheet", () => {
  const documents = [renderSitemapIndex(groups(), SITE), ...groups().map(renderUrlSet)];
  for (const xml of documents) {
    assert.ok(
      xml.includes(`<?xml-stylesheet type="text/xsl" href="${STYLESHEET_PATH}"?>`),
      "stylesheet processing instruction missing",
    );
  }
});

test("child sitemaps are valid urlsets with balanced tags", () => {
  for (const group of groups()) {
    const xml = renderUrlSet(group);
    assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
    assert.ok(xml.includes("<urlset "));
    assert.ok(!xml.includes("<sitemapindex"));
    assert.equal((xml.match(/<url>/g) ?? []).length, group.urls.length);
    assert.equal((xml.match(/<\/url>/g) ?? []).length, group.urls.length);
    assert.equal((xml.match(/<loc>/g) ?? []).length, (xml.match(/<\/loc>/g) ?? []).length);
  }
});

test("XML remains valid and complete without the stylesheet", () => {
  // Stripping the processing instruction must leave a well-formed document.
  const xml = renderUrlSet(byId("service")).replace(/<\?xml-stylesheet[^>]*\?>\n?/, "");
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.equal(extractAll(xml, "loc").length, 23);
});

test("the image namespace is declared only where image data exists", () => {
  const articleXml = renderUrlSet(byId("article"));
  assert.ok(articleXml.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));
  assert.ok(articleXml.includes("<image:loc>"));

  for (const id of ["page", "service", "project", "team"]) {
    const xml = renderUrlSet(byId(id));
    assert.ok(!xml.includes("xmlns:image"), `${id} must not declare an unused namespace`);
    assert.ok(!xml.includes("<image:image>"));
  }
});

test("image entries are only emitted for real featured-image URLs", () => {
  const withImages = byId("article").urls.filter((u) => (u.images?.length ?? 0) > 0);
  const expected = articles.filter((a) => a.imageUrl).length;
  assert.equal(withImages.length, expected);
  for (const entry of withImages) {
    assert.ok(entry.images![0].loc.startsWith("https://"));
  }
});

test("no child sitemap emits a page loc on the CMS host", () => {
  for (const group of groups()) {
    for (const entry of group.urls) {
      assert.ok(!entry.loc.includes("blog.buildingpractice.biz"));
    }
  }
});

test("XML special characters are escaped", () => {
  assert.equal(escapeXml(`a&b<c>d"e'f`), "a&amp;b&lt;c&gt;d&quot;e&apos;f");
  const xml = renderUrlSet({
    id: "page",
    file: "page-sitemap.xml",
    title: "Pages",
    urls: [{ loc: `${SITE}/a?b=1&c=2` }],
  });
  assert.ok(xml.includes("&amp;"));
  assert.ok(!/[^&]&[^a-z#]/.test(xml), "no bare ampersand may survive");
});

// --- Stylesheet ------------------------------------------------------------

test("the stylesheet handles both sitemapindex and urlset", () => {
  assert.ok(SITEMAP_STYLESHEET.includes('<xsl:template match="s:sitemapindex">'));
  assert.ok(SITEMAP_STYLESHEET.includes('<xsl:template match="s:urlset">'));
  assert.ok(SITEMAP_STYLESHEET.includes('xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"'));
  assert.ok(SITEMAP_STYLESHEET.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));
});

test("the stylesheet is self-contained and unbranded by third parties", () => {
  assert.ok(!/<script/i.test(SITEMAP_STYLESHEET), "no JavaScript");
  assert.ok(!/<link[^>]+stylesheet/i.test(SITEMAP_STYLESHEET), "no external stylesheet");
  assert.ok(!/yoast/i.test(SITEMAP_STYLESHEET));
  assert.ok(SITEMAP_STYLESHEET.includes("The Building Practice"));
  assert.ok(
    SITEMAP_STYLESHEET.includes(
      "Generated by The Building Practice, this XML Sitemap is intended for consumption by",
    ),
  );
});

test("the stylesheet shows a count, and an Images column only when relevant", () => {
  assert.ok(SITEMAP_STYLESHEET.includes('select="count(s:url)"'));
  assert.ok(SITEMAP_STYLESHEET.includes('select="count(s:sitemap)"'));
  assert.ok(SITEMAP_STYLESHEET.includes('$imageCount &gt; 0'));
  assert.ok(SITEMAP_STYLESHEET.includes("<th>Last Modified</th>"));
  assert.ok(SITEMAP_STYLESHEET.includes("<th>Sitemap</th>"));
  assert.ok(SITEMAP_STYLESHEET.includes("<th>URL</th>"));
});
