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
                : service.title
            }
            fill
            priority
            sizes="100vw"
          />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          {(isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage) && (
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
                  : "Construction Management"}
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
              : service.title}
          </h1>
          <p>
            {isArchitecturalDesignPage
              ? "We provide architectural design for residential, commercial, hospitality, and institutional projects with context-led planning and technical documentation."
              : isConstructionManagementPage
              ? "We coordinate planning, scheduling, site activities, cost and quality monitoring, and project reporting for construction projects in Lagos and across Nigeria."
              : isInteriorDesignPage
              ? "We design residential and commercial interiors with clear planning, material direction, and implementation support for projects in Lagos and across Nigeria."
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
              {!isArchitecturalDesignPage && !isInteriorDesignPage && !isConstructionManagementPage && service.stats.length > 0 && (
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

              <div className={styles.ctaCard}>
                <h3>
                  {isArchitecturalDesignPage
                    ? "Start Your Architectural Project"
                    : isConstructionManagementPage
                    ? "Discuss Your Construction Project"
                    : isInteriorDesignPage
                    ? "Start Your Interior Design Project"
                    : "Ready to start?"}
                </h3>
                <p>
                  {isArchitecturalDesignPage
                    ? "Tell us about your design brief and site context, and our team will guide you on the next steps."
                    : isConstructionManagementPage
                    ? "Tell us about your project scope, timeline, and coordination needs, and our team will advise on practical next steps."
                    : isInteriorDesignPage
                    ? "Tell us about your interior goals, timeline, and space requirements, and our team will guide you on next steps."
                    : "Tell us about your project and we&apos;ll get back to you within 24 hours."}
                </p>
                <Link href="/contact" className="btn btn--primary btn--full">
                  <span>
                    {isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage
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
