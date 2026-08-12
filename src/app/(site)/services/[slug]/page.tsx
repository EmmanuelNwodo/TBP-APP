import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllProjects } from "@/lib/projects";
import { getAllServices, getServiceBySlug } from "@/lib/services";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import styles from "./page.module.css";

const ARCHITECTURAL_DESIGN_SLUG = "architectural-design";
const ARCHITECTURAL_DESIGN_TITLE = "Architectural Design Services in Lagos, Nigeria";
const ARCHITECTURAL_DESIGN_DESCRIPTION =
  "Architectural design services in Lagos, Nigeria for residential, commercial, hospitality, and institutional projects. Discuss your project with The Building Practice.";
const INTERIOR_DESIGN_SLUG = "interior-design";
const INTERIOR_DESIGN_TITLE = "Interior Design Services in Lagos, Nigeria";
const INTERIOR_DESIGN_DESCRIPTION =
  "Interior design services in Lagos, Nigeria for residential, office, hospitality, and commercial interiors. Discuss your project with The Building Practice.";
const CONSTRUCTION_MANAGEMENT_SLUG = "construction-management";
const CONSTRUCTION_MANAGEMENT_TITLE = "Construction Management Services in Lagos, Nigeria";
const CONSTRUCTION_MANAGEMENT_DESCRIPTION =
  "Construction management services in Lagos, Nigeria for residential, commercial, institutional, and mixed-use projects. Coordinate delivery, quality, and progress with The Building Practice.";
const PROJECT_MANAGEMENT_SLUG = "project-management";
const PROJECT_MANAGEMENT_TITLE = "Project Management Services in Lagos, Nigeria | Building Practice Ltd";
const PROJECT_MANAGEMENT_DESCRIPTION =
  "Project management services in Lagos, Nigeria for construction and building projects. Building Practice Ltd provides planning, budgeting, coordination, reporting, and delivery support.";
const CONSTRUCTION_CONSULTATION_SLUG = "construction-consultation";
const CONSTRUCTION_CONSULTATION_TITLE = "Construction Consultation Services in Lagos, Nigeria";
const CONSTRUCTION_CONSULTATION_DESCRIPTION =
  "Construction consultation services in Lagos, Nigeria for planning, cost, contractor, material, and buildability decisions. Get practical advisory support from Building Practice Ltd.";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  if (slug === CONSTRUCTION_CONSULTATION_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: CONSTRUCTION_CONSULTATION_TITLE,
      description: CONSTRUCTION_CONSULTATION_DESCRIPTION,
      keywords: [
        "construction consultation firms in Lagos, Nigeria",
        "construction consultation services in Lagos",
        "construction consultants in Lagos",
        "construction advisory services in Lagos",
        "construction consultancy services in Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: CONSTRUCTION_CONSULTATION_TITLE,
        description: CONSTRUCTION_CONSULTATION_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: CONSTRUCTION_CONSULTATION_TITLE,
        description: CONSTRUCTION_CONSULTATION_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === CONSTRUCTION_MANAGEMENT_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: CONSTRUCTION_MANAGEMENT_TITLE,
      description: CONSTRUCTION_MANAGEMENT_DESCRIPTION,
      keywords: [
        "construction management firms in Lagos, Nigeria",
        "construction management services in Lagos",
        "construction project management Lagos",
        "building project management Lagos",
        "construction management company in Nigeria",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: CONSTRUCTION_MANAGEMENT_TITLE,
        description: CONSTRUCTION_MANAGEMENT_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: CONSTRUCTION_MANAGEMENT_TITLE,
        description: CONSTRUCTION_MANAGEMENT_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === PROJECT_MANAGEMENT_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: PROJECT_MANAGEMENT_TITLE,
      description: PROJECT_MANAGEMENT_DESCRIPTION,
      keywords: [
        "project management service firms in Lagos, Nigeria",
        "project management services in Lagos",
        "project management firms in Lagos",
        "construction project management Lagos",
        "building project management Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: PROJECT_MANAGEMENT_TITLE,
        description: PROJECT_MANAGEMENT_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: PROJECT_MANAGEMENT_TITLE,
        description: PROJECT_MANAGEMENT_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === INTERIOR_DESIGN_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: INTERIOR_DESIGN_TITLE,
      description: INTERIOR_DESIGN_DESCRIPTION,
      keywords: [
        "interior design firms in Lagos, Nigeria",
        "interior design services in Lagos",
        "interior designers in Lagos",
        "commercial interior design Lagos",
        "residential interior design Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: INTERIOR_DESIGN_TITLE,
        description: INTERIOR_DESIGN_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: INTERIOR_DESIGN_TITLE,
        description: INTERIOR_DESIGN_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === ARCHITECTURAL_DESIGN_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: ARCHITECTURAL_DESIGN_TITLE,
      description: ARCHITECTURAL_DESIGN_DESCRIPTION,
      keywords: [
        "architectural design firms in Lagos, Nigeria",
        "architectural design services in Lagos",
        "architectural services in Lagos",
        "architectural consultants in Lagos",
        "building design architects in Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: ARCHITECTURAL_DESIGN_TITLE,
        description: ARCHITECTURAL_DESIGN_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: ARCHITECTURAL_DESIGN_TITLE,
        description: ARCHITECTURAL_DESIGN_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  const title = service.seoTitle || `${service.title} | The Building Practice`;
  const description = service.seoDescription || service.subtitle;
  const url = absoluteUrl(`/services/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: service.heroImage ? [service.heroImage] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const isArchitecturalDesignPage = slug === ARCHITECTURAL_DESIGN_SLUG;
  const isInteriorDesignPage = slug === INTERIOR_DESIGN_SLUG;
  const isConstructionManagementPage = slug === CONSTRUCTION_MANAGEMENT_SLUG;
  const isProjectManagementPage = slug === PROJECT_MANAGEMENT_SLUG;
  const isConstructionConsultationPage = slug === CONSTRUCTION_CONSULTATION_SLUG;

  const architecturalDesignProjects = isArchitecturalDesignPage
    ? getAllProjects().filter((project) =>
        project.details.some((detail) => detail.value.toLowerCase().includes("architectural design")),
      )
    : [];

  const lagosArchitecturalProjects = architecturalDesignProjects.filter((project) =>
    project.location.toLowerCase().includes("lagos"),
  );

  const featuredArchitecturalProjects = [...lagosArchitecturalProjects, ...architecturalDesignProjects]
    .filter((project, index, arr) => arr.findIndex((candidate) => candidate.slug === project.slug) === index)
    .slice(0, 3);

  const architecturalFaq = [
    ...service.faq,
    {
      q: "How much does architectural design cost in Lagos?",
      a: "Architectural design cost depends on project type, scale, site constraints, and the scope of documentation required. Contact our team to discuss your project brief.",
    },
    {
      q: "Do you provide architectural design services outside Lagos?",
      a: "Yes. Our studio is based in Lagos and we support architectural design projects in other parts of Nigeria depending on project requirements.",
    },
  ];

  const interiorDesignProjects = isInteriorDesignPage
    ? getAllProjects().filter((project) => {
        const haystack = `${project.title} ${project.description} ${project.description2} ${project.features.join(" ")}`.toLowerCase();
        return ["interior", "office", "workspace", "remodel", "remodelling", "finishes"].some((keyword) =>
          haystack.includes(keyword),
        );
      })
    : [];

  const lagosInteriorProjects = interiorDesignProjects.filter((project) =>
    project.location.toLowerCase().includes("lagos"),
  );

  const featuredInteriorProjects = [...lagosInteriorProjects, ...interiorDesignProjects]
    .filter((project, index, arr) => arr.findIndex((candidate) => candidate.slug === project.slug) === index)
    .slice(0, 3);

  const interiorFaq = [
    ...service.faq,
    {
      q: "How much does interior design cost in Lagos?",
      a: "Interior design fees vary by project size, scope, finishes, furniture requirements, and coordination complexity. Share your project brief for a tailored proposal.",
    },
    {
      q: "How long does an interior design project take?",
      a: "Timeline depends on scope, design approvals, procurement requirements, and implementation planning. We provide a project timeline after the design brief and site review.",
    },
    {
      q: "Do you provide interior design services outside Lagos?",
      a: "Yes. Our core studio is in Lagos and we support interior design projects in other parts of Nigeria where project scope and logistics align.",
    },
  ];

  const constructionManagementProjects = isConstructionManagementPage
    ? getAllProjects().filter((project) => {
        const scope = project.details.find((detail) => detail.label === "Scope")?.value.toLowerCase() ?? "";
        return ["project management", "design & build", "construction"].some((keyword) => scope.includes(keyword));
      })
    : [];

  const lagosConstructionManagementProjects = constructionManagementProjects.filter((project) =>
    project.location.toLowerCase().includes("lagos"),
  );

  const featuredConstructionManagementProjects = [
    ...lagosConstructionManagementProjects,
    ...constructionManagementProjects,
  ]
    .filter((project, index, arr) => arr.findIndex((candidate) => candidate.slug === project.slug) === index)
    .slice(0, 3);

  const constructionManagementFaq = [
    ...service.faq,
    {
      q: "Do you provide construction management services in Lagos?",
      a: "Yes. Our core studio is in Lagos and we support project coordination and management services for projects in Lagos and other parts of Nigeria depending on project requirements.",
    },
    {
      q: "How can I engage your construction management team?",
      a: "Share your project brief, location, timeline expectations, and key challenges. Our team will review your requirements and advise on the next project planning and coordination steps.",
    },
  ];

  const constructionConsultationProjects = isConstructionConsultationPage
    ? getAllProjects().filter((project) => {
        const scope = project.details.find((detail) => detail.label === "Scope")?.value.toLowerCase() ?? "";
        return ["project management", "design & build", "construction"].some((keyword) => scope.includes(keyword));
      })
    : [];

  const lagosConstructionConsultationProjects = constructionConsultationProjects.filter((project) =>
    project.location.toLowerCase().includes("lagos"),
  );

  const featuredConstructionConsultationProjects = [
    ...lagosConstructionConsultationProjects,
    ...constructionConsultationProjects,
  ]
    .filter((project, index, arr) => arr.findIndex((candidate) => candidate.slug === project.slug) === index)
    .slice(0, 3);

  const constructionConsultationFaq = [
    ...service.faq,
    {
      q: "Do you provide construction consultation in Lagos?",
      a: "Yes. Our core studio is in Lagos and we support construction consultation for projects in Lagos and other parts of Nigeria where the brief and logistics align.",
    },
    {
      q: "Can you help me evaluate a contractor?",
      a: "Yes. We can review contractor experience, quotations, and project-fit considerations to help you make a more informed selection.",
    },
    {
      q: "Can you advise on construction costs and materials?",
      a: "Yes. We provide cost and material advisory support so you can better understand scope implications, budget choices, and durability trade-offs.",
    },
  ];

  const projectManagementProjects = isProjectManagementPage
    ? getAllProjects().filter((project) => {
        const scope = project.details.find((detail) => detail.label === "Scope")?.value.toLowerCase() ?? "";
        return ["project management", "design & build", "construction"].some((keyword) => scope.includes(keyword));
      })
    : [];

  const lagosProjectManagementProjects = projectManagementProjects.filter((project) =>
    project.location.toLowerCase().includes("lagos"),
  );

  const featuredProjectManagementProjects = [...lagosProjectManagementProjects, ...projectManagementProjects]
    .filter((project, index, arr) => arr.findIndex((candidate) => candidate.slug === project.slug) === index)
    .slice(0, 3);

  const projectManagementFaq = [
    ...service.faq,
    {
      q: "Do you provide project management services in Lagos?",
      a: "Yes. Our core studio is in Lagos and we support project management for construction and building projects in Lagos and other parts of Nigeria where the brief and logistics align.",
    },
    {
      q: "What is the difference between project management and construction management?",
      a: "Project management focuses on scope, planning, budgets, schedules, procurement, reporting, and decision control. Construction management is more closely tied to coordinating site execution, contractor performance, and delivery on the ground.",
    },
    {
      q: "Can you help with project reporting and stakeholder coordination?",
      a: "Yes. We support reporting, communication, and coordination so clients can track progress, issues, and decisions more clearly throughout the project.",
    },
  ];

  const servicePageJsonLd = isArchitecturalDesignPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: ARCHITECTURAL_DESIGN_TITLE,
            description: ARCHITECTURAL_DESIGN_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Architectural Design Services",
            description: ARCHITECTURAL_DESIGN_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Architectural Design",
              "Building Design",
              "Residential Architectural Design",
              "Commercial Architectural Design",
              "Architectural Planning",
              "Construction Documentation",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: absoluteUrl("/services"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Architectural Design",
                item: absoluteUrl(`/services/${slug}`),
              },
            ],
          },
        ],
      }
    : isConstructionManagementPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: CONSTRUCTION_MANAGEMENT_TITLE,
            description: CONSTRUCTION_MANAGEMENT_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Construction Management Services",
            description: CONSTRUCTION_MANAGEMENT_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Construction Management",
              "Construction Project Management",
              "Construction Supervision",
              "Contractor Coordination",
              "Construction Quality Control",
              "Construction Progress Reporting",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: absoluteUrl("/services"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Construction Management",
                item: absoluteUrl(`/services/${slug}`),
              },
            ],
          },
        ],
      }
    : isConstructionConsultationPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: CONSTRUCTION_CONSULTATION_TITLE,
            description: CONSTRUCTION_CONSULTATION_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Construction Consultation",
            description: CONSTRUCTION_CONSULTATION_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Construction Consultation",
              "Construction Advisory",
              "Building Consultation",
              "Project Consultation",
              "Construction Planning Advisory",
              "Construction Cost Advisory",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: absoluteUrl("/services"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Construction Consultation",
                item: absoluteUrl(`/services/${slug}`),
              },
            ],
          },
        ],
      }
    : isProjectManagementPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: PROJECT_MANAGEMENT_TITLE,
            description: PROJECT_MANAGEMENT_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Project Management Services",
            description: PROJECT_MANAGEMENT_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Project Management",
              "Construction Project Management",
              "Project Planning",
              "Cost Control",
              "Procurement Coordination",
              "Project Reporting",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: absoluteUrl("/services"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Project Management",
                item: absoluteUrl(`/services/${slug}`),
              },
            ],
          },
        ],
      }
    : isInteriorDesignPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: INTERIOR_DESIGN_TITLE,
            description: INTERIOR_DESIGN_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Interior Design Services",
            description: INTERIOR_DESIGN_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Interior Design",
              "Interior Architecture",
              "Space Planning",
              "Residential Interior Design",
              "Commercial Interior Design",
              "Interior Visualization",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: absoluteUrl("/services"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Interior Design",
                item: absoluteUrl(`/services/${slug}`),
              },
            ],
          },
        ],
      }
    : null;

  return (
    <main>
      {servicePageJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
        />
      )}

      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <LazyImage
            src={service.heroImage}
            alt={
              isArchitecturalDesignPage
                ? "Contemporary architectural design project by The Building Practice in Lagos"
                : isConstructionManagementPage
                ? "Construction management project delivery by The Building Practice in Lagos, Nigeria"
                : isInteriorDesignPage
                ? "Interior design project by The Building Practice in Lagos, Nigeria"
                : isConstructionConsultationPage
                ? "Construction planning consultation with The Building Practice in Lagos, Nigeria"
                : service.title
            }
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          {(isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage || isConstructionConsultationPage || isProjectManagementPage) && (
            <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <span aria-current="page">
                {isArchitecturalDesignPage
                  ? "Architectural Design"
                  : isInteriorDesignPage
                  ? "Interior Design"
                  : isConstructionManagementPage
                  ? "Construction Management"
                  : isProjectManagementPage
                  ? "Project Management"
                  : "Construction Consultation"}
              </span>
            </nav>
          )}

          <Link href="/services" className={styles.backLink}>
            <i className="bx bx-arrow-back" aria-hidden="true" /> All Services
          </Link>
          <span className={styles.category}>{service.category}</span>
          <h1>
            {isArchitecturalDesignPage
              ? "Architectural Design Services in Lagos, Nigeria"
              : isConstructionManagementPage
              ? "Construction Management Services in Lagos, Nigeria"
              : isInteriorDesignPage
              ? "Interior Design Services in Lagos, Nigeria"
              : isProjectManagementPage
              ? "Project Management Services in Lagos, Nigeria"
              : isConstructionConsultationPage
              ? "Construction Consultation Services in Lagos, Nigeria"
              : service.title}
          </h1>
          <p>
            {isArchitecturalDesignPage
              ? "We provide architectural design for residential, commercial, hospitality, and institutional projects with context-led planning and technical documentation."
              : isConstructionManagementPage
              ? "We coordinate planning, scheduling, site activities, cost and quality monitoring, and project reporting for construction projects in Lagos and across Nigeria."
              : isInteriorDesignPage
              ? "We design residential and commercial interiors with clear planning, material direction, and implementation support for projects in Lagos and across Nigeria."
              : isProjectManagementPage
              ? "We provide project planning, budgeting, coordination, and reporting support for construction and building projects in Lagos and across Nigeria."
              : isConstructionConsultationPage
              ? "We provide practical construction advisory support for planning, cost, contractor, material, and buildability decisions on projects in Lagos and across Nigeria."
              : service.subtitle}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.main}>
              {isArchitecturalDesignPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Architectural Design Services</h2>
                    <p className={styles.bodyText}>
                      The Building Practice delivers architectural design services for clients planning homes,
                      workplaces, hospitality developments, and institutional facilities. Our approach combines
                      concept design, architectural planning, technical drawings, and construction documentation to
                      move projects from vision to buildable outcomes.
                    </p>
                    <p className={styles.bodyText}>
                      If you are evaluating architectural design firms in Lagos, this service is structured to give
                      you clear design direction, coordinated documentation, and practical support through the design
                      phase.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/projects">View our architectural projects</Link>
                      <Link href="/about">Learn about our design approach</Link>
                      <Link href="/team">Meet our architectural team</Link>
                    </div>
                  </div>

                  {service.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      {service.highlights.map((h, i) => (
                        <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                          <div className={styles.highlightIcon}>
                            <i className={`bx ${h.icon}`} aria-hidden="true" />
                          </div>
                          <h3>{h.title}</h3>
                          <p>{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Is Included in Our Architectural Design Service</h2>
                      <ul className={styles.featureList}>
                        {service.features.map((f, i) => (
                          <li key={`${f}-${i}`}>
                            <i className="bx bx-check-circle" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Architectural Design Process</h2>
                      <div className={styles.processList}>
                        {service.process.map((step, i) => (
                          <div key={`${step.title}-${i}`} className={styles.processStep}>
                            <span className={styles.processNumber}>{i + 1}</span>
                            <div>
                              <h3>{step.title}</h3>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Types of Projects We Design</h2>
                    <p className={styles.bodyText}>
                      Our architectural design service supports residential architecture, commercial architecture,
                      hospitality facilities, mixed-use developments, institutional buildings, and renovation-oriented
                      design scopes where existing structures need reconfiguration.
                    </p>
                    <p className={styles.bodyText}>
                      Explore our <Link href="/projects">completed projects</Link> to see how these project types are
                      delivered in practice.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Architectural Design in Lagos</h2>
                    <p className={styles.bodyText}>
                      Designing in Lagos requires careful response to climate, urban context, and site-specific
                      constraints. Our design work considers ventilation, natural lighting, orientation, circulation,
                      and technical detailing so projects remain functional and durable over time.
                    </p>
                    <p className={styles.bodyText}>
                      While our core studio is in Lagos, we also support project delivery in other parts of Nigeria
                      where the design brief and project requirements align.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Why Choose The Building Practice</h2>
                    <ul className={styles.featureList}>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Integrated architectural planning, design development, and documentation workflow.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Experience across residential, commercial, hospitality, and institutional projects.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Design approach grounded in context, function, and long-term building performance.</span>
                      </li>
                    </ul>
                    <div className={styles.linkRow}>
                      <Link href="/about">Read about the studio</Link>
                      <Link href="/team">Explore the team</Link>
                      <Link href="/services">Explore related architectural services</Link>
                    </div>
                  </div>

                  {featuredArchitecturalProjects.length > 0 && (
                    <div className={styles.block}>
                      <h2>Featured Architectural Projects</h2>
                      <div className={styles.projectGrid}>
                        {featuredArchitecturalProjects.map((project) => (
                          <article key={project.slug} className={styles.projectCard}>
                            <div className={styles.projectMedia}>
                              <LazyImage
                                src={project.images.main}
                                alt={`${project.title} in ${project.location}`}
                                fill
                                sizes="(max-width: 968px) 100vw, 33vw"
                              />
                            </div>
                            <div className={styles.projectContent}>
                              <p>{project.categoryLabel} • {project.location}</p>
                              <h3>
                                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                              </h3>
                              <p>{project.shortDescription}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {architecturalFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Start Your Architectural Project</h2>
                    <p className={styles.bodyText}>
                      Ready to discuss your project? Share your brief with our team and we will guide you through the
                      next design steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a consultation</Link>
                      <Link href="/projects">View project portfolio</Link>
                      <Link href="/blog">Read architecture insights</Link>
                    </div>
                  </div>
                </>
              ) : isConstructionManagementPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Construction Management Services</h2>
                    <p className={styles.bodyText}>
                      The Building Practice provides construction management services for clients who need structured
                      project coordination from planning through execution and handover. Our role is to support
                      organized delivery, transparent reporting, and quality-focused oversight across project phases.
                    </p>
                    <p className={styles.bodyText}>
                      For clients evaluating construction management firms in Lagos, this service focuses on practical
                      coordination between project goals, site activities, contractor performance, and schedule and
                      budget control.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/projects">View projects in our portfolio</Link>
                      <Link href="/services/architectural-design">Explore architectural design services</Link>
                      <Link href="/services/interior-design">Explore interior design services</Link>
                    </div>
                  </div>

                  {service.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      {service.highlights.map((h, i) => (
                        <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                          <div className={styles.highlightIcon}>
                            <i className={`bx ${h.icon}`} aria-hidden="true" />
                          </div>
                          <h3>{h.title}</h3>
                          <p>{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Is Included in Our Construction Management Service</h2>
                      <ul className={styles.featureList}>
                        {service.features.map((f, i) => (
                          <li key={`${f}-${i}`}>
                            <i className="bx bx-check-circle" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Construction Management Process</h2>
                      <div className={styles.processList}>
                        {service.process.map((step, i) => (
                          <div key={`${step.title}-${i}`} className={styles.processStep}>
                            <span className={styles.processNumber}>{i + 1}</span>
                            <div>
                              <h3>{step.title}</h3>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Construction Management in Lagos</h2>
                    <p className={styles.bodyText}>
                      Construction projects in Lagos often involve active urban environments, tight access windows,
                      multiple stakeholders, and evolving site constraints. Our coordination approach is built around
                      clear communication, practical sequencing, and disciplined site reporting.
                    </p>
                    <p className={styles.bodyText}>
                      We focus on keeping teams aligned on scope, schedule, quality requirements, and issue
                      resolution so projects can progress with fewer disruptions.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Types of Construction Projects We Support</h2>
                    <p className={styles.bodyText}>
                      Our construction management service supports residential, commercial, hospitality,
                      institutional, and mixed-use projects, including renovation and design-and-build scopes where
                      planning and execution need close coordination.
                    </p>
                    <p className={styles.bodyText}>
                      Explore our <Link href="/projects">project portfolio</Link> to review published project
                      categories and locations.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Coordination Between Design and Construction</h2>
                    <p className={styles.bodyText}>
                      As an architecture-led practice, we coordinate design intent with site execution through
                      documentation review, technical clarifications, and regular communication with contractors and
                      consultants.
                    </p>
                    <p className={styles.bodyText}>
                      This helps reduce disconnects between planned outcomes and on-site delivery, especially where
                      architectural and interior decisions need to be aligned with construction activities.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/architectural-design">Architectural design service</Link>
                      <Link href="/services/interior-design">Interior design service</Link>
                      <Link href="/team">Meet our project delivery team</Link>
                    </div>
                  </div>

                  {featuredConstructionManagementProjects.length > 0 && (
                    <div className={styles.block}>
                      <h2>Featured Projects Relevant to Construction Coordination</h2>
                      <div className={styles.projectGrid}>
                        {featuredConstructionManagementProjects.map((project) => (
                          <article key={project.slug} className={styles.projectCard}>
                            <div className={styles.projectMedia}>
                              <LazyImage
                                src={project.images.main}
                                alt={`${project.title} in ${project.location}`}
                                fill
                                sizes="(max-width: 968px) 100vw, 33vw"
                              />
                            </div>
                            <div className={styles.projectContent}>
                              <p>{project.categoryLabel} • {project.location}</p>
                              <h3>
                                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                              </h3>
                              <p>{project.shortDescription}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Why Choose The Building Practice for Construction Management</h2>
                    <ul className={styles.featureList}>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Structured coordination across planning, site execution, and closeout phases.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Architecture-informed oversight to align design decisions with site realities.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Consistent progress, quality, and issue reporting to support informed decisions.</span>
                      </li>
                    </ul>
                    <div className={styles.linkRow}>
                      <Link href="/about">Read about the studio</Link>
                      <Link href="/team">Explore the team</Link>
                      <Link href="/blog">Read project management insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {constructionManagementFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Start Your Construction Project</h2>
                    <p className={styles.bodyText}>
                      Ready to discuss your construction project? Share your brief and we will help you map the next
                      planning and coordination steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a consultation</Link>
                      <Link href="/projects">View project portfolio</Link>
                      <Link href="/services/construction-consultation">Explore construction consultation</Link>
                    </div>
                  </div>
                </>
              ) : isConstructionConsultationPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Construction Consultation</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides construction consultation services for homeowners, developers,
                      investors, and organizations that need practical guidance before or during a building project.
                      We help clients make better decisions around planning, budget, contractor selection, materials,
                      and buildability.
                    </p>
                    <p className={styles.bodyText}>
                      If you are comparing construction consultation firms in Lagos, this service is designed to help
                      you reduce avoidable project risks and better understand your options before committing time and
                      money.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Book a construction consultation</Link>
                      <Link href="/services/construction-management">Explore construction management</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>

                  {service.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      {service.highlights.map((h, i) => (
                        <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                          <div className={styles.highlightIcon}>
                            <i className={`bx ${h.icon}`} aria-hidden="true" />
                          </div>
                          <h3>{h.title}</h3>
                          <p>{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Our Construction Consultation Covers</h2>
                      <ul className={styles.featureList}>
                        {service.features.map((f, i) => (
                          <li key={`${f}-${i}`}>
                            <i className="bx bx-check-circle" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Construction Consultation Process</h2>
                      <div className={styles.processList}>
                        {service.process.map((step, i) => (
                          <div key={`${step.title}-${i}`} className={styles.processStep}>
                            <span className={styles.processNumber}>{i + 1}</span>
                            <div>
                              <h3>{step.title}</h3>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Why You May Need Construction Consultation</h2>
                    <p className={styles.bodyText}>
                      Construction projects can run into avoidable problems when planning, budgeting, contractor
                      selection, material decisions, or execution logic are not reviewed early enough. Consultation can
                      help identify these risks sooner and support more informed decisions.
                    </p>
                    <p className={styles.bodyText}>
                      It is particularly useful when you want a second opinion before committing to major project
                      decisions or when you need support translating a design brief into a practical construction plan.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Consultation in Lagos</h2>
                    <p className={styles.bodyText}>
                      Construction consultation in Lagos often requires careful attention to project logistics,
                      procurement timing, site constraints, and the sequencing of decisions between design and
                      execution. Our advisory approach is built to help clients evaluate those issues clearly before
                      they become costly setbacks.
                    </p>
                    <p className={styles.bodyText}>
                      We also support projects elsewhere in Nigeria where the brief and location make the engagement a
                      practical fit.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Who Our Construction Consultation Service Is For</h2>
                    <p className={styles.bodyText}>
                      This service is suitable for homeowners planning to build, property developers evaluating
                      delivery strategies, investors assessing project risk, business owners developing commercial
                      spaces, and clients who simply want clearer guidance before committing to construction decisions.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Consultation vs Construction Management</h2>
                    <p className={styles.bodyText}>
                      Construction consultation focuses on guidance, evaluation, and decision support. Construction
                      management focuses more on coordinating and monitoring project execution. If you need help
                      deciding what to build, how to budget, which contractor to consider, or how to align a design
                      with construction reality, consultation is the better starting point.
                    </p>
                    <p className={styles.bodyText}>
                      When you need broader coordination during execution, our <Link href="/services/construction-management">construction management services</Link> are available as a related
                      offering.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/architectural-design">Architectural design services</Link>
                      <Link href="/services/interior-design">Interior design services</Link>
                      <Link href="/services/construction-management">Construction management services</Link>
                    </div>
                  </div>

                  {featuredConstructionConsultationProjects.length > 0 && (
                    <div className={styles.block}>
                      <h2>Relevant Project Examples</h2>
                      <p className={styles.bodyText}>
                        The projects below are from our published portfolio and show the kinds of building and project
                        contexts where consultation, planning, and coordination support are often relevant.
                      </p>
                      <div className={styles.projectGrid}>
                        {featuredConstructionConsultationProjects.map((project) => (
                          <article key={project.slug} className={styles.projectCard}>
                            <div className={styles.projectMedia}>
                              <LazyImage
                                src={project.images.main}
                                alt={`${project.title} in ${project.location}`}
                                fill
                                sizes="(max-width: 968px) 100vw, 33vw"
                              />
                            </div>
                            <div className={styles.projectContent}>
                              <p>{project.categoryLabel} • {project.location}</p>
                              <h3>
                                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                              </h3>
                              <p>{project.shortDescription}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Why Choose Building Practice Ltd for Construction Consultation?</h2>
                    <ul className={styles.featureList}>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Practical guidance grounded in real construction and design workflows.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Cost, contractor, and material advice that helps reduce avoidable decision risk.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Architecture-led support that can align early planning with buildable outcomes.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Independent, practical input that supports clearer project decisions.</span>
                      </li>
                    </ul>
                    <div className={styles.linkRow}>
                      <Link href="/about">Read about the studio</Link>
                      <Link href="/team">Explore the team</Link>
                      <Link href="/blog">Read construction insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {constructionConsultationFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Start Your Construction Project</h2>
                    <p className={styles.bodyText}>
                      Need practical guidance on your project? Share your brief and our team will review your
                      construction questions and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a construction consultation</Link>
                      <Link href="/services/construction-management">Explore construction management</Link>
                      <Link href="/projects">View project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isProjectManagementPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Project Management</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides project management services for construction and building
                      projects that need stronger planning, clearer control, and more disciplined coordination. We
                      support clients with scope definition, scheduling, budgeting, procurement planning, reporting,
                      and delivery oversight.
                    </p>
                    <p className={styles.bodyText}>
                      If you are comparing project management service firms in Lagos, this service is designed to help
                      homeowners, developers, and organizations keep complex building work organized from initiation to
                      handover.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your project</Link>
                      <Link href="/services/construction-management">Explore construction management</Link>
                      <Link href="/services/construction-consultation">Explore construction consultation</Link>
                    </div>
                  </div>

                  {service.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      {service.highlights.map((h, i) => (
                        <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                          <div className={styles.highlightIcon}>
                            <i className={`bx ${h.icon}`} aria-hidden="true" />
                          </div>
                          <h3>{h.title}</h3>
                          <p>{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Our Project Management Service Covers</h2>
                      <ul className={styles.featureList}>
                        {service.features.map((f, i) => (
                          <li key={`${f}-${i}`}>
                            <i className="bx bx-check-circle" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Project Management Process</h2>
                      <div className={styles.processList}>
                        {service.process.map((step, i) => (
                          <div key={`${step.title}-${i}`} className={styles.processStep}>
                            <span className={styles.processNumber}>{i + 1}</span>
                            <div>
                              <h3>{step.title}</h3>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Why Project Management Matters</h2>
                    <p className={styles.bodyText}>
                      Building projects can lose momentum when scope, budget, schedules, procurement, and stakeholder
                      expectations are not managed in a structured way. Project management helps bring those moving
                      parts into one clear plan so decisions are easier to track and review.
                    </p>
                    <p className={styles.bodyText}>
                      In Lagos, where project coordination can be affected by logistics, delivery timing, and changing
                      site conditions, disciplined project controls are especially useful for keeping work organized.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Project Management in Lagos</h2>
                    <p className={styles.bodyText}>
                      Project management in Lagos often requires close attention to reporting, vendor coordination,
                      milestone tracking, and practical sequencing between planning and execution. Our approach is
                      built to support those realities without overpromising outcomes.
                    </p>
                    <p className={styles.bodyText}>
                      We also support projects elsewhere in Nigeria when the brief, location, and logistics make the
                      engagement a practical fit.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Project Management for Different Project Types</h2>
                    <p className={styles.bodyText}>
                      Our project management services can support residential construction, homes, estates,
                      commercial developments, offices, retail spaces, industrial projects, institutional buildings,
                      schools, hospitals, and mixed-use developments where clear planning and control are required.
                    </p>
                    <p className={styles.bodyText}>
                      Review our <Link href="/projects">published projects</Link> to see the kinds of work contexts
                      that inform our service approach.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Project Management vs Construction Management</h2>
                    <p className={styles.bodyText}>
                      Project management is centered on scope, planning, budgets, schedules, procurement, reporting,
                      stakeholder coordination, and overall project controls. Construction management is more closely
                      tied to site execution, delivery coordination, and managing construction activities on the ground.
                    </p>
                    <p className={styles.bodyText}>
                      If you need the execution-focused side of delivery, our <Link href="/services/construction-management">construction management services</Link> are a related
                      option.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/architectural-design">Architectural design services</Link>
                      <Link href="/services/interior-design">Interior design services</Link>
                      <Link href="/services/construction-consultation">Construction consultation services</Link>
                    </div>
                  </div>

                  {featuredProjectManagementProjects.length > 0 && (
                    <div className={styles.block}>
                      <h2>Featured Projects Relevant to Project Management</h2>
                      <div className={styles.projectGrid}>
                        {featuredProjectManagementProjects.map((project) => (
                          <article key={project.slug} className={styles.projectCard}>
                            <div className={styles.projectMedia}>
                              <LazyImage
                                src={project.images.main}
                                alt={`${project.title} in ${project.location}`}
                                fill
                                sizes="(max-width: 968px) 100vw, 33vw"
                              />
                            </div>
                            <div className={styles.projectContent}>
                              <p>{project.categoryLabel} • {project.location}</p>
                              <h3>
                                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                              </h3>
                              <p>{project.shortDescription}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Why Choose Building Practice Ltd for Project Management?</h2>
                    <ul className={styles.featureList}>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Structured planning that keeps scope, budgets, and timelines easier to manage.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Coordination support across contractors, suppliers, and project stakeholders.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Progress, quality, and cost tracking that supports informed decisions.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Architecture-led project awareness that connects planning to buildable outcomes.</span>
                      </li>
                    </ul>
                    <div className={styles.linkRow}>
                      <Link href="/about">Learn more about Building Practice Ltd</Link>
                      <Link href="/team">Meet our team</Link>
                      <Link href="/blog">Read project management insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {projectManagementFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Start Your Project</h2>
                    <p className={styles.bodyText}>
                      Share your project brief if you need support with planning, scheduling, budgeting, coordination,
                      or reporting for a construction or building project in Lagos.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your project</Link>
                      <Link href="/projects">View project portfolio</Link>
                      <Link href="/services/construction-management">Explore construction management</Link>
                    </div>
                  </div>
                </>
              ) : isInteriorDesignPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Interior Design Services</h2>
                    <p className={styles.bodyText}>
                      The Building Practice provides interior design services for residential, hospitality,
                      workplace, and commercial environments. We focus on how space is used, how materials perform,
                      and how interior decisions support daily operations and long-term maintenance.
                    </p>
                    <p className={styles.bodyText}>
                      If you are comparing interior design firms in Lagos, this service is structured to give you a
                      clear design direction, coordinated interior documentation, and implementation-ready guidance.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/projects">View interior-related projects</Link>
                      <Link href="/services/architectural-design">Explore architectural design services</Link>
                      <Link href="/team">Meet our team</Link>
                    </div>
                  </div>

                  {service.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      {service.highlights.map((h, i) => (
                        <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                          <div className={styles.highlightIcon}>
                            <i className={`bx ${h.icon}`} aria-hidden="true" />
                          </div>
                          <h3>{h.title}</h3>
                          <p>{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Is Included in Our Interior Design Service</h2>
                      <ul className={styles.featureList}>
                        {service.features.map((f, i) => (
                          <li key={`${f}-${i}`}>
                            <i className="bx bx-check-circle" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Interior Design Process</h2>
                      <div className={styles.processList}>
                        {service.process.map((step, i) => (
                          <div key={`${step.title}-${i}`} className={styles.processStep}>
                            <span className={styles.processNumber}>{i + 1}</span>
                            <div>
                              <h3>{step.title}</h3>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Interior Design for Residential and Commercial Projects</h2>
                    <p className={styles.bodyText}>
                      Our interior design scope covers private homes, apartments, offices, hospitality spaces, and
                      mixed-use environments. We align spatial planning, material choices, and service coordination so
                      interior outcomes are both expressive and functional.
                    </p>
                    <p className={styles.bodyText}>
                      We approach interior design as more than decoration by prioritizing layout efficiency,
                      circulation, comfort, and buildable detailing.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Interior Design in Lagos</h2>
                    <p className={styles.bodyText}>
                      Interior projects in Lagos often require practical responses to climate, occupancy density,
                      delivery timelines, and maintenance needs. We tailor our design recommendations to these
                      realities so interiors remain durable and relevant after handover.
                    </p>
                    <p className={styles.bodyText}>
                      Our studio is based in Lagos and we also support interior projects in other parts of Nigeria
                      where the brief, schedule, and logistics are well-defined.
                    </p>
                  </div>

                  {featuredInteriorProjects.length > 0 && (
                    <div className={styles.block}>
                      <h2>Featured Interior-Related Projects</h2>
                      <div className={styles.projectGrid}>
                        {featuredInteriorProjects.map((project) => (
                          <article key={project.slug} className={styles.projectCard}>
                            <div className={styles.projectMedia}>
                              <LazyImage
                                src={project.images.main}
                                alt={`${project.title} in ${project.location}`}
                                fill
                                sizes="(max-width: 968px) 100vw, 33vw"
                              />
                            </div>
                            <div className={styles.projectContent}>
                              <p>{project.categoryLabel} • {project.location}</p>
                              <h3>
                                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                              </h3>
                              <p>{project.shortDescription}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {interiorFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Start Your Interior Design Project</h2>
                    <p className={styles.bodyText}>
                      Ready to shape your space? Share your interior design brief and we will guide you through the
                      next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a consultation</Link>
                      <Link href="/projects">View project portfolio</Link>
                      <Link href="/services/architectural-design">Pair with architectural design</Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.overview} dangerouslySetInnerHTML={{ __html: service.overview }} />

                  {service.highlights.length > 0 && (
                    <div className={styles.highlights}>
                      {service.highlights.map((h, i) => (
                        <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                          <div className={styles.highlightIcon}>
                            <i className={`bx ${h.icon}`} aria-hidden="true" />
                          </div>
                          <h4>{h.title}</h4>
                          <p>{h.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What We Deliver</h2>
                      <ul className={styles.featureList}>
                        {service.features.map((f, i) => (
                          <li key={`${f}-${i}`}>
                            <i className="bx bx-check-circle" aria-hidden="true" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Process</h2>
                      <div className={styles.processList}>
                        {service.process.map((step, i) => (
                          <div key={`${step.title}-${i}`} className={styles.processStep}>
                            <span className={styles.processNumber}>{i + 1}</span>
                            <div>
                              <h4>{step.title}</h4>
                              <p>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.faq.length > 0 && (
                    <div className={styles.block}>
                      <h2>Frequently Asked Questions</h2>
                      <div className={styles.faqList}>
                        {service.faq.map((item, i) => (
                          <details key={`${item.q}-${i}`} className={styles.faqItem}>
                            <summary>{item.q}</summary>
                            <div dangerouslySetInnerHTML={{ __html: item.a }} />
                          </details>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <aside className={styles.sidebar}>
              {!isArchitecturalDesignPage && !isInteriorDesignPage && !isConstructionManagementPage && !isConstructionConsultationPage && service.stats.length > 0 && (
                <div className={styles.statsCard}>
                  {service.stats.map((stat, i) => (
                    <div key={`${stat.label}-${i}`} className={styles.statItem}>
                      <div className={styles.statNumber}>{stat.number}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {isArchitecturalDesignPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Studio Base</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Project Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Design</div>
                    <div className={styles.statLabel}>From Concept to Documentation</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Support</div>
                    <div className={styles.statLabel}>Project Coordination</div>
                  </div>
                </div>
              )}

              {isInteriorDesignPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Studio Base</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Project Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Planning</div>
                    <div className={styles.statLabel}>Space and Material Direction</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Support</div>
                    <div className={styles.statLabel}>Design Coordination</div>
                  </div>
                </div>
              )}

              {isConstructionManagementPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Studio Base</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Project Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Coordination</div>
                    <div className={styles.statLabel}>Planning Through Handover</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Reporting</div>
                    <div className={styles.statLabel}>Progress, Quality, and Cost Tracking</div>
                  </div>
                </div>
              )}

              {isConstructionConsultationPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Studio Base</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Advisory Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Planning</div>
                    <div className={styles.statLabel}>Decision Support</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Support</div>
                    <div className={styles.statLabel}>Before and During Construction</div>
                  </div>
                </div>
              )}

              <div className={styles.ctaCard}>
                <h3>
                  {isArchitecturalDesignPage
                    ? "Start Your Architectural Project"
                    : isConstructionManagementPage
                    ? "Discuss Your Construction Project"
                    : isConstructionConsultationPage
                    ? "Request a Construction Consultation"
                    : isInteriorDesignPage
                    ? "Start Your Interior Design Project"
                    : "Ready to start?"}
                </h3>
                <p>
                  {isArchitecturalDesignPage
                    ? "Tell us about your design brief and site context, and our team will guide you on the next steps."
                    : isConstructionManagementPage
                    ? "Tell us about your project scope, timeline, and coordination needs, and our team will advise on practical next steps."
                    : isConstructionConsultationPage
                    ? "Tell us about your project goals, budget concerns, or design questions, and our team will review the best next steps."
                    : isInteriorDesignPage
                    ? "Tell us about your interior goals, timeline, and space requirements, and our team will guide you on next steps."
                    : "Tell us about your project and we&apos;ll get back to you within 24 hours."}
                </p>
                <Link href="/contact" className="btn btn--primary btn--full">
                  <span>
                    {isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage || isConstructionConsultationPage
                      ? "Request a Consultation"
                      : "Get a Quote"}
                  </span>
                  <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                </Link>
                {isArchitecturalDesignPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Architectural Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isInteriorDesignPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Interior-Related Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isConstructionManagementPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Construction-Related Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isConstructionConsultationPage && (
                  <Link href="/services/construction-management" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>Explore Construction Management</span>
                    <i className="bx bx-hard-hat" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {service.tags.length > 0 && (
                <div className={styles.tagsCard}>
                  {isArchitecturalDesignPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> Architectural Services
                      </Link>
                      <Link href="/services/interior-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/about" className="tag tag--outline tag--sm">
                        <i className="bx bx-info-circle" aria-hidden="true" /> About the Studio
                      </Link>
                      <Link href="/team" className="tag tag--outline tag--sm">
                        <i className="bx bx-group" aria-hidden="true" /> Meet the Team
                      </Link>
                      <Link href="/locations" className="tag tag--outline tag--sm">
                        <i className="bx bx-map" aria-hidden="true" /> Lagos and Nigeria Coverage
                      </Link>
                    </>
                  ) : isInteriorDesignPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> Interior Services
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/about" className="tag tag--outline tag--sm">
                        <i className="bx bx-info-circle" aria-hidden="true" /> About the Studio
                      </Link>
                      <Link href="/team" className="tag tag--outline tag--sm">
                        <i className="bx bx-group" aria-hidden="true" /> Meet the Team
                      </Link>
                    </>
                  ) : isConstructionManagementPage ? (
                    <>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/interior-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/construction-consultation" className="tag tag--outline tag--sm">
                        <i className="bx bx-comment-detail" aria-hidden="true" /> Construction Consultation
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/about" className="tag tag--outline tag--sm">
                        <i className="bx bx-info-circle" aria-hidden="true" /> About the Studio
                      </Link>
                      <Link href="/team" className="tag tag--outline tag--sm">
                        <i className="bx bx-group" aria-hidden="true" /> Meet the Team
                      </Link>
                    </>
                  ) : isConstructionConsultationPage ? (
                    <>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/interior-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/about" className="tag tag--outline tag--sm">
                        <i className="bx bx-info-circle" aria-hidden="true" /> About the Studio
                      </Link>
                      <Link href="/team" className="tag tag--outline tag--sm">
                        <i className="bx bx-group" aria-hidden="true" /> Meet the Team
                      </Link>
                    </>
                  ) : (
                    service.tags.slice(0, 8).map((tag, i) => (
                      <span key={`${tag.label}-${i}`} className="tag tag--outline tag--sm">
                        <i className={`bx ${tag.icon}`} aria-hidden="true" /> {tag.label}
                      </span>
                    ))
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
