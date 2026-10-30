import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import styles from "./FeaturedShowcase.module.css";

const PROJECTS = [
  {
    image: "/images/projects/24 AWOLOWO ROAD/24 AWOLOWO RD 1A copy.jpg",
    alt: "Contemporary residential architecture at 24 Awolowo Road",
    category: "Residential",
    title: "24 Awolowo Road",
  },
  {
    image: "/images/projects/BLOOM TOWERS/BLOOM 1A copy.jpg",
    alt: "Bloom Towers, contemporary high-rise architecture",
    category: "Residential",
    title: "Bloom Towers",
  },
  {
    image: "/images/projects/PEACE TOWER/Peace Towers - 1.png",
    alt: "Peace Tower architectural project",
    category: "Commercial",
    title: "Peace Tower",
  },
];

export function FeaturedShowcase() {
  return (
    <section className={styles.showcase} id="featured-portfolio" aria-labelledby="showcase-title">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className={styles.kicker}>A few things we’ve made</span>
            <h2 id="showcase-title">Spaces with a point of view.</h2>
          </div>
          <Link href="/projects" className={styles.viewAll}>
            All projects <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.gallery}>
          {PROJECTS.map((project) => (
            <Link key={project.title} href="/projects" className={styles.card}>
              <LazyImage src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 100vw, 33vw" />
              <span className={styles.cardLabel}>
                <span>{project.category}</span>
                <strong>{project.title}</strong>
              </span>
              <span className={styles.cardArrow} aria-hidden="true">
                <i className="bx bx-up-right-arrow-alt" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
