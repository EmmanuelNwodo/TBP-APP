// src/lib/blog.ts

import { cache } from "react";

import type { BlogPost, BlogPostIndexEntry, BlogPostSummary } from "@/types/blog";

/**
 * WordPress data layer.
 *
 * The central rule here is that a *transport* failure and a *confirmed
 * absence* are different things. A timeout, DNS failure, connection reset,
 * 5xx or malformed JSON means "the CMS did not answer"; only a successful
 * response that contains no matching post means "this post does not exist".
 * Collapsing the two is what previously caused valid published articles to be
 * pre-rendered as `404 + noindex`, so callers that can produce a 404 must
 * distinguish them.
 */

/** Thrown whenever the CMS could not be reached or answered unusably. */
export class CmsUnavailableError extends Error {
  readonly cause?: unknown;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = "CmsUnavailableError";
    this.cause = options?.cause;
  }
}

/**
 * Request budget. The CMS host is measurably slow (collection responses that
 * carry article bodies have been observed taking well over a minute from a
 * poor network), so the timeouts are deliberately generous: waiting is always
 * better than mis-reporting a live article as missing.
 */
const SINGLE_REQUEST_TIMEOUT_MS = 30_000;
const COLLECTION_REQUEST_TIMEOUT_MS = 120_000;
const LIGHT_REQUEST_ATTEMPTS = 3;
const HEAVY_REQUEST_ATTEMPTS = 2;
const RETRY_BASE_DELAY_MS = 500;

/** Shared revalidation window for every CMS read. */
const REVALIDATE_SECONDS = 300;

const POSTS_PER_INDEX_PAGE = 100;

function getApiBaseUrl(): string {
  const configured = process.env.WORDPRESS_API_URL?.trim();
  if (!configured) {
    // A missing base URL is a deployment fault, not a missing article. Raising
    // it as a CMS failure keeps it out of the 404 path.
    throw new CmsUnavailableError("WORDPRESS_API_URL is not configured");
  }
  return configured.replace(/\/+$/, "");
}

type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

type WPMedia = {
  source_url?: string;
  alt_text?: string;
  media_details?: {
    sizes?: {
      medium?: { source_url?: string };
      large?: { source_url?: string };
      full?: { source_url?: string };
    };
  };
};

type WPTerm = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
};

type WPPost = {
  id: number;
  date: string;
  modified?: string;
  modified_gmt?: string;
  slug: string;
  status?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  featured_media?: number;
  yoast_head_json?: {
    title?: string;
    description?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: Array<WPTerm[]>;
  };
};

/** Remove HTML tags and normalise whitespace. */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Estimated reading time. Returns only the number because every card and the
 * article header already render the "min read" suffix.
 */
function calculateReadTime(contentHtml: string | undefined): string {
  if (!contentHtml) return "1";
  const words = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))}`;
}

/** Lowercase and trim a slug so duplicate casing cannot produce duplicate URLs. */
export function normaliseSlug(slug: string): string {
  return slug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * A 4xx other than 408/429 is a permanent answer from the CMS: retrying will
 * not change it, so it is surfaced immediately instead of burning the retry
 * budget.
 */
function isPermanentStatus(status: number): boolean {
  return status >= 400 && status < 500 && status !== 408 && status !== 429;
}

type WpResponse<T> = {
  data: T;
  status: number;
  headers: Headers;
};

/**
 * Perform a CMS request with a bounded retry budget.
 *
 * Retries transient faults (network errors, timeouts, 5xx, 408, 429 and
 * malformed JSON) with linear backoff, and never retries a permanent 4xx.
 * Exhausting the budget raises `CmsUnavailableError` - it never returns a
 * partial or empty result that a caller could mistake for success.
 */
async function requestWordPress<T>(
  path: string,
  params: Record<string, string | number | boolean>,
  options: { attempts?: number; timeoutMs?: number; allowStatuses?: number[] } = {},
): Promise<WpResponse<T>> {
  const attempts = options.attempts ?? LIGHT_REQUEST_ATTEMPTS;
  const timeoutMs = options.timeoutMs ?? SINGLE_REQUEST_TIMEOUT_MS;
  const allowStatuses = options.allowStatuses ?? [];

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    searchParams.set(key, String(value));
  }
  const url = `${getApiBaseUrl()}${path}?${searchParams.toString()}`;

  let lastError: unknown;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
        next: { revalidate: REVALIDATE_SECONDS },
      });

      if (!response.ok) {
        if (allowStatuses.includes(response.status)) {
          return { data: undefined as T, status: response.status, headers: response.headers };
        }
        if (isPermanentStatus(response.status)) {
          throw new CmsUnavailableError(
            `WordPress returned ${response.status} for ${path} (not retryable)`,
          );
        }
        lastError = new Error(`WordPress returned ${response.status} for ${path}`);
      } else {
        try {
          const data = (await response.json()) as T;
          return { data, status: response.status, headers: response.headers };
        } catch (parseError) {
          // Truncated or malformed payloads have been observed under load and
          // are transient, so they are retried rather than treated as empty.
          lastError = parseError;
        }
      }
    } catch (error) {
      if (error instanceof CmsUnavailableError) throw error;
      lastError = error;
    }

    if (attempt < attempts) {
      await delay(RETRY_BASE_DELAY_MS * attempt);
    }
  }

  throw new CmsUnavailableError(
    `WordPress request failed after ${attempts} attempt(s): ${path}`,
    { cause: lastError },
  );
}

/** Log a CMS failure without leaking a stack trace or the request URL. */
function logCmsFailure(context: string, error: unknown): void {
  const reason = error instanceof Error ? error.message : "unknown error";
  console.error(`[cms] ${context}: ${reason}`);
}

function readTotalPages(headers: Headers): number | null {
  const raw = headers.get("x-wp-totalpages");
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function readTotal(headers: Headers): number | null {
  const raw = headers.get("x-wp-total");
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

/**
 * Fields needed to render an article card.
 *
 * `content` is deliberately absent. Article bodies are two thirds of the
 * response weight, and downloading 12 of them just to derive a "N min read"
 * label made the first uncached archive request take about a minute. Only the
 * individual article route asks for a body.
 *
 * `_links` is required because `_embed` only populates `_embedded` when it is
 * present in `_fields`.
 */
export const CARD_FIELDS = "id,slug,date,modified,title,excerpt,_links,_embedded";

/** The article route additionally needs the body and the Yoast metadata. */
export const ARTICLE_FIELDS = `${CARD_FIELDS},content,yoast_head_json`;

/** Embeds required for the featured image and the category name. */
const SUMMARY_EMBED = "wp:featuredmedia,wp:term";

function mapSummary(post: WPPost): BlogPostSummary {
  const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];

  const category = terms.find((term) => term?.taxonomy === "category")?.name ?? "Architecture";

  const image =
    featuredMedia?.media_details?.sizes?.large?.source_url ??
    featuredMedia?.media_details?.sizes?.full?.source_url ??
    featuredMedia?.source_url ??
    "/images/blog-placeholder.jpg";

  return {
    slug: normaliseSlug(post.slug),
    title: stripHtml(post.title?.rendered ?? ""),
    excerpt: stripHtml(post.excerpt?.rendered ?? ""),
    category,
    image,
    date: post.date,
    modified: post.modified ?? post.date,
  };
}

function mapPost(post: WPPost): BlogPost {
  const summary = mapSummary(post);

  return {
    ...summary,
    author: "The Building Practice Ltd",
    content: post.content?.rendered ?? "",
    readTime: calculateReadTime(post.content?.rendered),
    seoTitle: post.yoast_head_json?.title || summary.title,
    seoDescription: post.yoast_head_json?.description || summary.excerpt,
    serviceTags: [],
  };
}

/** Drop repeated posts by stable id first, then by normalised slug. */
function dedupePosts<T extends { id: number; slug: string }>(posts: T[]): T[] {
  const seenIds = new Set<number>();
  const seenSlugs = new Set<string>();
  const unique: T[] = [];

  for (const post of posts) {
    const slug = normaliseSlug(post.slug);
    if (!slug) continue;
    if (seenIds.has(post.id) || seenSlugs.has(slug)) continue;
    seenIds.add(post.id);
    seenSlugs.add(slug);
    unique.push(post);
  }

  return unique;
}

/** Exported for the regression tests. */
export const __dedupePostsForTests = dedupePosts;

/**
 * Walk every page of the published-post collection.
 *
 * Ordering is by WordPress id so that the window each page returns cannot
 * shift between requests the way date ordering can. A failure on any page
 * aborts the walk with `CmsUnavailableError` rather than returning the pages
 * gathered so far, because a silently truncated collection is what previously
 * dropped articles out of the sitemap.
 */
async function fetchAllPublishedPosts<T extends WPPost>(
  fields: string,
  options: { embed?: string; attempts?: number; timeoutMs?: number } = {},
): Promise<T[]> {
  const collected: T[] = [];
  let page = 1;
  let knownTotalPages: number | null = null;

  for (;;) {
    const params: Record<string, string | number | boolean> = {
      per_page: POSTS_PER_INDEX_PAGE,
      page,
      status: "publish",
      orderby: "id",
      order: "asc",
      _fields: fields,
    };
    if (options.embed) params._embed = options.embed;

    const response = await requestWordPress<T[]>("/posts", params, {
      attempts: options.attempts ?? LIGHT_REQUEST_ATTEMPTS,
      timeoutMs: options.timeoutMs ?? COLLECTION_REQUEST_TIMEOUT_MS,
    });

    const batch = Array.isArray(response.data) ? response.data : [];
    knownTotalPages ??= readTotalPages(response.headers);

    collected.push(...batch);

    if (batch.length === 0) break;
    if (knownTotalPages !== null && page >= knownTotalPages) break;
    if (knownTotalPages === null && batch.length < POSTS_PER_INDEX_PAGE) break;

    page += 1;

    // Hard stop against a CMS that keeps returning full pages.
    if (page > 100) break;
  }

  return dedupePosts(collected);
}

/**
 * Every published article, reduced to the fields the sitemap needs.
 * Throws `CmsUnavailableError` rather than returning an incomplete list.
 */
export async function getPostIndex(): Promise<BlogPostIndexEntry[]> {
  const posts = await fetchAllPublishedPosts<WPPost>(
    "id,slug,modified,modified_gmt,date,featured_media",
  );

  return posts.map((post) => {
    const modifiedGmt = post.modified_gmt ? `${post.modified_gmt}Z` : null;
    return {
      id: post.id,
      slug: normaliseSlug(post.slug),
      modified: modifiedGmt ?? post.modified ?? post.date ?? null,
      featuredMediaId: post.featured_media && post.featured_media > 0 ? post.featured_media : null,
    };
  });
}

/**
 * Resolve WordPress attachment ids to their public URLs.
 *
 * Ids are looked up in batches against the media collection requesting only
 * `id` and `source_url`, which keeps the whole lookup to a few kilobytes -
 * embedding media in the post request would reintroduce the multi-megabyte
 * payload the archive was deliberately moved away from.
 *
 * Attachments that no longer exist simply do not come back, so the caller gets
 * a URL only when WordPress genuinely has one.
 */
export async function resolveMediaUrls(mediaIds: number[]): Promise<Map<number, string>> {
  const resolved = new Map<number, string>();
  const unique = [...new Set(mediaIds.filter((id) => Number.isInteger(id) && id > 0))];

  for (let index = 0; index < unique.length; index += POSTS_PER_INDEX_PAGE) {
    const batch = unique.slice(index, index + POSTS_PER_INDEX_PAGE);

    const response = await requestWordPress<{ id: number; source_url?: string }[]>("/media", {
      include: batch.join(","),
      per_page: batch.length,
      _fields: "id,source_url",
    });

    for (const item of Array.isArray(response.data) ? response.data : []) {
      if (typeof item.source_url === "string" && item.source_url.startsWith("https://")) {
        resolved.set(item.id, item.source_url);
      }
    }
  }

  return resolved;
}

/**
 * The article inventory used to build `article-sitemap.xml`: every published
 * article with its genuine modification date and, where one exists, a real
 * public featured-image URL.
 *
 * Throws `CmsUnavailableError` if the article collection cannot be read in
 * full, so a truncated read can never be published as a complete sitemap.
 * Image resolution is best-effort: if the media lookup fails the articles are
 * still returned, simply without image data.
 */
export async function getArticleSitemapIndex(): Promise<BlogPostIndexEntry[]> {
  const posts = await getPostIndex();

  const mediaIds = posts
    .map((post) => post.featuredMediaId)
    .filter((id): id is number => typeof id === "number" && id > 0);

  if (mediaIds.length === 0) return posts;

  let media: Map<number, string>;
  try {
    media = await resolveMediaUrls(mediaIds);
  } catch (error) {
    logCmsFailure("could not resolve featured images for the sitemap", error);
    return posts;
  }

  return posts.map((post) => ({
    ...post,
    imageUrl: post.featuredMediaId ? media.get(post.featuredMediaId) ?? null : null,
  }));
}

/** Every published slug. Throws on CMS failure. */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await fetchAllPublishedPosts<WPPost>("id,slug");
  return posts.map((post) => normaliseSlug(post.slug)).filter(Boolean);
}

/**
 * Published slugs for best-effort callers (in-body link rewriting). Returns
 * `null` when the CMS is unavailable so the caller can safely skip rewriting
 * instead of producing links to pages it could not verify.
 */
export const getKnownPostSlugs = cache(async (): Promise<Set<string> | null> => {
  try {
    return new Set(await getAllPostSlugs());
  } catch (error) {
    logCmsFailure("could not load published slugs for link rewriting", error);
    return null;
  }
});

export type ArchivePage = {
  posts: BlogPostSummary[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

/**
 * One page of the archive, newest first.
 *
 * Only the requested window is fetched, so rendering page 1 no longer pulls
 * every published article. Article bodies are requested solely to compute the
 * reading time and are dropped before the summaries leave this function.
 * Throws `CmsUnavailableError` so the archive can never render an empty grid
 * as though it were a successful, genuinely empty result.
 */
export async function getArchivePage(page: number, perPage: number): Promise<ArchivePage> {
  const safePage = Math.max(1, Math.floor(page));
  const safePerPage = Math.min(100, Math.max(1, Math.floor(perPage)));

  const response = await requestWordPress<WPPost[]>(
    "/posts",
    {
      per_page: safePerPage,
      page: safePage,
      status: "publish",
      orderby: "date",
      order: "desc",
      _embed: SUMMARY_EMBED,
      _fields: CARD_FIELDS,
    },
    {
      attempts: HEAVY_REQUEST_ATTEMPTS,
      timeoutMs: COLLECTION_REQUEST_TIMEOUT_MS,
      // A page number beyond the last page is a confirmed "no such page",
      // not a transport failure.
      allowStatuses: [400, 404],
    },
  );

  if (response.status === 400 || response.status === 404) {
    return {
      posts: [],
      page: safePage,
      perPage: safePerPage,
      total: 0,
      totalPages: 0,
    };
  }

  const batch = Array.isArray(response.data) ? response.data : [];
  const total = readTotal(response.headers) ?? batch.length;
  const totalPages = readTotalPages(response.headers) ?? (batch.length > 0 ? safePage : 0);

  return {
    posts: dedupePosts(batch).map(mapSummary),
    page: safePage,
    perPage: safePerPage,
    total,
    totalPages,
  };
}

/**
 * The newest published articles, for the homepage preview.
 *
 * The homepage must survive a CMS outage, so this degrades to an empty list
 * and logs rather than failing the whole page.
 */
export async function getLatestPosts(limit = 3): Promise<BlogPostSummary[]> {
  const safeLimit = Math.max(1, Math.min(limit, 100));

  try {
    const response = await requestWordPress<WPPost[]>(
      "/posts",
      {
        per_page: safeLimit,
        page: 1,
        status: "publish",
        orderby: "date",
        order: "desc",
        _embed: SUMMARY_EMBED,
        _fields: CARD_FIELDS,
      },
      { attempts: HEAVY_REQUEST_ATTEMPTS, timeoutMs: COLLECTION_REQUEST_TIMEOUT_MS },
    );

    const batch = Array.isArray(response.data) ? response.data : [];
    return dedupePosts(batch).map(mapSummary);
  } catch (error) {
    logCmsFailure("could not load latest posts", error);
    return [];
  }
}

/**
 * A single published article.
 *
 * Returns `null` only when the CMS positively confirmed that no published
 * post matches the slug. Any transport or server fault raises
 * `CmsUnavailableError`, so the article route can tell a genuinely missing
 * article apart from a CMS that is momentarily down.
 */
export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  const normalised = normaliseSlug(slug);
  if (!normalised) return null;

  const response = await requestWordPress<WPPost[]>(
    "/posts",
    {
      slug: normalised,
      status: "publish",
      per_page: 1,
      _embed: SUMMARY_EMBED,
      _fields: ARTICLE_FIELDS,
    },
    {
      attempts: LIGHT_REQUEST_ATTEMPTS,
      timeoutMs: SINGLE_REQUEST_TIMEOUT_MS,
      allowStatuses: [404],
    },
  );

  // A confirmed 404, or a successful response with no matching post, both mean
  // the article does not exist.
  if (response.status === 404) return null;

  const posts = Array.isArray(response.data) ? response.data : [];
  const post = posts[0];
  if (!post) return null;

  return mapPost(post);
});

/**
 * Related articles for the sidebar. Non-essential, so a CMS failure degrades
 * to an empty list rather than taking down an article that already rendered.
 */
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): Promise<BlogPostSummary[]> {
  const safeLimit = Math.max(1, Math.min(limit, 20));

  try {
    const categoryResponse = await requestWordPress<WPCategory[]>("/categories", {
      search: category,
      per_page: 10,
      _fields: "id,name,slug,count",
    });

    const categories = Array.isArray(categoryResponse.data) ? categoryResponse.data : [];
    const matched = categories.find(
      (item) => item.name.toLowerCase() === category.toLowerCase(),
    );
    if (!matched) return [];

    const response = await requestWordPress<WPPost[]>(
      "/posts",
      {
        per_page: safeLimit + 1,
        page: 1,
        status: "publish",
        categories: matched.id,
        orderby: "date",
        order: "desc",
        _embed: SUMMARY_EMBED,
        _fields: CARD_FIELDS,
      },
      { attempts: HEAVY_REQUEST_ATTEMPTS, timeoutMs: COLLECTION_REQUEST_TIMEOUT_MS },
    );

    const batch = Array.isArray(response.data) ? response.data : [];
    const current = normaliseSlug(currentSlug);

    return dedupePosts(batch)
      .map(mapSummary)
      .filter((post) => post.slug !== current)
      .slice(0, safeLimit);
  } catch (error) {
    logCmsFailure(`could not load related posts for "${normaliseSlug(currentSlug)}"`, error);
    return [];
  }
}

/** Category names that have at least one published post. Degrades to []. */
export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await requestWordPress<WPCategory[]>("/categories", {
      per_page: 100,
      _fields: "id,name,slug,count",
    });

    const categories = Array.isArray(response.data) ? response.data : [];
    return categories.filter((category) => category.count > 0).map((category) => category.name);
  } catch (error) {
    logCmsFailure("could not load categories", error);
    return [];
  }
}
