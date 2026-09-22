import type { MetadataRoute } from "next";
import { getPostIndex } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import { getAllTeamMembers } from "@/lib/team";
import { SITE_URL } from "@/lib/seo";

/**
 * The sitemap is generated per request rather than at build time.
 *
 * Building it during `next build` made every deployment depend on the CMS
 * being reachable, and a partial read produced a sitemap that looked
 * successful while silently missing articles. Generating on request means the
 * article collection is always read fresh, and a CMS failure surfaces as an
 * error Google will retry instead of a quietly truncated file.
 */
export const dynamic = "force-dynamic";

/**
 * Canonical, indexable routes only.
 *
 * `lastModified` is deliberately omitted: these pages are edited in the
 * repository and there is no genuine per-page modification date available at
 * runtime, so stamping them with the current time would be fabricated data
 * that teaches crawlers to distrust the field.
 */
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
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

/** Parse a CMS timestamp, discarding anything unusable rather than guessing. */
function toDate(value: string | null): Date | undefined {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Throws `CmsUnavailableError` if the article collection cannot be read in
  // full. That is intentional - an incomplete sitemap is worse than none.
  const posts = await getPostIndex();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const teamEntries: MetadataRoute.Sitemap = getAllTeamMembers().map((member) => ({
    url: `${SITE_URL}/team/${member.id}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: toDate(post.modified),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const entries = [
    ...staticEntries,
    ...teamEntries,
    ...serviceEntries,
    ...projectEntries,
    ...blogEntries,
  ];

  // Final guard: one URL may only ever appear once, whatever the sources did.
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
