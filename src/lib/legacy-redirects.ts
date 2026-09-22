/**
 * Central legacy-URL mapping table - the single source of truth for redirects.
 *
 * Every entry maps a WordPress-era URL to its current Next.js destination.
 * Sources were enumerated from the live WordPress sitemaps
 * (`page-sitemap.xml`, `portfolio-sitemap.xml`, `gva_team-sitemap.xml`) and
 * from the absolute links actually embedded in published article bodies.
 * Destinations were matched against `src/data/*.json`, so every mapping below
 * resolves to a route that exists in this repository.
 *
 * Legacy URLs whose destination could NOT be proven are deliberately absent:
 * they are listed in `docs/LEGACY-URL-REVIEW.md` for manual review instead of
 * being guessed at or swept into a hub page.
 *
 * This module is imported by `next.config.ts` (to generate `redirects()`), by
 * the article link-normalisation pipeline, and by the regression tests, so it
 * must stay free of path aliases and framework imports.
 */

export type LegacyRedirect = {
  /** Path without a trailing slash. Trailing-slash variants are normalised by Next.js first. */
  source: string;
  destination: string;
};

/** WordPress top-level pages that have a direct equivalent in the Next.js site. */
const PAGE_REDIRECTS: LegacyRedirect[] = [
  { source: "/about-us", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/contact-us/join-our-team-2", destination: "/careers" },
  { source: "/contact-us/new-project-partnerships", destination: "/contact" },
  { source: "/our-services", destination: "/services" },
  { source: "/our-team", destination: "/team" },
  { source: "/our-clients", destination: "/about" },
  { source: "/awards-and-recognition", destination: "/about" },
  { source: "/news", destination: "/blog" },
  { source: "/news-2", destination: "/blog" },
  { source: "/projects-2", destination: "/projects" },
  { source: "/portfolio", destination: "/projects" },
];

/**
 * WordPress `/our-services/*` pages mapped to the current service pages.
 * Only unambiguous subject matches are included. The "architecture firm in
 * <city>" pages are intentionally excluded: they have no present-day
 * equivalent and belong to the upcoming service-as-firm restructuring.
 */
const SERVICE_REDIRECTS: LegacyRedirect[] = [
  { source: "/our-services/3d-architectural-visualization-rendering-services", destination: "/services/3d-visualization" },
  { source: "/our-services/architectural-planning-design-documentation-firm-in-nigeria", destination: "/services/architectural-design" },
  { source: "/our-services/building-design-architect-nigeria", destination: "/services/architectural-design" },
  { source: "/our-services/modern-design-architect-in-nigeria", destination: "/services/architectural-design" },
  { source: "/our-services/construction-management-in-lagos-nigeria", destination: "/services/construction-management" },
  { source: "/our-services/top-construction-project-management-firm-in-lagos-nigeria", destination: "/services/project-management" },
  { source: "/our-services/top-building-construction-company-in-lagos-nigeria", destination: "/services/building-construction" },
  { source: "/our-services/interior-design-company-in-nigeria", destination: "/services/interior-design" },
  { source: "/our-services/interior-design-company-lagos-nigeria", destination: "/services/interior-design" },
  { source: "/our-services/facility-management-and-maintenance", destination: "/services/facility-management" },
  { source: "/our-services/facility-management-and-maintenance-company-in-nigeria", destination: "/services/facility-management" },
  { source: "/our-services/green-building-and-sustainable-architecture-firm-in-lagos-nigeria", destination: "/services/green-building-advisory" },
  { source: "/our-services/sustainable-architecture-firm-in-nigeria", destination: "/services/green-building-advisory" },
  { source: "/our-services/sustainable-green-building-design-architect-in-nigeria", destination: "/services/green-building-advisory" },
  { source: "/our-services/real-estate-development-company-in-lagos-nigeria", destination: "/services/real-estate-development" },
];

/**
 * WordPress `/portfolio/*` entries mapped to current project pages. Each
 * mapping was confirmed by matching the WordPress slug against the project
 * title in `src/data/projects.json`.
 */
const PORTFOLIO_REDIRECTS: LegacyRedirect[] = [
  { source: "/portfolio/27-glover-road-ikoyi", destination: "/projects/the-pantheon-27-glover-road-ikoyi-lagos" },
  { source: "/portfolio/bloom-towers", destination: "/projects/bloom-towers" },
  { source: "/portfolio/ihs-office", destination: "/projects/ihs-office-lagos" },
  { source: "/portfolio/ihs-warehouse", destination: "/projects/ihs-warehouse-kaduna" },
  { source: "/portfolio/karcher-showroom-victoria-island", destination: "/projects/karcher-showroom-victoria-island-lagos" },
  { source: "/portfolio/katampe", destination: "/projects/katampe-residences-abuja" },
  { source: "/portfolio/lfz-arch-welcome-centre", destination: "/projects/lekki-free-zone-welcome-centre-and-entrance-arch" },
  { source: "/portfolio/mandillas", destination: "/projects/mandilas-tower-ikoyi-lagos" },
  { source: "/portfolio/nba-house", destination: "/projects/nigerian-bar-association-national-secretariat-abuja" },
  { source: "/portfolio/noun-masterplan", destination: "/projects/noun-model-study-centre-master-plan-abuja" },
  { source: "/portfolio/nspri-library", destination: "/projects/nspri-library-remodelling" },
  { source: "/portfolio/ocean-epiphany", destination: "/projects/ocean-epiphany" },
  { source: "/portfolio/oculus-grande", destination: "/projects/the-oculus-grande" },
  { source: "/portfolio/olu-akpatas-house-benin", destination: "/projects/akpata-house-benin-city-edo-state" },
  { source: "/portfolio/peace-tower", destination: "/projects/peace-tower" },
  { source: "/portfolio/promasidor", destination: "/projects/promasidor-nigeria-head-office" },
  { source: "/portfolio/sapphire-tower-bluewater", destination: "/projects/sapphire-tower-bluewater" },
  { source: "/portfolio/scarlet-lodge-hotel", destination: "/projects/scarlet-lodge-hotel-victoria-island-lagos" },
  { source: "/portfolio/sellyfak", destination: "/projects/sellyfak-office-building-victoria-island-lagos" },
];

/**
 * WordPress project category archives. These have no indexable equivalent -
 * the categories exist as client-side filters on the projects hub - so the
 * hub is the correct parent destination rather than a guessed detail page.
 */
const PROJECT_CATEGORY_REDIRECTS: LegacyRedirect[] = [
  { source: "/projects/commercial", destination: "/projects" },
  { source: "/projects/hospitality", destination: "/projects" },
  { source: "/projects/industrial", destination: "/projects" },
  { source: "/projects/institutional-2", destination: "/projects" },
  { source: "/projects/master-plan", destination: "/projects" },
  { source: "/projects/mixed-use", destination: "/projects" },
  { source: "/projects/residential", destination: "/projects" },
];

/**
 * WordPress team profiles mapped to current team pages. Each mapping was
 * confirmed by matching the WordPress slug against the full name in
 * `src/data/team.json` - several current ids are short forms, so the name and
 * not the id is the evidence.
 */
const TEAM_REDIRECTS: LegacyRedirect[] = [
  { source: "/team/ali-abdulquadir", destination: "/team/ali" },
  { source: "/team/ayanfeoluwa-vese", destination: "/team/ayanfe" },
  { source: "/team/ayelo-elukpo", destination: "/team/ayelo" },
  { source: "/team/azeez-alakufo", destination: "/team/azeez" },
  { source: "/team/bode-ariyo", destination: "/team/bode" },
  { source: "/team/brenda-mekwunye", destination: "/team/brenda" },
  { source: "/team/chyzoba-onwubiko", destination: "/team/chyzoba" },
  { source: "/team/fawaz-adelaja", destination: "/team/fawaz" },
  { source: "/team/ifeoluwa-nwajei", destination: "/team/ife" },
  { source: "/team/ismail-opadokun", destination: "/team/ismail" },
  { source: "/team/joshua-adepoju-boluwatife", destination: "/team/joshua" },
  { source: "/team/mayowa-osifowora", destination: "/team/mayowa" },
  { source: "/team/michael-oluwafemi-alley", destination: "/team/micheal" },
  { source: "/team/nduka-akanu", destination: "/team/nduka" },
  { source: "/team/nicole-duke", destination: "/team/nicole" },
  { source: "/team/olugboyega-tayo-ojo", destination: "/team/gboyega" },
  { source: "/team/olushola-gabriel-adeyemi", destination: "/team/shola" },
  { source: "/team/oluwagbemisola-idowu", destination: "/team/gbemi" },
  { source: "/team/oreoluwa-orimogunje", destination: "/team/ore" },
  { source: "/team/quadri-bakare", destination: "/team/quadri" },
  { source: "/team/tahir-adebisi-mohammed", destination: "/team/tahir" },
  { source: "/team/uche-anyanwu", destination: "/team/kingsley" },
  { source: "/team/victor-oyebode", destination: "/team/victor" },
  { source: "/team/yewande-adeyemi", destination: "/team/yewamde" },
];

/**
 * Every explicit one-to-one legacy mapping, in the order Next.js should
 * evaluate them. Parameterised rules (`/blog/:slug`) are added separately in
 * `next.config.ts` because they cannot be expressed as literal pairs.
 */
export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  ...PAGE_REDIRECTS,
  ...SERVICE_REDIRECTS,
  ...PORTFOLIO_REDIRECTS,
  ...PROJECT_CATEGORY_REDIRECTS,
  ...TEAM_REDIRECTS,
];

/** Fast lookup used by the article link-normalisation pipeline. */
const LEGACY_REDIRECT_MAP: ReadonlyMap<string, string> = new Map(
  LEGACY_REDIRECTS.map((entry) => [entry.source, entry.destination]),
);

/** Strip a single trailing slash so `/about-us/` and `/about-us` behave alike. */
export function normalisePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

/**
 * Resolve a legacy pathname to its current destination, or `null` when no
 * proven mapping exists. Handles the literal table plus the `/blog/<slug>`
 * article rule, since articles moved to root-level slugs.
 */
export function resolveLegacyPath(pathname: string): string | null {
  const path = normalisePathname(pathname);

  const mapped = LEGACY_REDIRECT_MAP.get(path);
  if (mapped) return mapped;

  // Historic article URLs: /blog/<slug> -> /<slug>. `/blog/page/<n>` is the
  // current pagination shape and must never be treated as an article slug.
  const blogArticle = /^\/blog\/([^/]+)$/.exec(path);
  if (blogArticle && blogArticle[1] !== "page") {
    return `/${blogArticle[1]}`;
  }

  return null;
}
