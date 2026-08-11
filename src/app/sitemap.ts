import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import { getAllTeamMembers } from "@/lib/team";
import { SITE_URL } from "@/lib/seo";

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/reviews", priority: 0.6, changeFrequency: "weekly" },
  { path: "/team", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/locations", priority: 0.6, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const teamEntries: MetadataRoute.Sitemap = getAllTeamMembers().map((member) => ({
    url: `${SITE_URL}/team/${member.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const serviceEntries: MetadataRoute.Sitemap = getAllServices().map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...teamEntries, ...serviceEntries, ...projectEntries, ...blogEntries];
}
