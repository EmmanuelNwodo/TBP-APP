"use client";

import { useState } from "react";
import type { BlogPost } from "@/types/blog";
import styles from "./BlogPostList.module.css";

type StoredPost = BlogPost & { status: "published" | "draft" };

export function BlogPostList({
  posts,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  posts: StoredPost[];
  onEdit: (post: StoredPost) => void;
  onDelete: (slug: string) => void;
  onToggleStatus: (slug: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    : posts;

  return (
    <>
      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search posts by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span>
          {filtered.length} of {posts.length} posts
        </span>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((post) => (
              <tr key={post.slug}>
                <td className={styles.titleCell}>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.date}</td>
                <td>
                  <button
                    type="button"
                    className={`${styles.statusBtn} ${
                      post.status === "published" ? styles.statusPublished : styles.statusDraft
                    }`}
                    onClick={() => onToggleStatus(post.slug)}
                  >
                    <i className={`bx ${post.status === "published" ? "bx-check-circle" : "bx-time"}`} aria-hidden="true" />
                    {post.status}
                  </button>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button type="button" className={styles.iconBtn} onClick={() => onEdit(post)} title="Edit">
                      <i className="bx bx-edit" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                      onClick={() => {
                        if (window.confirm(`Delete "${post.title}"?`)) onDelete(post.slug);
                      }}
                      title="Delete"
                    >
                      <i className="bx bx-trash" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
