import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { getLatestPosts } from "@/lib/blog";
import styles from "./BlogPreview.module.css";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function BlogPreview() {
  const posts = getLatestPosts(3);

  return (
    <section className={`${styles.section} section--alt`} id="blog">
      <div className="container">
        <SectionHeader
          icon="bx-book-reader"
          label="Insights"
          title="Latest Articles"
          description="Stay updated with the latest trends in architecture, design innovations, and insights from our experts."
          tags={[
            { href: "/blog", icon: "bx-news", label: "All Articles", variant: "primary" },
            { href: "/blog?category=architecture", icon: "bx-building", label: "Architecture" },
            { href: "/blog?category=sustainability", icon: "bx-leaf", label: "Sustainability" },
            { href: "/blog?category=design", icon: "bx-trending-up", label: "Trends", variant: "accent" },
            { href: "/blog?category=interior-design", icon: "bx-palette", label: "Interior Design" },
            { href: "/blog?category=construction", icon: "bx-hard-hat", label: "Construction" },
            { href: "/blog?category=real-estate", icon: "bx-line-chart", label: "Real Estate" },
            { href: "/blog?category=technology", icon: "bx-chip", label: "Technology" },
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
                  <span>&bull;</span>
                  <i className="bx bx-time" aria-hidden="true" /> {post.readTime} min read
                </p>
                <h3 className={styles.cardTitle}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.readTime}>
                    <i className="bx bx-book-open" aria-hidden="true" /> {post.readTime} min read
                  </span>
                  <Link href={`/blog/${post.slug}`} className="btn btn--ghost btn--sm">
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
