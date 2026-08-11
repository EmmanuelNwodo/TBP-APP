import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BlogGrid } from "@/components/blog/BlogGrid";
import { getAllCategories, getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Architecture Blog Nigeria | Project Management, Urban Development & Design Insights | TBP";
const DESCRIPTION =
  "Architecture blog Nigeria featuring expert insights on architectural design, project management services, urban development, sustainable building, and construction trends across Lagos, Abuja, and Port Harcourt.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/blog") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/blog") },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

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
          { href: "/services#green", icon: "bx-leaf", label: "Sustainable Design" },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <BlogGrid posts={posts} categories={categories} />
        </div>
      </section>
    </main>
  );
}
