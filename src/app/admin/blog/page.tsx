"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BlogPostEditor } from "@/components/admin/BlogPostEditor";
import { BlogPostList } from "@/components/admin/BlogPostList";
import { useAdminPosts } from "@/hooks/useAdminPosts";
import { clearAuthSession, isAuthed } from "@/lib/admin-auth";
import type { BlogPost } from "@/types/blog";
import styles from "./page.module.css";

type StoredPost = BlogPost & { status: "published" | "draft" };

export default function AdminBlogPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [editing, setEditing] = useState<StoredPost | null | "new">(null);
  const { posts, createPost, updatePost, deletePost, toggleStatus } = useAdminPosts();

  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearAuthSession();
    router.replace("/admin/login");
  }

  function handleSave(post: StoredPost) {
    const exists = posts?.some((p) => p.slug === post.slug);
    if (exists) updatePost(post.slug, post);
    else createPost(post);
    setEditing(null);
  }

  if (!checked || !posts) {
    return (
      <div className={styles.loading}>
        <i className="bx bx-loader-alt bx-spin" aria-hidden="true" />
      </div>
    );
  }

  const publishedCount = posts.filter((p) => p.status === "published").length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <i className="bx bx-buildings" aria-hidden="true" />
          <span>The Building Practice — Blog Admin</span>
        </div>
        <button type="button" className="btn btn--ghost btn--sm" onClick={handleLogout}>
          <i className="bx bx-log-out" aria-hidden="true" /> Log Out
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{posts.length}</span>
            <span className={styles.statLabel}>Total Posts</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{publishedCount}</span>
            <span className={styles.statLabel}>Published</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{posts.length - publishedCount}</span>
            <span className={styles.statLabel}>Drafts</span>
          </div>
        </div>

        <div className={styles.toolbar}>
          <h1>Posts</h1>
          <button type="button" className="btn btn--primary" onClick={() => setEditing("new")}>
            <i className="bx bx-plus" aria-hidden="true" /> New Post
          </button>
        </div>

        <BlogPostList posts={posts} onEdit={setEditing} onDelete={deletePost} onToggleStatus={toggleStatus} />
      </main>

      {editing && (
        <BlogPostEditor
          post={editing === "new" ? null : editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <p className={styles.note}>
        Demo CMS — changes are saved to this browser&apos;s local storage only and are not visible to other visitors
        or devices.
      </p>
    </div>
  );
}
