"use client";

import { useState, type FormEvent } from "react";
import type { BlogPost } from "@/types/blog";
import styles from "./BlogPostEditor.module.css";

type EditablePost = BlogPost & { status: "published" | "draft" };

const BLANK: EditablePost = {
  slug: "",
  title: "",
  excerpt: "",
  category: "architecture",
  image: "/images/projects/24 AWOLOWO ROAD/24 AWOLOWO RD 1A copy.jpg",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5",
  author: "The Building Practice Ltd",
  content: "",
  seoTitle: "",
  seoDescription: "",
  serviceTags: [],
  status: "draft",
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function BlogPostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: EditablePost | null;
  onSave: (post: EditablePost) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<EditablePost>(post ?? BLANK);
  const isNew = !post;

  function set<K extends keyof EditablePost>(key: K, value: EditablePost[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const final = isNew ? { ...draft, slug: draft.slug || slugify(draft.title) } : draft;
    onSave(final);
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>{isNew ? "New Post" : "Edit Post"}</h3>
          <button type="button" className={styles.close} onClick={onCancel} aria-label="Close">
            <i className="bx bx-x" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label>Title</label>
            <input value={draft.title} onChange={(e) => set("title", e.target.value)} required />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label>Category</label>
              <input value={draft.category} onChange={(e) => set("category", e.target.value)} required />
            </div>
            <div className={styles.group}>
              <label>Read Time (min)</label>
              <input value={draft.readTime} onChange={(e) => set("readTime", e.target.value)} required />
            </div>
          </div>

          <div className={styles.group}>
            <label>Excerpt</label>
            <textarea rows={2} value={draft.excerpt} onChange={(e) => set("excerpt", e.target.value)} required />
          </div>

          <div className={styles.group}>
            <label>Content (HTML)</label>
            <textarea rows={8} value={draft.content} onChange={(e) => set("content", e.target.value)} required />
          </div>

          <div className={styles.row}>
            <div className={styles.group}>
              <label>Status</label>
              <select value={draft.status} onChange={(e) => set("status", e.target.value as "published" | "draft")}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className={styles.group}>
              <label>Date</label>
              <input type="date" value={draft.date} onChange={(e) => set("date", e.target.value)} />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn--secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary">
              <i className="bx bx-save" aria-hidden="true" /> Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
