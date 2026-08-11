import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const title = `${project.title} | The Building Practice`;
  const description = project.shortDescription;
  const url = absoluteUrl(`/projects/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: project.images.main ? [{ url: project.images.main }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <LazyImage src={project.images.main} alt={project.title} fill priority sizes="100vw" />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link href="/projects" className={styles.backLink}>
            <i className="bx bx-arrow-back" aria-hidden="true" /> All Projects
          </Link>
          <span className={styles.category}>
            <i className={`bx ${project.categoryIcon}`} aria-hidden="true" /> {project.categoryLabel}
          </span>
          <h1>{project.title}</h1>
          <p>{project.location}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.main}>
              <p className={styles.lead}>{project.shortDescription}</p>
              <p className={styles.paragraph}>{project.description}</p>
              <p className={styles.paragraph}>{project.description2}</p>

              {project.features.length > 0 && (
                <div className={styles.tagsRow}>
                  {project.features.map((f, i) => (
                    <span key={`${f}-${i}`} className="tag tag--outline tag--sm">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {project.images.gallery.length > 1 && (
                <div className={styles.gallery}>
                  {project.images.gallery.map((img, i) => (
                    <div key={`${img}-${i}`} className={styles.galleryItem}>
                      <LazyImage src={img} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className={styles.sidebar}>
              <div className={styles.detailsCard}>
                {project.details.map((d, i) => (
                  <div key={`${d.label}-${i}`} className={styles.detailItem}>
                    <i className={`bx ${d.icon}`} aria-hidden="true" />
                    <div>
                      <span className={styles.detailLabel}>{d.label}</span>
                      <span className={styles.detailValue}>{d.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.ctaCard}>
                <h3>Have a similar project?</h3>
                <p>Let&apos;s discuss how we can bring your vision to life.</p>
                <Link href="/contact" className="btn btn--primary btn--full">
                  <span>Start a Conversation</span>
                  <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
