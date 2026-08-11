import styles from "./PageHero.module.css";

export type PageHeroTag = {
  href: string;
  icon: string;
  label: string;
  variant?: "primary" | "outline";
};

type PageHeroProps = {
  badgeIcon: string;
  badgeLabel: string;
  title: React.ReactNode;
  description: string;
  tags?: PageHeroTag[];
  /** The old site's page-hero-content only animates in on some pages (not projects.html) — default matches the common case. */
  reveal?: boolean;
};

export function PageHero({ badgeIcon, badgeLabel, title, description, tags, reveal = true }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={`${styles.content} ${reveal ? "reveal" : ""}`}>
        <div className={styles.badge}>
          <i className={`bx ${badgeIcon}`} aria-hidden="true" />
          <span>{badgeLabel}</span>
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, i) => (
              <a key={`${tag.label}-${i}`} href={tag.href} className={`tag tag--${tag.variant ?? "outline"} tag--sm`}>
                <i className={`bx ${tag.icon}`} aria-hidden="true" /> {tag.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
