import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getLatestPosts } from "@/lib/blog";
import styles from "./BlogPreview.module.css";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export async function BlogPreview() {
  const posts =  await getLatestPosts(3);

  return (
    <section className={`${styles.section} section--alt`} id="blog">
      <div className="container">
        <SectionHeader
          icon="bx-book-reader"
          label="Insights"
          title="Latest Articles"
          description="Stay updated with the latest trends in architecture, design innovations, and insights from our experts."
          // The archive's category tabs are client-side filters, not routes:
          // `/blog?category=x` was ignored by the grid, so these now point at
          // the real destinations they describe instead of a dead parameter.
          tags={[
            { href: "/blog", icon: "bx-news", label: "All Articles", variant: "primary" },
            { href: "/services/architectural-design", icon: "bx-building", label: "Architecture" },
            { href: "/services/green-building-advisory", icon: "bx-leaf", label: "Sustainability" },
            { href: "/projects", icon: "bx-trending-up", label: "Projects", variant: "accent" },
            { href: "/services/interior-design", icon: "bx-palette", label: "Interior Design" },
            { href: "/services/building-construction", icon: "bx-hard-hat", label: "Construction" },
            { href: "/services/real-estate-development", icon: "bx-line-chart", label: "Real Estate" },
            { href: "/services/3d-visualization", icon: "bx-chip", label: "3D Visualisation" },
          ]}
        />

        <div className={styles.grid}>
          {posts.map((post) => (
            <article key={post.slug} className={`${styles.card} reveal`}>
              <div className={styles.cardImage}>
                <LazyImage src={post.image} alt={post.title} fill sizes="(max-width: 968px) 100vw, 33vw" />
                <div className={styles.cardCategory}>
                  <span className="tag tag--primary tag--sm">{post.category}</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.cardMeta}>
                  <i className="bx bx-calendar" aria-hidden="true" /> {formatDate(post.date)}
                </p>
                <h3 className={styles.cardTitle}>
                  <Link href={`/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardFooter}>
                  <Link href={`/${post.slug}`} className="btn btn--ghost btn--sm">
                    Read More <i className="bx bx-right-arrow-alt" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/blog" className="btn btn--secondary btn--sm">
            <span>View All Articles</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
