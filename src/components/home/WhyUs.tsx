import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./WhyUs.module.css";

const CARDS = [
  {
    icon: "bx-bulb",
    title: "Context-Led Design",
    desc: "Design responses shaped by site, climate, and the realities of how people use space every day.",
    tags: [{ label: "Context", variant: "primary" as const }, { label: "Function" }],
    href: "/about#philosophy",
  },
  {
    icon: "bx-leaf",
    title: "Sustainable Design Thinking",
    desc: "We integrate material, orientation, and environmental strategies that support long-term building performance.",
    tags: [{ label: "Sustainable", variant: "primary" as const }, { label: "Efficient" }],
    href: "/services",
  },
  {
    icon: "bx-compass",
    title: "Technical Coordination",
    desc: "From concept to documentation, we coordinate design intent with practical delivery requirements.",
    tags: [{ label: "Documentation", variant: "primary" as const }, { label: "Coordination" }],
    href: "/services",
  },
  {
    icon: "bx-cube-alt",
    title: "3D Visualization",
    desc: "Advanced rendering brings designs to life before construction begins.",
    tags: [{ label: "Visualization", variant: "primary" as const }, { label: "Clarity" }],
    href: "/services",
  },
  {
    icon: "bx-briefcase-alt-2",
    title: "Project Delivery Support",
    desc: "Structured support from briefing and design development through construction-stage coordination.",
    tags: [{ label: "End-to-End", variant: "primary" as const }, { label: "Support" }],
    href: "/services",
  },
  {
    icon: "bx-check-shield",
    title: "Professional Standards",
    desc: "Our studio maintains recognized certifications and professional affiliations relevant to architectural practice.",
    tags: [{ label: "ARCON", variant: "accent" as const }, { label: "Standards" }],
    href: "/about#certifications",
  },
];

const LOCATIONS = [
  { label: "Lagos", href: "/locations", variant: "primary" as const },
  { label: "Nigeria", href: "/locations" },
  { label: "Contact Our Studio", href: "/contact", variant: "accent" as const },
];

export function WhyUs() {
  return (
    <section className={styles.section} id="why-us">
      <div className="container">
        <SectionHeader
          icon="bx-trophy"
          label="Why Choose Us"
          title="Why Clients Engage Our Architects in Nigeria"
          description="We combine architectural creativity with practical delivery expertise to shape projects that are buildable, durable, and contextually grounded."
          tags={[
            { href: "/projects", icon: "bx-building", label: "Architecture Portfolio", variant: "primary" },
            { href: "/services", icon: "bx-buildings", label: "Architectural Design Services" },
            { href: "/team", icon: "bx-group", label: "Meet Our Architects" },
            { href: "/reviews", icon: "bx-star", label: "Client Reviews" },
            { href: "/about#certifications", icon: "bx-award", label: "Certifications and Memberships" },
            { href: "/locations", icon: "bx-map", label: "Lagos and Nigeria Coverage" },
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
