import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

import {
  buildServiceMigrationRedirects,
  LEGACY_REDIRECTS,
  resolveLegacyPath,
} from "../src/lib/legacy-redirects.ts";
import { buildSitemapGroups, isReservedRootPath } from "../src/lib/sitemap/inventory.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const SITE = "https://www.buildingpractice.biz";

type ServiceRecord = {
  slug: string;
  legacySlug: string;
  serviceName: string;
  h1: string;
  schemaName: string;
  seoTitle: string;
  seoDescription: string;
  breadcrumbLabel: string;
  heroImageAlt: string;
  schemaServiceTypes: string[] | null;
  keywords: string[];
  heroImage: string;
};

function loadJson<T>(relative: string): T {
  return JSON.parse(readFileSync(path.join(ROOT, relative), "utf8")) as T;
}

/** The service source of truth. Expectations are derived from it, not copied. */
const services = loadJson<ServiceRecord[]>("src/data/services.json");

/** Mirrors slugifyH1 in src/lib/services.ts. */
function slugifyH1(h1: string): string {
  return h1
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

const serviceRedirects = buildServiceMigrationRedirects(services);

// --- Inventory --------------------------------------------------------------

test("exactly 23 genuine service pages exist", () => {
  assert.equal(services.length, 23);
});

test("every service has one unique final slug", () => {
  const slugs = services.map((s) => s.slug);
  assert.equal(new Set(slugs).size, 23);
  for (const slug of slugs) assert.match(slug, /^[a-z0-9-]+$/);
});

test("every retired slug is unique and distinct from its final slug", () => {
  const legacy = services.map((s) => s.legacySlug);
  assert.equal(new Set(legacy).size, 23);
  for (const service of services) assert.notEqual(service.slug, service.legacySlug);
});

// --- URL-to-H1 alignment ----------------------------------------------------

test("every final slug is the deterministic slugified form of its H1", () => {
  for (const service of services) {
    assert.equal(service.slug, slugifyH1(service.h1), `slug/H1 mismatch: ${service.slug}`);
  }
});

test("every H1 uses the firm-focused convention exactly once", () => {
  for (const service of services) {
    assert.equal(
      service.h1,
      `Leading ${service.serviceName} Firm in Nigeria`,
      `unexpected H1: ${service.h1}`,
    );
    assert.equal((service.h1.match(/\bLeading\b/g) ?? []).length, 1, "Leading appears twice");
    assert.equal((service.h1.match(/\bFirm\b/g) ?? []).length, 1, "Firm appears twice");
    assert.ok(service.h1.endsWith(" Firm in Nigeria"));
  }
});

test("every slug keeps leading, firm and in-nigeria", () => {
  for (const service of services) {
    assert.ok(service.slug.startsWith("leading-"), service.slug);
    assert.ok(service.slug.endsWith("-firm-in-nigeria"), service.slug);
    assert.ok(!service.slug.includes("--"));
  }
});

test("ampersands become 'and' in slugs", () => {
  const withAmpersand = services.filter((s) => s.h1.includes("&"));
  assert.ok(withAmpersand.length > 0, "fixture should cover the & case");
  for (const service of withAmpersand) {
    assert.ok(service.slug.includes("-and-"), service.slug);
    assert.ok(!service.slug.includes("&"));
  }
});

test("no location other than Nigeria is introduced into an H1", () => {
  for (const service of services) {
    assert.ok(!/lagos|abuja|port harcourt/i.test(service.h1), service.h1);
  }
});

// --- Metadata ---------------------------------------------------------------

test("every metadata title is unique and equals the H1", () => {
  const titles = services.map((s) => s.seoTitle);
  assert.equal(new Set(titles).size, 23);
  for (const service of services) assert.equal(service.seoTitle, service.h1);
});

test("every meta description is present, specific and unique", () => {
  const descriptions = services.map((s) => s.seoDescription);
  assert.equal(new Set(descriptions).size, 23, "descriptions must not be duplicated");
  for (const service of services) {
    assert.ok(service.seoDescription.length > 80, service.slug);
    assert.ok(service.seoDescription.length < 320, `${service.slug} description too long`);
    // Normalise "&" so "Structural Engineering & Design" matches the prose
    // form "structural engineering and design".
    const needle = service.serviceName.toLowerCase().replace(/\s*&\s*/g, " and ");
    assert.ok(
      service.seoDescription.toLowerCase().includes(needle),
      `${service.slug} description is not specific to the service`,
    );
  }
});

test("descriptions make no unverifiable claims", () => {
  const banned = /\b(award|award-winning|certified|accredited|guarantee|guaranteed|\d+\s*(years|projects|clients)|rated|best in|no\.?\s*1)\b/i;
  for (const service of services) {
    assert.ok(!banned.test(service.seoDescription), `${service.slug}: ${service.seoDescription}`);
  }
});

// --- Structured data --------------------------------------------------------

test("every schema name agrees with the rendered H1", () => {
  for (const service of services) assert.equal(service.schemaName, service.h1);
});

test("every breadcrumb label is the service name", () => {
  for (const service of services) assert.equal(service.breadcrumbLabel, service.serviceName);
});

test("every service has documented schema service types", () => {
  for (const service of services) {
    assert.ok(Array.isArray(service.schemaServiceTypes), `${service.slug} has no serviceType`);
    assert.ok(service.schemaServiceTypes!.length > 0);
  }
});

// --- Image alt text ---------------------------------------------------------

test("hero image alt text is specific and never duplicated", () => {
  const alts = services.map((s) => s.heroImageAlt);
  assert.equal(new Set(alts).size, 23);
  for (const service of services) {
    assert.ok(service.heroImageAlt.includes(service.serviceName));
    assert.ok(!/leading .* firm/i.test(service.heroImageAlt), "alt text must not be keyword-stuffed");
  }
});

// --- Redirects --------------------------------------------------------------

test("every retired service URL has a redirect to its final URL", () => {
  assert.equal(serviceRedirects.length, 23);
  for (const service of services) {
    const entry = serviceRedirects.find((r) => r.source === `/services/${service.legacySlug}`);
    assert.ok(entry, `no redirect for /services/${service.legacySlug}`);
    assert.equal(entry.destination, `/services/${service.slug}`);
  }
});

test("no service redirect chains or loops", () => {
  const all = [...serviceRedirects, ...LEGACY_REDIRECTS];
  const sources = new Set(all.map((r) => r.source));
  for (const entry of all) {
    assert.notEqual(entry.source, entry.destination, `loop: ${entry.source}`);
    assert.ok(!sources.has(entry.destination), `chain: ${entry.source} -> ${entry.destination}`);
  }
});

test("no redirect points a final service URL back at a retired one", () => {
  const finalUrls = new Set(services.map((s) => `/services/${s.slug}`));
  for (const entry of [...serviceRedirects, ...LEGACY_REDIRECTS]) {
    assert.ok(!finalUrls.has(entry.source), `final URL used as redirect source: ${entry.source}`);
  }
});

test("historic aliases point directly at final service URLs", () => {
  const finalUrls = new Set(services.map((s) => `/services/${s.slug}`));
  const serviceAliases = LEGACY_REDIRECTS.filter((r) => r.destination.startsWith("/services/"));
  assert.ok(serviceAliases.length > 0);
  for (const alias of serviceAliases) {
    assert.ok(finalUrls.has(alias.destination), `alias targets a non-final URL: ${alias.destination}`);
  }
});

test("existing unrelated redirects remain intact", () => {
  for (const [source, destination] of [
    ["/about-us", "/about"],
    ["/contact-us", "/contact"],
    ["/our-services", "/services"],
    ["/news", "/blog"],
    ["/portfolio/promasidor", "/projects/promasidor-nigeria-head-office"],
    ["/team/uche-anyanwu", "/team/kingsley"],
  ]) {
    assert.equal(resolveLegacyPath(source), destination, source);
  }
  assert.equal(resolveLegacyPath("/blog/some-article"), "/some-article");
});

// --- Sitemap integration ----------------------------------------------------

const articles = Array.from({ length: 286 }, (_, i) => ({
  id: i + 1,
  slug: `article-${i + 1}`,
  modified: "2026-09-01T00:00:00Z",
  imageUrl: null,
}));

function groups() {
  return buildSitemapGroups({
    siteUrl: SITE,
    services,
    projects: loadJson<{ slug: string }[]>("src/data/projects.json"),
    team: loadJson<{ id: string }[]>("src/data/team.json"),
    articles,
  });
}

test("service-sitemap contains exactly the 23 final service URLs", () => {
  const group = groups().find((g) => g.id === "service");
  assert.ok(group);
  const locs = group.urls.map((u) => u.loc);
  assert.equal(locs.length, 23);
  assert.equal(new Set(locs).size, 23);
  for (const service of services) {
    assert.ok(locs.includes(`${SITE}/services/${service.slug}`), service.slug);
  }
});

test("no retired or redirecting service URL appears in any sitemap", () => {
  const all = groups().flatMap((g) => g.urls.map((u) => u.loc));
  for (const service of services) {
    assert.ok(
      !all.includes(`${SITE}/services/${service.legacySlug}`),
      `retired URL in sitemap: ${service.legacySlug}`,
    );
  }
  const redirectSources = new Set(
    [...serviceRedirects, ...LEGACY_REDIRECTS].map((r) => `${SITE}${r.source}`),
  );
  for (const loc of all) assert.ok(!redirectSources.has(loc), `redirect source in sitemap: ${loc}`);
});

test("the combined sitemap still holds 426 unique canonical URLs", () => {
  const all = groups().flatMap((g) => g.urls.map((u) => u.loc));
  assert.equal(all.length, 426);
  assert.equal(new Set(all).size, 426);
  for (const loc of all) assert.ok(loc.startsWith(`${SITE}/`) || loc === SITE, loc);
});

test("the grouped index still has the same five children", () => {
  assert.deepEqual(
    groups().map((g) => g.file),
    [
      "page-sitemap.xml",
      "service-sitemap.xml",
      "project-sitemap.xml",
      "team-sitemap.xml",
      "article-sitemap.xml",
    ],
  );
});

// --- Reserved slugs ---------------------------------------------------------

test("reserved application paths cannot be claimed by a WordPress article", () => {
  for (const reserved of [
    "services",
    "projects",
    "team",
    "locations",
    "about",
    "contact",
    "careers",
    "reviews",
    "blog",
    "privacy",
    "robots.txt",
    "sitemap.xml",
    "sitemap.xsl",
    "page-sitemap.xml",
    "service-sitemap.xml",
    "project-sitemap.xml",
    "team-sitemap.xml",
    "article-sitemap.xml",
    "api",
    "admin",
  ]) {
    assert.equal(isReservedRootPath(reserved), true, `${reserved} must be reserved`);
  }
  assert.equal(isReservedRootPath("why-you-need-an-architect-in-nigeria"), false);
});

test("a colliding article slug is dropped from the article sitemap", () => {
  const withCollision = buildSitemapGroups({
    siteUrl: SITE,
    services,
    projects: [{ slug: "p" }],
    team: [{ id: "t" }],
    articles: [
      { id: 1, slug: "services", modified: null },
      { id: 2, slug: "genuine-article", modified: null },
    ],
  });
  const articleGroup = withCollision.find((g) => g.id === "article");
  assert.deepEqual(
    articleGroup?.urls.map((u) => u.loc),
    [`${SITE}/genuine-article`],
  );
});

// --- Repository hygiene -----------------------------------------------------

test("no first-party source file links to a retired service URL", () => {
  const files = [
    "src/components/home/Services.tsx",
    "src/components/home/TeamPreview.tsx",
    "src/components/home/Testimonials.tsx",
    "src/components/home/BlogPreview.tsx",
    "src/components/blog/BlogArchive.tsx",
    "src/app/(site)/services/[slug]/page.tsx",
  ];
  for (const file of files) {
    const text = readFileSync(path.join(ROOT, file), "utf8");
    for (const service of services) {
      const re = new RegExp(`/services/${service.legacySlug}(?![a-z0-9-])`);
      assert.ok(!re.test(text), `${file} still links to /services/${service.legacySlug}`);
    }
  }
});

test("the service page renders a single data-driven H1", () => {
  const page = readFileSync(path.join(ROOT, "src/app/(site)/services/[slug]/page.tsx"), "utf8");
  assert.equal((page.match(/<h1>/g) ?? []).length, 1, "exactly one <h1> element in the template");
  assert.ok(page.includes("{service.h1}"), "H1 must come from the service source of truth");
  assert.ok(page.includes("{service.breadcrumbLabel}"), "breadcrumb must come from the data source");
  assert.ok(page.includes("name: service.schemaName"), "schema name must come from the data source");
});

// --- Metadata consolidation -------------------------------------------------

const SERVICE_PAGE = readFileSync(
  path.join(ROOT, "src/app/(site)/services/[slug]/page.tsx"),
  "utf8",
);

/**
 * The body of generateMetadata. Anchored on the return type because every
 * closing brace inside the body is indented, so the first `\n}` at column 0
 * after it is the end of the function.
 */
const METADATA_FN = /\): Promise<Metadata> \{[\s\S]*?\n\}/.exec(SERVICE_PAGE)?.[0] ?? "";

test("generateMetadata resolves metadata from the service source of truth", () => {
  const fn = METADATA_FN;
  assert.ok(fn.length > 0, "generateMetadata not found");
  assert.ok(fn.includes("getServiceBySlug(slug)"), "must look the service up");
  assert.ok(fn.includes("service.seoTitle"));
  assert.ok(fn.includes("service.seoDescription"));
  assert.ok(fn.includes("service.keywords"));
  assert.ok(fn.includes("service.heroImage"));
  assert.ok(fn.includes("service.heroImageAlt"));
});

test("no hard-coded per-service metadata branch remains in the route", () => {
  assert.equal(
    (SERVICE_PAGE.match(/if \(slug === [A-Z0-9_]+_SLUG\)/g) ?? []).length,
    0,
    "per-slug metadata branches must be gone",
  );
  assert.equal(
    (SERVICE_PAGE.match(/^const [A-Z0-9_]+_(?:TITLE|DESCRIPTION) = /gm) ?? []).length,
    0,
    "per-service title/description constants must be gone",
  );
  // No service title or description string may be duplicated in the route.
  for (const service of services) {
    assert.ok(
      !SERVICE_PAGE.includes(`"${service.seoTitle}"`),
      `${service.slug} title is still hard-coded in the route`,
    );
    assert.ok(
      !SERVICE_PAGE.includes(`"${service.seoDescription}"`),
      `${service.slug} description is still hard-coded in the route`,
    );
  }
});

test("all 23 services have complete required metadata", () => {
  for (const service of services) {
    for (const field of ["seoTitle", "seoDescription", "heroImage", "heroImageAlt", "slug"] as const) {
      const value = (service as unknown as Record<string, unknown>)[field];
      assert.ok(typeof value === "string" && value.length > 0, `${service.slug}: missing ${field}`);
    }
    assert.ok(Array.isArray(service.keywords) && service.keywords.length > 0, `${service.slug}: no keywords`);
    for (const keyword of service.keywords) {
      assert.ok(typeof keyword === "string" && keyword.trim().length > 0);
    }
  }
});

test("metadata canonicals and Open Graph URLs use the final service URLs", () => {
  const fn = METADATA_FN;
  // A single url constant feeds both the canonical and the OG url.
  assert.ok(fn.includes("const url = absoluteUrl(`/services/${slug}`)"));
  assert.ok(fn.includes("alternates: { canonical: url }"));
  assert.ok(/openGraph: \{[\s\S]*?\n      url,/.test(fn), "og:url must reuse the canonical url");
});

test("no keyword still carries the pre-migration H1 phrasing", () => {
  for (const service of services) {
    for (const keyword of service.keywords) {
      assert.ok(
        !/Services in Lagos, Nigeria$/i.test(keyword),
        `${service.slug}: stale keyword "${keyword}"`,
      );
    }
  }
});

test("the corrected facility-management keyword is firm-focused and national", () => {
  const service = services.find((s) => s.slug === "leading-facility-management-firm-in-nigeria");
  assert.ok(service);
  assert.ok(service.keywords.includes("Facility Management Firm in Nigeria"));
  assert.ok(!service.keywords.includes("Facility Management Services in Lagos, Nigeria"));
});

test("keywords are unique within each service", () => {
  for (const service of services) {
    assert.equal(
      new Set(service.keywords).size,
      service.keywords.length,
      `${service.slug} has duplicate keywords`,
    );
  }
});
