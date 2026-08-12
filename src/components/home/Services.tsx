import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./Services.module.css";

const SERVICES = [
  {
    image: "/images/services/residential.jpg",
    icon: "bx-home",
    title: "Residential Design",
    desc: "We craft homes that breathe with the climate, celebrating family moments with light-filled spaces and resilient design.",
    tags: ["Homes", "Villas", "Apartments"],
    alt: "Residential architecture project in Nigeria",
    href: "/services",
  },
  {
    image: "/images/services/ArchitecturalDesign.jpg",
    icon: "bx-vector",
    title: "Architectural Design",
    desc: "From initial concepts to construction-ready drawings, we navigate Nigerian regulations to deliver designs that build beautifully.",
    tags: ["Concept", "Drawings", "Permits"],
    alt: "Architectural design presentation for a building project",
    href: "/services/architectural-design",
  },
  {
    image: "/images/services/interiorDesign.jpg",
    icon: "bx-palette",
    title: "Interior Design",
    desc: "We design interiors that flow seamlessly with your architecture, selecting materials that endure while delivering elegance.",
    tags: ["Luxury", "Furniture", "Finishes"],
    alt: "Interior architecture and design concept",
    href: "/services/interior-design",
  },
  {
    image: "/images/services/projectManagement.jpg",
    icon: "bx-briefcase-alt-2",
    title: "Project Management",
    desc: "From LASPPA approvals to final handover, we coordinate every consultant, contractor, and delivery milestone.",
    tags: ["Planning", "Coordination", "Delivery"],
    alt: "Architect-led project management meeting",
    href: "/services",
  },
  {
    image: "/images/services/constructionManagement.jpg",
    icon: "bx-hard-hat",
    title: "Construction Management",
    desc: "Daily site oversight by dedicated architects ensures quality control, schedule adherence, and building standard compliance.",
    tags: ["Supervision", "Quality", "Safety"],
    alt: "Construction management and site coordination",
    href: "/services",
  },
  {
    image: "/images/services/3dVisualization.jpg",
    icon: "bx-cube-alt",
    title: "3D Visualization",
    desc: "Photo-realistic renders and immersive walkthroughs help you visualize your space before construction begins.",
    tags: ["Renders", "VR Tours", "Animation"],
    alt: "3D architectural visualization",
    href: "/services",
  },
  {
    image: "/images/services/greenBuildingAdvisory.jpg",
    icon: "bx-leaf",
    title: "Green Building",
    desc: "EDGE/LEED advisory helping you build sustainably with lower running costs and better comfort.",
    tags: ["LEED", "EDGE", "Solar"],
    alt: "Sustainable building design strategy",
    href: "/services",
  },
  {
    image: "/images/services/urbanDev.jpg",
    icon: "bx-city",
    title: "Urban Planning",
    desc: "Master plans for estates and mixed-use developments that balance density, green space, and infrastructure.",
    tags: ["Master Plan", "Estates", "Mixed-Use"],
    alt: "Urban planning and master planning concept",
    href: "/services",
  },
  {
    image: "/images/services/buildingConstruction.jpg",
    icon: "bx-buildings",
    title: "Building Construction",
    desc: "Turnkey construction delivery from foundation to finishes, ensuring your vision is realized exactly as designed.",
    tags: ["Turnkey", "Foundation", "Finishes"],
    alt: "Building construction delivery project",
    href: "/services",
  },
  {
    image: "/images/services/realEstateDev.jpg",
    icon: "bx-line-chart",
    title: "Real Estate Development",
    desc: "From feasibility studies to market-ready schemes, we partner with developers to create profitable developments.",
    tags: ["Feasibility", "Investment", "ROI"],
    alt: "Real estate development planning",
    href: "/services",
  },
  {
    image: "/images/services/reconstructionRemodelling.jpg",
    icon: "bx-revision",
    title: "Renovation",
    desc: "Structural assessments, adaptive reuse, and elegant remodelling that extends building life and meets modern standards.",
    tags: ["Remodel", "Upgrade", "Restoration"],
    alt: "Building renovation and remodeling work",
    href: "/services",
  },
  {
    image: "/images/services/consultationConstruction.jpg",
    icon: "bx-conversation",
    title: "Consultation",
    desc: "Expert advice on site feasibility, cost planning, building regulations, and design direction before major commitments.",
    tags: ["Advisory", "Feasibility", "Guidance"],
    alt: "Architectural consultation session",
    href: "/contact",
  },
];

export function Services() {
  return (
    <section className={`${styles.section} section--alt`} id="services">
      <div className="container">
        <SectionHeader
          icon="bx-grid-alt"
          label="What We Do"
          title="Architectural Services in Nigeria"
          description="From architectural design and building planning to interior architecture and project delivery support, we provide end-to-end services for clients across Nigeria."
          tags={[
            { href: "/services", icon: "bx-list-ul", label: "All Services", variant: "primary" },
            { href: "/contact", icon: "bx-phone-call", label: "Request Consultation", variant: "accent" },
            { href: "/projects", icon: "bx-image", label: "Our Completed Projects" },
            { href: "/services/architectural-design", icon: "bx-buildings", label: "Architectural Design Services" },
            { href: "/services/interior-design", icon: "bx-palette", label: "Interior Architecture" },
            { href: "/locations", icon: "bx-map", label: "Lagos and Nigeria Coverage" },
          ]}
        />

        <div className={styles.grid}>
          {SERVICES.map((service, si) => (
            <article key={`${service.title}-${si}`} className={`${styles.card} reveal`}>
              <div className={styles.cardImage}>
                <LazyImage src={service.image} alt={service.alt} fill sizes="(max-width: 968px) 100vw, 33vw" />
                <div className={styles.cardIcon}>
                  <i className={`bx ${service.icon}`} aria-hidden="true" />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDesc}>{service.desc}</p>
                <div className={styles.cardTags}>
                  {service.tags.map((tag, i) => (
                    <span key={`${tag}-${i}`} className={`tag tag--${i === 0 ? "primary" : "outline"} tag--sm`}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.cardFooter}>
                  <Link href={service.href} className={styles.cardLink}>
                    <span>View service scope</span>
                    <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                  </Link>
                  <Link href="/contact" className="btn btn--sm btn--primary">
                    Discuss This Service
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/services" className="btn btn--secondary">
            <span>Learn About Our Architectural Services</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--primary" style={{ marginLeft: 12 }}>
            <span>Request a Project Consultation</span>
            <i className="bx bx-calculator" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
