"use client";

import { useState } from "react";
import Link from "next/link";
import type { Service } from "@/types/service";
import styles from "./ServicesGrid.module.css";

const FILTERS = [
  { key: "all", label: "All Services", icon: "bx-grid-alt" },
  { key: "design", label: "Design", icon: "bx-palette" },
  { key: "construction", label: "Construction", icon: "bx-hard-hat" },
  { key: "management", label: "Management", icon: "bx-task" },
  { key: "consulting", label: "Consulting", icon: "bx-chat" },
  { key: "engineering", label: "Engineering", icon: "bx-cog" },
];

function plainText(html: string, max: number) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export function ServicesGrid({ services }: { services: Service[] }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? services : services.filter((s) => s.filterCategory === filter);

  return (
    <>
      <div className={styles.filterTags}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className={`tag tag--sm ${filter === f.key ? "tag--primary" : "tag--outline"}`}
            onClick={() => setFilter(f.key)}
          >
            <i className={`bx ${f.icon}`} aria-hidden="true" /> {f.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((service, i) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className={styles.card}>
            <span className={styles.cardNumber}>{String(i + 1).padStart(2, "0")}</span>
            <div className={styles.cardIcon}>
              <i className={`bx ${service.icon}`} aria-hidden="true" />
            </div>
            <span className={styles.cardCategory}>{service.category}</span>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDesc}>{plainText(service.overview, 130)}</p>
            <span className={styles.cardBtn}>
              <span>View Details</span>
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
