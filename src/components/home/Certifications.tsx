import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./Certifications.module.css";

const CERTS = [
  {
    icon: "bx-check-shield",
    title: "ISO 9001:2015",
    desc: "Quality Management System certified for consistent excellence.",
    tags: ["Quality", "Standards"],
  },
  {
    icon: "bx-leaf",
    title: "ISO 14001:2015",
    desc: "Environmental Management System for sustainable operations.",
    tags: ["Green", "Eco"],
  },
  {
    icon: "bx-hard-hat",
    title: "ISO 45001:2018",
    desc: "Occupational Health & Safety for worker protection.",
    tags: ["Safety", "Health"],
  },
  {
    icon: "bx-building-house",
    title: "Green Building",
    desc: "Nigeria Green Building Council member and advocate.",
    tags: ["LEED", "EDGE"],
  },
];

const LINKS = [
  { href: "/about#certifications", icon: "bx-file", label: "View Certificates" },
  { href: "/about#affiliations", icon: "bx-group", label: "Professional Affiliations" },
  { href: "/blog#standards", icon: "bx-book-reader", label: "Industry Standards Blog" },
  { href: "/contact", icon: "bx-phone", label: "Verify Credentials" },
  { href: "/services#green", icon: "bx-leaf", label: "Sustainable Design" },
  { href: "/services#construction", icon: "bx-hard-hat", label: "Construction Quality" },
  { href: "/services#architectural", icon: "bx-buildings", label: "Architecture Nigeria" },
  { href: "/locations#lagos", icon: "bx-map", label: "Lagos Office" },
  { href: "/locations#abuja", icon: "bx-map-alt", label: "Abuja Office" },
  { href: "/locations#port-harcourt", icon: "bx-map-pin", label: "Port Harcourt" },
];

export function Certifications() {
  return (
    <section className={styles.section} id="certifications">
      <div className="container">
        <SectionHeader
          icon="bx-certification"
          label="Quality Assurance"
          title="Certifications & Standards"
          description="Our certifications demonstrate our unwavering dedication to quality, safety, and environmental responsibility."
          light
        />

        <div className={styles.grid}>
          {CERTS.map((cert, ci) => (
            <article key={`${cert.title}-${ci}`} className={`${styles.card} reveal`}>
              <div className={styles.cardIcon}>
                <i className={`bx ${cert.icon}`} aria-hidden="true" />
              </div>
              <h3 className={styles.cardTitle}>{cert.title}</h3>
              <p className={styles.cardDesc}>{cert.desc}</p>
              <div className={styles.cardTags}>
                {cert.tags.map((tag, ti) => (
                  <span key={`${tag}-${ti}`} className="tag tag--white tag--sm">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={`${styles.links} reveal`}>
          {LINKS.map((link, i) => (
            <Link key={`${link.label}-${i}`} href={link.href} className="tag tag--white">
              <i className={`bx ${link.icon}`} aria-hidden="true" /> {link.label}
            </Link>
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/about#quality" className="btn btn--outline">
            <span>Learn About Our Quality Standards</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
