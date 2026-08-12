import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./Certifications.module.css";

const CERTS = [
  {
    icon: "bx-building-house",
    title: "ARCON",
    desc: "Architects Registration Council of Nigeria recognition.",
    tags: ["Regulatory", "Practice"],
  },
  {
    icon: "bx-group",
    title: "NIA",
    desc: "Nigerian Institute of Architects membership.",
    tags: ["Professional", "Architecture"],
  },
  {
    icon: "bx-check-shield",
    title: "ACAN",
    desc: "Association of Consulting Architects Nigeria affiliation.",
    tags: ["Consulting", "Standards"],
  },
  {
    icon: "bx-building-house",
    title: "LEED / EDGE",
    desc: "Sustainability-aligned design and documentation capability.",
    tags: ["LEED", "EDGE"],
  },
];

const LINKS = [
  { href: "/about#certifications", icon: "bx-file", label: "View Certificates" },
  { href: "/about#expertise", icon: "bx-group", label: "Professional Expertise" },
  { href: "/blog", icon: "bx-book-reader", label: "Read Architecture Insights" },
  { href: "/contact", icon: "bx-phone", label: "Contact the Studio" },
  { href: "/services", icon: "bx-buildings", label: "Architectural Services" },
  { href: "/locations", icon: "bx-map", label: "Lagos and Nigeria Presence" },
];

export function Certifications() {
  return (
    <section className={styles.section} id="certifications">
      <div className="container">
        <SectionHeader
          icon="bx-certification"
          label="Quality Assurance"
          title="Professional Credentials"
          description="Our credentials and affiliations reflect a strong commitment to professional practice, technical quality, and responsible design delivery."
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
