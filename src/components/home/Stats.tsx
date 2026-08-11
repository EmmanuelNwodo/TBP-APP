import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { StatItem } from "./StatItem";
import styles from "./Stats.module.css";

const STATS = [
  { icon: "bx-award", target: 75, label: "Awards Won" },
  { icon: "bx-building", target: 320, label: "Projects Completed" },
  { icon: "bx-happy-heart-eyes", target: 500, label: "Happy Clients" },
  { icon: "bx-user-check", target: 45, label: "Team Members" },
];

const TAGS = [
  { href: "/about#awards", icon: "bx-trophy", label: "Award Winners" },
  { href: "/projects", icon: "bx-building", label: "Portfolio" },
  { href: "/reviews", icon: "bx-star", label: "Client Reviews" },
  { href: "/team", icon: "bx-group", label: "Our Team" },
  { href: "/services#architectural", icon: "bx-buildings", label: "Architecture Nigeria" },
  { href: "/services#construction", icon: "bx-hard-hat", label: "Construction" },
  { href: "/services#green", icon: "bx-leaf", label: "Green Building" },
  { href: "/locations#lagos", icon: "bx-map", label: "Lagos" },
  { href: "/locations#abuja", icon: "bx-map-alt", label: "Abuja" },
  { href: "/locations#port-harcourt", icon: "bx-map-pin", label: "Port Harcourt" },
];

export function Stats() {
  return (
    <section className={styles.section} id="stats">
      <div className={styles.bg}>
        <LazyImage
          src="/images/projects/BLOOM TOWERS/BLOOM 4A NIGHT 3 copy.jpg"
          alt="Bloom Towers night rendering"
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
