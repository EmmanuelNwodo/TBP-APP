export type ServiceHighlight = { icon: string; title: string; desc: string };
export type ServiceProcessStep = { title: string; desc: string };
export type ServiceStat = { number: string; label: string };
export type ServiceFaq = { q: string; a: string };
export type ServiceTag = { label: string; href: string; icon: string };

export type Service = {
  /** Canonical slug: the deterministic slugified form of `h1`. */
  slug: string;
  /** The pre-migration slug this service was published at. Drives redirects. */
  legacySlug: string;
  /** Service name as rendered, e.g. "Architectural Design". */
  serviceName: string;
  /** The single rendered H1, e.g. "Leading Architectural Design Firm in Nigeria". */
  h1: string;
  /** Schema.org Service name; agrees with `h1`. */
  schemaName: string;
  /** Documented service scope for structured data. */
  schemaServiceTypes: string[] | null;
  /** Short label used in the visible breadcrumb. */
  breadcrumbLabel: string;
  /** Alt text for the hero image. */
  heroImageAlt: string;
  icon: string;
  category: string;
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  /** Service-specific metadata keywords, retained from the pre-migration pages. */
  keywords: string[];
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
