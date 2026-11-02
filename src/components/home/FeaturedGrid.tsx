import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import styles from "./FeaturedGrid.module.css";

const STACK_PROJECTS = [
  {
    image: "/images/projects/PROMASIDOR/promasidor1.jpg",
    alt: "Promasidor Nigeria Head Office",
    eyebrow: "Commercial · Lagos",
    title: "Promasidor Head Office",
  },
  {
    image: "/images/projects/FUPRE LIBRARY/FUPRE LIBRARY 1.jpg",
    alt: "FUPRE Library",
    eyebrow: "Institutional · Delta",
    title: "FUPRE Library",
  },
];

export function FeaturedGrid() {
  return (
    <section className={styles.section} aria-labelledby="more-work-title">
      <div className="container">
        <div className={styles.heading}>
          <div>
            <span className={styles.kicker}>Made across Nigeria</span>
            <h2 id="more-work-title">Good spaces, everywhere.</h2>
          </div>
          <Link href="/projects" className={styles.viewAll}>
            Discover all projects <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.grid}>
          <Link href="/projects" className={`${styles.cardLarge} reveal`}>
            <LazyImage src="/images/projects/27 GLOVER/PANTHEON.jpg" alt="27 Glover residential architecture" fill sizes="(max-width: 968px) 100vw, 55vw" />
            <span className={styles.cardContent}>
              <span className={styles.eyebrow}>Residential · Lagos</span>
              <strong>27 Glover</strong>
            </span>
            <span className={styles.cardArrow} aria-hidden="true">
              <i className="bx bx-up-right-arrow-alt" />
            </span>
          </Link>

          <div className={styles.stack}>
            {STACK_PROJECTS.map((project) => (
              <Link key={project.title} href="/projects" className={`${styles.card} reveal`}>
                <LazyImage src={project.image} alt={project.alt} fill sizes="(max-width: 968px) 100vw, 45vw" />
                <span className={styles.cardContent}>
                  <span className={styles.eyebrow}>{project.eyebrow}</span>
                  <strong>{project.title}</strong>
                </span>
                <span className={styles.cardArrow} aria-hidden="true">
                  <i className="bx bx-up-right-arrow-alt" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
