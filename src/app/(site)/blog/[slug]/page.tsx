import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LazyImage } from "@/components/ui/LazyImage";
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();

  return posts.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = absoluteUrl(`/blog/${slug}`);

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "article",

      publishedTime: post.date,

      authors: [post.author],

      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,

      images: post.image
        ? [
            {
              url: post.image,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const related = await getRelatedPosts(post.slug, post.category, 3);

  const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: post.title,
  description: post.seoDescription || post.excerpt,
  image: post.image ? [post.image] : undefined,
  datePublished: post.date,
  dateModified: post.modified,
  author: {
    "@type": "Organization",
    name: "The Building Practice Ltd",
  },
  publisher: {
    "@type": "Organization",
    name: "The Building Practice Ltd",
    url: absoluteUrl("/"),
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": absoluteUrl(`/blog/${post.slug}`),
  },
};


const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: absoluteUrl("/"),
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: absoluteUrl("/blog"),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: post.title,
      item: absoluteUrl(`/blog/${post.slug}`),
    },
  ],
};

  return (
    <main>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbSchema),
  }}
/>


      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <LazyImage
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <Link href="/blog" className={styles.backLink}>
            <i className="bx bx-arrow-back" aria-hidden="true" /> All Articles
          </Link>

          <span className="tag tag--primary tag--sm">
            {post.category}
          </span>

          <h1>{post.title}</h1>

          <p className={styles.meta}>
            <i className="bx bx-user" aria-hidden="true" /> {post.author}
            <span>&bull;</span>
            <i className="bx bx-calendar" aria-hidden="true" />{" "}
            {formatDate(post.date)}
            <span>&bull;</span>
            <i className="bx bx-time" aria-hidden="true" /> {post.readTime} min read
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.grid}>
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <aside className={styles.sidebar}>
            {post.serviceTags.length > 0 && (
              <div className={styles.tagsCard}>
                <h4>Related Services</h4>

                <div className={styles.tags}>
                  {post.serviceTags.map((tag) => (
                    <span
                      key={tag}
                      className="tag tag--outline tag--sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.ctaCard}>
              <h3>Have a project in mind?</h3>

              <p>
                Let&apos;s talk about how we can bring it to life.
              </p>

              <Link
                href="/contact"
                className="btn btn--primary btn--full"
              >
                <span>Start a Conversation</span>
                <i
                  className="bx bx-right-arrow-alt"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {related.length > 0 && (
              <div className={styles.relatedCard}>
                <h4>Related Articles</h4>

                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className={styles.relatedItem}
                  >
                    <div className={styles.relatedImage}>
                      <LazyImage
                        src={r.image}
                        alt={r.title}
                        fill
                        sizes="80px"
                      />
                    </div>

                    <span>{r.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}