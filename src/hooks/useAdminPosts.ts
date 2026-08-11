"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/types/blog";

const STORAGE_KEY = "blogPosts";

type StoredPost = BlogPost & { status: "published" | "draft" };

async function loadInitial(): Promise<StoredPost[]> {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fall through to reseed on parse failure
    }
  }
  // Seed data is fetched as a static asset rather than bundled into the
  // client JS — this admin page is the only thing that ever needs it, and
  // it's 300+ posts' worth of content (~3.5MB), so importing it directly
  // would balloon this route's bundle size for no benefit.
  const res = await fetch("/data/blog-seed.json");
  const seed = (await res.json()) as BlogPost[];
  const seeded = seed.map((p) => ({ ...p, status: "published" as const }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  return seeded;
}

/**
 * Client-only blog CMS store, matching the old admin-blog.html exactly:
 * seeded from the static blog data on first load, then every mutation
 * writes back only to localStorage — no server round-trip. Intentional,
 * see lib/admin-auth.ts.
 */
export function useAdminPosts() {
  const [posts, setPosts] = useState<StoredPost[] | null>(null);

  useEffect(() => {
    loadInitial().then(setPosts);
  }, []);

  function persist(next: StoredPost[]) {
    setPosts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function createPost(post: StoredPost) {
    if (!posts) return;
    persist([post, ...posts]);
  }

  function updatePost(slug: string, updates: Partial<StoredPost>) {
    if (!posts) return;
    persist(posts.map((p) => (p.slug === slug ? { ...p, ...updates } : p)));
  }

  function deletePost(slug: string) {
    if (!posts) return;
    persist(posts.filter((p) => p.slug !== slug));
  }

  function toggleStatus(slug: string) {
    if (!posts) return;
    persist(
      posts.map((p) => (p.slug === slug ? { ...p, status: p.status === "published" ? "draft" : "published" } : p))
    );
  }

  return { posts, createPost, updatePost, deletePost, toggleStatus };
}
