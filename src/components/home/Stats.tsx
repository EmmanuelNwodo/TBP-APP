import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllProjects } from "@/lib/projects";
import { getAllServices } from "@/lib/services";
import { getRoster } from "@/lib/team";
import { StatItem } from "./StatItem";
import styles from "./Stats.module.css";

const TAGS = [
  { href: "/projects", icon: "bx-building", label: "Project Portfolio" },
  { href: "/reviews", icon: "bx-star", label: "Client Reviews" },
  { href: "/team", icon: "bx-group", label: "Architects and Team" },
  { href: "/services", icon: "bx-buildings", label: "Architecture Services" },
  { href: "/about#certifications", icon: "bx-award", label: "Credentials" },
  { href: "/locations", icon: "bx-map", label: "Lagos and Nigeria" },
];

export function Stats() {
  const projectsCount = getAllProjects().length;
  const serviceCount = getAllServices().length;
  const teamCount = getRoster().length;
  const yearsSinceFounding = new Date().getFullYear() - 2013;

  const STATS = [
    { icon: "bx-calendar", target: yearsSinceFounding, label: "Years Since 2013" },
    { icon: "bx-building", target: projectsCount, label: "Portfolio Projects" },
    { icon: "bx-grid-alt", target: serviceCount, label: "Service Lines" },
    { icon: "bx-user-check", target: teamCount, label: "Team Members" },
  ];

  return (
    <section className={styles.section} id="stats">
      <div className={styles.bg}>
        <LazyImage
          src="/images/projects/BLOOM TOWERS/BLOOM 4A NIGHT 3 copy.jpg"
          alt="Night view of a completed architecture project"
          fill
          sizes="100vw"
        />
      </div>
      <div className={styles.overlay} />
      <div className="container">
        <div className={styles.content}>
          <div className={styles.grid}>
            {STATS.map((stat, i) => (
              <StatItem key={`${stat.label}-${i}`} {...stat} />
            ))}
          </div>

          <div className={`${styles.tags} reveal`}>
            {TAGS.map((tag, i) => (
              <Link key={`${tag.label}-${i}`} href={tag.href} className="tag tag--white">
                <i className={`bx ${tag.icon}`} aria-hidden="true" /> {tag.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
