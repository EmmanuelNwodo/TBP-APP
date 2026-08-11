"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import type { BlogPost } from "@/types/blog";
import styles from "./BlogGrid.module.css";

const PER_PAGE = 12;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function label(category: string) {
  return category
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export function BlogGrid({ posts, categories }: { posts: BlogPost[]; categories: string[] }) {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (category === "all" ? posts : posts.filter((p) => p.category === category)),
    [posts, category]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function selectCategory(key: string) {
    setCategory(key);
    setPage(1);
  }

  return (
    <>
      <div className={`${styles.filterTabs} reveal`}>
        <button
          type="button"
          className={`tag tag--sm ${category === "all" ? "tag--primary" : "tag--outline"}`}
          onClick={() => selectCategory("all")}
        >
          All ({posts.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`tag tag--sm ${category === cat ? "tag--primary" : "tag--outline"}`}
            onClick={() => selectCategory(cat)}
          >
            {label(cat)} ({posts.filter((p) => p.category === cat).length})
          </button>
        ))}
      </div>

      <p className={styles.countLine}>
        Showing <strong>{pageItems.length}</strong> of <strong>{filtered.length}</strong> articles
      </p>

      <div className={styles.grid}>
        {pageItems.map((post) => (
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
                <span>&bull;</span>
                <i className="bx bx-time" aria-hidden="true" /> {post.readTime} min read
              </p>
              <h3 className={styles.cardTitle}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="btn btn--ghost btn--sm">
                Read More <i className="bx bx-right-arrow-alt" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <i className="bx bx-chevron-left" aria-hidden="true" />
          </button>
          <span className={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className={styles.pageBtn}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <i className="bx bx-chevron-right" aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
