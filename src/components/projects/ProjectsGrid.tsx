"use client";

import { useState } from "react";
import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import type { Project } from "@/types/project";
import styles from "./ProjectsGrid.module.css";

const CATEGORIES = [
  { key: "all", label: "All", icon: "bx-grid-alt" },
  { key: "residential", label: "Residential", icon: "bx-home-heart" },
  { key: "commercial", label: "Commercial", icon: "bx-building" },
  { key: "mixed-use", label: "Mixed-Use", icon: "bx-layer" },
  { key: "hospitality", label: "Hospitality", icon: "bx-hotel" },
  { key: "institutional", label: "Institutional", icon: "bx-school" },
];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState("all");
  const filtered = category === "all" ? projects : projects.filter((p) => p.category === category);

  return (
    <>
      <div className={styles.filterContainer} role="tablist" aria-label="Project categories">
        {CATEGORIES.map((cat) => {
          const count = cat.key === "all" ? projects.length : projects.filter((p) => p.category === cat.key).length;
          return (
            <button
              key={cat.key}
              type="button"
              role="tab"
              aria-selected={category === cat.key}
              className={`${styles.filterBtn} ${category === cat.key ? styles.active : ""}`}
              onClick={() => setCategory(cat.key)}
            >
              <i className={`bx ${cat.icon}`} aria-hidden="true" />
              <span>{cat.label}</span>
              <span className={styles.filterCount}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className={styles.countLine}>
        Showing <strong>{filtered.length}</strong> of <strong>{projects.length}</strong> projects
      </p>

      <div className={styles.grid} role="list">
        {filtered.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.card} role="listitem">
            <div className={styles.cardImage}>
              <LazyImage src={project.images.main} alt={project.title} fill sizes="(max-width: 968px) 100vw, 33vw" />
              <div className={styles.cardOverlay}>
                <div className={styles.cardTags}>
                  {project.meta.map((m, i) => (
                    <span key={`${m.text}-${i}`} className="tag tag--white tag--sm">
                      <i className={`bx ${m.icon}`} aria-hidden="true" /> {m.text}
                    </span>
                  ))}
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardCategory}>
                  {project.categoryLabel} &bull; {project.location}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
