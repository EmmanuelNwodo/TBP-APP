import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getAllCategories, getArchivePage } from "@/lib/blog";
import styles from "@/app/(site)/blog/page.module.css";

/** Articles per archive page. */
export const POSTS_PER_PAGE = 12;

/**
 * Shared archive view for `/blog` and `/blog/page/[page]`.
 *
 * Only the requested page is fetched from the CMS, and only card summaries
 * cross into the client component. A CMS failure propagates instead of
 * rendering an empty grid, so an outage can never look like a successful but
 * empty archive.
 */
export async function BlogArchive({ page }: { page: number }) {
  const [archive, categories] = await Promise.all([
    getArchivePage(page, POSTS_PER_PAGE),
    getAllCategories(),
  ]);

  // A page number past the end of the archive is a genuine 404.
  if (page > 1 && archive.posts.length === 0) notFound();

  return (
    <main>
      <PageHero
        badgeIcon="bx-news"
        badgeLabel="Our Blog"
        title={
          <>
            Insights & <span>Inspiration</span>
          </>
        }
        description="Explore expert insights on architecture, construction, sustainable building, and design trends from our team."
        tags={[
          { href: "/services", icon: "bx-building-house", label: "Architecture Services", variant: "primary" },
          { href: "/projects", icon: "bx-images", label: "Project Portfolio" },
          { href: "/team", icon: "bx-group", label: "Expert Architects" },
          { href: "/about", icon: "bx-info-circle", label: "About TBP" },
          { href: "/services/green-building-advisory", icon: "bx-leaf", label: "Sustainable Design" },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <BlogGrid
            posts={archive.posts}
            categories={categories}
            page={archive.page}
            totalPages={archive.totalPages}
            total={archive.total}
          />
        </div>
      </section>
    </main>
  );
}
