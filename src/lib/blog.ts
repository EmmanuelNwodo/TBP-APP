// src/lib/blog.ts

import type { BlogPost } from "@/types/blog";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

if (!WORDPRESS_API_URL) {
  throw new Error("WORDPRESS_API_URL is not defined");
}

type WPCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

type WPMedia = {
  source_url: string;
  alt_text?: string;

  media_details?: {
    sizes?: {
      medium?: {
        source_url: string;
      };

      large?: {
        source_url: string;
      };

      full?: {
        source_url: string;
      };
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
  modified: string;
  slug: string;
  status: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  featured_media: number;
  categories: number[];

  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];

    "wp:term"?: Array<WPTerm[]>;
  };
};

/**
 * Remove HTML tags and normalize whitespace.
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Calculate estimated reading time.
 *
 * Returns only the number portion because the BlogPost
 * page already adds "min read".
 */
function calculateReadTime(content: string): string {
  const text = stripHtml(content);
  const words = text.split(/\s+/).filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes}`;
}

/**
 * Convert a WordPress post into the BlogPost
 * structure used by the Next.js application.
 */
function mapPost(post: WPPost): BlogPost {
  const featuredMedia =
    post._embedded?.["wp:featuredmedia"]?.[0];

  const terms =
    post._embedded?.["wp:term"]?.flat() ?? [];

  const category =
    terms.find(
      (term) => term.taxonomy === "category"
    )?.name ?? "Architecture";

  const image =
    featuredMedia?.media_details?.sizes?.large?.source_url ??
    featuredMedia?.media_details?.sizes?.full?.source_url ??
    featuredMedia?.source_url ??
    "/images/blog-placeholder.jpg";

  return {
    slug: post.slug,
    title: stripHtml(post.title.rendered),
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    date: post.date,
    image,
    category,
    readTime: calculateReadTime(post.content.rendered),

    author: "The Building Practice Ltd",
    seoTitle: stripHtml(post.title.rendered),
    seoDescription: stripHtml(post.excerpt.rendered),
    serviceTags: [],
  };
}

/**
 * Build a WordPress API URL.
 */
function buildPostsUrl(
  params: Record<string, string | number | boolean>
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });

  return `${WORDPRESS_API_URL}/posts?${searchParams.toString()}`;
}

/**
 * Fetch WordPress posts.
 *
 * IMPORTANT:
 * We intentionally do NOT use unstable_cache here.
 *
 * The previous implementation cached the complete WordPress
 * collection, including full post content and embedded media.
 * That produced a cache item of more than 15 MB and caused:
 *
 * "items over 2MB can not be cached"
 *
 * Instead, requests use Next.js's fetch cache with a small
 * revalidation period.
 */
async function fetchWordPressPosts(
  params: Record<string, string | number | boolean>
): Promise<WPPost[]> {
  const url = buildPostsUrl(params);

  const response = await fetch(url, {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    throw new Error(
      `WordPress API error while fetching posts: ${response.status}`
    );
  }

  return (await response.json()) as WPPost[];
}

/**
 * Get all published WordPress posts.
 *
 * Posts are fetched in smaller pages instead of creating one
 * enormous cache item.
 *
 * This function is mainly used by:
 *
 * - the blog listing
 * - sitemap generation
 * - static params
 *
 * Individual post pages should use getPostBySlug().
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const allPosts: WPPost[] = [];

  let page = 1;
  const postsPerPage = 20;

  while (true) {
    try {
      const posts = await fetchWordPressPosts({
        per_page: postsPerPage,
        page,
        status: "publish",
        _embed: true,
      });

      if (posts.length === 0) {
        break;
      }

      allPosts.push(...posts);

      if (posts.length < postsPerPage) {
        break;
      }

      page++;
    } catch (error) {
      console.error(
        `WordPress API error while fetching posts page ${page}:`,
        error
      );

      break;
    }
  }

  return allPosts.map(mapPost);
}

/**
 * Get the latest published posts.
 *
 * Only requests the number of posts actually needed.
 */
export async function getLatestPosts(
  limit = 3
): Promise<BlogPost[]> {
  try {
    const safeLimit = Math.max(
      1,
      Math.min(limit, 100)
    );

    const posts = await fetchWordPressPosts({
      per_page: safeLimit,
      page: 1,
      status: "publish",
      orderby: "date",
      order: "desc",
      _embed: true,
    });

    return posts.map(mapPost);
  } catch (error) {
    console.error(
      "WordPress API error while fetching latest posts:",
      error
    );

    return [];
  }
}

/**
 * Get a single published post by slug.
 *
 * This is much more efficient than downloading every post.
 */
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    if (!slug) {
      return null;
    }

    const posts = await fetchWordPressPosts({
      slug,
      status: "publish",
      per_page: 1,
      _embed: true,
    });

    const post = posts[0];

    if (!post) {
      console.error(
        `WordPress post not found: "${slug}"`
      );

      return null;
    }

    return mapPost(post);
  } catch (error) {
    console.error(
      `WordPress API error while fetching post "${slug}":`,
      error
    );

    return null;
  }
}

/**
 * Get related posts based on category.
 *
 * This requests a limited number of posts instead of loading
 * the complete WordPress database.
 */
export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPost[]> {
  try {
    const safeLimit = Math.max(
      1,
      Math.min(limit, 20)
    );

    /*
     * WordPress does not allow us to directly query posts by
     * category name, so first find the category ID.
     */
    const categoryResponse = await fetch(
      `${WORDPRESS_API_URL}/categories?search=${encodeURIComponent(
        category
      )}&per_page=10`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!categoryResponse.ok) {
      return [];
    }

    const categories =
      (await categoryResponse.json()) as WPCategory[];

    const matchedCategory = categories.find(
      (item) =>
        item.name.toLowerCase() ===
        category.toLowerCase()
    );

    if (!matchedCategory) {
      return [];
    }

    const posts = await fetchWordPressPosts({
      per_page: safeLimit + 1,
      page: 1,
      status: "publish",
      categories: matchedCategory.id,
      orderby: "date",
      order: "desc",
      _embed: true,
    });

    return posts
      .filter(
        (post) => post.slug !== currentSlug
      )
      .slice(0, safeLimit)
      .map(mapPost);
  } catch (error) {
    console.error(
      "Error fetching related WordPress posts:",
      error
    );

    return [];
  }
}

/**
 * Get all WordPress categories.
 */
export async function getAllCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/categories?per_page=100`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      console.error(
        `WordPress API error while fetching categories: ${response.status}`
      );

      return [];
    }

    const categories =
      (await response.json()) as WPCategory[];

    return categories
      .filter((category) => category.count > 0)
      .map((category) => category.name);
  } catch (error) {
    console.error(
      "Error fetching WordPress categories:",
      error
    );

    return [];
  }
}