"use client";

import { LazyImage } from "@/components/ui/LazyImage";
import { useCountUp } from "@/hooks/useCountUp";
import styles from "./AboutHero.module.css";

const STATS = [
  { target: 11, label: "Years Experience" },
  { target: 200, label: "Projects Completed" },
  { target: 50, label: "Team Members" },
  { target: 8, label: "Expertise Areas" },
];

function HeroStat({ target, label }: { target: number; label: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <div className={styles.statCard} ref={ref}>
      <div className={styles.statNumber}>{value}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <LazyImage
          src="/images/projects/SAPPHIRE TOWER BLUEWATER LAGOS/20230510_144251.jpg"
          alt="Sapphire Tower Bluewater Lagos"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>About Our Practice</span>
        </div>

        <h1 className={styles.title}>
          Shaping Spaces That
          <br />
          <span className={styles.highlight}>Inspire &amp; Endure</span>
        </h1>

        <p className={styles.description}>
          We are an architectural firm dedicated to creating thoughtful, sustainable, and contextually relevant
          designs that connect people and spaces.
        </p>

        <div className={styles.statsGrid}>
          {STATS.map((stat) => (
            <HeroStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      <div className={styles.scroll}>
        <span>Scroll to Explore</span>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </div>
    </section>
  );
}
