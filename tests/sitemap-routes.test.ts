import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import { XMLParser, XMLValidator } from "fast-xml-parser";

/**
 * Route-level regression tests for the XML sitemaps.
 *
 * Google Search Console read `/sitemap.xml` but reported every child sitemap
 * as "Sitemap could not be read" with zero discovered pages. The cause was not
 * the XML: it was that every child route resolved the *whole* grouped
 * inventory, so `page-sitemap.xml` - eleven repository-authored URLs, nothing
 * from WordPress - waited on the full published-article walk, and answered a
 * CMS outage with an HTTP 500 carrying no XML at all.
 *
 * These tests therefore exercise the real `GET` handlers, not a copy of the
 * rendering logic, and they assert the two things the previous tests could not
 * see: the status/headers of the actual `Response`, and that a dead CMS still
 * produces a valid sitemap for every group that does not depend on it.
 */

const SITE = "https://www.buildingpractice.biz";
const ROOT = path.resolve(import.meta.dirname, "..");
const SITEMAP_NS = "http://www.sitemaps.org/schemas/sitemap/0.9";

// Required before any module that reads it is imported.
process.env.WORDPRESS_API_URL = "https://cms.test.invalid/wp-json/wp/v2";

const realFetch = globalThis.fetch;

/** Two published posts, in the shape `getPostIndex` asks WordPress for. */
const WP_POSTS = [
  {
    id: 1,
    slug: "edge-leed-sustainability-investors-developers-in-nigeria",
    date: "2026-05-01T10:00:00",
    modified: "2026-05-02T10:00:00",
    modified_gmt: "2026-05-02T09:00:00",
    featured_media: 11,
  },
  {
    id: 2,
    slug: "why-you-need-an-architect-in-nigeria",
    date: "2026-04-01T10:00:00",
    modified: "2026-04-02T10:00:00",
    modified_gmt: "2026-04-02T09:00:00",
    featured_media: 0,
  },
];

function jsonResponse(body: unknown, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json", ...headers },
  });
}

/** Serve canned WordPress payloads so the tests never touch the network. */
function stubCms(): void {
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = String(input);

    if (url.includes("/posts")) {
      const page = Number(new URL(url).searchParams.get("page") ?? "1");
      return jsonResponse(page === 1 ? WP_POSTS : [], {
        "x-wp-totalpages": "1",
        "x-wp-total": String(WP_POSTS.length),
      });
    }

    if (url.includes("/media")) {
      return jsonResponse([{ id: 11, source_url: "https://blog.buildingpractice.biz/a.jpg" }]);
    }

    throw new Error(`unexpected request: ${url}`);
  }) as typeof globalThis.fetch;
}

/** Make every CMS request fail, the way an outage does. */
function stubCmsOutage(): void {
  globalThis.fetch = (async () => {
    throw new TypeError("fetch failed");
  }) as typeof globalThis.fetch;
}

function restoreFetch(): void {
  globalThis.fetch = realFetch;
}

type ParsedSitemap = {
  status: number;
  contentType: string | null;
  body: string;
  locs: string[];
  root: string;
  namespace: string;
};

/** Read a route's response and validate it with a real XML parser. */
async function readSitemap(response: Response): Promise<ParsedSitemap> {
  const body = await response.text();

  const validation = XMLValidator.validate(body);
  assert.equal(
    validation,
    true,
    `response is not well-formed XML: ${JSON.stringify(validation)}\n${body.slice(0, 400)}`,
  );

  const parser = new XMLParser({ ignoreAttributes: false, isArray: (name) => name === "url" || name === "sitemap" });
  const parsed = parser.parse(body) as Record<string, Record<string, unknown>>;

  const root = Object.keys(parsed).find((key) => key === "urlset" || key === "sitemapindex");
  assert.ok(root, `no <urlset> or <sitemapindex> root in:\n${body.slice(0, 400)}`);

  const rootNode = parsed[root] as Record<string, unknown>;
  const entries = (rootNode[root === "urlset" ? "url" : "sitemap"] ?? []) as { loc?: string }[];

  return {
    status: response.status,
    contentType: response.headers.get("content-type"),
    body,
    locs: entries.map((entry) => String(entry.loc)),
    root,
    namespace: String(rootNode["@_xmlns"]),
  };
}

/** Assertions every sitemap response must satisfy. */
function assertSitemapResponse(sitemap: ParsedSitemap): void {
  assert.equal(sitemap.status, 200);
  assert.equal(sitemap.contentType, "application/xml; charset=utf-8");
  assert.equal(sitemap.namespace, SITEMAP_NS);

  // Nothing may precede the XML declaration - not whitespace, not a BOM - and
  // the stylesheet instruction must come after it, never before.
  assert.ok(
    sitemap.body.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet'),
    `unexpected document prologue: ${JSON.stringify(sitemap.body.slice(0, 80))}`,
  );
  assert.equal(sitemap.body.charCodeAt(0), 0x3c, "document must not begin with a BOM");
  assert.equal(sitemap.body.match(/<\?xml version/g)?.length, 1, "exactly one XML declaration");

  // An HTML error page served as XML is the failure this whole suite exists
  // to catch.
  assert.ok(!/^\s*<(!doctype|html)/i.test(sitemap.body), "response begins as HTML");
  assert.ok(!sitemap.body.includes("<html"), "response contains HTML markup");
}

/** Every `<loc>` must be an absolute, canonical https URL on the live origin. */
function assertCanonicalLocs(locs: string[]): void {
  for (const loc of locs) {
    const url = new URL(loc);
    assert.equal(url.protocol, "https:", `${loc} is not https`);
    assert.equal(url.origin, SITE, `${loc} is not on the canonical origin`);
    assert.equal(url.search, "", `${loc} carries a query string`);
    assert.equal(url.hash, "", `${loc} carries a fragment`);
  }
}

const CHILD_ROUTES = [
  { file: "page-sitemap.xml", module: "../src/app/page-sitemap.xml/route.ts" },
  { file: "service-sitemap.xml", module: "../src/app/service-sitemap.xml/route.ts" },
  { file: "project-sitemap.xml", module: "../src/app/project-sitemap.xml/route.ts" },
  { file: "team-sitemap.xml", module: "../src/app/team-sitemap.xml/route.ts" },
  { file: "article-sitemap.xml", module: "../src/app/article-sitemap.xml/route.ts" },
] as const;

async function callRoute(modulePath: string): Promise<Response> {
  const route = (await import(modulePath)) as { GET: () => Promise<Response> | Response };
  return route.GET();
}

// ---------------------------------------------------------------------------
// Healthy CMS
// ---------------------------------------------------------------------------

for (const child of CHILD_ROUTES) {
  test(`${child.file} returns parseable sitemap XML containing URLs`, async () => {
    stubCms();
    try {
      const sitemap = await readSitemap(await callRoute(child.module));

      assertSitemapResponse(sitemap);
      assert.equal(sitemap.root, "urlset");
      assert.ok(sitemap.locs.length > 0, `${child.file} contains no <url> entries`);
      assertCanonicalLocs(sitemap.locs);
    } finally {
      restoreFetch();
    }
  });
}

test("the sitemap index lists every child as an absolute canonical URL", async () => {
  stubCms();
  try {
    const sitemap = await readSitemap(await callRoute("../src/app/sitemap.xml/route.ts"));

    assertSitemapResponse(sitemap);
    assert.equal(sitemap.root, "sitemapindex");
    assertCanonicalLocs(sitemap.locs);

    for (const child of CHILD_ROUTES) {
      assert.ok(
        sitemap.locs.includes(`${SITE}/${child.file}`),
        `the index does not list ${child.file}`,
      );
    }
  } finally {
    restoreFetch();
  }
});

test("the article sitemap carries genuine WordPress modification dates", async () => {
  stubCms();
  try {
    const response = await callRoute("../src/app/article-sitemap.xml/route.ts");
    const body = await response.text();

    assert.equal(XMLValidator.validate(body), true);
    // `modified_gmt` + "Z", never a build time and never "now".
    assert.ok(body.includes("<lastmod>2026-05-02T09:00:00Z</lastmod>"));

    for (const lastmod of body.match(/<lastmod>([^<]+)<\/lastmod>/g) ?? []) {
      const value = lastmod.replace(/<\/?lastmod>/g, "");
      assert.ok(
        /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2}))?$/.test(value),
        `"${value}" is not a W3C datetime`,
      );
      assert.ok(!Number.isNaN(Date.parse(value)), `"${value}" is not a real date`);
    }
  } finally {
    restoreFetch();
  }
});

// ---------------------------------------------------------------------------
// CMS outage - the regression that produced "Sitemap could not be read"
// ---------------------------------------------------------------------------

for (const child of CHILD_ROUTES.filter((route) => route.file !== "article-sitemap.xml")) {
  test(`${child.file} still serves its URLs while WordPress is unreachable`, async () => {
    stubCmsOutage();
    try {
      const sitemap = await readSitemap(await callRoute(child.module));

      assertSitemapResponse(sitemap);
      assert.ok(
        sitemap.locs.length > 0,
        `${child.file} lost its URLs during a CMS outage - it must not depend on the CMS`,
      );
      assertCanonicalLocs(sitemap.locs);
    } finally {
      restoreFetch();
    }
  });
}

test("the article sitemap answers a CMS outage with 503, never HTML and never a partial list", async () => {
  stubCmsOutage();
  try {
    const response = await callRoute("../src/app/article-sitemap.xml/route.ts");

    assert.equal(response.status, 503, "a CMS outage must be a retryable 503, not a 500 or a 200");
    assert.equal(response.headers.get("content-type"), "application/xml; charset=utf-8");
    assert.equal(response.headers.get("retry-after"), "300");
    assert.equal(response.headers.get("cache-control"), "no-store");

    const body = await response.text();
    assert.equal(body, "", "a 503 must not carry a partial sitemap or an HTML error page");
  } finally {
    restoreFetch();
  }
});

test("the index keeps listing every child while WordPress is unreachable", async () => {
  stubCmsOutage();
  try {
    const sitemap = await readSitemap(await callRoute("../src/app/sitemap.xml/route.ts"));

    assertSitemapResponse(sitemap);
    assert.equal(sitemap.root, "sitemapindex");

    for (const child of CHILD_ROUTES) {
      assert.ok(
        sitemap.locs.includes(`${SITE}/${child.file}`),
        `${child.file} was dropped from the index during an outage`,
      );
    }

    // No modification date may be invented to fill the gap.
    assert.ok(!sitemap.body.includes("<lastmod>"));
  } finally {
    restoreFetch();
  }
});

// ---------------------------------------------------------------------------
// Escaping
// ---------------------------------------------------------------------------

test("values needing XML escaping survive a real parser round trip", async () => {
  const { renderUrlSet } = await import("../src/lib/sitemap/xml.ts");

  const xml = renderUrlSet({
    id: "page",
    file: "page-sitemap.xml",
    title: "Pages",
    urls: [
      {
        loc: `${SITE}/edge-and-leed?a=1&b=2`,
        lastModified: "2026-05-02T09:00:00Z",
        images: [{ loc: `${SITE}/img.jpg?w=1&h=2` }],
      },
      { loc: `${SITE}/quote-"and"-<tag>-&-apos'` },
    ],
  });

  assert.equal(XMLValidator.validate(xml), true, `escaped output is not well-formed:\n${xml}`);
  // The raw ampersand must never reach the document.
  assert.ok(!/&(?!(amp|lt|gt|quot|apos);)/.test(xml), "an unescaped entity reached the XML");
  assert.ok(xml.includes("a=1&amp;b=2"));

  const parser = new XMLParser({ ignoreAttributes: false, isArray: (name) => name === "url" });
  const parsed = parser.parse(xml) as { urlset: { url: { loc: string }[] } };

  // The parser must hand back exactly the original characters.
  assert.equal(parsed.urlset.url[0].loc, `${SITE}/edge-and-leed?a=1&b=2`);
  assert.equal(parsed.urlset.url[1].loc, `${SITE}/quote-"and"-<tag>-&-apos'`);
});

test("characters XML forbids outright are dropped rather than emitted", async () => {
  const { escapeXml } = await import("../src/lib/sitemap/xml.ts");

  const withControlChars = `a${String.fromCharCode(0)}b${String.fromCharCode(7)}c${String.fromCharCode(0x1f)}d`;
  assert.equal(escapeXml(withControlChars), "abcd");

  // Tab, newline and carriage return are legal and must survive.
  assert.equal(escapeXml("a\tb\nc\rd"), "a\tb\nc\rd");

  const xml = `<urlset xmlns="${SITEMAP_NS}"><url><loc>${escapeXml(`${SITE}/${withControlChars}`)}</loc></url></urlset>`;
  assert.equal(XMLValidator.validate(xml), true);
});

// ---------------------------------------------------------------------------
// No route may vary by user agent
// ---------------------------------------------------------------------------

test("no sitemap route inspects the user agent or requires a cookie", () => {
  const sources = [
    ...CHILD_ROUTES.map((route) => route.module),
    "../src/app/sitemap.xml/route.ts",
    "../src/app/sitemap.xsl/route.ts",
  ].map((relative) => readFileSync(path.join(ROOT, relative.replace("../", "")), "utf8"));

  const libs = ["src/lib/sitemap/data.ts", "src/lib/sitemap/xml.ts", "src/lib/sitemap/inventory.ts"].map(
    (relative) => readFileSync(path.join(ROOT, relative), "utf8"),
  );

  for (const source of [...sources, ...libs]) {
    assert.ok(!/user-?agent/i.test(source), "a sitemap route branches on the user agent");
    assert.ok(!/\bcookies\(\)/.test(source), "a sitemap route reads cookies");
    assert.ok(!/redirect\(/.test(source), "a sitemap route redirects");
    // `notFound()` renders the application's HTML 404 page, which is not XML.
    assert.ok(!/notFound\(/.test(source), "a sitemap route can still answer with an HTML page");
  }
});

test("every sitemap route is dynamic, so a build-time CMS failure cannot be baked in", () => {
  for (const route of [...CHILD_ROUTES.map((entry) => entry.module), "../src/app/sitemap.xml/route.ts"]) {
    const source = readFileSync(path.join(ROOT, route.replace("../", "")), "utf8");
    assert.ok(
      source.includes('export const dynamic = "force-dynamic"'),
      `${route} is not force-dynamic`,
    );
  }
});

// ---------------------------------------------------------------------------
// Optional live check. Runs only when a base URL is supplied, e.g.
// SITEMAP_BASE_URL=https://www.buildingpractice.biz npm test
// ---------------------------------------------------------------------------

const LIVE_BASE = process.env.SITEMAP_BASE_URL;

test("live routes answer Googlebot with valid XML", { skip: !LIVE_BASE }, async () => {
  for (const child of ["sitemap.xml", ...CHILD_ROUTES.map((route) => route.file)]) {
    const response = await realFetch(`${LIVE_BASE}/${child}`, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
      redirect: "manual",
    });

    assert.equal(response.status, 200, `${child} did not answer Googlebot with 200`);
    assert.equal(response.headers.get("content-type"), "application/xml; charset=utf-8");

    const body = await response.text();
    assert.equal(XMLValidator.validate(body), true, `${child} is not well-formed XML`);
    assert.ok(body.includes("<loc>"), `${child} contains no URLs`);
  }
});
