export type ServiceHighlight = { icon: string; title: string; desc: string };
export type ServiceProcessStep = { title: string; desc: string };
export type ServiceStat = { number: string; label: string };
export type ServiceFaq = { q: string; a: string };
export type ServiceTag = { label: string; href: string; icon: string };

export type Service = {
  slug: string;
  icon: string;
  category: string;
  title: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  highlights: ServiceHighlight[];
  features: string[];
  process: ServiceProcessStep[];
  stats: ServiceStat[];
  faq: ServiceFaq[];
  tags: ServiceTag[];
  filterCategory: "design" | "management" | "construction" | "consulting" | "engineering";
};
