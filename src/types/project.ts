export type ProjectDetail = { icon: string; label: string; value: string };
export type ProjectMeta = { icon: string; text: string };

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: "residential" | "commercial" | "mixed-use" | "hospitality" | "institutional";
  categoryLabel: string;
  categoryIcon: string;
  location: string;
  shortDescription: string;
  description: string;
  description2: string;
  features: string[];
  details: ProjectDetail[];
  meta: ProjectMeta[];
  images: { main: string; gallery: string[] };
};
