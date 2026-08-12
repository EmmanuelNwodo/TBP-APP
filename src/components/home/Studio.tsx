import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import styles from "./Studio.module.css";

export function Studio() {
  return (
    <section className={styles.section} id="about">
      <div className="container">
        <div className={`${styles.studio} reveal`}>
          <div className={styles.image}>
            <LazyImage
              src="/images/projects/BLOOM TOWERS/BLOOM 1A copy.jpg"
              alt="Bloom Towers project"
              fluid
              width={2800}
              height={3100}
              sizes="(max-width: 968px) 100vw, 50vw"
            />
          </div>
          <div className={styles.content}>
            <span className="section-label">
              <i className="bx bx-info-circle" aria-hidden="true" />
              Studio
            </span>
            <h2>A Nigerian Architecture Studio Designing for People, Place, and Climate</h2>
            <p>
              The Building Practice is a Lagos-based architecture company working across Nigeria. We shape homes,
              workplaces, and public-facing spaces through careful planning, technical rigor, and context-led design.
              As an established name among architectural firms in Nigeria, our focus is design quality with practical
              project delivery.
            </p>
            <Link href="/about" className={styles.link}>
              <span>Read the studio story</span>
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
