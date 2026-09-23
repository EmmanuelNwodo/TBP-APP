/**
 * Sitemap data loading.
 *
 * Binds the application's existing sources of truth - the service, project and
 * team data modules plus the hardened WordPress layer - to the pure grouping
 * logic in `./inventory.ts`. No URL list is maintained here; every URL is
 * derived from the same data the pages themselves render from.
 *
 * The loading is deliberately split by group. `page-sitemap.xml`,
 * `service-sitemap.xml`, `project-sitemap.xml` and `team-sitemap.xml` are
 * built entirely from repository data, so none of them awaits WordPress.
 * Previously every child sitemap resolved the full grouped inventory, which
 * meant a request for the eleven repository-authored URLs in
 * `page-sitemap.xml` first walked the entire published article index - three
 * collection pages plus the featured-image lookups. Measured cold that took
 * nine seconds against a warm-cache cost of eleven milliseconds, and a CMS
 * outage turned every one of those routes into an HTTP 500 carrying no XML at
 * all. A crawler reports both of those as a sitemap it could not read.
 */

import { CmsUnavailableError, getArticleSitemapIndex, withTimeBudget } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import { getAllTeamMembers } from "@/lib/team";
import { SITE_URL } from "@/lib/seo";

import {
  buildSitemapGroups,
  emptyGroup,
  type SitemapArticle,
  type SitemapGroup,
  type SitemapGroupId,
} from "./inventory";

/**
 * How long the index will wait for the article data.
 *
 * The index needs WordPress for one optional thing: the `lastmod` on the
 * article child. That is not worth holding a crawler's connection open for,
 * and the CMS retry budget can run to minutes, so the wait is capped well
 * inside any platform function limit and the index publishes regardless.
 */
const INDEX_ARTICLE_BUDGET_MS = 5_000;

/** Log a degraded sitemap read without leaking a stack trace. */
function logSitemapDegradation(context: string, error: unknown): void {
  const reason = error instanceof Error ? error.message : "unknown error";
  console.error(`[sitemap] ${context}: ${reason}`);
}

/**
 * Build the grouped inventory from repository data plus whichever articles the
 * caller managed to load. Passing no articles yields only the four groups that
 * WordPress plays no part in.
 */
function build(articles: SitemapArticle[]): SitemapGroup[] {
  return buildSitemapGroups({
    siteUrl: SITE_URL,
    services: getAllServices(),
    projects: getAllProjects(),
    team: getAllTeamMembers(),
    articles,
  });
}

/**
 * The full grouped inventory, used by the sitemap index.
 *
 * A CMS failure no longer takes the index down with it. The article child
 * stays listed, without a `lastmod`, because the articles demonstrably exist -
 * WordPress is simply unreachable at this moment - and removing the child from
 * the index would ask the crawler to forget every URL in it. The article route
 * answers that temporary state with a `503` the crawler retries, so the index
 * and the child never disagree about whether articles are published.
 */
export async function getSitemapGroups(): Promise<SitemapGroup[]> {
  const articles = await withTimeBudget(getArticleSitemapIndex(), INDEX_ARTICLE_BUDGET_MS);

  if (articles.ok) return build(articles.value);

  logSitemapDegradation("listing the index without article dates (" + articles.reason + ")", articles.error);
  return [...build([]), emptyGroup("article")];
}

/**
 * One child group by id.
 *
 * Only the article group touches WordPress, and it propagates
 * `CmsUnavailableError` so the route can answer `503` instead of publishing a
 * truncated article list. Every other group is resolved synchronously from
 * compiled-in data and cannot fail.
 */
export async function getSitemapGroup(id: SitemapGroupId): Promise<SitemapGroup | undefined> {
  if (id !== "article") {
    return build([]).find((group) => group.id === id);
  }

  const articles = await getArticleSitemapIndex();
  return build(articles).find((group) => group.id === id);
}

export { CmsUnavailableError };
