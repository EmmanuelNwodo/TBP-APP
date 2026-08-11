import styles from "./SectionHeader.module.css";

export type SectionTag = {
  href: string;
  icon: string;
  label: string;
  variant?: "primary" | "accent" | "outline" | "white";
};

type SectionHeaderProps = {
  icon: string;
  label: string;
  title: string;
  description: string;
  tags?: SectionTag[];
  light?: boolean;
  compact?: boolean;
};

export function SectionHeader({ icon, label, title, description, tags, light, compact = true }: SectionHeaderProps) {
  return (
    <header
      className={`${styles.sectionHeader} reveal ${compact ? styles.compact : ""} ${light ? styles.light : ""}`}
    >
      <span className="section-label">
        <i className={`bx ${icon}`} aria-hidden="true" />
        {label}
      </span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider} />
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
    </header>
  );
}
