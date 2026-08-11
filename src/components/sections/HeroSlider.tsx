"use client";

import { LazyImage } from "@/components/ui/LazyImage";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import styles from "./HeroSlider.module.css";

type Slide = { src: string; alt: string };

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const { index, setIndex, pause, resume } = useAutoAdvance(slides.length, 5000);

  return (
    <div className={styles.slider} onMouseEnter={pause} onMouseLeave={resume}>
      <div className={styles.track}>
        {slides.map((slide, i) => (
          <div key={slide.src} className={`${styles.slide} ${i === index ? styles.active : ""}`}>
            <LazyImage src={slide.src} alt={slide.alt} fill priority={i === 0} sizes="100vw" />
          </div>
        ))}
      </div>

      <div className={styles.indicators}>
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className={`${styles.indicator} ${i === index ? styles.active : ""}`}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
