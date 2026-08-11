import { LazyImage } from "@/components/ui/LazyImage";
import styles from "./FeaturedGrid.module.css";

const STACK_PROJECTS = [
  {
    image: "/images/projects/PROMASIDOR/promasidor1.jpg",
    alt: "Promasidor Nigeria Head Office",
    eyebrow: "Commercial / Lagos",
    title: "Promasidor HQ",
  },
  {
    image: "/images/projects/FUPRE LIBRARY/FUPRE LIBRARY 1.jpg",
    alt: "FUPRE Library",
    eyebrow: "Institutional / Delta",
    title: "FUPRE Library",
  },
];

export function FeaturedGrid() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          <article className={`${styles.cardLarge} reveal`}>
            <LazyImage
              src="/images/projects/24 AWOLOWO ROAD/24 AWOLOWO RD 1A copy.jpg"
              alt="24 Awolowo Road project"
              fill
              sizes="(max-width: 968px) 100vw, 55vw"
            />
            <div className={styles.cardContent}>
              <p className={styles.eyebrow}>Residential / Lagos</p>
              <h3>24 Awolowo Road</h3>
            </div>
          </article>

          <div className={styles.stack}>
            {STACK_PROJECTS.map((project, i) => (
              <article key={`${project.title}-${i}`} className={`${styles.card} reveal`}>
                <LazyImage src={project.image} alt={project.alt} fill sizes="(max-width: 968px) 100vw, 45vw" />
                <div className={styles.cardContent}>
                  <p className={styles.eyebrow}>{project.eyebrow}</p>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
