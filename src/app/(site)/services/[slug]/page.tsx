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
const BUILDING_CONSTRUCTION_SLUG = "building-construction";
const BUILDING_CONSTRUCTION_TITLE = "Building Construction Services in Lagos, Nigeria";
const BUILDING_CONSTRUCTION_DESCRIPTION =
  "Building construction services in Lagos, Nigeria for residential, commercial, and institutional projects. Building Practice Ltd supports site preparation, construction execution, finishing, and handover.";
const PROJECT_MANAGEMENT_SLUG = "project-management";
const PROJECT_MANAGEMENT_TITLE = "Project Management Services in Lagos, Nigeria";
const PROJECT_MANAGEMENT_DESCRIPTION =
  "Project management services in Lagos, Nigeria for construction and building projects. Building Practice Ltd provides planning, budgeting, coordination, reporting, and delivery support.";
const CONSTRUCTION_CONSULTATION_SLUG = "construction-consultation";
const CONSTRUCTION_CONSULTATION_TITLE = "Construction Consultation Services in Lagos, Nigeria";
const CONSTRUCTION_CONSULTATION_DESCRIPTION =
  "Construction consultation services in Lagos, Nigeria for planning, cost, contractor, material, and buildability decisions. Get practical advisory support from Building Practice Ltd.";
const URBAN_DEVELOPMENT_SLUG = "urban-development";
const URBAN_DEVELOPMENT_TITLE = "Urban Development Services in Lagos, Nigeria";
const URBAN_DEVELOPMENT_DESCRIPTION =
  "Building Practice Ltd provides urban development, master planning, urban design, and infrastructure planning services for Lagos and projects across Nigeria.";
const GREEN_BUILDING_ADVISORY_SLUG = "green-building-advisory";
const GREEN_BUILDING_ADVISORY_TITLE = "Green Building Advisory Services in Lagos, Nigeria";
const GREEN_BUILDING_ADVISORY_DESCRIPTION =
  "Building Practice Ltd provides green building advisory in Lagos, including sustainable design, energy efficiency, resource planning, and LEED or EDGE documentation support.";
const REAL_ESTATE_DEVELOPMENT_SLUG = "real-estate-development";
const REAL_ESTATE_DEVELOPMENT_TITLE = "Real Estate Development Services in Lagos, Nigeria";
const REAL_ESTATE_DEVELOPMENT_DESCRIPTION =
  "Building Practice Ltd supports real estate development in Lagos through feasibility, property planning, architectural design, construction, project management, and development coordination.";
const THREE_D_VISUALIZATION_SLUG = "3d-visualization";
const THREE_D_VISUALIZATION_TITLE = "3D Visualisation Services in Lagos, Nigeria";
const THREE_D_VISUALIZATION_DESCRIPTION =
  "Building Practice Ltd provides 3D visualisation services in Lagos, including architectural rendering, interior and exterior visuals, walkthroughs, animation, and design presentation support.";
const STRUCTURAL_ENGINEERING_SLUG = "structural-engineering";
const STRUCTURAL_ENGINEERING_TITLE = "Structural Engineering Services in Lagoss, Nigeria";
const STRUCTURAL_ENGINEERING_DESCRIPTION =
  "Building Practice Ltd provides structural engineering and design services in Lagos for building analysis, foundations, structural calculations, drawings, reinforced concrete, steel, and construction coordination.";

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

  if (slug === STRUCTURAL_ENGINEERING_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: STRUCTURAL_ENGINEERING_TITLE,
      description: STRUCTURAL_ENGINEERING_DESCRIPTION,
      keywords: [
        "Structural Engineering Services in Lagos",
        "Structural Engineering & Design firms in Lagos, Nigeria",
        "structural engineering company Lagos",
        "structural engineering firms Lagos",
        "structural engineers Lagos",
        "structural design services Lagos",
        "structural analysis Lagos",
        "structural calculations Lagos",
        "structural assessment Lagos",
        "building structural design Lagos",
        "structural engineering services Nigeria",
        "structural engineering consultants Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: STRUCTURAL_ENGINEERING_TITLE,
        description: STRUCTURAL_ENGINEERING_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: STRUCTURAL_ENGINEERING_TITLE,
        description: STRUCTURAL_ENGINEERING_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === THREE_D_VISUALIZATION_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: THREE_D_VISUALIZATION_TITLE,
      description: THREE_D_VISUALIZATION_DESCRIPTION,
      keywords: [
        "3D visualisation services in Lagos",
        "3D visualisation service firms in Lagos, Nigeria",
        "3D visualization company Lagos",
        "3D rendering services Lagos",
        "architectural 3D visualisation Lagos",
        "architectural 3D rendering Lagos",
        "architectural rendering services Lagos",
        "3D building visualization Lagos",
        "exterior 3D rendering Lagos",
        "interior 3D rendering Lagos",
        "architectural walkthrough services Lagos",
        "architectural visualization Nigeria",
        "3D visualization services Nigeria",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: THREE_D_VISUALIZATION_TITLE,
        description: THREE_D_VISUALIZATION_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: THREE_D_VISUALIZATION_TITLE,
        description: THREE_D_VISUALIZATION_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === REAL_ESTATE_DEVELOPMENT_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: REAL_ESTATE_DEVELOPMENT_TITLE,
      description: REAL_ESTATE_DEVELOPMENT_DESCRIPTION,
      keywords: [
        "real estate development service firms in Lagos, Nigeria",
        "real estate development firms in Lagos",
        "real estate development companies in Lagos",
        "real estate developers in Lagos",
        "property development services in Lagos",
        "real estate development consultants Lagos",
        "property development consultants Lagos",
        "residential property development Lagos",
        "commercial property development Lagos",
        "mixed-use development Lagos",
        "real estate development Nigeria",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: REAL_ESTATE_DEVELOPMENT_TITLE,
        description: REAL_ESTATE_DEVELOPMENT_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: REAL_ESTATE_DEVELOPMENT_TITLE,
        description: REAL_ESTATE_DEVELOPMENT_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === GREEN_BUILDING_ADVISORY_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: GREEN_BUILDING_ADVISORY_TITLE,
      description: GREEN_BUILDING_ADVISORY_DESCRIPTION,
      keywords: [
        "green building advisory service firms in Lagos, Nigeria",
        "green building advisory firms in Lagos",
        "green building advisory services in Lagos",
        "green building consultants in Lagos",
        "sustainable building consultants Lagos",
        "energy efficiency consultants Lagos",
        "sustainable building design Lagos",
        "LEED consulting Lagos",
        "EDGE certification consulting Lagos",
        "sustainable building materials Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: GREEN_BUILDING_ADVISORY_TITLE,
        description: GREEN_BUILDING_ADVISORY_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: GREEN_BUILDING_ADVISORY_TITLE,
        description: GREEN_BUILDING_ADVISORY_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

  if (slug === URBAN_DEVELOPMENT_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: URBAN_DEVELOPMENT_TITLE,
      description: URBAN_DEVELOPMENT_DESCRIPTION,
      keywords: [
        "urban development service firms in Lagos, Nigeria",
        "urban development firms in Lagos",
        "urban development services in Lagos",
        "urban planning firms Lagos",
        "master planning services Lagos",
        "mixed-use development planning Lagos",
        "infrastructure planning Lagos",
        "urban redevelopment Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: URBAN_DEVELOPMENT_TITLE,
        description: URBAN_DEVELOPMENT_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: URBAN_DEVELOPMENT_TITLE,
        description: URBAN_DEVELOPMENT_DESCRIPTION,
        images: [service.heroImage || DEFAULT_OG_IMAGE],
      },
    };
  }

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

  if (slug === BUILDING_CONSTRUCTION_SLUG) {
    const url = absoluteUrl(`/services/${slug}`);
    return {
      title: BUILDING_CONSTRUCTION_TITLE,
      description: BUILDING_CONSTRUCTION_DESCRIPTION,
      keywords: [
        "building construction service firms in Lagos, Nigeria",
        "building construction services in Lagos",
        "building construction firms in Lagos",
        "building construction companies in Lagos",
        "building contractors in Lagos",
      ],
      alternates: { canonical: url },
      robots: { index: true, follow: true },
      openGraph: {
        title: BUILDING_CONSTRUCTION_TITLE,
        description: BUILDING_CONSTRUCTION_DESCRIPTION,
        url,
        siteName: SITE_NAME,
        locale: "en_NG",
        type: "website",
        images: [{ url: service.heroImage || DEFAULT_OG_IMAGE }],
      },
      twitter: {
        card: "summary_large_image",
        title: BUILDING_CONSTRUCTION_TITLE,
        description: BUILDING_CONSTRUCTION_DESCRIPTION,
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
  const isBuildingConstructionPage = slug === BUILDING_CONSTRUCTION_SLUG;
  const isProjectManagementPage = slug === PROJECT_MANAGEMENT_SLUG;
  const isConstructionConsultationPage = slug === CONSTRUCTION_CONSULTATION_SLUG;
  const isUrbanDevelopmentPage = slug === URBAN_DEVELOPMENT_SLUG;
  const isGreenBuildingAdvisoryPage = slug === GREEN_BUILDING_ADVISORY_SLUG;
  const isRealEstateDevelopmentPage = slug === REAL_ESTATE_DEVELOPMENT_SLUG;
  const isThreeDVisualizationPage = slug === THREE_D_VISUALIZATION_SLUG;
  const isStructuralEngineeringPage = slug === STRUCTURAL_ENGINEERING_SLUG;

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

  const threeDVisualizationFaq = [
    {
      q: "What is architectural 3D visualisation?",
      a: "Architectural 3D visualisation converts drawings, design concepts, materials, lighting, and spatial information into realistic or representative visual outputs that help clients understand a proposed project before construction.",
    },
    {
      q: "What is the difference between 3D visualisation and 3D rendering?",
      a: "3D visualisation is the broader process of representing a design in three dimensions. Rendering is the production of the final still image or visual output from that model, materials, lighting, and environment.",
    },
    {
      q: "Can you create exterior and interior 3D renders?",
      a: "Yes. The service scope includes exterior rendering, interior visualisation and staging, material and finish visualisation, and lighting studies where required by the project brief.",
    },
    {
      q: "Can you create architectural walkthroughs?",
      a: "Yes. The service includes 360-degree panoramic virtual tours, immersive walkthrough experiences, and architectural flythrough animations where the required scope is agreed.",
    },
    {
      q: "What information is needed to create a 3D visualisation?",
      a: "Useful inputs include architectural drawings, design references, material or finish information, furniture requirements, site or context references, and the intended visual output.",
    },
    {
      q: "Can you create visualisations for real estate developments?",
      a: "Yes. Development concepts, residential schemes, commercial buildings, mixed-use environments, and related presentation imagery can be considered where the project brief provides the required design information.",
    },
    {
      q: "How much do 3D visualisation services cost in Lagos?",
      a: "Pricing depends on project complexity, the number of views, level of detail, modeling requirements, interior or exterior scope, animation requirements, and agreed review requirements. Share a project brief for a scope-based discussion.",
    },
  ];

  const structuralEngineeringFaq = [
    {
      q: "What is structural engineering and design?",
      a: "Structural engineering and design involves developing and documenting systems that carry and transfer building loads while responding to the project brief, architectural information, site data, applicable requirements, and construction needs.",
    },
    {
      q: "Do you provide structural engineering services in Lagos?",
      a: "Yes. Building Practice Ltd provides structural engineering and design services in Lagos and across Nigeria for suitable residential, commercial, institutional, and related building projects.",
    },
    {
      q: "Do you provide structural analysis and calculations?",
      a: "Yes. The documented service scope includes structural analysis, stability calculations, load-bearing assessment, and structural modeling based on the project requirements and available information.",
    },
    {
      q: "Do you design foundations, reinforced concrete, and steel structures?",
      a: "Yes. The service scope includes foundation design and analysis, reinforced concrete design, steel frame design and detailing, and structural specifications and details.",
    },
    {
      q: "Do you provide structural assessment or inspection services?",
      a: "The service content supports assessment of existing structures, site and soil information review, and structural rehabilitation design. The appropriate scope depends on the building condition, proposed changes, available records, and the required professional assessment.",
    },
    {
      q: "How much does structural engineering cost in Lagos?",
      a: "Fees depend on building type, project size, structural complexity, engineering scope, existing drawings, site information, assessment requirements, and documentation requirements. A project brief is needed before costs can be discussed responsibly.",
    },
    {
      q: "Can structural engineering be coordinated with architectural design?",
      a: "Yes. Structural design can be coordinated with architectural information and construction requirements so that structural systems, layouts, details, and delivery decisions are reviewed together.",
    },
  ];

  const servicePageJsonLd = isStructuralEngineeringPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: STRUCTURAL_ENGINEERING_TITLE,
            description: STRUCTURAL_ENGINEERING_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Structural Engineering & Design Services",
            description: STRUCTURAL_ENGINEERING_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Structural Engineering",
              "Structural Design",
              "Structural Analysis",
              "Structural Calculations",
              "Foundation Design",
              "Reinforced Concrete Design",
              "Steel Structural Design",
              "Structural Rehabilitation",
              "Structural Construction Coordination",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: "Structural Engineering & Design", item: absoluteUrl(`/services/${slug}`) },
            ],
          },
        ],
      }
    : isThreeDVisualizationPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: THREE_D_VISUALIZATION_TITLE,
            description: THREE_D_VISUALIZATION_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "3D Visualisation Services",
            description: THREE_D_VISUALIZATION_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "3D Visualisation",
              "Architectural 3D Visualisation",
              "Exterior 3D Rendering",
              "Interior 3D Rendering",
              "360-Degree Virtual Tours",
              "Architectural Flythrough Animation",
              "Material and Finish Visualisation",
              "Landscape Visualisation",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: "3D Visualisation", item: absoluteUrl(`/services/${slug}`) },
            ],
          },
        ],
      }
    : isRealEstateDevelopmentPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: REAL_ESTATE_DEVELOPMENT_TITLE,
            description: REAL_ESTATE_DEVELOPMENT_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Real Estate Development Services",
            description: REAL_ESTATE_DEVELOPMENT_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Real Estate Development",
              "Property Development Planning",
              "Development Feasibility",
              "Architectural Design Coordination",
              "Building Construction",
              "Construction Management",
              "Project Management",
              "Development Coordination",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: "Real Estate Development", item: absoluteUrl(`/services/${slug}`) },
            ],
          },
        ],
      }
    : isGreenBuildingAdvisoryPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: GREEN_BUILDING_ADVISORY_TITLE,
            description: GREEN_BUILDING_ADVISORY_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Green Building Advisory Services",
            description: GREEN_BUILDING_ADVISORY_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Green Building Advisory",
              "Sustainable Building Design Consultation",
              "Energy Efficiency Planning",
              "Green Building Certification Support",
              "Sustainable Materials Advisory",
              "Water Efficiency Planning",
              "Construction Waste Management Advisory",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: "Green Building Advisory", item: absoluteUrl(`/services/${slug}`) },
            ],
          },
        ],
      }
    : isUrbanDevelopmentPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: URBAN_DEVELOPMENT_TITLE,
            description: URBAN_DEVELOPMENT_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Urban Development Services",
            description: URBAN_DEVELOPMENT_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Urban Development",
              "Master Planning",
              "Urban Design",
              "Land Use Planning",
              "Infrastructure Planning",
              "Mixed-Use Development Planning",
              "Urban Renewal",
              "Urban Redevelopment",
            ],
            url: absoluteUrl(`/services/${slug}`),
          },
          {
            "@type": "BreadcrumbList",
            "@id": absoluteUrl(`/services/${slug}#breadcrumb`),
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
              { "@type": "ListItem", position: 3, name: "Urban Development", item: absoluteUrl(`/services/${slug}`) },
            ],
          },
        ],
      }
    : isArchitecturalDesignPage
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
    : isBuildingConstructionPage
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": absoluteUrl(`/services/${slug}#webpage`),
            url: absoluteUrl(`/services/${slug}`),
            name: BUILDING_CONSTRUCTION_TITLE,
            description: BUILDING_CONSTRUCTION_DESCRIPTION,
            isPartOf: { "@id": `${SITE_URL}/#website` },
            about: { "@id": `${SITE_URL}/#organization` },
            inLanguage: "en-NG",
          },
          {
            "@type": "Service",
            "@id": absoluteUrl(`/services/${slug}#service`),
            name: "Building Construction Services",
            description: BUILDING_CONSTRUCTION_DESCRIPTION,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: [
              { "@type": "City", name: "Lagos" },
              { "@type": "Country", name: "Nigeria" },
            ],
            serviceType: [
              "Building Construction",
              "Residential Building Construction",
              "Commercial Building Construction",
              "Construction Execution",
              "Construction Finishing",
              "Building Project Handover",
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
                name: "Building Construction",
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
              isStructuralEngineeringPage
                ? "Structural engineering and building design project"
                : isThreeDVisualizationPage
                ? "3D architectural visualization of a contemporary building"
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
          {(isStructuralEngineeringPage || isThreeDVisualizationPage || isRealEstateDevelopmentPage || isGreenBuildingAdvisoryPage || isUrbanDevelopmentPage || isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage || isConstructionConsultationPage || isProjectManagementPage || isBuildingConstructionPage) && (
            <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/services">Services</Link>
              <span>/</span>
              <span aria-current="page">
                {isStructuralEngineeringPage
                  ? "Structural Engineering & Design"
                  : isThreeDVisualizationPage
                  ? "3D Visualisation"
                  : isRealEstateDevelopmentPage
                  ? "Real Estate Development"
                  : isGreenBuildingAdvisoryPage
                  ? "Green Building Advisory"
                  : isUrbanDevelopmentPage
                  ? "Urban Development"
                  : isArchitecturalDesignPage
                  ? "Architectural Design"
                  : isInteriorDesignPage
                  ? "Interior Design"
                  : isConstructionManagementPage
                  ? "Construction Management"
                  : isBuildingConstructionPage
                  ? "Building Construction"
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
            {isStructuralEngineeringPage
              ? "Structural Engineering & Design Services in Lagos, Nigeria"
              : isThreeDVisualizationPage
              ? "3D Visualisation Services in Lagos, Nigeria"
              : isRealEstateDevelopmentPage
              ? "Real Estate Development Services in Lagos, Nigeria"
              : isGreenBuildingAdvisoryPage
              ? "Green Building Advisory Services in Lagos, Nigeria"
              : isUrbanDevelopmentPage
              ? "Urban Development Services in Lagos, Nigeria"
              : isArchitecturalDesignPage
              ? "Architectural Design Services in Lagos, Nigeria"
              : isConstructionManagementPage
              ? "Construction Management Services in Lagos, Nigeria"
              : isBuildingConstructionPage
              ? "Building Construction Services in Lagos, Nigeria"
              : isInteriorDesignPage
              ? "Interior Design Services in Lagos, Nigeria"
              : isProjectManagementPage
              ? "Project Management Services in Lagos, Nigeria"
              : isConstructionConsultationPage
              ? "Construction Consultation Services in Lagos, Nigeria"
              : service.title}
          </h1>
          <p>
            {isStructuralEngineeringPage
              ? "We provide structural analysis, design, calculations, foundations, structural drawings, reinforced concrete and steel design, and construction coordination for projects in Lagos and across Nigeria."
              : isThreeDVisualizationPage
              ? "We create architectural renders, interior and exterior visuals, walkthroughs, animation, and design presentation imagery for projects in Lagos and across Nigeria."
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
              {isStructuralEngineeringPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Structural Engineering and Design</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides structural engineering and design services for homeowners, property
                      developers, architects, contractors, businesses, institutions, and organizations planning or
                      modifying building projects in Lagos and across Nigeria.
                    </p>
                    <p className={styles.bodyText}>
                      The service connects architectural information, site and project requirements, structural analysis,
                      calculations, drawings, detailing, and construction coordination. It is focused on structural
                      engineering and design rather than architectural design, physical construction, or project control
                      alone.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your structural design project</Link>
                      <Link href="/projects">View our projects</Link>
                      <Link href="/services/architectural-design">Coordinate with architectural design</Link>
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
                    <h2>What Is Structural Engineering &amp; Design?</h2>
                    <p className={styles.bodyText}>
                      Structural engineering and design involves determining how a building and its structural
                      components carry and transfer loads. The work considers the project brief, architectural
                      information, site and ground information, building type, structural requirements, applicable
                      standards, and the practical needs of construction.
                    </p>
                    <p className={styles.bodyText}>
                      A structural design should be developed through appropriate professional judgment and project
                      information. This page provides a service overview and is not a substitute for project-specific
                      engineering advice, calculations, inspections, or approvals.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our Structural Engineering Services in Lagos</h2>
                    <h3>Structural Analysis and Design</h3>
                    <p className={styles.bodyText}>
                      We assess structural requirements and develop appropriate load-bearing systems for building
                      projects based on the available architectural, site, and project information.
                    </p>
                    <h3>Structural Calculations</h3>
                    <p className={styles.bodyText}>
                      The documented service scope includes stability calculations, load-bearing assessment, structural
                      analysis, and calculations that support structural design decisions and documentation.
                    </p>
                    <h3>Structural Drawings and Detailing</h3>
                    <p className={styles.bodyText}>
                      Structural drawings, specifications, and detailing communicate design information to architects,
                      contractors, and construction teams. Clear documentation helps coordinate structural intent with
                      the wider project information.
                    </p>
                    <h3>Foundation Design</h3>
                    <p className={styles.bodyText}>
                      Foundation design and analysis can be considered in relation to building loads, ground information,
                      structural requirements, and project type. Site-specific investigation and professional assessment
                      are important where foundation decisions depend on conditions not established in the brief.
                    </p>
                    <h3>Reinforced Concrete and Steel Design</h3>
                    <p className={styles.bodyText}>
                      The service includes reinforced concrete design, steel frame design and detailing, and structural
                      specifications for appropriate building elements and project requirements.
                    </p>
                    <h3>Structural Assessment and Rehabilitation</h3>
                    <p className={styles.bodyText}>
                      Existing buildings may require professional assessment when there are concerns about condition,
                      deterioration, alterations, proposed modifications, extensions, or change of use. The scope of an
                      assessment depends on the building, available records, observed issues, and required investigation.
                    </p>
                    <h3>Structural Construction Coordination</h3>
                    <p className={styles.bodyText}>
                      Structural information can be coordinated with architectural and construction requirements to support
                      interpretation, detailing, sequencing, and construction-stage communication where applicable.
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>Structural Engineering and Design Scope</h2>
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
                    <h2>Structural Elements We Design</h2>
                    <p className={styles.bodyText}>
                      Depending on the project scope, structural design may address foundations, structural frames,
                      columns, beams, slabs, roof structures, reinforced concrete elements, steel framing, building
                      enclosures, and related structural details. The exact elements depend on the building and the
                      information available for professional design.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Why Structural Engineering Is Important</h2>
                    <p className={styles.bodyText}>
                      Structural engineering helps support structural integrity, appropriate material use, coordination
                      with architectural design, constructability, project planning, and long-term building performance.
                      Early coordination can also help identify conflicts between the architectural concept, structural
                      system, and construction requirements.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Who Our Structural Engineering Services Are For</h2>
                    <p className={styles.bodyText}>
                      Homeowners may need structural design for new buildings, extensions, or alterations. Property
                      developers, architects, contractors, construction companies, businesses, institutions, and
                      commercial property owners may need structural analysis, design documentation, review, or
                      coordination for their projects.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Projects We Provide Structural Engineering For</h2>
                    <p className={styles.bodyText}>
                      The service scope can support residential buildings, duplexes, apartments, housing estates,
                      commercial and office buildings, retail developments, industrial structures, institutional
                      buildings, mixed-use developments, renovations, and building extensions where the project brief
                      aligns with the practice&apos;s capabilities.
                    </p>
                  </div>

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our Structural Engineering Process</h2>
                      <div className={styles.processList}>
                        {[
                          { title: "Project Brief and Requirements", desc: "Understand the building type, scope, intended use, available information, and structural questions." },
                          { title: "Review of Architectural Information", desc: "Review plans, layouts, elevations, sections, design changes, and coordination requirements." },
                          { title: "Site and Project Information Assessment", desc: "Consider available site, ground, existing-building, and project information relevant to structural decisions." },
                          { title: "Structural Analysis", desc: "Assess structural requirements, loads, stability, and the behavior of the proposed system." },
                          { title: "Structural Design", desc: "Develop structural systems and details appropriate to the agreed building scope and requirements." },
                          { title: "Drawings and Documentation", desc: "Prepare structural drawings, specifications, calculations, and details required for the agreed scope." },
                          { title: "Coordination and Review", desc: "Coordinate structural information with architects, contractors, consultants, and project stakeholders." },
                          { title: "Construction Support Where Applicable", desc: "Provide relevant structural clarification or coordination during construction where included in the engagement." },
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
                    <h2>Integrating Structural Engineering with Architectural Design</h2>
                    <p className={styles.bodyText}>
                      Architectural design establishes the building&apos;s spatial and functional direction; structural
                      engineering develops the systems that support that direction; construction brings the coordinated
                      information into physical delivery. Early communication between these disciplines can support
                      clearer decisions and better constructability.
                    </p>
                    <p className={styles.bodyText}>
                      Review our <Link href="/services/architectural-design">architectural design services</Link> for the building-design scope and our <Link href="/services/building-construction">building construction services</Link> for physical execution.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Structural Engineering Services in Lagos, Nigeria</h2>
                    <p className={styles.bodyText}>
                      Structural engineering in Lagos should respond to the specific project context, including building
                      type, development scale, site information, local construction practices, applicable requirements,
                      and coordination with architects and contractors. Site-specific ground information may be relevant
                      to structural and foundation design; conditions should not be assumed across every Lagos site.
                    </p>
                    <p className={styles.bodyText}>
                      Where a project also involves construction execution, our <Link href="/services/construction-management">construction management services</Link> and <Link href="/services/project-management">project management services</Link> provide related delivery support.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Engineering Coordination and Applicable Requirements</h2>
                    <p className={styles.bodyText}>
                      Structural design and documentation should be coordinated with applicable Nigerian building
                      regulations, relevant codes and standards, local planning requirements, and project-specific
                      engineering requirements. The appropriate authorities and qualified professionals determine the
                      applicable approvals and compliance requirements for each project.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/construction-consultation">Explore construction consultation</Link>
                      <Link href="/services/3d-visualization">Explore 3D visualisation services</Link>
                      <Link href="/services/real-estate-development">Explore real estate development services</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {structuralEngineeringFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your Structural Design Project</h2>
                    <p className={styles.bodyText}>
                      Share your building type, site information, architectural drawings, project stage, and structural
                      requirements with our team. We will help identify the appropriate engineering scope and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request structural engineering services</Link>
                      <Link href="/projects">View our project portfolio</Link>
                    </div>
                  </div>
                </>
              ) : isThreeDVisualizationPage ? (
                <>
                  <div className={styles.block}>
                    <h2>Professional Architectural 3D Visualisation</h2>
                    <p className={styles.bodyText}>
                      Building Practice Ltd provides 3D visualisation services for architects, property developers,
                      homeowners, contractors, businesses, interior designers, real estate professionals, and
                      institutions that need clearer ways to understand, present, or communicate building concepts.
                    </p>
                    <p className={styles.bodyText}>
                      For clients looking for 3D visualisation services in Lagos, our work connects architectural
                      drawings and design information with visual outputs such as exterior renders, interior visuals,
                      panoramic tours, flythroughs, material studies, and presentation imagery. The service supports
                      design communication without replacing architectural design or construction documentation.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Discuss your 3D visualisation project</Link>
                      <Link href="/projects">View our projects</Link>
                      <Link href="/services/architectural-design">Explore architectural design services</Link>
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
                    <h2>What Is 3D Visualisation?</h2>
                    <p className={styles.bodyText}>
                      3D visualisation is the process of turning architectural drawings, design concepts, materials,
                      lighting, and spatial information into realistic or representative visual outputs. It helps a
                      client see how a proposed building, room, development, or landscape may be understood before the
                      project reaches construction.
                    </p>
                    <p className={styles.bodyText}>
                      Depending on the brief, the output may be a still render, an interior or exterior view, a 360-degree
                      panorama, a walkthrough, an animation, or presentation imagery for design review and communication.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Our 3D Visualisation Services</h2>
                    <h3>Architectural 3D Visualisation</h3>
                    <p className={styles.bodyText}>
                      Proposed buildings can be represented visually before construction, including building form,
                      proportions, materials, colours, openings, architectural details, and surrounding context where
                      the supplied design information supports it.
                    </p>
                    <h3>Exterior 3D Rendering</h3>
                    <p className={styles.bodyText}>
                      Exterior rendering can communicate facades, entrances, outdoor spaces, landscape elements, site
                      context, and day or night lighting studies for residential, commercial, hospitality, institutional,
                      and related building concepts.
                    </p>
                    <h3>Interior 3D Rendering and Staging</h3>
                    <p className={styles.bodyText}>
                      Interior visualisation can show room layouts, furniture, finishes, lighting, materials, colours,
                      and spatial relationships so clients can review the intended character and arrangement of a space.
                    </p>
                    <h3>360-Degree Virtual Tours and Walkthroughs</h3>
                    <p className={styles.bodyText}>
                      Panoramic tours and immersive walkthrough experiences help clients move through a proposed space
                      or review a design concept from different viewpoints. They can support presentations, stakeholder
                      communication, and design review.
                    </p>
                    <h3>Architectural Flythrough Animation</h3>
                    <p className={styles.bodyText}>
                      Dynamic flythroughs and architectural animations can communicate movement through a building or
                      development concept when a still image does not provide enough spatial information.
                    </p>
                    <h3>Materials, Lighting, Landscape, and Presentation Visuals</h3>
                    <p className={styles.bodyText}>
                      The service also includes material and finish visualisation, lighting studies, landscape and
                      hardscape visualisation, furniture and decor staging, aerial-style renderings, and post-production
                      enhancement where these are relevant to the agreed brief.
                    </p>
                  </div>

                  {service.features.length > 0 && (
                    <div className={styles.block}>
                      <h2>What Our 3D Visualisation Service Covers</h2>
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
                    <h2>Why 3D Visualisation Matters for Architectural Projects</h2>
                    <p className={styles.bodyText}>
                      Visual outputs can make design communication clearer, help clients understand proposed spaces,
                      support earlier discussion of materials and finishes, and improve presentations to stakeholders.
                      They can also help teams review design intent before construction and prepare appropriate marketing
                      or presentation material where that use is part of the project brief.
                    </p>
                    <p className={styles.bodyText}>
                      3D visualisation is most useful when it works alongside the design process: architectural drawings
                      inform the model, the visual output supports review, and agreed design decisions continue into
                      documentation and construction.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Who Our 3D Visualisation Services Are For</h2>
                    <p className={styles.bodyText}>
                      Architects can use visuals to communicate design intent; property developers can present proposed
                      developments; homeowners can understand a new home or renovation; contractors can review proposed
                      outcomes; interior designers can communicate finishes and layouts; and businesses or institutions
                      can present building concepts to relevant stakeholders.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>Projects We Can Visualise</h2>
                    <p className={styles.bodyText}>
                      Depending on the project brief, the service can support visualisation for residential buildings,
                      apartments, duplexes, estates, offices, retail spaces, hospitality projects, institutional
                      buildings, mixed-use developments, renovations, and interior spaces. This describes supported
                      project contexts, not a claim that every category has been completed as a visualisation project.
                    </p>
                  </div>

                  {service.process.length > 0 && (
                    <div className={styles.block}>
                      <h2>Our 3D Visualisation Process</h2>
                      <div className={styles.processList}>
                        {[
                          { title: "Project Brief", desc: "Confirm the project purpose, visual outputs, audience, views, and design information available." },
                          { title: "Drawing and Reference Review", desc: "Review plans, elevations, sections, references, materials, finishes, furniture, and context information." },
                          { title: "3D Modeling", desc: "Build the digital representation required for the agreed building, interior, exterior, landscape, or development views." },
                          { title: "Materials, Lighting, and Environment", desc: "Apply the supplied or agreed material direction, lighting approach, surroundings, and staging elements." },
                          { title: "Rendering and Visualisation", desc: "Produce the agreed still images, panoramas, walkthroughs, animations, or presentation visuals." },
                          { title: "Review and Final Delivery", desc: "Review the output against the brief, address agreed feedback, and prepare the final deliverables." },
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
                    <h2>3D Visualisation Services in Lagos, Nigeria</h2>
                    <p className={styles.bodyText}>
                      3D visualisation can support residential development, commercial projects, property development
                      presentations, architectural reviews, construction planning, and stakeholder communication in
                      Lagos. It gives project teams a practical way to discuss a proposed building or space before the
                      physical work is complete.
                    </p>
                    <p className={styles.bodyText}>
                      Building Practice Ltd also supports projects elsewhere in Nigeria where the design information,
                      project scope, and delivery requirements make the engagement suitable.
                    </p>
                  </div>

                  <div className={styles.block}>
                    <h2>How Visualisation Connects to Design and Development</h2>
                    <p className={styles.bodyText}>
                      Architectural drawings inform the 3D model, the visualisation supports client review and design
                      refinement, and the approved direction can continue into architectural documentation, construction,
                      or development coordination. Explore our <Link href="/services/architectural-design">architectural design services</Link>, <Link href="/services/real-estate-development">real estate development services</Link>, and <Link href="/services/urban-development">urban development services</Link> for connected project needs.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/interior-design">Explore interior design services</Link>
                      <Link href="/services/building-construction">Explore building construction</Link>
                      <Link href="/services/green-building-advisory">Explore green building advisory</Link>
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Frequently Asked Questions</h2>
                    <div className={styles.faqList}>
                      {threeDVisualizationFaq.map((item, i) => (
                        <details key={`${item.q}-${i}`} className={styles.faqItem}>
                          <summary>{item.q}</summary>
                          <div>{item.a}</div>
                        </details>
                      ))}
                    </div>
                  </div>

                  <div className={styles.block}>
                    <h2>Discuss Your 3D Visualisation Project</h2>
                    <p className={styles.bodyText}>
                      Share your drawings, project type, intended visual outputs, and presentation goals with our team.
                      We will help identify the appropriate visualisation scope and next steps.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/contact">Request a 3D visualisation</Link>
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
                      building-level part of a development. See our <Link href="/services/architectural-design">architectural design services</Link> for the detailed design scope.
                    </p>
                    <h3>Construction and Project Delivery</h3>
                    <p className={styles.bodyText}>
                      Once a development is planned and documented, our <Link href="/services/building-construction">building construction services</Link> can support physical execution. <Link href="/services/construction-management">Construction management</Link> and <Link href="/services/project-management">project management</Link> provide related coordination, oversight, scheduling, reporting, and delivery controls.
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
                      For larger land-use and infrastructure questions, our <Link href="/services/urban-development">urban development services</Link> address the master-planning context. For sustainability objectives, see our <Link href="/services/green-building-advisory">green building advisory</Link> service.
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
                      Explore our <Link href="/services/architectural-design">architectural design services</Link>, <Link href="/services/building-construction">building construction services</Link>, <Link href="/services/construction-management">construction management services</Link>, <Link href="/services/project-management">project management services</Link>, <Link href="/services/construction-consultation">construction consultation</Link>, and <Link href="/services/interior-design">interior design services</Link> for connected development requirements.
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
                      When sustainability advice forms part of a wider development, our <Link href="/services/urban-development">urban development services</Link> address the larger land-use, infrastructure, and planning context. For building-level design, see our <Link href="/services/architectural-design">architectural design services</Link>.
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
                      services without replacing them. Explore our <Link href="/services/building-construction">building construction services</Link>, <Link href="/services/construction-management">construction management services</Link>, <Link href="/services/project-management">project management services</Link>, and <Link href="/services/construction-consultation">construction consultation</Link> for related project needs.
                    </p>
                    <div className={styles.linkRow}>
                      <Link href="/services/interior-design">Explore interior design services</Link>
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
                      Where individual buildings form part of a larger development, our <Link href="/services/architectural-design">architectural design services</Link> can support the building-level design and documentation. For physical execution and delivery coordination, review our <Link href="/services/building-construction">building construction services</Link>, <Link href="/services/construction-management">construction management services</Link>, and <Link href="/services/project-management">project management services</Link>.
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
                      <Link href="/services/construction-consultation">Explore construction consultation</Link>
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
                      <Link href="/services/building-construction">Explore building construction services</Link>
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
                      <Link href="/services/building-construction">Explore building construction services</Link>
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
                      <Link href="/services/construction-management">Explore construction management services</Link>
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
                      For broader execution oversight and project controls, you can also review our <Link href="/services/construction-management">construction management services</Link> and
                      <Link href="/services/project-management"> project management services</Link>.
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
                      <Link href="/services/architectural-design">Architectural design services</Link>
                      <Link href="/services/interior-design">Interior design services</Link>
                      <Link href="/services/construction-consultation">Construction consultation services</Link>
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
                      <Link href="/services/project-management">Explore project management services</Link>
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
              {!isStructuralEngineeringPage && !isThreeDVisualizationPage && !isRealEstateDevelopmentPage && !isGreenBuildingAdvisoryPage && !isUrbanDevelopmentPage && !isArchitecturalDesignPage && !isInteriorDesignPage && !isConstructionManagementPage && !isConstructionConsultationPage && !isBuildingConstructionPage && service.stats.length > 0 && (
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

              {isThreeDVisualizationPage && (
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
                    <div className={styles.statNumber}>3D</div>
                    <div className={styles.statLabel}>Architectural Visualisation</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Views</div>
                    <div className={styles.statLabel}>Still, Panorama, and Animation</div>
                  </div>
                </div>
              )}

              {isStructuralEngineeringPage && (
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
                    <div className={styles.statNumber}>Design</div>
                    <div className={styles.statLabel}>Analysis and Documentation</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statNumber}>Support</div>
                    <div className={styles.statLabel}>Coordination Through Construction</div>
                  </div>
                </div>
              )}

              <div className={styles.ctaCard}>
                <h3>
                  {isStructuralEngineeringPage
                    ? "Discuss Your Structural Design Project"
                    : isThreeDVisualizationPage
                    ? "Discuss Your 3D Visualisation Project"
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
                  {isStructuralEngineeringPage
                    ? "Tell us about your building type, site information, architectural drawings, project stage, and structural requirements, and our team will guide you on the appropriate scope."
                    : isThreeDVisualizationPage
                    ? "Tell us about your drawings, project type, intended visual outputs, and presentation goals, and our team will guide you on the appropriate scope."
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
                    {isStructuralEngineeringPage || isThreeDVisualizationPage || isRealEstateDevelopmentPage || isGreenBuildingAdvisoryPage || isUrbanDevelopmentPage || isArchitecturalDesignPage || isInteriorDesignPage || isConstructionManagementPage || isConstructionConsultationPage || isBuildingConstructionPage
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
                {isThreeDVisualizationPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Our Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
                {isStructuralEngineeringPage && (
                  <Link href="/projects" className="btn btn--outline btn--full" style={{ marginTop: 10 }}>
                    <span>View Our Projects</span>
                    <i className="bx bx-image" aria-hidden="true" />
                  </Link>
                )}
              </div>

              {service.tags.length > 0 && (
                <div className={styles.tagsCard}>
                  {isStructuralEngineeringPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/building-construction" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/project-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/construction-consultation" className="tag tag--outline tag--sm">
                        <i className="bx bx-comment-detail" aria-hidden="true" /> Construction Consultation
                      </Link>
                      <Link href="/services/3d-visualization" className="tag tag--outline tag--sm">
                        <i className="bx bx-cube-alt" aria-hidden="true" /> 3D Visualisation
                      </Link>
                      <Link href="/services/real-estate-development" className="tag tag--outline tag--sm">
                        <i className="bx bx-landscape" aria-hidden="true" /> Real Estate Development
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact the Engineering Team
                      </Link>
                    </>
                  ) : isThreeDVisualizationPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/interior-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/real-estate-development" className="tag tag--outline tag--sm">
                        <i className="bx bx-landscape" aria-hidden="true" /> Real Estate Development
                      </Link>
                      <Link href="/services/urban-development" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/services/building-construction" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/project-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/projects" className="tag tag--outline tag--sm">
                        <i className="bx bx-image" aria-hidden="true" /> Project Portfolio
                      </Link>
                      <Link href="/contact" className="tag tag--outline tag--sm">
                        <i className="bx bx-envelope" aria-hidden="true" /> Contact the Design Team
                      </Link>
                    </>
                  ) : isRealEstateDevelopmentPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/urban-development" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/building-construction" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/project-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
                      </Link>
                      <Link href="/services/green-building-advisory" className="tag tag--outline tag--sm">
                        <i className="bx bx-leaf" aria-hidden="true" /> Green Building Advisory
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
                    </>
                  ) : isGreenBuildingAdvisoryPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/urban-development" className="tag tag--outline tag--sm">
                        <i className="bx bx-city" aria-hidden="true" /> Urban Development
                      </Link>
                      <Link href="/services/building-construction" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/project-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
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
                    </>
                  ) : isUrbanDevelopmentPage ? (
                    <>
                      <Link href="/services" className="tag tag--outline tag--sm">
                        <i className="bx bx-grid-alt" aria-hidden="true" /> All Services
                      </Link>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/building-construction" className="tag tag--outline tag--sm">
                        <i className="bx bx-building" aria-hidden="true" /> Building Construction
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/project-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
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
                  ) : isArchitecturalDesignPage ? (
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
                  ) : isBuildingConstructionPage ? (
                    <>
                      <Link href="/services/architectural-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-building-house" aria-hidden="true" /> Architectural Design
                      </Link>
                      <Link href="/services/interior-design" className="tag tag--outline tag--sm">
                        <i className="bx bx-palette" aria-hidden="true" /> Interior Design
                      </Link>
                      <Link href="/services/construction-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-hard-hat" aria-hidden="true" /> Construction Management
                      </Link>
                      <Link href="/services/project-management" className="tag tag--outline tag--sm">
                        <i className="bx bx-task" aria-hidden="true" /> Project Management
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
