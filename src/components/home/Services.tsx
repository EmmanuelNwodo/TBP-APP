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
    href: "/services#residential",
  },
  {
    image: "/images/services/ArchitecturalDesign.jpg",
    icon: "bx-vector",
    title: "Architectural Design",
    desc: "From initial concepts to construction-ready drawings, we navigate Nigerian regulations to deliver designs that build beautifully.",
    tags: ["Concept", "Drawings", "Permits"],
    href: "/services#architectural",
  },
  {
    image: "/images/services/interiorDesign.jpg",
    icon: "bx-palette",
    title: "Interior Design",
    desc: "We design interiors that flow seamlessly with your architecture, selecting materials that endure while delivering elegance.",
    tags: ["Luxury", "Furniture", "Finishes"],
    href: "/services#interior",
  },
  {
    image: "/images/services/projectManagement.jpg",
    icon: "bx-briefcase-alt-2",
    title: "Project Management",
    desc: "From LASPPA approvals to final handover, we coordinate every consultant, contractor, and delivery milestone.",
    tags: ["Planning", "Coordination", "Delivery"],
    href: "/services#management",
  },
  {
    image: "/images/services/constructionManagement.jpg",
    icon: "bx-hard-hat",
    title: "Construction Management",
    desc: "Daily site oversight by dedicated architects ensures quality control, schedule adherence, and building standard compliance.",
    tags: ["Supervision", "Quality", "Safety"],
    href: "/services#construction",
  },
  {
    image: "/images/services/3dVisualization.jpg",
    icon: "bx-cube-alt",
    title: "3D Visualization",
    desc: "Photo-realistic renders and immersive walkthroughs help you visualize your space before construction begins.",
    tags: ["Renders", "VR Tours", "Animation"],
    href: "/services#visualization",
  },
  {
    image: "/images/services/greenBuildingAdvisory.jpg",
    icon: "bx-leaf",
    title: "Green Building",
    desc: "EDGE/LEED advisory helping you build sustainably with lower running costs and better comfort.",
    tags: ["LEED", "EDGE", "Solar"],
    href: "/services#green",
  },
  {
    image: "/images/services/urbanDev.jpg",
    icon: "bx-city",
    title: "Urban Planning",
    desc: "Master plans for estates and mixed-use developments that balance density, green space, and infrastructure.",
    tags: ["Master Plan", "Estates", "Mixed-Use"],
    href: "/services#urban",
  },
  {
    image: "/images/services/buildingConstruction.jpg",
    icon: "bx-buildings",
    title: "Building Construction",
    desc: "Turnkey construction delivery from foundation to finishes, ensuring your vision is realized exactly as designed.",
    tags: ["Turnkey", "Foundation", "Finishes"],
    href: "/services#construction-full",
  },
  {
    image: "/images/services/realEstateDev.jpg",
    icon: "bx-line-chart",
    title: "Real Estate Development",
    desc: "From feasibility studies to market-ready schemes, we partner with developers to create profitable developments.",
    tags: ["Feasibility", "Investment", "ROI"],
    href: "/services#development",
  },
  {
    image: "/images/services/reconstructionRemodelling.jpg",
    icon: "bx-revision",
    title: "Renovation",
    desc: "Structural assessments, adaptive reuse, and elegant remodelling that extends building life and meets modern standards.",
    tags: ["Remodel", "Upgrade", "Restoration"],
    href: "/services#renovation",
  },
  {
    image: "/images/services/consultationConstruction.jpg",
    icon: "bx-conversation",
    title: "Consultation",
    desc: "Expert advice on site feasibility, cost planning, building regulations, and design direction before major commitments.",
    tags: ["Advisory", "Feasibility", "Guidance"],
    href: "/services#consultation",
  },
];

export function Services() {
  return (
    <section className={`${styles.section} section--alt`} id="services">
      <div className="container">
        <SectionHeader
          icon="bx-grid-alt"
          label="What We Do"
          title="Our Services"
          description="Comprehensive architectural solutions tailored to bring your vision to life with innovation, precision, and excellence."
          tags={[
            { href: "/services", icon: "bx-list-ul", label: "All Services", variant: "primary" },
            { href: "/contact#quote", icon: "bx-calculator", label: "Get Quote", variant: "accent" },
            { href: "/projects", icon: "bx-image", label: "Portfolio" },
            { href: "/services#architectural", icon: "bx-buildings", label: "Architecture Nigeria" },
            { href: "/services#interior", icon: "bx-palette", label: "Interior Design" },
            { href: "/services#urban", icon: "bx-city", label: "Urban Planning" },
            { href: "/services#construction", icon: "bx-hard-hat", label: "Construction Management" },
            { href: "/services#renovation", icon: "bx-revision", label: "Renovation" },
            { href: "/locations#lagos", icon: "bx-map", label: "Lagos Design" },
            { href: "/locations#abuja", icon: "bx-map-alt", label: "Abuja Design" },
          ]}
        />

        <div className={styles.grid}>
          {SERVICES.map((service, si) => (
            <article key={`${service.title}-${si}`} className={`${styles.card} reveal`}>
              <div className={styles.cardImage}>
                <LazyImage src={service.image} alt={`${service.title} Nigeria`} fill sizes="(max-width: 968px) 100vw, 33vw" />
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
                    <span>Learn More</span>
                    <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                  </Link>
                  <Link href={service.href} className="btn btn--sm btn--primary">
                    Read More
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/services" className="btn btn--secondary">
            <span>View All Services</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/contact#quote" className="btn btn--primary" style={{ marginLeft: 12 }}>
            <span>Request a Quote</span>
            <i className="bx bx-calculator" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
