/**
 * Fields required to render an article card. The blog archive passes only
 * this shape into its client component - never a full article body.
 *
 * There is deliberately no `readTime`: it can only be derived from the article
 * body, and downloading bodies for a grid of cards is what made the first
 * uncached archive request take about a minute. WordPress exposes no
 * precomputed reading time, and estimating one from the excerpt would print a
 * number that is simply wrong, so cards omit the label entirely.
 */
export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  modified: string;
};

/** A full article, as rendered by the article route. */
export type BlogPost = BlogPostSummary & {
  author: string;
  content: string;
  /** Measured from the real article body, which this route does fetch. */
  readTime: string;
  seoTitle: string;
  seoDescription: string;
  serviceTags: string[];
};

/**
 * The minimal record used to build the XML sitemap: a stable WordPress post
 * id, the canonical slug and the genuine modification timestamp.
 */
export type BlogPostIndexEntry = {
  id: number;
  slug: string;
  /** ISO timestamp of the last genuine modification, or null when unknown. */
  modified: string | null;
  /** WordPress attachment id of the featured image, or null when unset. */
  featuredMediaId?: number | null;
  /**
   * Real public URL of the featured image, resolved from the media endpoint.
   * Null whenever WordPress has no usable attachment, so the sitemap only ever
   * advertises images that genuinely exist.
   */
  imageUrl?: string | null;
};
