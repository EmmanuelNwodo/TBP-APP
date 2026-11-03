import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllProjects } from "@/lib/projects";
import { getAllServices, getServiceBySlug } from "@/lib/services";
import { absoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
import styles from "./page.module.css";

const ARCHITECTURAL_DESIGN_SLUG = "leading-architectural-design-firm-in-nigeria";
const INTERIOR_DESIGN_SLUG = "leading-interior-design-firm-in-nigeria";
const CONSTRUCTION_MANAGEMENT_SLUG = "leading-construction-management-firm-in-nigeria";
const BUILDING_CONSTRUCTION_SLUG = "leading-building-construction-firm-in-nigeria";
const PROJECT_MANAGEMENT_SLUG = "leading-project-management-firm-in-nigeria";
const CONSTRUCTION_CONSULTATION_SLUG = "leading-construction-consultation-firm-in-nigeria";
const URBAN_DEVELOPMENT_SLUG = "leading-urban-development-firm-in-nigeria";
const GREEN_BUILDING_ADVISORY_SLUG = "leading-green-building-advisory-firm-in-nigeria";
const REAL_ESTATE_DEVELOPMENT_SLUG = "leading-real-estate-development-firm-in-nigeria";
const BUILDING_PERMITS_SLUG = "leading-building-permits-and-regulatory-compliance-firm-in-nigeria";
const CONSTRUCTION_SUPERVISION_SLUG = "leading-construction-supervision-firm-in-nigeria";
const FEASIBILITY_STUDIES_SLUG = "leading-feasibility-studies-firm-in-nigeria";
const LAND_SURVEYING_SLUG = "leading-land-surveying-firm-in-nigeria";
const ENVIRONMENTAL_IMPACT_SLUG = "leading-environmental-impact-assessment-firm-in-nigeria";
const BUILDING_CERTIFICATION_SLUG = "leading-building-certification-firm-in-nigeria";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

/** Appended to every page title by the root layout metadata template. */
const BRAND_SUFFIX_LENGTH = " | The Building Practice Ltd.".length;

/** Beyond this, the brand is dropped so the service name survives truncation. */
const MAX_RENDERED_TITLE_LENGTH = 90;

/**
 * Service metadata comes entirely from the matching record in
 * `src/data/services.json`. That file is the single authoritative definition
 * per service: title, description, keywords and image alt text all live there,
 * so the rendered H1, the canonical URL and the metadata can never disagree.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const url = absoluteUrl(`/services/${slug}`);
  const description = service.seoDescription;
  const image = service.heroImage || DEFAULT_OG_IMAGE;

  // The root layout appends " | The Building Practice Ltd." to every title.
  // Where an unusually long service name pushes the rendered title well past
  // the point search engines truncate, the brand is dropped rather than the
  // service name or "Firm in Nigeria", both of which carry the intent.
  const renderedLength = service.seoTitle.length + BRAND_SUFFIX_LENGTH;
  const title =
    renderedLength > MAX_RENDERED_TITLE_LENGTH ? { absolute: service.seoTitle } : service.seoTitle;

  // Social titles always carry the full H1 text, which is never truncated the
  // way a search result is.
  const socialTitle = service.seoTitle;

  return {
    title,
    description,
    keywords: service.keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_NG",
      type: "website",
      images: [{ url: image, alt: service.heroImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
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
  const isBuildingConstructionPage = slug === BUILDING_CONSTRUCTION_SLUG;
  const isProjectManagementPage = slug === PROJECT_MANAGEMENT_SLUG;
  const isConstructionConsultationPage = slug === CONSTRUCTION_CONSULTATION_SLUG;
  const isUrbanDevelopmentPage = slug === URBAN_DEVELOPMENT_SLUG;
  const isGreenBuildingAdvisoryPage = slug === GREEN_BUILDING_ADVISORY_SLUG;
  const isRealEstateDevelopmentPage = slug === REAL_ESTATE_DEVELOPMENT_SLUG;
  const isBuildingPermitsPage = slug === BUILDING_PERMITS_SLUG;
  const isConstructionSupervisionPage = slug === CONSTRUCTION_SUPERVISION_SLUG;
  const isFeasibilityStudiesPage = slug === FEASIBILITY_STUDIES_SLUG;
  const isLandSurveyingPage = slug === LAND_SURVEYING_SLUG;
  const isEnvironmentalImpactPage = slug === ENVIRONMENTAL_IMPACT_SLUG;
  const isBuildingCertificationPage = slug === BUILDING_CERTIFICATION_SLUG;

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

  const buildingConstructionProjects = isBuildingConstructionPage
    ? getAllProjects().filter((project) => {
        const scope = project.details.find((detail) => detail.label === "Scope")?.value.toLowerCase() ?? "";
        return ["design & build", "construction"].some((keyword) => scope.includes(keyword));
      })
    : [];

  const lagosBuildingConstructionProjects = buildingConstructionProjects.filter((project) =>
    project.location.toLowerCase().includes("lagos"),
  );

  const featuredBuildingConstructionProjects = [...lagosBuildingConstructionProjects, ...buildingConstructionProjects]
    .filter((project, index, arr) => arr.findIndex((candidate) => candidate.slug === project.slug) === index)
    .slice(0, 3);

  const buildingConstructionFaq = [
    ...service.faq,
    {
      q: "Do you provide building construction services in Lagos?",
      a: "Yes. Our core studio is in Lagos and we support building construction services in Lagos and other parts of Nigeria where the project brief and logistics align.",
    },
    {
      q: "Can you execute construction from existing architectural drawings?",
      a: "Yes. We can work from approved architectural and coordinated technical drawings, while aligning execution activities with project requirements.",
    },
    {
      q: "How can I discuss my building project with your team?",
      a: "Share your project brief through our contact page and our team will review your scope, timeline, and the next practical steps for construction delivery.",
    },
  ];

  const urbanDevelopmentFaq = [
    ...service.faq,
    {
      q: "Do you provide urban development services in Lagos?",
      a: "Yes. Building Practice Ltd supports urban development, master planning, urban design, and infrastructure planning briefs in Lagos and elsewhere in Nigeria where the project scope and logistics align.",
    },
    {
      q: "Can you help plan residential estates and mixed-use developments?",
      a: "Yes. Our urban development service covers estate layouts, land-use planning, mixed-use development concepts, circulation, public spaces, and infrastructure integration.",
    },
    {
      q: "What is the difference between urban development and architectural design?",
      a: "Urban development focuses on land use, spatial structure, movement, infrastructure, and the relationships between buildings and public systems. Architectural design focuses on the design and documentation of individual buildings.",
    },
    {
      q: "Can you assist with planning approval processes?",
      a: "We support clients with relevant planning and approval processes and help coordinate the documentation and technical inputs required for a development brief. Final approvals remain with the appropriate authorities.",
    },
  ];

  const greenBuildingAdvisoryFaq = [
    ...service.faq,
    {
      q: "What is green building advisory?",
      a: "Green building advisory is professional guidance on sustainable design, energy and water efficiency, materials, resource use, indoor environmental quality, and the documentation needed to support project sustainability objectives.",
    },
    {
      q: "Do you provide green building advisory services in Lagos?",
      a: "Yes. Building Practice Ltd supports green building and sustainable design briefs in Lagos and elsewhere in Nigeria where the project scope and logistics align.",
    },
    {
      q: "How can a building respond to Nigerian climate conditions?",
      a: "A project can consider orientation, solar exposure, shading, natural daylight, natural ventilation, passive cooling, efficient systems, and water management as part of an integrated sustainability strategy.",
    },
    {
      q: "Do you provide LEED and EDGE certification support?",
      a: "We provide advisory, documentation, and coordination support for green building certification requirements such as LEED and EDGE. Certification decisions and awards remain with the relevant certification bodies.",
    },
    {
      q: "What factors affect the cost of green building advisory?",
      a: "Scope depends on project size and complexity, sustainability targets, certification requirements, systems and technology, site conditions, location, logistics, and the level of documentation or implementation support required.",
    },
  ];

  const realEstateDevelopmentFaq = [
    ...service.faq,
    {
      q: "What is real estate development?",
      a: "Real estate development is the coordinated process of evaluating a property opportunity, defining a development brief, planning and designing the scheme, coordinating approvals, and delivering the resulting project where the required services are engaged.",
    },
    {
      q: "Does Building Practice Ltd provide real estate development services in Lagos?",
      a: "Yes. Building Practice Ltd supports development feasibility, property planning, architectural design, construction, project management, and coordination for suitable projects in Lagos and elsewhere in Nigeria.",
    },
    {
      q: "What types of property developments can you help plan?",
      a: "We can support planning and related delivery services for residential developments, commercial property, mixed-use environments, and institutional or other building projects where the brief matches our capabilities.",
    },
    {
      q: "What factors affect property development costs in Lagos?",
      a: "Costs depend on location, site conditions, development type, project size, design complexity, materials, labour, infrastructure, utilities, approvals, duration, and the required finishes and specifications.",
    },
    {
      q: "Can Building Practice Ltd manage construction as part of a development project?",
      a: "Where the project scope is suitable, our building construction, construction management, and project management services can support delivery alongside development planning and design coordination.",
    },
    {
      q: "How do I start a property development project in Lagos?",
      a: "Begin with a project brief covering the site, intended use, development objectives, current documentation, and project stage. Our team can then advise on appropriate feasibility, planning, design, and delivery next steps.",
    },
  ];

  const buildingPermitsFaq = [
    {
      q: "What is a building permit?",
      a: "A building permit or approval generally records that a development proposal has been reviewed through an applicable approval process. The exact role, requirements, and terminology can vary by project and authority.",
    },
    {
      q: "Do I need building approval before construction in Lagos?",
      a: "Applicable approvals should be addressed before construction begins. Requirements depend on the project, location, land use, scale, and the authority involved, so they should be confirmed for the specific development.",
    },
    {
      q: "Can Building Practice Ltd help with building approval documentation?",
      a: "Our documented scope includes building permit application preparation, regulatory requirement analysis, planning approval support, and documentation and filing management for suitable project briefs.",
    },
    {
      q: "How much does a building permit cost in Lagos?",
      a: "Total costs can depend on project type, development size, location, applicable statutory charges, professional fees, documentation requirements, specialist consultants, and project complexity. Current charges should be confirmed with the applicable authority.",
    },
    {
      q: "How long does building approval take in Lagos?",
      a: "Timelines vary with project complexity, documentation completeness, authority review, requested revisions, required approvals, and applicable procedures. We do not publish fixed approval timelines or guarantee an outcome.",
    },
    {
      q: "Can approval requirements vary by project?",
      a: "Yes. Requirements can vary according to the development proposal, project location, land use, scale, building characteristics, and the applicable authority. Confirm current requirements before relying on a general checklist.",
    },
  ];

  const constructionSupervisionFaq = [
    {
      q: "What is construction supervision?",
      a: "Construction supervision is site-level professional oversight of construction activities, workmanship, materials, progress, contractor activities, and coordination against the agreed project information.",
    },
    {
      q: "What does construction site supervision include?",
      a: "The documented scope includes site supervision and monitoring, workmanship verification, construction progress tracking, material inspection, contractor performance evaluation, site meeting coordination, photo documentation, reporting, snag identification, and handover coordination.",
    },
    {
      q: "How much does construction supervision cost in Lagos?",
      a: "Costs depend on project size, duration, location, complexity, supervision frequency, number of site visits, scope, reporting requirements, and the number of consultants or contractors involved. A project-specific quotation is required.",
    },
    {
      q: "How often should a construction site be supervised?",
      a: "The appropriate frequency depends on project stage, complexity, contractor arrangements, project requirements, risk level, and the agreed scope of professional services. Not every project requires daily supervision.",
    },
    {
      q: "Can construction supervision identify defects?",
      a: "Site supervision can help identify visible workmanship issues, deviations, incomplete work, material concerns, and coordination problems. Some technical matters may require assessment by an appropriately qualified specialist engineer.",
    },
    {
      q: "What is the difference between construction supervision and project management?",
      a: "Construction supervision focuses on site-level execution, workmanship, observations, and progress. Project management has a broader role covering planning, budgeting, schedules, reporting, coordination, risk, and overall project delivery.",
    },
  ];

  const feasibilityStudiesFaq = [
    {
      q: "What is a feasibility study?",
      a: "A feasibility study evaluates whether a proposed project is practical and potentially viable by reviewing relevant site, market, technical, cost, regulatory, financial, and risk considerations.",
    },
    {
      q: "What does a feasibility study include?",
      a: "The documented scope includes technical feasibility assessment, financial viability analysis, market demand research, site evaluation, regulatory review, risk assessment, construction cost estimation, and recommendations appropriate to the agreed brief.",
    },
    {
      q: "How much does a feasibility study cost in Lagos?",
      a: "Fees depend on project size, type, location, complexity, analysis depth, site assessment, market research, financial analysis, technical assessment, regulatory review, and the professionals involved. A project-specific quotation is required.",
    },
    {
      q: "How long does a feasibility study take?",
      a: "Duration depends on project complexity, available site information, research requirements, technical assessment, financial analysis, regulatory considerations, and the agreed scope. We do not publish a universal timeline.",
    },
    {
      q: "Can a feasibility study assess construction costs?",
      a: "Yes. Construction cost estimation is included in the documented feasibility scope. The level of cost analysis depends on the project information and agreed assignment; it is not a guarantee of final construction cost.",
    },
    {
      q: "Does a feasibility study guarantee a project will be profitable?",
      a: "No. A feasibility study can identify assumptions, costs, risks, market considerations, and development options, but future market conditions, approvals, costs, financing, and project outcomes cannot be guaranteed.",
    },
  ];

  const landSurveyingFaq = [
    {
      q: "What is land surveying?",
      a: "Land surveying involves measuring and documenting relevant physical site information, such as dimensions, levels, visible features, and boundaries, for appropriate property, planning, engineering, and construction purposes.",
    },
    {
      q: "What land surveying services do you provide?",
      a: "The documented scope includes topographic surveys and mapping, boundary surveys and demarcation, construction staking and layout, as-built surveys, site leveling and grading surveys, utility location surveys, volume calculations, GIS data collection, and survey report preparation.",
    },
    {
      q: "How much does land surveying cost in Lagos?",
      a: "Fees depend on site size, location, terrain, survey type, accessibility, project complexity, required detail, technical requirements, documentation, and site visits. A project-specific quotation is required.",
    },
    {
      q: "How long does a land survey take?",
      a: "Duration depends on the site size, survey type, terrain, accessibility, project requirements, amount of data needed, and processing or documentation scope. We do not publish a universal timeline.",
    },
    {
      q: "What is a topographic survey?",
      a: "A topographic survey documents relevant physical features and elevation differences across a site so the information can support design, planning, drainage, engineering, and development decisions within the agreed scope.",
    },
    {
      q: "Can a boundary survey establish land ownership?",
      a: "Survey information can assist with boundary-related documentation, but it is not legal advice and does not by itself determine ownership or resolve land disputes. Confirm the appropriate professional and legal requirements for the specific property.",
    },
  ];

  const environmentalImpactFaq = [
    {
      q: "What is an Environmental Impact Assessment?",
      a: "An Environmental Impact Assessment is a systematic process used to identify, evaluate, and manage potential environmental effects associated with a proposed project. Its exact scope depends on the project and applicable requirements.",
    },
    {
      q: "What does an environmental assessment include?",
      a: "The documented scope includes screening and scoping studies, baseline environmental data collection, impact prediction and evaluation, mitigation development, environmental management planning, public consultation and engagement, report preparation, submission support, monitoring planning, compliance auditing, post-impact monitoring, and environmental training.",
    },
    {
      q: "Does every construction project require an EIA?",
      a: "No general statement applies to every project. Requirements can depend on the nature, scale, location, environmental sensitivity, development activity, and applicable regulations. Confirm current requirements for the specific project with the appropriate authority.",
    },
    {
      q: "How much does an Environmental Impact Assessment cost in Lagos?",
      a: "Costs depend on project type, scale, location, environmental sensitivity, assessment scope, fieldwork, reporting, specialist inputs, regulatory requirements, and project complexity. A project-specific quotation is required.",
    },
    {
      q: "How long does an Environmental Impact Assessment take?",
      a: "Duration depends on project size, assessment scope, environmental complexity, field studies, documentation, consultation, and applicable regulatory processes. Assessment preparation and authority review are separate stages, and no universal timeline can be guaranteed.",
    },
    {
      q: "Does an EIA guarantee approval or compliance?",
      a: "No. An assessment can identify potential impacts and support mitigation and planning, but it does not guarantee an approval, a regulatory outcome, or complete compliance with every applicable requirement.",
    },
  ];

  const buildingCertificationFaq = [
    { q: "What is building certification?", a: "Building certification can involve documentation, assessment, inspection, verification, or formal certification associated with a building, depending on the applicable project and regulatory process." },
    { q: "Can Building Practice Ltd help with certification documentation?", a: "The documented service scope includes certification-requirements review, documentation preparation, building-plan approval processing, and coordination for suitable project briefs. The applicable authority determines any statutory outcome." },
    { q: "How much does building certification cost in Lagos?", a: "Costs can depend on building type, size, complexity, available documentation, technical assessments, inspection needs, professional services, and any applicable statutory charges. A project-specific quotation is required." },
    { q: "How long does building certification take?", a: "Duration depends on documentation completeness, property type, technical reviews, corrections, inspection requirements, and applicable authority or third-party processes. No universal timeline or outcome is guaranteed." },
    { q: "Does certification mean a building is fully compliant?", a: "Certification can be one part of a broader compliance process. It does not automatically establish complete compliance with every applicable planning, safety, environmental, documentation, or approval requirement." },
  ];

  // Structured data is derived from the service record so the schema name
  // always equals the rendered H1 and every URL equals the canonical URL.
  const serviceUrl = absoluteUrl(`/services/${slug}`);
  const servicePageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${serviceUrl}#webpage`,
        url: serviceUrl,
        name: service.h1,
        description: service.seoDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-NG",
      },
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: service.schemaName,
        description: service.seoDescription,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "City", name: "Lagos" },
          { "@type": "Country", name: "Nigeria" },
        ],
        ...(service.schemaServiceTypes ? { serviceType: service.schemaServiceTypes } : {}),
        url: serviceUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
          { "@type": "ListItem", position: 3, name: service.breadcrumbLabel, item: serviceUrl },
        ],
      },
    ],
  };

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
              isBuildingCertificationPage
                ? "Building documentation under review for a property project"
                : isEnvironmentalImpactPage
                ? "Sustainable development planning for a building project"
                : isLandSurveyingPage
                ? "Site information review for a property development project"
                : isFeasibilityStudiesPage
                ? "Property development site and project planning review"
                : isConstructionSupervisionPage
                ? "Construction work being monitored on a building site"
                : isBuildingPermitsPage
                ? "Construction drawings and project documentation under review"
                : isRealEstateDevelopmentPage
                ? "Real estate development planning and property construction project"
                : isGreenBuildingAdvisoryPage
                ? "Energy-efficient building designed with sustainable features"
                : isUrbanDevelopmentPage
                ? "Master-planned urban development concept in Lagos, Nigeria"
                : isArchitecturalDesignPage
                ? "Contemporary architectural design project by The Building Practice in Lagos"
                : isConstructionManagementPage
                ? "Construction management project delivery by The Building Practice in Lagos, Nigeria"
                : isBuildingConstructionPage
                ? "Building construction project execution by The Building Practice in Lagos, Nigeria"
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
          {(isBuildingCertificationPage || isEnvironmentalImpactPage || isLandSurveyingPage || isFeasibilityStudiesPage || isConstructionSupervisionPage || isBuildingPermitsPage || isRealEstateDevelopmentPage || isGreenBuildingAdvisoryPage || isUrbanDevelopmentPage || isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage || isConstructionConsultationPage || isProjectManagementPage || isBuildingConstructionPage) && (
            <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <span aria-current="page">
                {service.breadcrumbLabel}
              </span>
            </nav>
          )}

          <Link href="/services" className={styles.backLink}>
            <i className="bx bx-arrow-back" aria-hidden="true" /> All Services
          </Link>
          <span className={styles.category}>{service.category}</span>
          <h1>
            {service.h1}
          </h1>
          <p>
            {isBuildingCertificationPage
              ? "We provide building documentation, compliance, and certification advisory for suitable property and construction projects in Lagos."
              : isEnvironmentalImpactPage
              ? "We provide environmental assessment, impact evaluation, mitigation planning, and development advisory for suitable projects in Lagos."
              : isLandSurveyingPage
              ? "We provide site, topographic, boundary-related, and construction survey support for suitable property and development projects in Lagos."
              : isFeasibilityStudiesPage
              ? "We assess site, market, technical, cost, regulatory, and risk considerations for suitable property and construction projects in Lagos."
              : isConstructionSupervisionPage
              ? "We provide construction site monitoring, workmanship checks, progress tracking, and practical oversight for suitable building projects in Lagos."
              : isBuildingPermitsPage
              ? "We support permit preparation, planning approval documentation, and regulatory compliance coordination for suitable construction and development projects in Lagos."
              : isRealEstateDevelopmentPage
              ? "We support development feasibility, property planning, architectural design, construction, project management, and development coordination for projects in Lagos and across Nigeria."
              : isGreenBuildingAdvisoryPage
              ? "We provide sustainable building design guidance, energy efficiency planning, resource efficiency advice, and green certification support for projects in Lagos and across Nigeria."
              : isUrbanDevelopmentPage
              ? "We provide master planning, urban design, land-use planning, infrastructure integration, and redevelopment strategy for development projects in Lagos and across Nigeria."
              : isArchitecturalDesignPage
              ? "We provide architectural design for residential, commercial, hospitality, and institutional projects with context-led planning and technical documentation."
              : isConstructionManagementPage
              ? "We coordinate planning, scheduling, site activities, cost and quality monitoring, and project reporting for construction projects in Lagos and across Nigeria."
              : isBuildingConstructionPage
              ? "We execute residential, commercial, and institutional building projects from site preparation and structural works through finishing and handover in Lagos and across Nigeria."
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
              {isBuildingCertificationPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Building Certification Support by Building Practice Ltd</h2>
                    <p className={styles.bodyText}>Building Practice Ltd supports property owners, homeowners, developers, businesses, institutions, and project teams with building certification documentation, requirements review, and coordination for suitable projects in Lagos.</p>
                    <p className={styles.bodyText}>Our documented scope includes certification-requirements review, building-plan approval processing, documentation preparation, and coordination. Any statutory certificate, approval, or authority decision remains with the applicable body; this service does not claim to issue certificates independently.</p>
                    <div className={styles.linkRow}><Link href="/contact">Discuss your building certification needs</Link><Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria">Explore building permits and regulatory compliance</Link><Link href="/projects">View our project portfolio</Link></div>
                  </div>
                  <div className={styles.block}>
                    <h2>What Is Building Certification?</h2>
                    <p className={styles.bodyText}>Building certification can involve documentation, assessment, inspection, verification, or formal certification associated with a building, depending on the relevant project and process. It is not interchangeable with planning approval, building permits, completion documentation, or wider regulatory compliance.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Our Building Certification Services in Lagos</h2>
                    <h3>Documentation and Requirements Review</h3><p className={styles.bodyText}>We review available project documentation and help identify information gaps, inconsistencies, or certification-related questions that should be clarified for the agreed scope.</p>
                    <h3>Building Compliance and Technical Coordination</h3><p className={styles.bodyText}>The service can coordinate relevant architectural, structural, MEP, site, project, and construction information where those inputs are part of the project brief.</p>
                    <h3>Certification Documentation Support</h3><p className={styles.bodyText}>We support documentation preparation and agreed coordination tasks without representing an approval authority or guaranteeing certification.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Building Documentation Review in Lagos</h2>
                    <p className={styles.bodyText}>Available architectural drawings, structural information, MEP information, site plans, construction records, and relevant approvals can be reviewed where applicable to identify documentation gaps and support better preparation. Review alone does not result in certification.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Certification Support for Existing Buildings and New Projects</h2>
                    <p className={styles.bodyText}>Existing properties may need documentation support for transactions, renovations, changes, or due diligence; new projects can consider certification-related documentation from early design through completion. Requirements depend on property type, location, size, use, construction stage, documentation, and applicable processes.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Building Certification for Property Developers</h2>
                    <p className={styles.bodyText}>Developers can benefit from organized documentation management, technical coordination, construction records, inspection coordination, and handover information. Related services include <Link href="/services/leading-real-estate-development-firm-in-nigeria">real estate development</Link>, <Link href="/services/leading-urban-development-firm-in-nigeria">urban development</Link>, <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link>, and <Link href="/services/leading-construction-management-firm-in-nigeria">construction management</Link>.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Building Certification and Building Permits</h2>
                    <p className={styles.bodyText}>A building permit or approval generally relates to permission for a proposed development or construction process. Building certification may relate to verification, documentation, inspection, completion, or a formal process associated with a building. The exact distinction depends on the applicable requirements and authority. See our <Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria">building permits and regulatory compliance service</Link> for related support.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Building Certification and Regulatory Compliance</h2>
                    <p className={styles.bodyText}>Certification can be one component of a broader compliance process that may involve documentation, inspections, planning, safety, environmental requirements, and approvals. It does not automatically establish complete compliance. Related services include <Link href="/services/leading-environmental-impact-assessment-firm-in-nigeria">environmental impact assessment</Link> and <Link href="/services/leading-green-building-advisory-firm-in-nigeria">green building advisory</Link>.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Why Building Certification Matters in Lagos</h2>
                    <p className={styles.bodyText}>Organized documentation and early requirements review can support clearer coordination, reduce administrative errors, identify gaps, and improve project transparency in an active property-development environment. They cannot guarantee a statutory outcome.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Our Building Certification Process</h2>
                    <div className={styles.processList}>{[
                      { title: "Property and Documentation Review", desc: "Review the project, available records, objectives, and agreed certification-support scope." },
                      { title: "Requirements Identification", desc: "Identify documentation and technical coordination questions that should be clarified for the project." },
                      { title: "Preparation and Coordination", desc: "Prepare or coordinate agreed documentation and project-team inputs." },
                      { title: "Support Where Applicable", desc: "Provide agreed inspection, submission, or follow-up support without guaranteeing an authority decision." },
                    ].map((step, index) => <div key={step.title} className={styles.processStep}><span className={styles.processNumber}>{index + 1}</span><div><h3>{step.title}</h3><p>{step.desc}</p></div></div>)}</div>
                  </div>
                  <div className={styles.block}>
                    <h2>How Much Does Building Certification Cost in Lagos?</h2><p className={styles.bodyText}>Costs depend on building type, size, complexity, available documentation, condition, technical assessments, inspection requirements, professional services, and any applicable statutory charges. Request a project-specific quotation; professional fees and authority charges, where applicable, are distinct.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>How Long Does Building Certification Take in Lagos?</h2><p className={styles.bodyText}>Duration depends on documentation completeness, building type, technical reviews, corrections, inspections, and applicable authority or third-party processes. No universal timeline or certification date is guaranteed.</p>
                  </div>
                  <div className={styles.block}>
                    <h2>Related Design and Construction Services</h2><p className={styles.bodyText}>Certification documentation may connect to <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design</Link>, <Link href="/services/leading-building-construction-firm-in-nigeria">building construction</Link>, <Link href="/services/leading-construction-supervision-firm-in-nigeria">construction supervision</Link>, and <Link href="/services/leading-feasibility-studies-firm-in-nigeria">feasibility studies</Link>.</p>
                  </div>
                  <div className={styles.block}><h2>Frequently Asked Questions</h2><div className={styles.faqList}>{buildingCertificationFaq.map((item, index) => <details key={`${item.q}-${index}`} className={styles.faqItem}><summary>{item.q}</summary><div>{item.a}</div></details>)}</div></div>
                  <div className={styles.block}><h2>Discuss Your Building Certification Needs</h2><p className={styles.bodyText}>Share your property type, location, available documentation, current project stage, and the support you need. Our team will review the appropriate scope and next steps.</p><div className={styles.linkRow}><Link href="/contact">Request a building certification consultation</Link><Link href="/projects">View our project portfolio</Link></div></div>
                </>
              ) : isEnvironmentalImpactPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Environmental Impact Assessment Services by Building Practice Ltd</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides Environmental Impact Assessment and environmental assessment
                      services in Lagos for developers, businesses, institutions, investors, construction teams, and
                      organizations planning suitable property, infrastructure, and development projects.
                    </p>
                    <p className={styles.bodyText}>
                      Our documented scope includes screening and scoping studies, baseline environmental data
                      collection, impact prediction and evaluation, mitigation development, environmental management
                      planning, public consultation and engagement, report preparation, submission support, monitoring
                      planning, compliance auditing, post-impact monitoring, and environmental training. The agreed
                      scope depends on the project and applicable requirements.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request an environmental assessment consultation</Link>
                      <Link href="/services/leading-green-building-advisory-firm-in-nigeria">Explore green building advisory</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>What Is an Environmental Impact Assessment?</h2>
                    <p className={styles.bodyText}>
                      An Environmental Impact Assessment is a systematic process used to identify, evaluate, and
                      manage potential environmental effects associated with a proposed project. Depending on the
                      brief, assessment may consider land, water, air, vegetation, waste, noise, resource use,
                      infrastructure, and surrounding communities.
                    </p>
                    <p className={styles.bodyText}>
                      This service provides assessment and project-planning support, not legal advice, regulatory
                      authority, or a guarantee of approval or compliance.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Environmental Impact Assessment Services in Lagos</h2>
                    <h3>Environmental Screening and Scoping</h3>
                    <p className={styles.bodyText}>Early screening and scoping can identify key environmental issues, site sensitivities, potential risks, and the environmental questions that should be considered for the agreed project scope.</p>
                    <h3>Baseline Data and Impact Assessment</h3>
                    <p className={styles.bodyText}>The documented scope includes baseline environmental data collection and impact prediction and evaluation. The categories, methods, and specialist input depend on the project and assignment.</p>
                    <h3>Environmental Risk and Mitigation Planning</h3>
                    <p className={styles.bodyText}>Assessment can identify potential risks and inform mitigation measures and environmental management planning without guaranteeing that every impact can be avoided.</p>
                    <h3>Documentation, Monitoring, and Advisory</h3>
                    <p className={styles.bodyText}>The service scope includes EIA report preparation, regulatory submission support, monitoring-plan development, compliance auditing, post-impact monitoring, and environmental training where applicable to the agreed brief.</p>
                  </div>

                  <div className={styles.block}>
                    <h2>Environmental Impact Identification and Risk Assessment</h2>
                    <p className={styles.bodyText}>
                      Proposed development can affect land, water, air, vegetation, waste generation, noise,
                      resource use, traffic, surrounding communities, and infrastructure. Identifying potential
                      impacts early helps project teams incorporate environmental considerations into planning,
                      design, construction, and mitigation discussions.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Environmental Mitigation and Management Planning</h2>
                    <p className={styles.bodyText}>
                      Assessment should help identify practical measures to manage relevant impacts, such as resource
                      use, waste, water management, pollution prevention, noise, site disturbance, and restoration
                      considerations where appropriate. Measures should be tailored to the actual project and do not
                      replace applicable professional or regulatory requirements.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Environmental Compliance Advisory in Lagos</h2>
                    <p className={styles.bodyText}>
                      Environmental requirements may depend on project type, scale, location, sensitivity, activity,
                      and applicable regulations. Building Practice Ltd can provide the documented environmental
                      advisory and submission-support scope, but does not represent an approval authority or guarantee
                      a regulatory outcome. Confirm current requirements with the appropriate authority for the
                      specific project.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Environmental Assessment for Property and Construction Projects</h2>
                    <p className={styles.bodyText}>
                      Environmental assessment can support suitable residential, commercial, mixed-use, industrial,
                      infrastructure, redevelopment, and construction project briefs by identifying potential impacts
                      before and during planning. Related services include <Link href="/services/leading-real-estate-development-firm-in-nigeria">real estate development</Link>, <Link href="/services/leading-urban-development-firm-in-nigeria">urban development</Link>, <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design</Link>, <Link href="/services/leading-building-construction-firm-in-nigeria">building construction</Link>, <Link href="/services/leading-construction-management-firm-in-nigeria">construction management</Link>, and <Link href="/services/leading-construction-supervision-firm-in-nigeria">construction supervision</Link>.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Environmental Assessment for Feasibility Studies</h2>
                    <p className={styles.bodyText}>
                      Environmental assessment evaluates potential environmental effects and mitigation measures.
                      <Link href="/services/leading-feasibility-studies-firm-in-nigeria"> Feasibility studies</Link> evaluate wider project viability, including technical, financial, market, environmental, and risk considerations. They are related but distinct early-stage services.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Why Environmental Impact Assessment Matters in Lagos</h2>
                    <p className={styles.bodyText}>
                      In an active urban development context, environmental planning can help keep drainage, waste,
                      water, infrastructure, construction impacts, land use, and surrounding conditions visible as a
                      project develops. The relevant issues should be established from the actual site and proposal,
                      rather than assumed from a generic template.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Benefits of Environmental Impact Assessment</h2>
                    <p className={styles.bodyText}>
                      Environmental assessment can support earlier identification of environmental risks, better
                      project planning, mitigation discussions, stakeholder awareness, environmental management, and
                      more responsible development decisions. It cannot guarantee approval, compliance, project
                      success, or a particular environmental outcome.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Environmental Impact Assessment Process</h2>
                    <div className={styles.processList}>
                      {[
                        { title: "Project and Site Review", desc: "Clarify the proposal, site, objectives, available information, and the agreed assessment scope." },
                        { title: "Screening and Baseline Information", desc: "Identify key environmental questions and gather relevant baseline information within the assignment." },
                        { title: "Impact and Risk Assessment", desc: "Evaluate potential impacts, risks, and mitigation considerations connected to the proposed project." },
                        { title: "Management Recommendations and Documentation", desc: "Develop relevant management recommendations and prepare the agreed assessment documentation." },
                        { title: "Support Where Applicable", desc: "Provide agreed advisory, submission-support, monitoring-plan, or follow-up support without guaranteeing an authority outcome." },
                      ].map((step, index) => (
                        <div key={`${step.title}-${index}`} className={styles.processStep}>
                          <span className={styles.processNumber}>{index + 1}</span>
                          <div><h3>{step.title}</h3><p>{step.desc}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>How Much Does an Environmental Impact Assessment Cost in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Fees depend on project type, size, location, environmental sensitivity, assessment scope,
                      fieldwork, specialist inputs, reporting, applicable requirements, and overall complexity.
                      Laboratory testing, where needed, should be scoped appropriately. Request a project-specific
                      quotation rather than relying on a generic price range.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Long Does an Environmental Impact Assessment Take?</h2>
                    <p className={styles.bodyText}>
                      Duration depends on project size, environmental complexity, scope, field studies,
                      documentation, stakeholder consultation, specialist input, and applicable processes.
                      Assessment preparation time is separate from any authority review, which is not guaranteed.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {environmentalImpactFaq.map((item, index) => (
                        <details key={`${item.q}-${index}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Environmental Assessment Requirements</h2>
                    <p className={styles.bodyText}>
                      Share your project type, site location, intended development, available information, and current
                      stage. Our team will review the appropriate environmental-assessment scope and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request an environmental assessment consultation</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isLandSurveyingPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Land Surveying Services by Building Practice Ltd</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides land surveying services in Lagos for landowners, homeowners,
                      developers, architects, engineers, construction teams, businesses, and organizations that need
                      relevant site information for suitable property and development projects.
                    </p>
                    <p className={styles.bodyText}>
                      Our documented scope includes topographic surveys and mapping, boundary surveys and demarcation,
                      construction staking and layout, as-built surveys, site leveling and grading surveys, utility
                      location surveys, volume calculations, GIS data collection, and survey report preparation. The
                      appropriate survey scope and professional requirements should be established for each project.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your surveying requirements</Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Explore architectural design services</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>What Is Land Surveying?</h2>
                    <p className={styles.bodyText}>
                      Land surveying involves measuring and documenting relevant physical features, dimensions,
                      boundaries, levels, elevations, and site information for appropriate property, planning,
                      engineering, and construction purposes. Survey information can support site planning,
                      architectural design, engineering design, construction, and property development.
                    </p>
                    <p className={styles.bodyText}>
                      The precise purpose and professional requirements of a survey depend on the project. This page
                      does not provide legal advice or state that every survey establishes legal ownership or resolves
                      boundary disputes.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Land Surveying Services in Lagos</h2>
                    <h3>Topographic Surveys and Mapping</h3>
                    <p className={styles.bodyText}>The documented scope includes topographic surveys and mapping to record relevant site features and elevation information for an agreed project purpose.</p>
                    <h3>Boundary Surveys and Demarcation</h3>
                    <p className={styles.bodyText}>Boundary surveys and demarcation are included in the documented service scope. Their appropriate use, records, and professional requirements should be confirmed for the specific property.</p>
                    <h3>Construction Staking and Layout</h3>
                    <p className={styles.bodyText}>Construction staking and layout can support positioning and reference information during suitable construction projects, based on the agreed scope and available design information.</p>
                    <h3>As-Built, Leveling, and Grading Surveys</h3>
                    <p className={styles.bodyText}>The service scope also includes as-built surveys and documentation plus site leveling and grading surveys where relevant to the project brief.</p>
                    <h3>Utility Location and Survey Reporting</h3>
                    <p className={styles.bodyText}>Utility location surveys, GIS data collection, volume calculations, and survey report preparation are available within the documented scope where suitable to the assignment.</p>
                  </div>

                  <div className={styles.block}>
                    <h2>Topographic Survey Services in Lagos</h2>
                    <p className={styles.bodyText}>
                      A topographic survey can document relevant physical features and elevation differences across a
                      site, such as visible structures, roads, drainage features, vegetation, and levels where those
                      items form part of the agreed scope. This information can support architectural design, site
                      planning, drainage considerations, engineering coordination, and development planning.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Boundary Survey Services in Lagos</h2>
                    <p className={styles.bodyText}>
                      Boundary-related survey work can help document property boundaries using the appropriate survey
                      information and professional procedures for the assignment. It should not be treated as legal
                      advice, ownership verification, or a solution to a land dispute without the appropriate legal
                      and professional processes.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Site Survey Services for Construction and Development</h2>
                    <p className={styles.bodyText}>
                      Site survey information can provide a useful basis for <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design</Link> and <Link href="/services/leading-feasibility-studies-firm-in-nigeria">feasibility studies</Link>. It helps project teams understand the physical site before detailed design or construction decisions are made.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Surveying and Building Setting Out</h2>
                    <p className={styles.bodyText}>
                      Construction survey support can contribute to site preparation, positioning, layout, and checks
                      of relevant locations or levels during an agreed project scope. Building setting out transfers
                      available design information to the physical site to guide construction positioning; the exact
                      requirements depend on the project and technical professionals involved.
                    </p>
                    <p className={styles.bodyText}>
                      Related delivery support includes <Link href="/services/leading-building-construction-firm-in-nigeria">building construction</Link>, <Link href="/services/leading-construction-supervision-firm-in-nigeria">construction supervision</Link>, <Link href="/services/leading-construction-management-firm-in-nigeria">construction management</Link>, and <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link>.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Site Level and Contour Surveys</h2>
                    <p className={styles.bodyText}>
                      Site level and grading information can help designers and engineers consider ground conditions,
                      elevation differences, drainage, access, building placement, and site development. The resulting
                      information should be coordinated with the relevant project disciplines rather than treated as a
                      standalone design solution.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Land Surveying for Property Development in Lagos</h2>
                    <p className={styles.bodyText}>
                      Survey information can support land-development planning for suitable residential, commercial,
                      mixed-use, estate, redevelopment, and related project briefs. Explore our <Link href="/services/leading-real-estate-development-firm-in-nigeria">real estate development</Link> and <Link href="/services/leading-urban-development-firm-in-nigeria">urban development services</Link> for broader development planning requirements.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Why Land Surveying Is Important Before Construction</h2>
                    <p className={styles.bodyText}>
                      Appropriate site information can help reduce positioning errors, inaccurate site plans, design
                      conflicts, site-planning problems, construction errors, and unexpected constraints. Starting
                      construction without the relevant site information may create incorrect positioning, inaccurate
                      dimensions, unexpected levels, drainage concerns, planning complications, delays, or additional
                      costs depending on the project.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Land Surveying Process</h2>
                    <div className={styles.processList}>
                      {[
                        { title: "Initial Consultation and Site Brief", desc: "Clarify the property, proposed use, survey purpose, available information, and required outputs." },
                        { title: "Site Reconnaissance and Data Collection", desc: "Review the site and collect the relevant physical information within the agreed survey scope." },
                        { title: "Processing and Survey Information", desc: "Process the collected information and prepare the agreed survey documentation or mapping outputs." },
                        { title: "Design and Engineering Coordination", desc: "Coordinate survey information with the project team where architectural, engineering, planning, or construction inputs are required." },
                        { title: "Documentation and Handover", desc: "Present the agreed survey information and clarify relevant next steps for the project brief." },
                      ].map((step, index) => (
                        <div key={`${step.title}-${index}`} className={styles.processStep}>
                          <span className={styles.processNumber}>{index + 1}</span>
                          <div><h3>{step.title}</h3><p>{step.desc}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>How Land Surveying Supports Construction Planning</h2>
                    <p className={styles.bodyText}>
                      Survey information can inform site layout, architectural design, foundation planning, grading,
                      drainage, access, infrastructure planning, and construction setting out. It provides relevant
                      physical site information, while the related design and construction disciplines determine how
                      that information is applied to the project.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Land Surveying for Feasibility Studies</h2>
                    <p className={styles.bodyText}>
                      Survey and site information can contribute to a feasibility study by clarifying site
                      characteristics, dimensions, levels, access, existing features, apparent constraints, and
                      development options. Land surveying collects relevant physical site information; <Link href="/services/leading-feasibility-studies-firm-in-nigeria">feasibility studies</Link> assess wider project viability, risks, costs, and assumptions.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Land Surveying vs Other Property and Construction Services</h2>
                    <p className={styles.bodyText}>
                      Land surveying provides physical site information. Architectural design develops the building
                      solution; construction supervision
                      monitors execution; and construction management coordinates delivery. Land surveying also differs
                      from property valuation and does not replace legal due diligence.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Much Does Land Surveying Cost in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Fees may depend on site size, location, terrain, survey type, complexity, accessibility,
                      required detail, technical requirements, documentation, and the number of site visits. Share
                      your site and survey requirements with our team for a project-specific quotation.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Long Does a Land Survey Take in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Duration depends on the site size, survey type, terrain, access, project requirements, data
                      needs, processing, documentation, and applicable professional requirements. The appropriate
                      programme can be discussed after reviewing the specific brief.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>When Should You Conduct a Land Survey?</h2>
                    <p className={styles.bodyText}>
                      Surveying may be useful before buying or developing land, before architectural design, before
                      construction or site planning, during construction, before redevelopment, when site information
                      is outdated, or when boundaries and dimensions require professional assessment. Informal site
                      measurement does not necessarily meet the needs of a project-specific survey scope.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {landSurveyingFaq.map((item, index) => (
                        <details key={`${item.q}-${index}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Land Surveying Requirements</h2>
                    <p className={styles.bodyText}>
                      Share your site location, intended use, available information, survey purpose, and current
                      project stage. Our team will review the appropriate survey scope and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request land surveying support</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isFeasibilityStudiesPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Feasibility Studies by Building Practice Ltd</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides feasibility study services in Lagos for developers, investors,
                      landowners, homeowners, businesses, institutions, and organizations considering suitable
                      property, real estate, construction, and development opportunities.
                    </p>
                    <p className={styles.bodyText}>
                      Our documented scope includes technical feasibility assessment, financial viability analysis,
                      market demand research, site evaluation and selection, regulatory compliance review,
                      environmental impact screening, risk assessment, construction cost estimation, cash flow
                      analysis, and development recommendations where appropriate to the agreed brief. A feasibility
                      study supports informed decisions; it does not guarantee approvals, financing, demand, profits,
                      or project outcomes.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a feasibility study</Link>
                      <Link href="/services/leading-real-estate-development-firm-in-nigeria">Explore real estate development services</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>What Is a Feasibility Study?</h2>
                    <p className={styles.bodyText}>
                      A feasibility study evaluates whether a proposed project is practical and potentially viable
                      based on available information. It can consider the site, scope, market demand, technical
                      requirements, costs, financial assumptions, regulatory considerations, risks, and implementation
                      constraints before significant resources are committed.
                    </p>
                    <p className={styles.bodyText}>
                      It is distinct from architectural design, property valuation, project management, construction
                      management, or an investment guarantee. A feasibility study clarifies assumptions and options;
                      it cannot predict future market or financial results with certainty.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Feasibility Study Services in Lagos</h2>
                    <h3>Property and Real Estate Development Feasibility</h3>
                    <p className={styles.bodyText}>We assess suitable property and development opportunities by reviewing proposed use, site context, development potential, demand, costs, risks, and implementation considerations within the agreed scope.</p>
                    <h3>Construction Project Feasibility</h3>
                    <p className={styles.bodyText}>Construction feasibility can consider the project requirements, site information, scope, estimated costs, infrastructure needs, technical constraints, materials, and delivery considerations relevant to the brief.</p>
                    <h3>Site, Market, and Demand Assessment</h3>
                    <p className={styles.bodyText}>The documented scope includes site evaluation and selection alongside market demand research. Findings depend on the information available and do not guarantee demand, occupancy, sales, or market performance.</p>
                    <h3>Financial, Cost, and Risk Analysis</h3>
                    <p className={styles.bodyText}>Financial viability analysis, cash flow analysis, construction cost estimation, and risk assessment can help project teams review assumptions, cost pressures, and development options without promising returns.</p>
                  </div>

                  <div className={styles.block}>
                    <h2>Property Feasibility Studies in Lagos</h2>
                    <p className={styles.bodyText}>
                      A property feasibility study can help a client assess proposed use, location, development
                      potential, project scale, market assumptions, estimated costs, regulatory considerations, and
                      risk before moving further into a project. It is not legal due diligence, title verification, or
                      a valuation unless those services are separately confirmed.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Real Estate Development Feasibility Studies</h2>
                    <p className={styles.bodyText}>
                      Developers can use feasibility analysis to review land-development opportunities, proposed
                      development type, target market, scale, costs, revenue assumptions, planning considerations,
                      and delivery risks before a development proceeds. See our <Link href="/services/leading-real-estate-development-firm-in-nigeria">real estate development service</Link> for broader planning and delivery support.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Site and Land Feasibility Assessment</h2>
                    <p className={styles.bodyText}>
                      Depending on the brief, a site assessment may review location, accessibility, land use, site
                      characteristics, existing infrastructure, utilities, drainage considerations, surrounding
                      development, and apparent development constraints. Specialist surveys, legal due diligence, or
                      engineering investigations should be provided by appropriately qualified professionals where
                      required.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Market Feasibility and Demand Analysis</h2>
                    <p className={styles.bodyText}>
                      Market analysis can consider target users, demand, competing developments, location
                      characteristics, market positioning, and property-type assumptions. The analysis should be
                      interpreted as decision support based on available information, not a prediction or guarantee of
                      future sales, rent, occupancy, or demand.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Financial Feasibility and Development Cost Analysis</h2>
                    <p className={styles.bodyText}>
                      Financial analysis may consider land, construction, professional, approval, infrastructure,
                      financing, operating, and contingency assumptions where relevant to the assignment. Cash flow
                      analysis and financial-viability considerations can help clients test project assumptions; they
                      are not investment advice or guaranteed financial forecasts.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Cost and Budget Feasibility</h2>
                    <p className={styles.bodyText}>
                      Early feasibility analysis can help identify approximate cost drivers, scope implications,
                      materials, labour, professional inputs, infrastructure needs, and potential cost risks.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Planning, Regulatory and Approval Considerations</h2>
                    <p className={styles.bodyText}>
                      Feasibility can be affected by planning requirements, land-use considerations, building
                      regulations, environmental considerations, permits, approvals, and development restrictions.
                      Our <Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria">building permit and regulatory compliance service</Link> provides related documentation and approval support. Approval decisions remain with the applicable authorities.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Technical Feasibility Assessment</h2>
                    <p className={styles.bodyText}>
                      Technical feasibility may consider apparent site constraints, access, infrastructure, utilities,
                      drainage, construction methods, and engineering requirements. This work can be coordinated with
                      <Link href="/services/leading-architectural-design-firm-in-nigeria"> architectural design</Link> where that input is required.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Project Risk Assessment</h2>
                    <p className={styles.bodyText}>
                      Feasibility analysis can help identify risks such as unsuitable sites, unrealistic budgets, weak
                      demand, regulatory constraints, construction complexity, infrastructure limitations, financing
                      constraints, market uncertainty, scheduling risks, and unforeseen site conditions. It helps make
                      risk visible; it cannot eliminate every project risk.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Feasibility Study Process</h2>
                    <div className={styles.processList}>
                      {[
                        { title: "Initial Consultation and Project Brief", desc: "Clarify the proposed project, objectives, available information, intended use, and required level of analysis." },
                        { title: "Site and Project Assessment", desc: "Review relevant site, project, market, technical, and regulatory information within the agreed scope." },
                        { title: "Cost, Financial, and Risk Analysis", desc: "Assess project assumptions, cost drivers, financial considerations, and key risks using the available information." },
                        { title: "Feasibility Findings", desc: "Organize the assessment findings, constraints, assumptions, and potential development options for discussion." },
                        { title: "Recommendations and Next Steps", desc: "Identify practical next steps, which may include design, cost planning, approvals, or further specialist assessment." },
                      ].map((step, index) => (
                        <div key={`${step.title}-${index}`} className={styles.processStep}>
                          <span className={styles.processNumber}>{index + 1}</span>
                          <div><h3>{step.title}</h3><p>{step.desc}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Why You Need a Feasibility Study Before Starting a Project</h2>
                    <p className={styles.bodyText}>
                      A feasibility study can help clients make more informed decisions, identify constraints and
                      risks, assess development options, understand project requirements, test early cost assumptions,
                      and avoid committing resources before key questions have been examined. Skipping this work may
                      leave a project more exposed to unexpected costs, unsuitable strategies, weak demand, planning
                      issues, infrastructure problems, financing challenges, or construction difficulties.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Feasibility Studies for Developers, Landowners, and Investors</h2>
                    <p className={styles.bodyText}>
                      Developers may use feasibility analysis before acquiring land, selecting a development type,
                      investing in design, seeking financing, or committing to construction. Landowners may use it to
                      consider land utilization, development options, constraints, infrastructure needs, and project
                      costs. Investors can use the findings to evaluate assumptions and development risks, not as a
                      substitute for independent financial, legal, or investment advice.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Feasibility Study vs Other Development Services</h2>
                    <p className={styles.bodyText}>
                      Feasibility studies assess whether and how a proposal may be viable. <Link href="/services/leading-architectural-design-firm-in-nigeria">Architectural design</Link> develops the building solution; <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link> supports project delivery; <Link href="/services/leading-construction-management-firm-in-nigeria">construction management</Link> coordinates construction execution; and <Link href="/services/leading-building-construction-firm-in-nigeria">building construction</Link> delivers the physical work. These services can connect, but they have different primary roles.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Much Does a Feasibility Study Cost in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Fees depend on project size, type, location, complexity, analysis depth, site assessment,
                      market research, financial modelling, technical inputs, regulatory review, and the number of
                      professionals involved. Share your brief for a project-specific quotation rather than relying on
                      a generic price range.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Long Does a Feasibility Study Take?</h2>
                    <p className={styles.bodyText}>
                      Duration depends on project complexity, available site information, research needs, technical
                      assessment requirements, financial analysis, regulatory considerations, and the agreed scope.
                      The appropriate programme can be discussed once the project brief is reviewed.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {feasibilityStudiesFaq.map((item, index) => (
                        <details key={`${item.q}-${index}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Feasibility Study Requirements</h2>
                    <p className={styles.bodyText}>
                      Share your proposed site or project, intended use, development objectives, available
                      information, and current project stage. Our team will review the appropriate feasibility scope
                      and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a feasibility study</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isConstructionSupervisionPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Construction Supervision by Building Practice Ltd</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides construction supervision services in Lagos for homeowners,
                      property owners, developers, businesses, institutions, and project teams that need practical
                      site-level oversight of suitable construction work.
                    </p>
                    <p className={styles.bodyText}>
                      Our documented scope includes site supervision and monitoring, quality control and workmanship
                      verification, progress tracking, material inspection, contractor performance evaluation, site
                      meeting coordination, photo documentation, reporting, snag identification, and handover
                      coordination. The agreed service scope and visit frequency depend on the project.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request construction supervision</Link>
                      <Link href="/projects">View our project portfolio</Link>
                      <Link href="/services/leading-building-construction-firm-in-nigeria">Explore building construction services</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>What Is Construction Supervision?</h2>
                    <p className={styles.bodyText}>
                      Construction supervision is professional site-level oversight of ongoing activities,
                      workmanship, materials, progress, contractor work, and coordination against the agreed project
                      information. It helps clients maintain visibility over work on site without guaranteeing that
                      every construction issue can be eliminated.
                    </p>
                    <p className={styles.bodyText}>
                      It differs from <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link>, which has a broader role across planning, budget, schedule, and delivery, and from <Link href="/services/leading-construction-management-firm-in-nigeria">construction management</Link>, which addresses broader execution coordination. Construction consultation provides advice; supervision concerns actual work on site.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Construction Supervision Services in Lagos</h2>
                    <h3>Construction Site Supervision</h3>
                    <p className={styles.bodyText}>We monitor ongoing site activities, work sequencing, contractor performance, and coordination within the agreed supervision scope.</p>
                    <h3>Workmanship and Quality Checks</h3>
                    <p className={styles.bodyText}>The documented service includes quality control and workmanship verification against the available project requirements and information.</p>
                    <h3>Progress Monitoring and Reporting</h3>
                    <p className={styles.bodyText}>Construction progress tracking, photo documentation, and reporting can help clients review completed work, current activities, and issues requiring attention.</p>
                    <h3>Material Inspection and Contractor Monitoring</h3>
                    <p className={styles.bodyText}>The scope includes material inspection and approval as well as contractor performance evaluation, subject to the project information and agreed responsibilities.</p>
                    <h3>Snag Identification and Handover Coordination</h3>
                    <p className={styles.bodyText}>Snag identification, issue follow-up, and handover coordination can form part of the agreed supervision engagement. This does not represent a completion-certification authority role.</p>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Quality Control and Inspection</h2>
                    <p className={styles.bodyText}>
                      Workmanship checks, material observations, site meetings, and quality checkpoints can help a
                      project team identify visible defects, quality inconsistencies, construction deviations, and
                      outstanding work earlier. Technical structural or specialist concerns may require assessment by
                      an appropriately qualified engineer.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Progress Monitoring</h2>
                    <p className={styles.bodyText}>
                      Progress monitoring considers completed activities, current site work, contractor activity,
                      milestone status, outstanding tasks, and issues that may affect the next stage. Reporting and
                      photographic documentation can support clearer discussion and follow-up without promising a
                      particular delivery outcome.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Ensuring Construction Follows Approved Designs</h2>
                    <p className={styles.bodyText}>
                      Site supervision can review construction against the project information available for the
                      engagement, such as architectural drawings, structural information, MEP information, and
                      specifications where applicable. Explore our <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design</Link> and <Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria">building permit and regulatory compliance services</Link> for connected requirements.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Why Construction Supervision Is Important</h2>
                    <p className={styles.bodyText}>
                      Professional oversight can help clients monitor quality, progress, materials, contractor
                      activities, and design intent; identify issues earlier; improve project visibility; and support
                      clearer accountability on site. It cannot eliminate all risks, delays, defects, or changes that
                      may arise during construction.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Risks of Poor Construction Supervision</h2>
                    <p className={styles.bodyText}>
                      Without appropriate oversight, projects may be more exposed to unnoticed workmanship problems,
                      material concerns, construction deviations, rework, delays, coordination gaps, incomplete
                      documentation, and reduced visibility for the client. The relevant risks vary by project and
                      contractor arrangement.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Construction Supervision Process</h2>
                    <div className={styles.processList}>
                      {[
                        { title: "Project Brief and Documentation Review", desc: "Clarify the site, scope, available drawings, project requirements, and agreed supervision responsibilities." },
                        { title: "Site Inspection and Monitoring Plan", desc: "Review current site conditions and agree the appropriate inspection and monitoring approach." },
                        { title: "Construction Monitoring", desc: "Monitor agreed site activities, workmanship, materials, progress, and coordination items." },
                        { title: "Issue Identification and Reporting", desc: "Document relevant observations, outstanding work, and items requiring project-team attention." },
                        { title: "Follow-Up and Handover Coordination", desc: "Follow up on agreed actions and support snag or handover coordination where included in the engagement." },
                      ].map((step, index) => (
                        <div key={`${step.title}-${index}`} className={styles.processStep}>
                          <span className={styles.processNumber}>{index + 1}</span>
                          <div><h3>{step.title}</h3><p>{step.desc}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Construction Supervision for Homeowners and Developers</h2>
                    <p className={styles.bodyText}>
                      Homeowners may use professional supervision when they want clearer visibility into contractor
                      work or cannot visit a site regularly. Developers and commercial project teams may need support
                      coordinating several contractors, monitoring milestones, and documenting site issues. Related
                      services include <Link href="/services/leading-real-estate-development-firm-in-nigeria">real estate development</Link>, <Link href="/services/leading-construction-management-firm-in-nigeria">construction management</Link>, and <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link>.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Residential and Commercial Construction Supervision in Lagos</h2>
                    <p className={styles.bodyText}>
                      The documented project context supports suitable residential, commercial, hospitality,
                      institutional, and mixed-use building briefs. Construction supervision should be tailored to the
                      property type, project stage, available documentation, contractor arrangement, and agreed scope.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Much Does Construction Supervision Cost in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Fees depend on project size, duration, location, complexity, site-visit frequency, reporting
                      needs, scope of supervision, and the number of contractors or consultants involved. Contact our
                      team with your project brief for a project-specific quotation.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Often Should a Construction Site Be Supervised?</h2>
                    <p className={styles.bodyText}>
                      The appropriate frequency depends on project stage, complexity, contractor arrangements, risk,
                      project requirements, and the agreed professional scope. Not every project requires daily site
                      supervision; the approach should be agreed for the particular project.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Related Construction and Design Services</h2>
                    <p className={styles.bodyText}>
                      Construction supervision may connect to <Link href="/services/leading-construction-consultation-firm-in-nigeria">construction consultation</Link>, <Link href="/services/leading-building-construction-firm-in-nigeria">building construction</Link>, <Link href="/services/leading-green-building-advisory-firm-in-nigeria">green building advisory</Link>, <Link href="/services/leading-urban-development-firm-in-nigeria">urban development</Link>, and <Link href="/services/leading-interior-design-firm-in-nigeria">interior design</Link> where relevant to the project.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {constructionSupervisionFaq.map((item, index) => (
                        <details key={`${item.q}-${index}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Construction Supervision Needs</h2>
                    <p className={styles.bodyText}>
                      Share your project type, site location, current stage, available drawings, contractor
                      arrangement, and the oversight you need. Our team will review the appropriate supervision scope
                      and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request construction supervision</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isBuildingPermitsPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Building Permit and Regulatory Compliance Services</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd supports property owners, homeowners, developers, businesses,
                      institutions, and project teams preparing for building permits, planning approvals, and
                      regulatory compliance requirements in Lagos.
                    </p>
                    <p className={styles.bodyText}>
                      Our documented scope includes building permit application preparation, regulatory requirement
                      analysis, planning approval support, documentation and filing management, and coordination for
                      suitable project briefs. The exact requirements, process, and decision remain dependent on the
                      project and applicable authority.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your building approval requirements</Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Explore architectural design services</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>What Is a Building Permit?</h2>
                    <p className={styles.bodyText}>
                      A building permit or approval generally records that a development proposal has been considered
                      through an applicable approval process. It can involve project information, drawings,
                      documentation, and review against relevant requirements. Terminology and requirements vary by
                      project and authority.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>What Is Building Regulatory Compliance?</h2>
                    <p className={styles.bodyText}>
                      Building regulatory compliance concerns how a proposed or ongoing development aligns with
                      applicable planning requirements, approved information, development controls, and relevant
                      construction considerations. Our role is professional project and documentation support, not
                      legal advice or a substitute for confirmation from the applicable authority.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Building Permit Services in Lagos</h2>
                    <h3>Building Permit Application Preparation</h3>
                    <p className={styles.bodyText}>We prepare permit-application information for the agreed project scope and help organize the relevant project documentation.</p>
                    <h3>Regulatory Requirements Assessment</h3>
                    <p className={styles.bodyText}>We review the available project information and identify regulatory requirements that should be clarified for the applicable approval process.</p>
                    <h3>Planning Approval Support</h3>
                    <p className={styles.bodyText}>Our documented service includes planning approval support for suitable development and construction briefs.</p>
                    <h3>Documentation and Filing Management</h3>
                    <p className={styles.bodyText}>We coordinate the agreed documentation and filing tasks, recognising that authorities may require further information or revisions during their review.</p>
                  </div>

                  <div className={styles.block}>
                    <h2>Building Approval Documentation and Preparation</h2>
                    <p className={styles.bodyText}>
                      Consistent project information helps a team prepare for an approval process. Depending on the
                      project and applicable authority, this can involve architectural and engineering information,
                      site information, supporting documents, and other consultant inputs. Requirements should always
                      be confirmed for the particular project rather than assumed from a generic list.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Planning Approval Services in Lagos</h2>
                    <p className={styles.bodyText}>
                      Planning approval support can connect the development proposal, site planning, land-use
                      considerations, building design, and supporting documentation.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Why Building Permits and Approvals Matter</h2>
                    <p className={styles.bodyText}>
                      Addressing applicable approvals before construction can support clearer documentation, better
                      coordination, and a more informed development process. Starting work without the approvals that
                      apply to a project may create regulatory problems, delays, redesign, additional costs, or
                      documentation issues depending on the relevant requirements.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Building Permit Requirements in Lagos</h2>
                    <p className={styles.bodyText}>
                      Requirements can vary according to project type, location, land use, development scale, building
                      characteristics, and the applicable authority. This page does not provide a definitive statutory
                      checklist; current requirements should be confirmed directly with the relevant authority before
                      an application or construction decision is made.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Building Approval Process in Lagos</h2>
                    <p className={styles.bodyText}>
                      At a high level, a project team may define the proposal, review site and project information,
                      prepare relevant drawings and documentation, clarify applicable requirements, submit through the
                      appropriate process, respond to requested information or revisions, and maintain documentation
                      for project execution. The exact process depends on the project and applicable authority.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Factors That Can Affect Building Approval</h2>
                    <p className={styles.bodyText}>
                      Project location, land use, development type, site conditions, building size, project complexity,
                      drawing quality, documentation completeness, specialist inputs, and requested revisions can all
                      affect an approval process. They do not guarantee a particular approval result or timeline.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Much Does a Building Permit Cost in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Total costs may include applicable statutory charges and separate professional service fees.
                      They can depend on project type, development size, location, documentation needs, specialist
                      inputs, and complexity. Current authority charges should be verified directly; a project brief
                      is needed before professional fees can be discussed responsibly.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Long Does Building Approval Take in Lagos?</h2>
                    <p className={styles.bodyText}>
                      Timelines can vary with project complexity, documentation completeness, authority review,
                      requested revisions, project type, applicable procedures, and required approvals. Building
                      Practice Ltd does not publish fixed approval timelines or guarantee approval outcomes.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Pre-Construction Compliance and Design Coordination</h2>
                    <p className={styles.bodyText}>
                      Addressing approval and compliance considerations before construction helps connect design,
                      documentation, consultant coordination, and construction readiness. Explore our <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design</Link>, <Link href="/services/leading-construction-consultation-firm-in-nigeria">construction consultation</Link>, <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link>, and <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link> for related support.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Coordinating Building Approvals with Engineering Design</h2>
                    <p className={styles.bodyText}>
                      Building approval documentation may need coordinated inputs from the project disciplines involved.
                      This page does not claim approval authority.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Building Permit and Compliance Services for Different Project Types</h2>
                    <p className={styles.bodyText}>
                      The wider documented service context supports suitable residential, commercial, hospitality,
                      institutional, and development projects where the brief and available information align. Estate
                      and larger development briefs may also involve <Link href="/services/leading-real-estate-development-firm-in-nigeria">real estate development</Link> or <Link href="/services/leading-urban-development-firm-in-nigeria">urban development</Link> planning.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {buildingPermitsFaq.map((item, index) => (
                        <details key={`${item.q}-${index}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Building Approval Requirements</h2>
                    <p className={styles.bodyText}>
                      Share your project type, location, available drawings, current documentation, and project stage.
                      Our team will review the appropriate support scope and next steps for your brief.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request building permit support</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isRealEstateDevelopmentPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Real Estate Development Services</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd supports property owners, developers, businesses, institutions, and other
                      organizations planning residential, commercial, mixed-use, and related building developments in
                      Lagos and across Nigeria. Our role is to connect development objectives with feasibility,
                      planning, design, construction, and project delivery decisions.
                    </p>
                    <p className={styles.bodyText}>
                      For clients comparing real estate development firms in Lagos, this service focuses on the parts of
                      development the practice can evidence through its service cluster: feasibility studies, property
                      planning, architectural design, construction, project management, construction management, and
                      coordination. It does not present land brokerage, financing, sales, or leasing as services without
                      separate confirmation.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your development project</Link>
                      <Link href="/projects">View our projects</Link>
                      <Link href="/about">Learn about Building Practice Ltd</Link>
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

                  <div className={styles.block}>
                    <h2>What Is Real Estate Development?</h2>
                    <p className={styles.bodyText}>
                      Real estate development is the coordinated process of evaluating a property opportunity, defining
                      a development brief, considering site and planning constraints, developing the design, coordinating
                      approvals, and delivering a usable property through construction and project management where those
                      services are engaged.
                    </p>
                    <p className={styles.bodyText}>
                      The broader industry process may also involve land acquisition, financing, valuation, sales, or
                      leasing. Those activities are not represented here as Building Practice Ltd services unless confirmed
                      separately; this page concentrates on the planning, design, construction, and coordination support
                      evidenced in the website.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Real Estate Development Services</h2>
                    <h3>Development Feasibility and Site Assessment</h3>
                    <p className={styles.bodyText}>
                      Feasibility work can help clarify development objectives, site potential, land-use considerations,
                      constraints, preliminary cost considerations, project risks, and the information needed before a
                      property development brief moves into detailed planning. This is development feasibility support,
                      not a promise of valuation, profitability, or investment returns.
                    </p>
                    <h3>Property Development Planning</h3>
                    <p className={styles.bodyText}>
                      We help translate the intended use of a site into a clearer development strategy, project scope,
                      spatial concept, planning direction, and potential phasing approach. Residential, commercial, and
                      mixed-use development planning can be considered where the project brief is suitable.
                    </p>
                    <h3>Architectural Design and Development Planning</h3>
                    <p className={styles.bodyText}>
                      Architectural concepts, building layouts, design coordination, and technical documentation form the
                      building-level part of a development. See our <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design services</Link> for the detailed design scope.
                    </p>
                    <h3>Construction and Project Delivery</h3>
                    <p className={styles.bodyText}>
                      Once a development is planned and documented, our <Link href="/services/leading-building-construction-firm-in-nigeria">building construction services</Link> can support physical execution. <Link href="/services/leading-construction-management-firm-in-nigeria">Construction management</Link> and <Link href="/services/leading-project-management-firm-in-nigeria">project management</Link> provide related coordination, oversight, scheduling, reporting, and delivery controls.
                    </p>
                    <h3>Regulatory and Approval Coordination</h3>
                    <p className={styles.bodyText}>
                      We can support planning documentation and coordination around relevant approval requirements where
                      the project scope aligns. Approvals remain the responsibility of the appropriate authorities, and
                      no approval outcome is guaranteed.
                    </p>
                    <h3>Development Coordination</h3>
                    <p className={styles.bodyText}>
                      Development planning benefits from coordination between architects, engineers, contractors,
                      consultants, suppliers, and stakeholders. Our related project and construction services help keep
                      design intent, scope, sequence, and delivery decisions connected.
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>Development Planning and Delivery Scope</h2>
                      <ul className={styles.featureList}>
                        {service.features.filter((feature) => !["Land acquisition and feasibility analysis", "Project financing and investment advisory", "Sales, leasing, and marketing services", "Investor liaison and returns optimization"].includes(feature)).map((f, i) => (
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
                      <h2>Our Real Estate Development Process</h2>
                      <div className={styles.processList}>
                        {[
                          { title: "Consultation and Project Brief", desc: "Clarify the site, intended use, development objectives, current documentation, and project stage." },
                          { title: "Feasibility Study and Site Assessment", desc: "Review site potential, constraints, planning context, preliminary costs, and development risks." },
                          { title: "Development Planning and Design", desc: "Shape the development strategy, design direction, layouts, documentation, and coordination requirements." },
                          { title: "Approvals and Documentation", desc: "Prepare and coordinate relevant technical and planning documentation; final approvals remain with the authorities." },
                          { title: "Construction and Project Execution", desc: "Connect the approved development plan to construction, project management, and construction management support where engaged." },
                          { title: "Completion and Handover", desc: "Coordinate completion activities, documentation, and handover requirements for the delivered project scope." },
                        ].map((step, i) => (
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
                    <h2>Types of Real Estate Developments</h2>
                    <h3>Residential Developments</h3>
                    <p className={styles.bodyText}>We provide development planning and related services for homes, apartments, duplexes, housing estates, and residential communities where the brief matches our capabilities.</p>
                    <h3>Commercial Developments</h3>
                    <p className={styles.bodyText}>Commercial property planning can include offices, retail spaces, business premises, and other commercial building projects supported by the relevant design and delivery services.</p>
                    <h3>Mixed-Use Developments</h3>
                    <p className={styles.bodyText}>Mixed-use planning considers how residential, office, retail, and shared functions can be coordinated within one development concept.</p>
                    <h3>Institutional and Related Developments</h3>
                    <p className={styles.bodyText}>Institutional, hospitality, industrial, and logistics contexts can be considered where they align with the project scope and the practice&apos;s documented architectural, construction, and management capabilities.</p>
                  </div>

                  <div className={styles.block}>
                    <h2>Real Estate Development in Lagos</h2>
                    <p className={styles.bodyText}>
                      Property development in Lagos requires attention to location, access, drainage, utilities,
                      infrastructure, planning requirements, density, site conditions, and the relationship between
                      buildings and the surrounding urban context. Our development approach keeps these practical factors
                      visible from feasibility through delivery coordination.
                    </p>
                    <p className={styles.bodyText}>
                      For larger land-use and infrastructure questions, our <Link href="/services/leading-urban-development-firm-in-nigeria">urban development services</Link> address the master-planning context. For sustainability objectives, see our <Link href="/services/leading-green-building-advisory-firm-in-nigeria">green building advisory</Link> service.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Factors Affecting Real Estate Development Costs in Lagos</h2>
                    <p className={styles.bodyText}>
                      Development costs vary by land and location, project size, development type, design complexity,
                      construction materials, labour, infrastructure, utilities, approvals, site conditions, project
                      duration, and finishes or specifications. A project-specific brief is required before any cost
                      estimate can be responsibly prepared.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Common Challenges in Real Estate Development</h2>
                    <p className={styles.bodyText}>
                      Common challenges include inadequate feasibility analysis, unclear development objectives,
                      unrealistic budgets, approval delays, poor contractor coordination, weak project planning,
                      construction cost changes, infrastructure constraints, and quality-control gaps. Professional
                      feasibility, design coordination, project management, and construction management can help identify
                      and reduce these risks, but no planning process removes every project risk.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Professional Development Planning Adds Value</h2>
                    <p className={styles.bodyText}>
                      Clear development planning supports better decisions, clearer scope, earlier risk identification,
                      coordinated design, more informed construction oversight, efficient resource allocation, and
                      long-term project functionality. It can also help align a scheme with intended users and the
                      practical conditions of its location without guaranteeing profitability, sales, rental income, or
                      investment returns.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Related Real Estate and Construction Services</h2>
                    <p className={styles.bodyText}>
                      Explore our <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design services</Link>, <Link href="/services/leading-building-construction-firm-in-nigeria">building construction services</Link>, <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link>, <Link href="/services/leading-project-management-firm-in-nigeria">project management services</Link>, <Link href="/services/leading-construction-consultation-firm-in-nigeria">construction consultation</Link>, and <Link href="/services/leading-interior-design-firm-in-nigeria">interior design services</Link> for connected development requirements.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/projects">View our project portfolio</Link>
                      <Link href="/team">Meet the team</Link>
                      <Link href="/blog">Read development insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {realEstateDevelopmentFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Real Estate Development Project</h2>
                    <p className={styles.bodyText}>
                      Share your site, intended use, development objectives, available documentation, and current
                      project stage. Our team will help identify the appropriate feasibility, planning, design, and
                      delivery next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a development consultation</Link>
                      <Link href="/projects">View our projects</Link>
                    </div>
                  </div>
                </>
              ) : isGreenBuildingAdvisoryPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Sustainable Building Solutions by Building Practice Ltd</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides green building advisory services for developers, homeowners,
                      corporate organizations, institutions, investors, and public-sector projects where sustainability
                      objectives form part of the brief. We help clients make practical decisions about environmental
                      performance, occupant comfort, energy, water, materials, and resource use.
                    </p>
                    <p className={styles.bodyText}>
                      For clients comparing green building advisory firms in Lagos, our role is to help integrate
                      sustainability into design and construction planning. This is building-level advisory work focused
                      on energy, water, materials, indoor environmental quality, and certification support, rather than
                      urban-scale master planning or construction execution alone.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your green building project</Link>
                      <Link href="/projects">View our projects</Link>
                      <Link href="/about#certifications">Review our credentials</Link>
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

                  <div className={styles.block}>
                    <h2>What Is Green Building Advisory?</h2>
                    <p className={styles.bodyText}>
                      Green building advisory is professional guidance for planning and delivering buildings with
                      considered environmental performance, energy and water efficiency, occupant comfort, resource
                      efficiency, and long-term operational needs. The right strategy depends on the project brief,
                      site, climate, systems, materials, budget, and sustainability objectives.
                    </p>
                    <p className={styles.bodyText}>
                      In Lagos and other Nigerian contexts, this may include practical responses to heat, solar
                      exposure, cooling demand, daylight, natural ventilation, water use, and material availability
                      without relying on unsupported performance guarantees.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Green Building Advisory Services</h2>
                    <h3>Sustainable Building Design Consultation</h3>
                    <p className={styles.bodyText}>
                      We advise on passive design, climate-responsive architecture, building orientation where
                      applicable, solar exposure, shading, natural daylight, natural ventilation, passive cooling, and
                      site-responsive design. Sustainability can be considered alongside the project&apos;s architectural
                      brief from the early planning stage.
                    </p>
                    <h3>Energy Efficiency Planning</h3>
                    <p className={styles.bodyText}>
                      Our advisory scope can include energy efficiency planning and modeling, solar integration
                      recommendations, efficient HVAC strategies, efficient lighting, and coordination of building
                      systems with the project&apos;s performance objectives. We do not promise a fixed energy saving without
                      project-specific evidence.
                    </p>
                    <h3>Green Building Certification Support</h3>
                    <p className={styles.bodyText}>
                      We provide advisory, documentation, and design coordination support for green building
                      certification requirements such as LEED and EDGE. Building Practice Ltd does not award those
                      certifications; the relevant certification bodies make the certification decisions.
                    </p>
                    <h3>Sustainable Materials and Resource Efficiency</h3>
                    <p className={styles.bodyText}>
                      We help project teams consider locally sourced, lower-impact, and recycled materials where
                      appropriate, alongside durability, maintenance, availability, and resource efficiency. We also
                      advise on construction waste reduction and practical material planning.
                    </p>
                    <h3>Water Efficiency and Waste Management</h3>
                    <p className={styles.bodyText}>
                      Our guidance can cover water conservation, rainwater harvesting, greywater systems, construction
                      waste management, and resource planning as part of a broader sustainable building strategy.
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Our Green Building Advisory Covers</h2>
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
                      <h2>Our Green Building Advisory Process</h2>
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
                    <h2>Green Building Advisory in Lagos and Nigeria</h2>
                    <p className={styles.bodyText}>
                      Sustainable building design in Lagos needs to respond to local climate conditions, solar exposure,
                      ventilation, cooling demand, water use, maintenance, and the practical availability of materials
                      and systems. Our advisory approach keeps these considerations connected to the project&apos;s design
                      and delivery decisions.
                    </p>
                    <p className={styles.bodyText}>
                      When sustainability advice forms part of a wider development, our <Link href="/services/leading-urban-development-firm-in-nigeria">urban development services</Link> address the larger land-use, infrastructure, and planning context. For building-level design, see our <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design services</Link>.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Green Building Cost Considerations</h2>
                    <p className={styles.bodyText}>
                      Advisory scope and project cost depend on the size and complexity of the project, certification
                      requirements, sustainability targets, technology and system requirements, site conditions,
                      location, logistics, and the level of documentation or implementation support required. A project
                      brief is needed before costs can be discussed responsibly.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Related Design and Delivery Services</h2>
                    <p className={styles.bodyText}>
                      Green building advisory can complement architectural design, construction planning, and delivery
                      services without replacing them. Explore our <Link href="/services/leading-building-construction-firm-in-nigeria">building construction services</Link>, <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link>, <Link href="/services/leading-project-management-firm-in-nigeria">project management services</Link>, and <Link href="/services/leading-construction-consultation-firm-in-nigeria">construction consultation</Link> for related project needs.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/leading-interior-design-firm-in-nigeria">Explore interior design services</Link>
                      <Link href="/projects">View our project portfolio</Link>
                      <Link href="/blog">Read sustainability insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {greenBuildingAdvisoryFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Green Building Project</h2>
                    <p className={styles.bodyText}>
                      Share your project type, site location, sustainability objectives, and current stage with our
                      team. We will help identify the appropriate advisory and coordination next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a green building consultation</Link>
                      <Link href="/services">Explore all services</Link>
                    </div>
                  </div>
                </>
              ) : isUrbanDevelopmentPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Urban Development Services</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides urban development services for developers, landowners, public-sector
                      bodies, institutions, and organizations planning coordinated growth in Lagos and across Nigeria.
                      We help translate development goals into practical spatial strategies covering land use, movement,
                      infrastructure, public space, and phased delivery.
                    </p>
                    <p className={styles.bodyText}>
                      For clients comparing urban development firms in Lagos, our work is centered on master planning,
                      urban design, estate planning, mixed-use development, infrastructure integration, and the renewal
                      of underused areas. The focus is the development framework around buildings, rather than the
                      architectural design of one building alone.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your development project</Link>
                      <Link href="/projects">View our projects</Link>
                      <Link href="/about">Learn about Building Practice Ltd</Link>
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

                  <div className={styles.block}>
                    <h2>Our Urban Development Services</h2>
                    <h3>Master Planning and Urban Design</h3>
                    <p className={styles.bodyText}>
                      We develop structured frameworks for land-use planning, zoning, residential and mixed-use layouts,
                      road networks, circulation, public spaces, community planning, and infrastructure integration.
                      These decisions establish how a development works as a connected place.
                    </p>
                    <h3>Residential Estate Development</h3>
                    <p className={styles.bodyText}>
                      Our estate master planning work supports housing layouts, access, utilities, recreation, landscape
                      structure, and security planning for residential communities and gated estates.
                    </p>
                    <h3>Commercial and Mixed-Use Development</h3>
                    <p className={styles.bodyText}>
                      We plan commercial districts, business parks, retail complexes, and mixed-use environments where
                      residential, office, retail, and community functions need to work together. The objective is a
                      functional layout that supports long-term commercial viability without promising financial returns.
                    </p>
                    <h3>Infrastructure Planning</h3>
                    <p className={styles.bodyText}>
                      Infrastructure planning may include roads and transportation networks, drainage and stormwater
                      systems, power and utilities, water supply, sewage, and smart-city infrastructure integration.
                      These systems are considered alongside land use and development phasing.
                    </p>
                    <h3>Urban Renewal and Redevelopment</h3>
                    <p className={styles.bodyText}>
                      For underused or outdated areas, we provide site analysis, redevelopment strategy, layout
                      restructuring, infrastructure upgrade planning, and district modernization support.
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Our Urban Development Service Covers</h2>
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
                      <h2>Our Urban Development Process</h2>
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
                    <h2>Urban Development Services for Different Sectors</h2>
                    <p className={styles.bodyText}>
                      Our urban development services support residential housing estates, commercial and business
                      districts, industrial and logistics hubs, government and public infrastructure, and institutional
                      developments including schools, healthcare facilities, and civic centers.
                    </p>
                    <p className={styles.bodyText}>
                      We also support sustainable urban development strategies that connect growth, infrastructure,
                      movement, public space, and the practical needs of the Nigerian context.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Urban Development in Lagos and Nigeria</h2>
                    <p className={styles.bodyText}>
                      Development planning in Lagos requires careful attention to land use, access, drainage, utilities,
                      infrastructure capacity, and the relationship between private development and shared urban systems.
                      Our approach keeps those dependencies visible from feasibility through implementation planning.
                    </p>
                    <p className={styles.bodyText}>
                      Where individual buildings form part of a larger development, our <Link href="/services/leading-architectural-design-firm-in-nigeria">architectural design services</Link> can support the building-level design and documentation. For physical execution and delivery coordination, review our <Link href="/services/leading-building-construction-firm-in-nigeria">building construction services</Link>, <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link>, and <Link href="/services/leading-project-management-firm-in-nigeria">project management services</Link>.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Planning, Approvals, and Delivery Coordination</h2>
                    <p className={styles.bodyText}>
                      We support clients through relevant planning and approval processes, technical documentation, and
                      coordination with the wider project team. Approvals remain the responsibility of the appropriate
                      authorities; our role is to help clients prepare and navigate the development process.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria">Explore construction consultation</Link>
                      <Link href="/services">Explore all services</Link>
                      <Link href="/blog">Read development insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {urbanDevelopmentFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Development Project</h2>
                    <p className={styles.bodyText}>
                      Share your site, development objectives, location, and project stage with our team. We will help
                      identify the next practical steps for urban development planning in Lagos or elsewhere in Nigeria.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request an urban development consultation</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isArchitecturalDesignPage ? (
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
                      hospitality facilities, mixed-use developments, and institutional buildings.
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
                      <Link href="/services/leading-building-construction-firm-in-nigeria">Explore building construction services</Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Explore architectural design services</Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria">Explore interior design services</Link>
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
                      institutional, and mixed-use projects, including design-and-build scopes where
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
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Architectural design service</Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria">Interior design service</Link>
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
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria">Explore construction consultation</Link>
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
                      <Link href="/services/leading-construction-management-firm-in-nigeria">Explore construction management</Link>
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
                      When you need broader coordination during execution, our <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link> are available as a related
                      offering.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Architectural design services</Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria">Interior design services</Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria">Construction management services</Link>
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
                      <Link href="/services/leading-construction-management-firm-in-nigeria">Explore construction management</Link>
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
                      <Link href="/services/leading-building-construction-firm-in-nigeria">Explore building construction services</Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria">Explore construction management</Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria">Explore construction consultation</Link>
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
                      If you need the execution-focused side of delivery, our <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link> are a related
                      option.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Architectural design services</Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria">Interior design services</Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria">Construction consultation services</Link>
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
                      <Link href="/services/leading-construction-management-firm-in-nigeria">Explore construction management</Link>
                    </div>
                  </div>
                </>
              ) : isBuildingConstructionPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Building Construction Services</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides building construction services for clients who need practical,
                      quality-focused project execution from site preparation through final handover. We support
                      residential, commercial, and institutional building projects with structured delivery
                      coordination and clear communication.
                    </p>
                    <p className={styles.bodyText}>
                      If you are comparing building construction firms in Lagos, this service is built for clients who
                      want experienced teams, coordinated site activities, and construction outcomes aligned with
                      approved project requirements.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Start your building project</Link>
                      <Link href="/projects">View our project portfolio</Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria">Explore construction management services</Link>
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

                  <div className={styles.block}>
                    <h2>Our Building Construction Services</h2>
                    <p className={styles.bodyText}>
                      Our building construction scope covers core structural works, coordinated installation stages,
                      and finishing activities required to move projects from approved plans to completed buildings.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h3>Residential Building Construction</h3>
                    <p className={styles.bodyText}>
                      We support residential building projects including homes, apartments, duplexes, and estate
                      developments where disciplined construction planning and quality workmanship are essential.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h3>Commercial Building Construction</h3>
                    <p className={styles.bodyText}>
                      We also execute commercial building projects such as offices, retail spaces, hospitality
                      facilities, and mixed-use developments based on project scope and approved specifications.
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h3>Building Project Execution Scope</h3>
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

                  <div className={styles.block}>
                    <h3>Construction Coordination for Delivery</h3>
                    <p className={styles.bodyText}>
                      Building construction projects involve many moving parts, from site activities and material
                      logistics to sequencing of trades and progress updates. Our approach supports better
                      coordination across those activities to reduce avoidable rework and communication gaps.
                    </p>
                    <p className={styles.bodyText}>
                      For broader execution oversight and project controls, you can also review our <Link href="/services/leading-construction-management-firm-in-nigeria">construction management services</Link> and
                      <Link href="/services/leading-project-management-firm-in-nigeria"> project management services</Link>.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h3>Quality-Focused Construction</h3>
                    <p className={styles.bodyText}>
                      We prioritize workmanship quality, material suitability, and alignment with approved drawings
                      and specifications through each construction stage. This helps improve consistency and supports
                      more reliable project outcomes at completion.
                    </p>
                  </div>

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Building Construction Process</h2>
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
                    <h2>Building Construction in Lagos</h2>
                    <p className={styles.bodyText}>
                      Construction projects in Lagos often require careful planning around site logistics, access,
                      procurement timing, and sequencing of activities. Our construction delivery workflow is designed
                      to support those realities while keeping project communication clear.
                    </p>
                    <p className={styles.bodyText}>
                      We also support projects in other parts of Nigeria where project scope and logistics are a good
                      fit.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Project Types We Support</h2>
                    <p className={styles.bodyText}>
                      Our building construction services can support residential homes and estates, commercial
                      buildings, institutional facilities, and selected specialized scopes such as swimming pools and
                      external landscaping where these are part of the project brief.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Architectural design services</Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria">Interior design services</Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria">Construction consultation services</Link>
                    </div>
                  </div>

                  {featuredBuildingConstructionProjects.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Building Construction Projects</h2>
                      <div className={styles.projectGrid}>
                        {featuredBuildingConstructionProjects.map((project) => (
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
                    <h2>Why Choose Building Practice Ltd for Building Construction?</h2>
                    <ul className={styles.featureList}>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Integrated building delivery from site preparation to finishing and handover.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Construction coordination focused on execution quality, sequencing, and communication.</span>
                      </li>
                      <li>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>Architecture-led project context that supports buildability and practical outcomes.</span>
                      </li>
                    </ul>
                    <div className={styles.linkRow}>
                      <Link href="/about">Learn more about Building Practice Ltd</Link>
                      <Link href="/team">Meet our construction and delivery team</Link>
                      <Link href="/blog">Read construction insights</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {buildingConstructionFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Start Your Building Project</h2>
                    <p className={styles.bodyText}>
                      If you are planning a building project in Lagos, share your requirements with our team and we
                      will review the practical next steps for construction execution.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your building project</Link>
                      <Link href="/projects">View completed projects</Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria">Explore project management services</Link>
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
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Explore architectural design services</Link>
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
                      <Link href="/services/leading-architectural-design-firm-in-nigeria">Pair with architectural design</Link>
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
              {!isBuildingCertificationPage && !isEnvironmentalImpactPage && !isLandSurveyingPage && !isFeasibilityStudiesPage && !isConstructionSupervisionPage && !isBuildingPermitsPage && !isRealEstateDevelopmentPage && !isGreenBuildingAdvisoryPage && !isUrbanDevelopmentPage && !isArchitecturalDesignPage && !isInteriorDesignPage && !isConstructionManagementPage && !isConstructionConsultationPage && !isBuildingConstructionPage && service.stats.length > 0 && (
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

              {isBuildingConstructionPage && (
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
                    <div className={styles.statNumber}>Execution</div>
                    <div className={styles.statLabel}>From Site Preparation to Finishing</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Handover</div>
                    <div className={styles.statLabel}>Completion-Oriented Delivery</div>
                  </div>
                </div>
              )}

              {isUrbanDevelopmentPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Service Location</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Project Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Planning</div>
                    <div className={styles.statLabel}>Land Use and Urban Systems</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Support</div>
                    <div className={styles.statLabel}>From Feasibility to Coordination</div>
                  </div>
                </div>
              )}

              {isGreenBuildingAdvisoryPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Service Location</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Project Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Energy</div>
                    <div className={styles.statLabel}>Efficiency Planning</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Support</div>
                    <div className={styles.statLabel}>LEED and EDGE Documentation</div>
                  </div>
                </div>
              )}

              {isRealEstateDevelopmentPage && (
                <div className={styles.statsCard}>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Lagos</div>
                    <div className={styles.statLabel}>Core Service Location</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Nigeria</div>
                    <div className={styles.statLabel}>Project Coverage</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Planning</div>
                    <div className={styles.statLabel}>Feasibility and Development Strategy</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Delivery</div>
                    <div className={styles.statLabel}>Design, Construction, and Coordination</div>
                  </div>
                </div>
              )}

              <div className={styles.ctaCard}>
                <h3>
                  {isBuildingCertificationPage
                    ? "Discuss Your Building Certification Needs"
                    : isEnvironmentalImpactPage
                    ? "Discuss Your Environmental Assessment Requirements"
                    : isLandSurveyingPage
                    ? "Discuss Your Land Surveying Requirements"
                    : isFeasibilityStudiesPage
                    ? "Discuss Your Feasibility Study Requirements"
                    : isConstructionSupervisionPage
                    ? "Discuss Your Construction Supervision Needs"
                    : isBuildingPermitsPage
                    ? "Discuss Your Building Approval Requirements"
                    : isRealEstateDevelopmentPage
                    ? "Discuss Your Real Estate Development Project"
                    : isGreenBuildingAdvisoryPage
                    ? "Discuss Your Green Building Project"
                    : isUrbanDevelopmentPage
                    ? "Discuss Your Development Project"
                    : isArchitecturalDesignPage
                    ? "Start Your Architectural Project"
                    : isConstructionManagementPage
                    ? "Discuss Your Construction Project"
                    : isBuildingConstructionPage
                    ? "Start Your Building Project"
                    : isConstructionConsultationPage
                    ? "Request a Construction Consultation"
                    : isInteriorDesignPage
                    ? "Start Your Interior Design Project"
                    : "Ready to start?"}
                </h3>
                <p>
                  {isBuildingCertificationPage
                    ? "Tell us about your property type, location, available documentation, current project stage, and the support you need, and our team will guide you on the appropriate scope."
                    : isEnvironmentalImpactPage
                    ? "Tell us about your project type, site location, intended development, available information, and current stage, and our team will guide you on the appropriate assessment scope."
                    : isLandSurveyingPage
                    ? "Tell us about your site location, intended use, available information, survey purpose, and project stage, and our team will guide you on the appropriate scope."
                    : isFeasibilityStudiesPage
                    ? "Tell us about your proposed site or project, objectives, available information, and project stage, and our team will guide you on the appropriate feasibility scope."
                    : isConstructionSupervisionPage
                    ? "Tell us about your project type, location, current stage, available drawings, contractor arrangement, and oversight needs, and our team will guide you on the appropriate scope."
                    : isBuildingPermitsPage
                    ? "Tell us about your project type, location, available drawings, current documentation, and project stage, and our team will guide you on the appropriate support scope."
                    : isRealEstateDevelopmentPage
                    ? "Tell us about your site, intended use, development objectives, and current project stage, and our team will guide you on practical next steps."
                    : isGreenBuildingAdvisoryPage
                    ? "Tell us about your project type, site, sustainability objectives, and current stage, and our team will guide you on practical next steps."
                    : isUrbanDevelopmentPage
                    ? "Tell us about your site, development goals, location, and current project stage, and our team will guide you on practical next steps."
                    : isArchitecturalDesignPage
                    ? "Tell us about your design brief and site context, and our team will guide you on the next steps."
                    : isConstructionManagementPage
                    ? "Tell us about your project scope, timeline, and coordination needs, and our team will advise on practical next steps."
                    : isBuildingConstructionPage
                    ? "Tell us about your building scope, timeline, and delivery priorities, and our team will review practical construction next steps."
                    : isConstructionConsultationPage
                    ? "Tell us about your project goals, budget concerns, or design questions, and our team will review the best next steps."
                    : isInteriorDesignPage
                    ? "Tell us about your interior goals, timeline, and space requirements, and our team will guide you on next steps."
                    : "Tell us about your project and we&apos;ll get back to you within 24 hours."}
                </p>
                <Link href="/contact" className="btn btn--primary btn--full">
                  <span>
                    {isBuildingCertificationPage || isEnvironmentalImpactPage || isLandSurveyingPage || isFeasibilityStudiesPage || isConstructionSupervisionPage || isBuildingPermitsPage || isRealEstateDevelopmentPage || isGreenBuildingAdvisoryPage || isUrbanDevelopmentPage || isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage || isConstructionConsultationPage || isBuildingConstructionPage
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
                  <Link href="/services/leading-construction-management-firm-in-nigeria" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>Explore Construction Management</span>
                    <i className="bx bx-hard-hat" aria-hidden="true" />
                  </Link>
                )}
                {isBuildingConstructionPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Building Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isUrbanDevelopmentPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Our Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isGreenBuildingAdvisoryPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Our Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isRealEstateDevelopmentPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Our Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {service.tags.length > 0 && (
                <div className={styles.tagsCard}>
                  {isEnvironmentalImpactPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-green-building-advisory-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-leaf" aria-hidden="true" /> Green Building Advisory
                      </Link>
                      <Link href="/services/leading-feasibility-studies-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-analyse" aria-hidden="true" /> Feasibility Studies
                      </Link>
                      <Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-file-find" aria-hidden="true" /> Building Permits &amp; Compliance
                      </Link>
                      <Link href="/services/leading-real-estate-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-landscape" aria-hidden="true" /> Real Estate Development
                      </Link>
                      <Link href="/services/leading-urban-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact Our Team
                      </Link>
                    </>
                  ) : isLandSurveyingPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-feasibility-studies-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-analyse" aria-hidden="true" /> Feasibility Studies
                      </Link>
                      <Link href="/services/leading-building-construction-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/leading-construction-supervision-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-user-check" aria-hidden="true" /> Construction Supervision
                      </Link>
                      <Link href="/services/leading-real-estate-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-landscape" aria-hidden="true" /> Real Estate Development
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact Our Team
                      </Link>
                    </>
                  ) : isFeasibilityStudiesPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-real-estate-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-landscape" aria-hidden="true" /> Real Estate Development
                      </Link>
                      <Link href="/services/leading-urban-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-file-find" aria-hidden="true" /> Building Permits &amp; Compliance
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact Our Team
                      </Link>
                    </>
                  ) : isConstructionSupervisionPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-building-construction-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-comment-detail" aria-hidden="true" /> Construction Consultation
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-building-permits-and-regulatory-compliance-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-file-find" aria-hidden="true" /> Building Permits &amp; Compliance
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact Our Team
                      </Link>
                    </>
                  ) : isBuildingPermitsPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-comment-detail" aria-hidden="true" /> Construction Consultation
                      </Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact Our Team
                      </Link>
                    </>
                  ) : isRealEstateDevelopmentPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-urban-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-building-construction-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/leading-green-building-advisory-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-leaf" aria-hidden="true" /> Green Building Advisory
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-comment-detail" aria-hidden="true" /> Construction Consultation
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/about" className="tag tag--outline tag--sm">
                        <i className="bx bx-info-circle" aria-hidden="true" /> About the Studio
                      </Link>
                    </>
                  ) : isGreenBuildingAdvisoryPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-urban-development-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/services/leading-building-construction-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-comment-detail" aria-hidden="true" /> Construction Consultation
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/about" className="tag tag--outline tag--sm">
                        <i className="bx bx-info-circle" aria-hidden="true" /> About the Studio
                      </Link>
                    </>
                  ) : isUrbanDevelopmentPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-building-construction-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
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
                  ) : isArchitecturalDesignPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> Architectural Services
                      </Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
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
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
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
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
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
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria" className="tag tag--outline tag--sm">
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
                  ) : isBuildingConstructionPage ? (
                    <>
                      <Link href="/services/leading-architectural-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/leading-interior-design-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/leading-construction-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/leading-project-management-firm-in-nigeria" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/leading-construction-consultation-firm-in-nigeria" className="tag tag--outline tag--sm">
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
