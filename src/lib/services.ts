import servicesData from "@/data/services.json";
import type { Service } from "@/types/service";

const SERVICES = servicesData as Service[];

/**
 * Deterministic slug from a complete rendered H1.
 *
 * Every service URL is the slugified form of that page's H1, so this is the
 * one function that defines the relationship. `&` becomes `and`, punctuation
 * is dropped, and repeated hyphens collapse.
 */
export function slugifyH1(h1: string): string {
  return h1
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/**
 * Resolve a retired pre-migration slug. Used to generate redirects from the
 * service source of truth, so no separate list of migrated URLs exists.
 */
export function getServiceByLegacySlug(legacySlug: string): Service | undefined {
  return SERVICES.find((s) => s.legacySlug === legacySlug);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === "all") return SERVICES;
  return SERVICES.filter((s) => s.filterCategory === category);
}
