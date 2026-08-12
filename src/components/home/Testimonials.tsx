import Link from "next/link";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    icon: "bx-user",
    name: "Adebayo Johnson",
    title: "Homeowner, Lekki",
    quote:
      "Their architectural planning transformed our concept into clear, buildable documents. The detailed drawings made construction straightforward and worry-free. Highly recommended!",
    tag: { label: "Residential", variant: "primary" as const },
  },
  {
    icon: "bx-building",
    name: "Chioma Okonkwo",
    title: "CEO, Okonkwo Properties",
    quote:
      "Outstanding construction management — scheduling, procurement and subcontractor coordination were handled professionally, keeping our project on time and within budget.",
    tag: { label: "Commercial", variant: "accent" as const },
  },
  {
    icon: "bx-home-heart",
    name: "Emeka Nwosu",
    title: "Developer, Abuja",
    quote:
      "From groundwork to finishings, the construction quality and attention to detail were exceptional. The team delivered a durable, beautiful build that exceeded expectations.",
    tag: { label: "Construction", variant: "primary" as const },
  },
];

export function Testimonials() {
  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <SectionHeader
          icon="bx-message-square-dots"
          label="Testimonials"
          title="What Our Clients Say"
          description="Here's what our satisfied clients have to say about working with our team on their architectural projects."
          tags={[
            { href: "/reviews", icon: "bx-star", label: "All Reviews", variant: "primary" },
            { href: "/reviews", icon: "bx-video", label: "Video Testimonials" },
            { href: "/projects", icon: "bx-building", label: "View Completed Projects" },
            { href: "/services", icon: "bx-home", label: "Residential Services" },
            { href: "/services", icon: "bx-building", label: "Commercial Services" },
            { href: "/services/interior-design", icon: "bx-palette", label: "Interior Design Services" },
            { href: "/locations", icon: "bx-map", label: "Lagos and Nigeria Coverage" },
            { href: "/contact", icon: "bx-message-dots", label: "Start a Project Conversation", variant: "accent" },
          ]}
        />

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <article key={`${t.name}-${i}`} className={`${styles.card} reveal`}>
              <div className={styles.header}>
                <div className={styles.avatar}>
                  <i className={`bx ${t.icon}`} aria-hidden="true" />
                </div>
                <div className={styles.author}>
                  <h4 className={styles.name}>{t.name}</h4>
                  <span className={styles.title}>{t.title}</span>
                </div>
              </div>
              <p className={styles.content}>&quot;{t.quote}&quot;</p>
              <div className={styles.footer}>
                <div className={styles.rating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className="bx bxs-star" aria-hidden="true" />
                  ))}
                </div>
                <div className={styles.tags}>
                  <span className={`tag tag--${t.tag.variant} tag--sm`}>{t.tag.label}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/reviews" className="btn btn--secondary btn--sm">
            <span>Read All Reviews</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--primary btn--sm" style={{ marginLeft: 12 }}>
            <span>Start Your Project</span>
            <i className="bx bx-message-detail" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
