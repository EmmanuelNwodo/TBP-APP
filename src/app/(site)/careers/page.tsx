import type { Metadata } from "next";
import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { JobsBoard } from "@/components/careers/JobsBoard";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Careers | Architecture Jobs Nigeria | Architect Vacancies Lagos | TBP";
const DESCRIPTION =
  "Architecture careers Nigeria - Architect jobs Lagos, interior designer vacancies Abuja, construction manager Port Harcourt. Join TBP's award-winning team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/careers") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/careers") },
};

const VALUES = [
  { icon: "bx-diamond", title: "Design Excellence", desc: "We pursue perfection in every detail, from concept to completion, delivering spaces that inspire." },
  { icon: "bx-group", title: "Collaboration", desc: "Great architecture emerges from diverse perspectives working together toward a shared vision." },
  { icon: "bx-leaf", title: "Sustainability", desc: "We're committed to responsible design that protects our environment for future generations." },
  { icon: "bx-trending-up", title: "Continuous Learning", desc: "We invest in your growth through mentorship, training, and exposure to cutting-edge techniques." },
];

const BENEFITS = [
  { icon: "bx-line-chart", title: "Competitive Salary", desc: "Industry-leading compensation packages with annual reviews." },
  { icon: "bx-briefcase-alt-2", title: "Professional Development", desc: "Conference attendance, certifications, and training programs." },
  { icon: "bx-desktop", title: "Software Training", desc: "Access to latest architecture software including Revit, Rhino, and more." },
  { icon: "bx-time-five", title: "Flexible Work", desc: "Hybrid and flexible arrangements to suit your lifestyle." },
  { icon: "bx-buildings", title: "Diverse Projects", desc: "Work on residential, commercial, hospitality, and more." },
  { icon: "bx-calendar-check", title: "Paid Time Off", desc: "Generous PTO policy plus public holidays." },
];

export default function CareersPage() {
  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>We&apos;re Hiring!</div>
          <h1 className={styles.heroTitle}>Build the Future With Us</h1>
          <p className={styles.heroDesc}>
            Join a team of visionary architects and designers passionate about creating sustainable, inspiring
            spaces that shape how people live, work, and connect.
          </p>
          <div className={styles.heroButtons}>
            <a href="#jobs" className="btn btn--primary">
              <span>View Open Positions</span>
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </a>
            <a href="#about" className="btn btn--secondary">
              Learn About Our Culture
            </a>
          </div>

          <div className={styles.heroTags}>
            <Link href="/team" className="tag tag--primary tag--sm">
              <i className="bx bx-group" aria-hidden="true" /> Meet Our Team
            </Link>
            <Link href="/about" className="tag tag--outline tag--sm">
              <i className="bx bx-info-circle" aria-hidden="true" /> About TBP
            </Link>
            <Link href="/services" className="tag tag--outline tag--sm">
              <i className="bx bx-building-house" aria-hidden="true" /> Architecture Services
            </Link>
            <Link href="/projects" className="tag tag--outline tag--sm">
              <i className="bx bx-images" aria-hidden="true" /> Our Projects
            </Link>
            <Link href="/contact" className="tag tag--outline tag--sm">
              <i className="bx bx-envelope" aria-hidden="true" /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section} id="about">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImage}>
              <LazyImage src="/images/careers/careers 3.jpg" alt="TBP team collaboration and studio culture" fill sizes="(max-width: 968px) 100vw, 50vw" />
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Shape Tomorrow&apos;s Skylines</h2>
              <p className={styles.paragraph}>
                At The Building Practice, we believe architecture is more than design—it&apos;s about creating
                experiences that enhance human life. Every project is an opportunity to push boundaries, challenge
                conventions, and build sustainably.
              </p>
              <p className={styles.paragraph}>
                Our collaborative studio culture fosters innovation, creativity, and professional growth. We work
                on diverse projects across residential, commercial, hospitality, and institutional sectors, giving
                you exposure to varied challenges and learning opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} section--alt`}>
        <div className="container">
          <header className={styles.centeredHeader}>
            <span className="section-label">Our Values</span>
            <h2 className={styles.sectionTitle}>What Drives Us</h2>
          </header>
          <div className={styles.valuesGrid}>
            {VALUES.map((v, i) => (
              <div key={`${v.title}-${i}`} className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <i className={`bx ${v.icon}`} aria-hidden="true" />
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <header className={styles.centeredHeader}>
            <span className="section-label">Benefits</span>
            <h2 className={styles.sectionTitle}>Growth &amp; Rewards</h2>
          </header>
          <div className={styles.benefitsGrid}>
            {BENEFITS.map((b, i) => (
              <div key={`${b.title}-${i}`} className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <i className={`bx ${b.icon}`} aria-hidden="true" />
                </div>
                <div>
                  <h4>{b.title}</h4>
                  <p>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} section--alt`} id="jobs">
        <div className="container">
          <header className={styles.centeredHeader}>
            <span className="section-label">Join Our Team</span>
            <h2 className={styles.sectionTitle}>Open Positions</h2>
            <p className={styles.sectionDesc}>Find your next role and help us shape the future of architecture.</p>
          </header>
          <JobsBoard />
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <h2>Join Us in Shaping Inspiring Spaces</h2>
          <p>Ready to take the next step in your architecture career? We can&apos;t wait to meet you.</p>
          <a href="#jobs" className="btn btn--primary btn--lg">
            Explore Opportunities
          </a>
          <p className={styles.ctaLink}>
            Or reach out directly — <Link href="/contact">Contact HR</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
