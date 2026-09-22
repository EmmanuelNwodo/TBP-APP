"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import type { BlogPostSummary } from "@/types/blog";
import styles from "./BlogGrid.module.css";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function label(category: string) {
  return category
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

/** Build the href for a page number; page 1 keeps the canonical `/blog` URL. */
function pageHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

/**
 * Page numbers to render as links: always the first and last page, plus a
 * window around the current one. Keeps the control set small on a 24-page
 * archive while leaving every page reachable within two clicks.
 */
function pageWindow(current: number, total: number): number[] {
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  return [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
}

/**
 * Article cards for one archive page.
 *
 * Receives summaries only - never article bodies - and renders pagination as
 * real `<a href>` links so every page of the archive is crawlable. The
 * category tabs stay client-side visual filters over the current page; they
 * deliberately do not pretend to be indexable routes.
 */
export function BlogGrid({
  posts,
  categories,
  page,
  totalPages,
  total,
}: {
  posts: BlogPostSummary[];
  categories: string[];
  page: number;
  totalPages: number;
  total: number;
}) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => (category === "all" ? posts : posts.filter((p) => p.category === category)),
    [posts, category]
  );

  const visibleCategories = useMemo(
    () => categories.filter((cat) => posts.some((p) => p.category === cat)),
    [categories, posts]
  );

  const pages = pageWindow(page, totalPages);

  return (
    <>
      {/* These tabs filter the articles on this page only - they are not
          routes and they do not search the whole archive, so every count they
          show is scoped to the current page and labelled as such. */}
      <div className={`${styles.filterTabs} reveal`} role="group" aria-label="Filter articles on this page">
        <span className={styles.filterLabel} id="blog-filter-label">
          Filter this page:
        </span>
        <button
          type="button"
          aria-pressed={category === "all"}
          className={`tag tag--sm ${category === "all" ? "tag--primary" : "tag--outline"}`}
          onClick={() => setCategory("all")}
        >
          All on this page ({posts.length})
        </button>
        {visibleCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            className={`tag tag--sm ${category === cat ? "tag--primary" : "tag--outline"}`}
            onClick={() => setCategory(cat)}
          >
            {label(cat)} ({posts.filter((p) => p.category === cat).length})
          </button>
        ))}
      </div>

      <p className={styles.countLine} aria-live="polite">
        Showing <strong>{filtered.length}</strong> of <strong>{posts.length}</strong> articles on this
        page
        {totalPages > 1 && (
          <>
            {" "}
            &mdash; page <strong>{page}</strong> of <strong>{totalPages}</strong>, <strong>{total}</strong>{" "}
            articles in total
          </>
        )}
      </p>

      <div className={styles.grid}>
        {filtered.map((post) => (
          <article key={post.slug} className={styles.card}>
            <div className={styles.cardImage}>
              <LazyImage src={post.image} alt={post.title} fill sizes="(max-width: 968px) 100vw, 33vw" />
              <div className={styles.cardCategory}>
                <span className="tag tag--primary tag--sm">{label(post.category)}</span>
              </div>
            </div>
            <div className={styles.cardContent}>
              <p className={styles.cardMeta}>
                <i className="bx bx-calendar" aria-hidden="true" /> {formatDate(post.date)}
              </p>
              <h3 className={styles.cardTitle}>
                <Link href={`/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <Link href={`/${post.slug}`} className="btn btn--ghost btn--sm">
                Read More <i className="bx bx-right-arrow-alt" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <nav className={styles.pagination} aria-label="Blog pagination">
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className={styles.pageBtn} rel="prev" aria-label="Previous page">
              <i className="bx bx-chevron-left" aria-hidden="true" />
            </Link>
          ) : (
            <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`} aria-hidden="true">
              <i className="bx bx-chevron-left" aria-hidden="true" />
            </span>
          )}

          {pages.map((p) =>
            p === page ? (
              <span
                key={p}
                className={`${styles.pageBtn} ${styles.pageBtnActive}`}
                aria-current="page"
              >
                {p}
              </span>
            ) : (
              <Link key={p} href={pageHref(p)} className={styles.pageBtn} aria-label={`Page ${p}`}>
                {p}
              </Link>
            )
          )}

          {page < totalPages ? (
            <Link href={pageHref(page + 1)} className={styles.pageBtn} rel="next" aria-label="Next page">
              <i className="bx bx-chevron-right" aria-hidden="true" />
            </Link>
          ) : (
            <span className={`${styles.pageBtn} ${styles.pageBtnDisabled}`} aria-hidden="true">
              <i className="bx bx-chevron-right" aria-hidden="true" />
            </span>
          )}
        </nav>
      )}
    </>
  );
}
