import type { Metadata } from "next";
import Link from "next/link";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { getAllServices } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Architecture, Project Management & Urban Development Services Nigeria | TBP";
const DESCRIPTION =
  "Expert architecture, design consultation, construction consultation, project management, and urban development services in Nigeria. Building Practice Ltd delivers design advisory, cost control, contractor guidance, masterplanning, construction oversight, and sustainable development solutions across Lagos, Abuja, and Port Harcourt.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/services") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/services") },
};

const PARTICLE_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"];

const HERO_SLIDES = [
  { src: "/images/services/ArchitecturalDesign.jpg", alt: "Architectural Design Services" },
  { src: "/images/services/buildingConstruction.jpg", alt: "Building Construction" },
  { src: "/images/services/interiorDesign.jpg", alt: "Interior Design Services" },
  { src: "/images/services/projectManagement.jpg", alt: "Project Management" },
  { src: "/images/services/urbanDev.jpg", alt: "Urban Development" },
  { src: "/images/services/constructionServices.jpg", alt: "Construction Management" },
  { src: "/images/services/3dVisualization.jpg", alt: "3D Visualization" },
  { src: "/images/services/greenBuildingAdvisory.jpg", alt: "Green Building Advisory" },
];

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <main>
      <section className={styles.hero}>
        <HeroSlider slides={HERO_SLIDES} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroPattern} />
        <div className={styles.heroParticles}>
          {PARTICLE_KEYS.map((key) => (
            <div key={key} className={styles.heroParticle} />
          ))}
        </div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <i className="bx bx-award" aria-hidden="true" />
            <span>Excellence in Every Detail</span>
          </div>
          <h1 className={styles.heroTitle}>
            Comprehensive <span className={styles.highlight}>Architectural</span> &amp; Construction Solutions
          </h1>
          <p className={styles.heroDesc}>
            From innovative design concepts to flawless project execution, we deliver end-to-end services that
            transform your vision into remarkable reality.
          </p>
          <div className={styles.heroStats}>
            {[
              { n: "25+", l: "Services" },
              { n: "350+", l: "Projects" },
              { n: "13+", l: "Years" },
              { n: "98%", l: "Satisfaction" },
            ].map((s) => (
              <div key={s.l} className={styles.heroStat}>
                <div className={styles.heroStatNumber}>{s.n}</div>
                <div className={styles.heroStatLabel}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.heroScroll}>
          <span>Explore Services</span>
          <i className="bx bx-chevron-down" aria-hidden="true" />
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">What We Offer</span>
            <h2 className={styles.sectionTitle}>Our Core Services</h2>
            <div className={styles.divider} />
            <p className={styles.sectionDesc}>
              Specialized architectural and construction services designed to meet diverse project needs with
              precision, creativity, and unwavering excellence.
            </p>
          </header>

          <ServicesGrid services={services} />

          <div className={styles.bottomTags}>
            <Link href="/projects" className="tag tag--primary">
              <i className="bx bx-images" aria-hidden="true" /> View Our Projects
            </Link>
            <Link href="/about" className="tag tag--outline">
              <i className="bx bx-info-circle" aria-hidden="true" /> About Our Firm
            </Link>
            <Link href="/team" className="tag tag--outline">
              <i className="bx bx-group" aria-hidden="true" /> Meet the Team
            </Link>
            <Link href="/contact" className="tag tag--accent">
              <i className="bx bx-envelope" aria-hidden="true" /> Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
