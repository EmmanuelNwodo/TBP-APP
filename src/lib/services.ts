import servicesData from "@/data/services.json";
import type { Service } from "@/types/service";

const SERVICES = servicesData as Service[];

export function getAllServices(): Service[] {
  return SERVICES;
}

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  if (category === "all") return SERVICES;
  return SERVICES.filter((s) => s.filterCategory === category);
}
