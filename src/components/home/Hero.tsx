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
        <h2>Architecture with calm presence.</h2>
        <p>
          We create thoughtful homes, civic spaces, and workplaces for Nigeria and beyond — shaped by light,
          climate, and everyday life.
        </p>
        <div className={styles.heroImageLinks}>
          <Link href="/projects">Explore Projects</Link>
          <Link href="/contact">Start a Conversation</Link>
        </div>
      </div>

      <div className={styles.heroScroll}>
        <span>Scroll to explore</span>
        <i className="bx bx-chevron-down" aria-hidden="true" />
      </div>
    </section>
  );
}
