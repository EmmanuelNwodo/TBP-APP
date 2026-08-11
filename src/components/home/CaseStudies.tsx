import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./CaseStudies.module.css";

const PROJECTS = [
  {
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
    alt: "Contemporary residential architecture",
    tags: ["124 Apartments", "18 Floors", "Lekki"],
    title: "Sapphire Tower",
    category: "Residential • Bluewater Lagos",
  },
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    alt: "Modern commercial architecture",
    tags: ["Office", "Remodeling", "Isolo"],
    title: "Promasidor HQ",
    category: "Commercial • Lagos",
  },
  {
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
    alt: "Architecture at dusk",
    tags: ["11 Floors", "Residences", "VI"],
    title: "Oju Olobun Residences",
    category: "Residential • Victoria Island",
  },
  {
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=80",
    alt: "Architectural interior with warm light",
    tags: ["Academic", "Library", "FUPRE"],
    title: "FUPRE Library",
    category: "Institutional • Effurun",
  },
];

export function CaseStudies() {
  return (
    <section className={`${styles.section} section--alt`} id="projects">
      <div className="container">
        <SectionHeader
          icon="bx-briefcase-alt-2"
          label="Case Studies"
          title="Case Studies"
          description="A restrained selection of recent work, curated around atmosphere and form."
          tags={[
            { href: "/projects", icon: "bx-grid-alt", label: "All Projects", variant: "primary" },
            { href: "/projects#residential", icon: "bx-home", label: "Residential" },
            { href: "/projects#commercial", icon: "bx-building", label: "Commercial" },
            { href: "/services#urban", icon: "bx-city", label: "Urban" },
          ]}
        />

        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <article key={`${project.title}-${i}`} className={`${styles.card} reveal`}>
              <LazyImage src={project.image} alt={project.alt} fill sizes="(max-width: 1100px) 50vw, 25vw" />
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <div className={styles.tags}>
                    {project.tags.map((tag, j) => (
                      <span key={`${tag}-${j}`} className="tag tag--white tag--sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className={styles.title}>{project.title}</h3>
                  <p className={styles.category}>{project.category}</p>
                  <div className={styles.actions}>
                    <Link href="/projects" className={styles.action} aria-label="View Project">
                      <i className="bx bx-link-external" aria-hidden="true" />
                    </Link>
                    <Link href="/projects" className={styles.action} aria-label="View Gallery">
                      <i className="bx bx-images" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/projects" className="btn btn--secondary">
            <span>View All Projects</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--primary" style={{ marginLeft: 12 }}>
            <span>Start Your Project</span>
            <i className="bx bx-message-detail" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
