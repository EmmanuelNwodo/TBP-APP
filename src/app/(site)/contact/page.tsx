import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Contact Architecture Firm Nigeria | Architect Lagos | TBP Contact";
const DESCRIPTION =
  "Contact The Building Practice Ltd. - Architecture firm Lagos Nigeria. Architect consultations, project inquiries, office location Lekki Phase 1.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/contact") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/contact") },
};

const INFO_CARDS = [
  {
    icon: "bx-map",
    title: "Visit Our Office",
    content: (
      <p>
        Plot 6 Remi Olowude Street,
        <br />
        Lekki Phase 1, Lagos, Nigeria
      </p>
    ),
  },
  {
    icon: "bx-phone",
    title: "Call Us",
    content: (
      <p>
        <a href="tel:+2349049721840">+234 904 972 1840</a>
        <br />
        <a href="tel:+2348012345678">+234 801 234 5678</a>
      </p>
    ),
  },
  {
    icon: "bx-envelope",
    title: "Email Us",
    content: (
      <p>
        <a href="mailto:info@thebuildingpractice.com">info@thebuildingpractice.com</a>
        <br />
        <a href="mailto:projects@thebuildingpractice.com">projects@thebuildingpractice.com</a>
      </p>
    ),
  },
];

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/thebuildingpractice", icon: "bxl-facebook", label: "Facebook" },
  { href: "https://www.instagram.com/thebuildingpractice", icon: "bxl-instagram", label: "Instagram" },
  { href: "https://x.com/thebplimited", icon: "bxl-twitter", label: "Twitter" },
  { href: "https://www.linkedin.com/company/the-building-practice-ltd/", icon: "bxl-linkedin", label: "LinkedIn" },
  { href: "https://wa.me/2349049721840", icon: "bxl-whatsapp", label: "WhatsApp" },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        badgeIcon="bx-envelope"
        badgeLabel="Get In Touch"
        title={
          <>
            Let&apos;s Build <span>Together</span>
          </>
        }
        description="Have a question or project in mind? We'd love to hear from you. Reach out and let's start creating something extraordinary."
        tags={[
          { href: "tel:+2349049721840", icon: "bx-phone", label: "Call Us", variant: "primary" },
          { href: "mailto:info@thebuildingpractice.com", icon: "bx-mail-send", label: "Email" },
          { href: "/services", icon: "bx-building-house", label: "Services" },
          { href: "/projects", icon: "bx-images", label: "Projects" },
          { href: "/about", icon: "bx-info-circle", label: "About" },
          { href: "/team", icon: "bx-group", label: "Team" },
          { href: "/reviews", icon: "bx-star", label: "Reviews" },
          { href: "/blog", icon: "bx-book", label: "Blog" },
          { href: "/careers", icon: "bx-briefcase", label: "Careers" },
          { href: "/services#residential", icon: "bx-home", label: "Residential" },
          { href: "/services#commercial", icon: "bx-building", label: "Commercial" },
          { href: "/services#interior", icon: "bx-palette", label: "Interior" },
          { href: "/services#construction", icon: "bx-hard-hat", label: "Construction" },
          { href: "/services#green", icon: "bx-leaf", label: "Green" },
          { href: "/services#landscape", icon: "bx-tree", label: "Landscape" },
          { href: "/services#urban", icon: "bx-city", label: "Urban" },
          { href: "/about#expertise", icon: "bx-bulb", label: "Expertise" },
          { href: "/about#philosophy", icon: "bx-book-open", label: "Philosophy" },
          { href: "/about#certifications", icon: "bx-award", label: "Awards" },
        ]}
      />

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={`${styles.infoGrid} reveal`}>
            {INFO_CARDS.map((card, i) => (
              <div key={`${card.title}-${i}`} className={styles.infoCard} data-index={i}>
                <div className={styles.infoIcon}>
                  <i className={`bx ${card.icon}`} aria-hidden="true" />
                </div>
                <h3 className={styles.infoTitle}>{card.title}</h3>
                <div className={styles.infoText}>{card.content}</div>
              </div>
            ))}
          </div>

          <div className={`${styles.contactGrid} reveal`}>
            <ContactForm />

            <div className={styles.mapCard}>
              <div className={styles.mapContainer}>
                <iframe
                  title="Google map showing The Building Practice office in Lekki Phase 1"
                  src="https://www.google.com/maps?q=Plot%206%20Remi%20Olowude%20Street%2C%20Lekki%20Phase%201%2C%20Lagos%2C%20Nigeria&output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className={styles.mapInfo}>
                <h4 className={styles.mapInfoTitle}>
                  <i className="bx bx-buildings" aria-hidden="true" />
                  Our Headquarters
                </h4>
                <p className={styles.mapInfoText}>
                  Plot 6 Remi Olowude Street, Lekki Phase 1, Lagos. Open the map for turn-by-turn directions to our
                  office.
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Plot%206%20Remi%20Olowude%20Street%2C%20Lekki%20Phase%201%2C%20Lagos%2C%20Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapDirectionsBtn}
                >
                  <i className="bx bx-directions" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>

          <div className={`${styles.socialSection} reveal`}>
            <h3 className={styles.socialTitle}>Connect With Us</h3>
            <p className={styles.socialSubtitle}>
              Follow our latest projects, site updates, design thinking and studio news across our official
              channels.
            </p>
            <div className={styles.socialLinks}>
              {SOCIAL_LINKS.map((social, i) => (
                <a
                  key={`${social.label}-${i}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                >
                  <i className={`bx ${social.icon}`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
