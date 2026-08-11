"use client";

import { useMemo, useState } from "react";
import reviewsData from "@/data/reviews.json";
import type { Review } from "@/types/review";
import styles from "./ReviewsGrid.module.css";

const REVIEWS = reviewsData as Review[];
const PER_PAGE = 20;

const CATEGORIES: { key: Review["category"] | "all"; label: string; icon: string }[] = [
  { key: "all", label: "All", icon: "bx-grid-alt" },
  { key: "client", label: "Clients", icon: "bx-user" },
  { key: "partner", label: "Partners", icon: "bx-briefcase" },
  { key: "intern", label: "Interns", icon: "bx-book-reader" },
  { key: "vendor", label: "Vendors", icon: "bx-store" },
  { key: "contractor", label: "Contractors", icon: "bx-hard-hat" },
];

function initials(name: string) {
  return name
    .replace(/^(Arch\.|Eng\.|Surveyor|Qty Surv\.)\s+/i, "")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function ReviewsGrid() {
  const [category, setCategory] = useState<Review["category"] | "all">("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => (category === "all" ? REVIEWS : REVIEWS.filter((r) => r.category === category)),
    [category]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function selectCategory(key: Review["category"] | "all") {
    setCategory(key);
    setPage(1);
  }

  return (
    <>
      <div className={styles.filtersBar}>
        <div className={styles.filterTabs}>
          {CATEGORIES.map((cat) => {
            const count = cat.key === "all" ? REVIEWS.length : REVIEWS.filter((r) => r.category === cat.key).length;
            return (
              <button
                key={cat.key}
                type="button"
                className={`${styles.filterTab} ${category === cat.key ? styles.active : ""}`}
                data-filter={cat.key}
                onClick={() => selectCategory(cat.key)}
              >
                <i className={`bx ${cat.icon}`} aria-hidden="true" />
                <span>{cat.label}</span>
                <span className={styles.count}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className={styles.resultsInfo}>
          Showing <strong>{pageItems.length}</strong> of <strong>{filtered.length}</strong>
        </div>
      </div>

      <div className={styles.grid}>
        {pageItems.map((review) => (
          <article key={review.id} className={`${styles.card} ${review.featured ? styles.featured : ""}`}>
            <div className={styles.header}>
              <div className={styles.avatar} data-category={review.category}>
                <div className={styles.avatarPlaceholder}>{initials(review.name)}</div>
              </div>
              <div className={styles.info}>
                <div className={styles.name}>{review.name}</div>
                <div className={styles.meta}>
                  <span className={styles.role}>{review.role}</span>
                  <span className={styles.badge} data-category={review.category}>
                    {review.category}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.rating}>
              {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className={`bx bxs-star ${i >= review.rating ? styles.empty : ""}`} aria-hidden="true" />
              ))}
            </div>

            <p className={styles.content}>{review.content}</p>

            <div className={styles.footer}>
              <span className={styles.date}>
                <i className="bx bx-calendar" aria-hidden="true" /> {formatDate(review.date)}
              </span>
              <span className={styles.project} title={review.project}>
                <i className="bx bx-briefcase" aria-hidden="true" /> {review.project}
              </span>
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
