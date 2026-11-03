import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroMedia}>
        <LazyImage
          src="/images/projects/SAPPHIRE TOWER BLUEWATER LAGOS/20230510_144251.jpg"
          alt="The Building Practice architectural project"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.heroOverlay} />

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>Architecture · Interiors · Lagos, Nigeria</span>
          <h1>Spaces that feel like somewhere.</h1>
          <p>Thoughtful design, made for the way we live.</p>
          <div className={styles.heroImageLinks}>
            <Link href="/projects" className={styles.primaryLink}>
              Explore our work <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </Link>
            <Link href="/contact" className={styles.secondaryLink}>
              Start a project
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.heroScroll}>
        <span>Scroll to explore</span>
        <i className="bx bx-chevron-down" aria-hidden="true" />
      </div>
    </section>
  );
}
