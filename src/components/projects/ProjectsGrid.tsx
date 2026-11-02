"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import type { Project } from "@/types/project";
import styles from "./ProjectsGrid.module.css";

const image = (name: string) => `/images/projects/${name}`;

const ALBUM_SLIDES = [
  { category: "Mixed-Use", image: image("OCULUS.png"), effect: "fade", slug: "the-oculus-grande" },
  { category: "Mixed-Use", image: image("OCULUS2.png"), effect: "zoom", slug: "the-oculus-grande" },
  { category: "Commercial", image: image("shambala.png"), effect: "slideLeft", slug: "shamballa-park-commercial-development-alaro-city-lagos" },
  { category: "Commercial", image: image("SEPLAST3.png"), effect: "slideRight" },
  { category: "Residential", image: image("TOWER6.png"), effect: "bookTurn" },
  { category: "Residential", image: image("TOWER13.png"), effect: "zoomOut" },
  { category: "Residential", image: image("TOWER14.png"), effect: "reåveal" },
  { category: "Institutional", image: image("LFZ mosque.png"), effect: "blur" },
  { category: "Institutional", image: image("lfzm2.png"), effect: "pan" },
];

const EFFECT_CLASSES = {
  fade: styles.effectFade,
  zoom: styles.effectZoom,
  slideLeft: styles.effectSlideLeft,
  slideRight: styles.effectSlideRight,
  bookTurn: styles.effectBookTurn,
  zoomOut: styles.effectZoomOut,
  reveal: styles.effectReveal,
  blur: styles.effectBlur,
  pan: styles.effectPan,
} as const;

export function ProjectsGrid({ projects, variant = "album" }: { projects: Project[]; variant?: "album" | "portfolio" }) {
  const [current, setCurrent] = useState(0);
  const [category, setCategory] = useState("all");
  const wheelLock = useRef(false);
  const validSlugs = useMemo(() => new Set(projects.map((project) => project.slug)), [projects]);

  const goTo = (index: number) => setCurrent((index + ALBUM_SLIDES.length) % ALBUM_SLIDES.length);
  const next = () => goTo(current + 1);
  const previous = () => goTo(current - 1);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % ALBUM_SLIDES.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goTo(current + 1);
      if (event.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current]);

  if (variant === "portfolio") {
    const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))];
    const visibleProjects = category === "all" ? projects : projects.filter((project) => project.category === category);

    return (
      <section className={styles.portfolioPage}>
        <header className={styles.portfolioHeader}>
          <div className="container">
            <span className={styles.portfolioEyebrow}>Selected work</span>
            <h1>Our Projects</h1>
            <p>Architecture across residential, commercial, hospitality, institutional, and mixed-use sectors.</p>
          </div>
        </header>
        <div className={styles.portfolioToolbar}>
          <div className="container">
            <div className={styles.categoryFilters} role="group" aria-label="Filter projects by category">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`${styles.filterButton} ${category === item ? styles.filterActive : ""}`}
                  onClick={() => setCategory(item)}
                >
                  {item === "all" ? "All projects" : item.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.portfolioGridWrap}>
          <div className="container">
            <div className={styles.portfolioGrid}>
              {visibleProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.projectCard}>
                  <div className={styles.projectImage}>
                    <LazyImage src={project.images.main} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 968px) 50vw, 33vw" />
                  </div>
                  <div className={styles.projectMeta}>
                    <div>
                      <span>{project.categoryLabel}</span>
                      <h2>{project.title}</h2>
                    </div>
                    <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const slide = ALBUM_SLIDES[current];
  const href = slide.slug && validSlugs.has(slide.slug) ? `/projects/${slide.slug}` : null;

  const content = (
    <>
      <div className={`${styles.slideImage} ${EFFECT_CLASSES[slide.effect as keyof typeof EFFECT_CLASSES]}`} key={slide.image}>
        <LazyImage src={slide.image} alt="The Building Practice portfolio project" fill priority={current < 3} sizes="100vw" unoptimized />
      </div>
    </>
  );

  return (
    <div
      className={styles.albumShell}
      onWheel={(event) => {
        if (wheelLock.current) return;
        wheelLock.current = true;
        goTo(current + (event.deltaY > 0 ? 1 : -1));
        window.setTimeout(() => { wheelLock.current = false; }, 700);
      }}
    >
      <div className={styles.slideViewport}>
        {href ? <Link href={href} className={styles.slideLink}>{content}</Link> : <article className={styles.slideLink}>{content}</article>}
      </div>

      <header className={styles.albumHeader}>
        <div>
          <span className={styles.albumKicker}>{slide.category}</span>
        </div>
        <div className={styles.albumControls}>
          <button type="button" onClick={previous} aria-label="Previous project image"><i className="bx bx-left-arrow-alt" /></button>
          <span>{String(current + 1).padStart(2, "0")} / {String(ALBUM_SLIDES.length).padStart(2, "0")}</span>
          <button type="button" onClick={next} aria-label="Next project image"><i className="bx bx-right-arrow-alt" /></button>
        </div>
      </header>

      <div className={styles.progressTrack}>
        <div className={styles.progressBar} key={current} />
      </div>
    </div>
  );
}
