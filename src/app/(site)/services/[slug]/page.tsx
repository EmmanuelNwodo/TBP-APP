import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllServices, getServiceBySlug } from "@/lib/services";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllServices().map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const title = service.seoTitle || `${service.title} | The Building Practice`;
  const description = service.seoDescription || service.subtitle;
  const url = absoluteUrl(`/services/${slug}`);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <LazyImage src={service.heroImage} alt={service.title} fill priority sizes="100vw" />
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <Link href="/services" className={styles.backLink}>
            <i className="bx bx-arrow-back" aria-hidden="true" /> All Services
          </Link>
          <span className={styles.category}>{service.category}</span>
          <h1>{service.title}</h1>
          <p>{service.subtitle}</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.main}>
              <div className={styles.overview} dangerouslySetInnerHTML={{ __html: service.overview }} />

              {service.highlights.length > 0 && (
                <div className={styles.highlights}>
                  {service.highlights.map((h, i) => (
                    <div key={`${h.title}-${i}`} className={styles.highlightCard}>
                      <div className={styles.highlightIcon}>
                        <i className={`bx ${h.icon}`} aria-hidden="true" />
                      </div>
                      <h4>{h.title}</h4>
                      <p>{h.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {service.features.length > 0 && (
                <div className={styles.block}>
                  <h2>What We Deliver</h2>
                  <ul className={styles.featureList}>
                    {service.features.map((f, i) => (
                      <li key={`${f}-${i}`}>
                        <i className="bx bx-check-circle" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.process.length > 0 && (
                <div className={styles.block}>
                  <h2>Our Process</h2>
                  <div className={styles.processList}>
                    {service.process.map((step, i) => (
                      <div key={`${step.title}-${i}`} className={styles.processStep}>
                        <span className={styles.processNumber}>{i + 1}</span>
                        <div>
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {service.faq.length > 0 && (
                <div className={styles.block}>
                  <h2>Frequently Asked Questions</h2>
                  <div className={styles.faqList}>
                    {service.faq.map((item, i) => (
                      <details key={`${item.q}-${i}`} className={styles.faqItem}>
                        <summary>{item.q}</summary>
                        <div dangerouslySetInnerHTML={{ __html: item.a }} />
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className={styles.sidebar}>
              {service.stats.length > 0 && (
                <div className={styles.statsCard}>
                  {service.stats.map((stat, i) => (
                    <div key={`${stat.label}-${i}`} className={styles.statItem}>
                      <div className={styles.statNumber}>{stat.number}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.ctaCard}>
                <h3>Ready to start?</h3>
                <p>Tell us about your project and we&apos;ll get back to you within 24 hours.</p>
                <Link href="/contact" className="btn btn--primary btn--full">
                  <span>Get a Quote</span>
                  <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                </Link>
              </div>

              {service.tags.length > 0 && (
                <div className={styles.tagsCard}>
                  {service.tags.slice(0, 8).map((tag, i) => (
                    <span key={`${tag.label}-${i}`} className="tag tag--outline tag--sm">
                      <i className={`bx ${tag.icon}`} aria-hidden="true" /> {tag.label}
                    </span>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
