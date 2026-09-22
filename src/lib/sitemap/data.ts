/**
 * Sitemap data loading.
 *
 * Binds the application's existing sources of truth - the service, project and
 * team data modules plus the hardened WordPress layer - to the pure grouping
 * logic in `./inventory.ts`. No URL list is maintained here; every URL is
 * derived from the same data the pages themselves render from.
 */

import { getArticleSitemapIndex } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import { getAllTeamMembers } from "@/lib/team";
import { SITE_URL } from "@/lib/seo";

import { buildSitemapGroups, type SitemapGroup, type SitemapGroupId } from "./inventory";

/**
 * The full grouped inventory.
 *
 * A CMS failure propagates out of `getArticleSitemapIndex`, so a truncated
 * article read can never be published as a complete sitemap - the route
 * returns an error the crawler will retry instead.
 */
export async function getSitemapGroups(): Promise<SitemapGroup[]> {
  const articles = await getArticleSitemapIndex();

  return buildSitemapGroups({
    siteUrl: SITE_URL,
    services: getAllServices(),
    projects: getAllProjects(),
    team: getAllTeamMembers(),
    articles,
  });
}

/** One child group by id, or `undefined` when it carries no URLs. */
export async function getSitemapGroup(id: SitemapGroupId): Promise<SitemapGroup | undefined> {
  const groups = await getSitemapGroups();
  return groups.find((group) => group.id === id);
}
