/**
 * Central sitemap inventory.
 *
 * Every public URL the site exposes is generated here, exactly once, and
 * assigned to exactly one child sitemap. The XML routes, the validation
 * script and the regression tests all consume these functions, so there is
 * never a second hand-maintained copy of the URL list.
 *
 * `buildSitemapGroups` is deliberately pure: it takes already-loaded
 * collections and returns the grouped inventory. The async loading lives in
 * `./data.ts`, which keeps this module importable by the test runner without
 * a network call or a bundler path alias.
 */

/** A single image attached to a URL. Only ever a real, public media URL. */
export type SitemapImage = {
  loc: string;
};

export type SitemapUrl = {
  /** Absolute URL on the canonical production origin. */
  loc: string;
  /**
   * W3C datetime. Present only when a genuine modification date exists;
   * never the build time and never "now".
   */
  lastModified?: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
  images?: SitemapImage[];
};

export type SitemapGroupId = "page" | "service" | "project" | "team" | "article";

export type SitemapGroup = {
  id: SitemapGroupId;
  /** Public filename, e.g. `page-sitemap.xml`. */
  file: string;
  /** Human label used by the XSL presentation layer. */
  title: string;
  urls: SitemapUrl[];
};

/**
 * The public identity of every child sitemap, declared once.
 *
 * The routes, the index and the empty-group fallback all read these names from
 * here, so a child sitemap's filename can never disagree with the `<loc>` the
 * index advertises for it.
 */
export const SITEMAP_GROUP_META: Readonly<
  Record<SitemapGroupId, { file: string; title: string }>
> = {
  page: { file: "page-sitemap.xml", title: "Pages" },
  service: { file: "service-sitemap.xml", title: "Services" },
  project: { file: "project-sitemap.xml", title: "Projects" },
  team: { file: "team-sitemap.xml", title: "Team" },
  article: { file: "article-sitemap.xml", title: "Articles" },
};

/** Every child sitemap id, in the order the index lists them. */
export const SITEMAP_GROUP_IDS: readonly SitemapGroupId[] = [
  "page",
  "service",
  "project",
  "team",
  "article",
];

/**
 * A structurally valid group carrying no URLs.
 *
 * A sitemap route must always be able to answer with well-formed XML. Where a
 * group cannot be built - the CMS is unreachable, or a collection is somehow
 * empty - the route renders this instead of falling back to the application's
 * HTML 404 page, which is not XML and is exactly what a crawler reports as an
 * unreadable sitemap.
 */
export function emptyGroup(id: SitemapGroupId): SitemapGroup {
  return { id, ...SITEMAP_GROUP_META[id], urls: [] };
}

/**
 * Blog pagination (`/blog/page/2` …) is reachable through crawlable links from
 * `/blog` and is indexable, but it is deliberately **not** listed in the XML
 * sitemap, because the audited production inventory does not contain it and
 * the verified baseline of 426 URLs must be preserved exactly.
 *
 * Flipping this to `true` adds every pagination page to `page-sitemap.xml`;
 * it is the only switch needed and the tests assert the resulting count.
 */
export const INCLUDE_BLOG_PAGINATION = false;

/** Standalone pages that are not members of a more specific collection. */
const STATIC_PAGES: { path: string; priority: number; changeFrequency: SitemapUrl["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/locations", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

/**
 * Route prefixes that must never reach a sitemap. Applied centrally so a new
 * group cannot reintroduce one by accident.
 */
const EXCLUDED_PREFIXES = ["/admin", "/api/", "/test-wordpress", "/_next"];

/**
 * Root-level paths that belong to the application, not to WordPress.
 *
 * Articles are published at `/{slug}`, the same namespace as the site's own
 * root routes, so a WordPress slug such as `services` would resolve to the
 * services hub rather than the article. Next.js route precedence already makes
 * the application route win; this set makes the sitemap agree with it, so a
 * colliding article can never be advertised at a URL that renders a different
 * page. It extends the existing duplicate detection below rather than adding a
 * second, competing mechanism.
 *
 * Derived from the standalone page list plus the collection roots and the
 * sitemap/robots files that are served from the root.
 */
const RESERVED_ROOT_PATHS: ReadonlySet<string> = new Set([
  ...STATIC_PAGES.map((page) => page.path.replace(/^\//, "")).filter(Boolean),
  // Collection roots and their nested routes.
  "services",
  "projects",
  "team",
  "locations",
  "blog",
  // Non-public application routes.
  "admin",
  "api",
  // Files served from the root by route handlers.
  "robots.txt",
  "sitemap.xml",
  "sitemap.xsl",
  "page-sitemap.xml",
  "service-sitemap.xml",
  "project-sitemap.xml",
  "team-sitemap.xml",
  "article-sitemap.xml",
]);

/** True when an article slug would collide with an application route. */
export function isReservedRootPath(slug: string): boolean {
  return RESERVED_ROOT_PATHS.has(slug.toLowerCase());
}

/** Exposed so the documentation and tests read the same list. */
export const reservedRootPaths = (): string[] => [...RESERVED_ROOT_PATHS].sort();

export type SitemapArticle = {
  id: number;
  slug: string;
  /** Genuine WordPress modification timestamp, or null when unknown. */
  modified: string | null;
  /** Real public featured-image URL, or null when the post has none. */
  imageUrl?: string | null;
};

export type SitemapInput = {
  siteUrl: string;
  services: { slug: string }[];
  projects: { slug: string }[];
  team: { id: string }[];
  articles: SitemapArticle[];
  /** Total archive pages; only used when pagination is switched on. */
  blogPageCount?: number;
};

function isExcluded(pathname: string): boolean {
  return EXCLUDED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix));
}

/**
 * Reject anything that is not an absolute `https` URL on the canonical origin,
 * and anything carrying a query string or fragment.
 */
export function isCanonicalLoc(loc: string, siteUrl: string): boolean {
  let parsed: URL;
  try {
    parsed = new URL(loc);
  } catch {
    return false;
  }
  if (parsed.protocol !== "https:") return false;
  if (parsed.origin !== new URL(siteUrl).origin) return false;
  if (parsed.search !== "" || parsed.hash !== "") return false;
  return !isExcluded(parsed.pathname);
}

function url(siteUrl: string, path: string, extra: Omit<SitemapUrl, "loc"> = {}): SitemapUrl {
  return { loc: `${siteUrl}${path}`, ...extra };
}

/**
 * Build the complete grouped inventory.
 *
 * Throws when a URL would be emitted twice, or when a URL is not a valid
 * canonical production URL - an incorrect sitemap is worse than none.
 */
export function buildSitemapGroups(input: SitemapInput): SitemapGroup[] {
  const { siteUrl } = input;

  const pageUrls: SitemapUrl[] = STATIC_PAGES.map((page) =>
    // No trustworthy per-page modification date exists for repository-authored
    // pages, so `lastModified` is intentionally omitted rather than invented.
    url(siteUrl, page.path, { priority: page.priority, changeFrequency: page.changeFrequency }),
  );

  if (INCLUDE_BLOG_PAGINATION && input.blogPageCount && input.blogPageCount > 1) {
    for (let page = 2; page <= input.blogPageCount; page += 1) {
      pageUrls.push(url(siteUrl, `/blog/page/${page}`, { priority: 0.4, changeFrequency: "daily" }));
    }
  }

  const groups: SitemapGroup[] = [
    {
      id: "page",
      ...SITEMAP_GROUP_META.page,
      urls: pageUrls,
    },
    {
      id: "service",
      ...SITEMAP_GROUP_META.service,
      urls: input.services.map((service) =>
        url(siteUrl, `/services/${service.slug}`, { priority: 0.6, changeFrequency: "monthly" }),
      ),
    },
    {
      id: "project",
      ...SITEMAP_GROUP_META.project,
      urls: input.projects.map((project) =>
        url(siteUrl, `/projects/${project.slug}`, { priority: 0.6, changeFrequency: "monthly" }),
      ),
    },
    {
      id: "team",
      ...SITEMAP_GROUP_META.team,
      urls: input.team.map((member) =>
        url(siteUrl, `/team/${member.id}`, { priority: 0.5, changeFrequency: "monthly" }),
      ),
    },
    {
      id: "article",
      ...SITEMAP_GROUP_META.article,
      // An article whose slug collides with an application route is dropped:
      // that URL renders the application page, so advertising it as an article
      // would publish a URL the sitemap cannot honour.
      urls: input.articles
        .filter((article) => !isReservedRootPath(article.slug))
        .map((article) =>
        url(siteUrl, `/${article.slug}`, {
          priority: 0.5,
          changeFrequency: "monthly",
          // Genuine WordPress modification timestamp only.
          lastModified: article.modified ?? undefined,
          // Image data is emitted only when WordPress returned a real URL.
          images: article.imageUrl ? [{ loc: article.imageUrl }] : undefined,
        }),
      ),
    },
  ];

  assertInventoryIsSound(groups, siteUrl);

  // An empty child sitemap is never published.
  return groups.filter((group) => group.urls.length > 0);
}

/** Validate the whole inventory: canonical origin, exclusions, no duplicates. */
export function assertInventoryIsSound(groups: SitemapGroup[], siteUrl: string): void {
  const seen = new Map<string, SitemapGroupId>();

  for (const group of groups) {
    for (const entry of group.urls) {
      if (!isCanonicalLoc(entry.loc, siteUrl)) {
        throw new Error(`sitemap: "${entry.loc}" is not a valid canonical production URL`);
      }
      const existing = seen.get(entry.loc);
      if (existing) {
        throw new Error(
          `sitemap: "${entry.loc}" appears in both the ${existing} and ${group.id} groups`,
        );
      }
      seen.set(entry.loc, group.id);
    }
  }
}

/** The most recent genuine modification date in a group, if any. */
export function latestModified(group: SitemapGroup): string | undefined {
  let latest: string | undefined;
  for (const entry of group.urls) {
    if (!entry.lastModified) continue;
    if (!latest || entry.lastModified > latest) latest = entry.lastModified;
  }
  return latest;
}

/** Every URL across every group, used by the duplicate-detection tests. */
export function allUrls(groups: SitemapGroup[]): string[] {
  return groups.flatMap((group) => group.urls.map((entry) => entry.loc));
}
