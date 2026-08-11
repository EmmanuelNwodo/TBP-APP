import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./WhyUs.module.css";

const CARDS = [
  {
    icon: "bx-bulb",
    title: "Innovative Design",
    desc: "Pushing boundaries with creative solutions that blend form and function beautifully.",
    tags: [{ label: "Creative", variant: "primary" as const }, { label: "Modern" }],
    href: "/services#design",
  },
  {
    icon: "bx-leaf",
    title: "Sustainable Practices",
    desc: "Committed to eco-friendly design using sustainable materials and green solutions.",
    tags: [{ label: "Green", variant: "primary" as const }, { label: "LEED" }],
    href: "/services#green",
  },
  {
    icon: "bx-compass",
    title: "Detailed Planning",
    desc: "Meticulous attention to every detail ensures seamless project execution.",
    tags: [{ label: "Precision", variant: "primary" as const }, { label: "Quality" }],
    href: "/services#management",
  },
  {
    icon: "bx-cube-alt",
    title: "3D Visualization",
    desc: "Advanced rendering brings designs to life before construction begins.",
    tags: [{ label: "Realistic", variant: "primary" as const }, { label: "Virtual" }],
    href: "/services#visualization",
  },
  {
    icon: "bx-briefcase-alt-2",
    title: "Full-Service Support",
    desc: "Comprehensive project management from site selection through completion.",
    tags: [{ label: "End-to-End", variant: "primary" as const }, { label: "Support" }],
    href: "/services#construction",
  },
  {
    icon: "bx-trophy",
    title: "Award-Winning",
    desc: "Recognized globally for design excellence and innovation in architecture.",
    tags: [{ label: "75+ Awards", variant: "accent" as const }, { label: "Excellence" }],
    href: "/about#awards",
  },
];

const LOCATIONS = [
  { label: "Lagos", href: "/contact#lagos", variant: "primary" as const },
  { label: "Abuja", href: "/contact#abuja" },
  { label: "Port Harcourt", href: "/contact#ph" },
  { label: "Ibadan", href: "/contact#ibadan" },
  { label: "International", href: "/contact#international", variant: "accent" as const },
];

export function WhyUs() {
  return (
    <section className={styles.section} id="why-us">
      <div className="container">
        <SectionHeader
          icon="bx-trophy"
          label="Why Choose Us"
          title="Why We're Nigeria's Trusted Choice"
          description="We combine innovative design thinking with practical expertise to deliver solutions that exceed expectations across the nation."
          tags={[
            { href: "/reviews", icon: "bx-star", label: "500+ Happy Clients", variant: "accent" },
            { href: "/projects", icon: "bx-building", label: "320+ Projects" },
            { href: "/about#awards", icon: "bx-award", label: "75+ Awards" },
            { href: "/services#construction", icon: "bx-hard-hat", label: "Nigeria Construction" },
            { href: "/services#architectural", icon: "bx-buildings", label: "African Architecture" },
            { href: "/services#design", icon: "bx-pencil", label: "Design-Build" },
            { href: "/locations#lagos", icon: "bx-map", label: "Lagos Projects" },
            { href: "/locations#abuja", icon: "bx-map-alt", label: "Abuja Projects" },
            { href: "/locations#port-harcourt", icon: "bx-map-pin", label: "Port Harcourt" },
            { href: "/services#green", icon: "bx-leaf", label: "Sustainable Design" },
          ]}
        />

        <div className={styles.grid}>
          {CARDS.map((card, ci) => (
            <article key={`${card.title}-${ci}`} className={`${styles.card} reveal`}>
              <div className={styles.cardIcon}>
                <i className={`bx ${card.icon}`} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDesc}>{card.desc}</p>
              <div className={styles.cardTags}>
                {card.tags.map((tag, ti) => (
                  <span key={`${tag.label}-${ti}`} className={`tag tag--${tag.variant ?? "outline"} tag--sm`}>
                    {tag.label}
                  </span>
                ))}
              </div>
              <Link href={card.href} className={styles.cardLink}>
                Learn more <i className="bx bx-right-arrow-alt" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>

        <div className={`${styles.locationsBanner} reveal`}>
          <div className={styles.locationsLabel}>
            <i className="bx bx-map" aria-hidden="true" />
            <span>Our Presence:</span>
          </div>
          <div className={styles.locationsList}>
            {LOCATIONS.map((loc, i) => (
              <Link key={`${loc.label}-${i}`} href={loc.href} className={`tag tag--${loc.variant ?? "outline"} tag--sm`}>
                {loc.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="section-action reveal">
          <Link href="/contact" className="btn btn--primary">
            <span>Start Your Project</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/services" className="btn btn--secondary" style={{ marginLeft: 12 }}>
            <span>View All Services</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
