import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllTeamMembers, getTeamMemberById } from "@/lib/team";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllTeamMembers().map((member) => ({ slug: member.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberById(slug);
  if (!member) return {};
  const title = `${member.name} | ${member.title} | The Building Practice`;
  const description = member.leadQuote;
  const url = absoluteUrl(`/team/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "profile",
      images: member.photo ? [{ url: member.photo }] : undefined,
    },
  };
}

export default async function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getTeamMemberById(slug);
  if (!member) notFound();

  return (
    <main>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.imageWrapper}>
            {member.photo ? (
              <LazyImage src={member.photo} alt={member.name} fill priority sizes="280px" />
            ) : (
              <div className={styles.imageFallback}>{member.initials}</div>
            )}
          </div>
          <h1 className={styles.name}>{member.name}</h1>
          <p className={styles.title}>{member.title}</p>

          {member.quickStats.length > 0 && (
            <div className={styles.quickStats}>
              {member.quickStats.map((stat, i) => (
                <div key={`${stat.label}-${i}`} className={styles.quickStat}>
                  <span className={styles.quickStatNumber}>{stat.number}</span>
                  <span className={styles.quickStatLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {(member.email || member.phone) && (
            <div className={styles.infoSection}>
              <h4>
                <i className="bx bx-envelope" aria-hidden="true" /> Contact
              </h4>
              {member.email && (
                <a href={`mailto:${member.email}`} className={styles.infoItem}>
                  <i className="bx bx-envelope" aria-hidden="true" /> {member.email}
                </a>
              )}
              {member.phone && (
                <a href={`tel:${member.phone}`} className={styles.infoItem}>
                  <i className="bx bx-phone" aria-hidden="true" /> {member.phone}
                </a>
              )}
            </div>
          )}

          {member.location && (
            <div className={styles.infoSection}>
              <h4>
                <i className="bx bx-map" aria-hidden="true" /> Location
              </h4>
              <span className={styles.infoItem}>
                <i className="bx bx-building" aria-hidden="true" /> {member.location}
              </span>
            </div>
          )}

          <div className={styles.quickContact}>
            {member.email && (
              <a href={`mailto:${member.email}`} className={styles.quickContactBtn} title="Email">
                <i className="bx bx-envelope" aria-hidden="true" />
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`} className={styles.quickContactBtn} title="Phone">
                <i className="bx bx-phone" aria-hidden="true" />
              </a>
            )}
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className={styles.quickContactBtn} title="LinkedIn">
                <i className="bx bxl-linkedin" aria-hidden="true" />
              </a>
            )}
          </div>
        </aside>

        <div className={styles.main}>
          <div className={styles.breadcrumb}>
            <Link href="/">
              <i className="bx bx-home-alt" aria-hidden="true" /> Home
            </Link>
            <i className="bx bx-chevron-right" aria-hidden="true" />
            <Link href="/team">
              <i className="bx bx-group" aria-hidden="true" /> Team
            </Link>
            <i className="bx bx-chevron-right" aria-hidden="true" />
            <span>{member.name}</span>
          </div>

          {member.leadQuote && (
            <p className={styles.lead}>
              <i className="bx bx-quote-alt-left" aria-hidden="true" /> {member.leadQuote}
            </p>
          )}

          {member.bioParagraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}

          {member.philosophyQuote && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-bulb" aria-hidden="true" /> Professional Philosophy
              </h2>
              <div className={styles.quoteBox}>
                <p>{member.philosophyQuote}</p>
              </div>
            </>
          )}

          {member.competencies.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-badge-check" aria-hidden="true" /> Core Competencies
              </h2>
              <div className={styles.tagsRow}>
                {member.competencies.map((c, i) => (
                  <span key={`${c.label}-${i}`} className="tag tag--outline tag--sm">
                    <i className={`bx ${c.icon}`} aria-hidden="true" /> {c.label}
                  </span>
                ))}
              </div>
            </>
          )}

          {member.highlights.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-star" aria-hidden="true" /> Professional Highlights
              </h2>
              <div className={styles.statsGrid}>
                {member.highlights.map((h, i) => (
                  <div key={`${h.label}-${i}`} className={`${styles.statCard} reveal`}>
                    <i className={`bx ${h.icon}`} aria-hidden="true" />
                    <div className={styles.statNumber}>{h.number}</div>
                    <div className={styles.statLabel}>{h.label}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {member.careerTimeline.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-briefcase-alt" aria-hidden="true" /> Career Journey
              </h2>
              <div className={styles.timeline}>
                {member.careerTimeline.map((t, i) => (
                  <div key={`${t.title}-${t.period}-${i}`} className={`${styles.timelineItem} reveal`}>
                    <div className={styles.timelinePeriod}>
                      <i className="bx bx-calendar" aria-hidden="true" /> {t.period}
                    </div>
                    <h3 className={styles.timelineTitle}>{t.title}</h3>
                    <div className={styles.timelineCompany}>
                      <i className="bx bx-buildings" aria-hidden="true" /> {t.company}
                    </div>
                    <p>{t.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {member.education.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-book-reader" aria-hidden="true" /> Education
              </h2>
              <div className={styles.timeline}>
                {member.education.map((e, i) => (
                  <div key={`${e.degree}-${e.period}-${i}`} className={`${styles.timelineItem} reveal`}>
                    <div className={styles.timelinePeriod}>
                      <i className="bx bx-calendar" aria-hidden="true" /> {e.period}
                    </div>
                    <h3 className={styles.timelineTitle}>{e.degree}</h3>
                    <div className={styles.timelineCompany}>
                      <i className="bx bx-library" aria-hidden="true" /> {e.institution}
                    </div>
                    <p>{e.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {member.certifications.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-certification" aria-hidden="true" /> Professional Development
              </h2>
              <ul className={styles.styledList}>
                {member.certifications.map((c, i) => (
                  <li key={`${c.title}-${i}`}>
                    <i className="bx bx-check-circle" aria-hidden="true" />
                    <span>
                      <strong>{c.title}</strong>
                      {c.detail && ` - ${c.detail}`}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {member.developmentBullets.length > 0 && (
            <ul className={styles.styledList}>
              {member.developmentBullets.map((b, i) => (
                <li key={`${b}-${i}`}>
                  <i className="bx bx-check-circle" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          {member.keyStrengths.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-star" aria-hidden="true" /> Key Strengths
              </h2>
              <div className={styles.statsGrid}>
                {member.keyStrengths.map((s, i) => (
                  <div key={`${s.title}-${i}`} className={`${styles.statCard} reveal`}>
                    <i className={`bx ${s.icon}`} aria-hidden="true" />
                    <h4 className={styles.strengthTitle}>{s.title}</h4>
                    <p className={styles.strengthDesc}>{s.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {member.projectExperience.length > 0 && (
            <>
              <h2 className={styles.sectionTitle}>
                <i className="bx bx-clipboard" aria-hidden="true" /> Professional Experience
              </h2>
              <ul className={styles.styledList}>
                {member.projectExperience.map((p, i) => (
                  <li key={`${p.title}-${i}`}>
                    <i className={`bx ${p.icon || "bx-check-circle"}`} aria-hidden="true" />
                    <span>
                      <strong>{p.title}</strong>
                      {p.description && ` - ${p.description}`}
                    </span>
                  </li>
                ))}
              </ul>
              {member.projectTags.length > 0 && (
                <div className={styles.tagsRow}>
                  {member.projectTags.map((tag, i) => (
                    <span key={`${tag}-${i}`} className="tag tag--outline tag--sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          <div className={styles.ctaRow}>
            <Link href="/team" className="btn btn--secondary">
              <i className="bx bx-arrow-back" aria-hidden="true" />
              <span>Back to Team</span>
            </Link>
            <Link href="/contact" className="btn btn--primary">
              <span>Get in Touch</span>
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
