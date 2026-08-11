import posts from "@/data/blog.json";
import type { BlogPost } from "@/types/blog";

const ALL_POSTS = posts as BlogPost[];

export function getAllPosts(): BlogPost[] {
  return [...ALL_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getLatestPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "all") return getAllPosts();
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(ALL_POSTS.map((post) => post.category))).sort();
}

export function getRelatedPosts(post: BlogPost, count: number): BlogPost[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, count);
}
