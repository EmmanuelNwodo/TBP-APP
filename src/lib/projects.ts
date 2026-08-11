import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";

const PROJECTS = projectsData as Project[];

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.category === category);
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = { all: PROJECTS.length };
  for (const p of PROJECTS) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}
