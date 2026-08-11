import { LazyImage } from "@/components/ui/LazyImage";
import styles from "./FeaturedShowcase.module.css";

export function FeaturedShowcase() {
  return (
    <section className={styles.showcase} id="featured-portfolio">
      <div className={styles.media}>
        <LazyImage
          src="/images/projects/24 AWOLOWO ROAD/24 AWOLOWO RD 1A copy.jpg"
          alt="Selected work showcase"
          fill
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className="container">
          <div className={`${styles.intro} reveal`}>
            <span className="section-label">
              <i className="bx bx-image-alt" aria-hidden="true" />
              Selected Work
            </span>
            <h2>Spaces shaped by light, texture, and quiet ambition.</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
