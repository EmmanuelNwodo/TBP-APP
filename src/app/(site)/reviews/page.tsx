import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ReviewsGrid } from "@/components/reviews/ReviewsGrid";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Architecture Reviews Nigeria | Architect Client Testimonials Lagos | TBP";
const DESCRIPTION =
  "TBP architecture reviews Nigeria - Client testimonials Lagos architects, construction feedback Abuja, interior design reviews Port Harcourt. 4.9⭐ average.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/reviews") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/reviews") },
};

const STATS = [
  { icon: "bx-message-square-dots", value: "180", label: "Total Reviews" },
  { icon: "bx-star", value: "4.9", label: "Average Rating" },
  { icon: "bx-happy-heart-eyes", value: "98%", label: "Satisfaction Rate" },
  { icon: "bx-check-circle", value: "100%", label: "Verified Reviews" },
];

export default function ReviewsPage() {
  return (
    <main>
      <PageHero
        badgeIcon="bx-star"
        badgeLabel="Client Testimonials"
        title={
          <>
            What People Say <span>About Us</span>
          </>
        }
        description="Discover why clients, partners, and collaborators trust The Building Practice to bring their architectural visions to life."
        tags={[
          { href: "/projects", icon: "bx-images", label: "Projects", variant: "primary" },
          { href: "/services", icon: "bx-building-house", label: "Services" },
          { href: "/about", icon: "bx-info-circle", label: "About" },
          { href: "/team", icon: "bx-group", label: "Team" },
          { href: "/contact", icon: "bx-envelope", label: "Contact" },
          { href: "/blog", icon: "bx-book", label: "Blog" },
          { href: "/careers", icon: "bx-briefcase", label: "Careers" },
          { href: "/about#expertise", icon: "bx-bulb", label: "Expertise" },
          { href: "/about#philosophy", icon: "bx-book-open", label: "Philosophy" },
          { href: "/about#certifications", icon: "bx-award", label: "Awards" },
          { href: "/about#vision", icon: "bx-bullseye", label: "Vision" },
          { href: "/about#mission", icon: "bx-rocket", label: "Mission" },
          { href: "/about#ethos", icon: "bx-heart", label: "Ethos" },
          { href: "/about#clients", icon: "bx-handshake", label: "Clients" },
          { href: "/services#residential", icon: "bx-home", label: "Residential" },
          { href: "/services#commercial", icon: "bx-building", label: "Commercial" },
          { href: "/services#interior", icon: "bx-palette", label: "Interior" },
        ]}
      />

      <section className={`${styles.statsSection} reveal`}>
        <div className={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <div key={`${stat.label}-${i}`} className={styles.statCard}>
              <div className={styles.statIcon}>
                <i className={`bx ${stat.icon}`} aria-hidden="true" />
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <ReviewsGrid />
      </section>
    </main>
  );
}
