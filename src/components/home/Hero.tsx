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
        <div className={styles.heroContent} />
      </div>

      <div className={styles.heroImageCaption}>
        <h1>An Architectural Firm in Nigeria for Thoughtful, Enduring Design</h1>
        <p>
          Based in Lagos, we design residential, commercial, and civic projects across Nigeria with a clear focus on
          climate, context, and long-term performance.
        </p>
        <div className={styles.heroImageLinks}>
          <Link href="/projects">View Our Completed Projects</Link>
          <Link href="/contact">Discuss Your Project</Link>
        </div>
      </div>

      <div className={styles.heroScroll}>
        <span>Scroll to explore</span>
        <i className="bx bx-chevron-down" aria-hidden="true" />
      </div>
    </section>
  );
}
