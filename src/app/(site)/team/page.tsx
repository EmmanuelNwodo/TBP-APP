import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { TeamCard } from "@/components/team/TeamCard";
import { getRoster } from "@/lib/team";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Architecture Team Nigeria | Lagos Architects ARCON Registered | TBP Team";
const DESCRIPTION =
  "ARCON-registered architects Nigeria team - Principal partners Lagos, senior architects Abuja, construction managers Port Harcourt. Meet TBP's award-winning Nigerian architecture professionals.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/team") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/team") },
};

export default function TeamPage() {
  const roster = getRoster();

  return (
    <main>
      <PageHero
        badgeIcon="bx-group"
        badgeLabel="Our Team"
        title={
          <>
            Meet Our <span>Expert Team</span>
          </>
        }
        description="Talented architects, designers, and professionals dedicated to transforming visions into extraordinary spaces."
        tags={[
          { href: "/about#expertise", icon: "bx-bulb", label: "Expertise", variant: "primary" },
          { href: "/about#philosophy", icon: "bx-book-open", label: "Philosophy" },
          { href: "/about#certifications", icon: "bx-award", label: "Awards" },
          { href: "/about#vision", icon: "bx-bullseye", label: "Vision" },
          { href: "/about#mission", icon: "bx-rocket", label: "Mission" },
          { href: "/about", icon: "bx-info-circle", label: "About" },
          { href: "/services", icon: "bx-building-house", label: "Services" },
          { href: "/projects", icon: "bx-images", label: "Projects" },
          { href: "/contact", icon: "bx-envelope", label: "Contact" },
          { href: "/reviews", icon: "bx-star", label: "Reviews" },
          { href: "/blog", icon: "bx-book", label: "Blog" },
          { href: "/careers", icon: "bx-briefcase", label: "Careers" },
          { href: "/about#ethos", icon: "bx-heart", label: "Ethos" },
          { href: "/about#clients", icon: "bx-handshake", label: "Clients" },
        ]}
      />

      <section className={styles.section}>
        <div className="container">
          <p className={styles.countLine}>
            <strong>{roster.length}</strong> team members across design, construction, and project delivery.
          </p>
          <div className={styles.grid}>
            {roster.map(({ member, hierarchy }) => (
              <TeamCard key={member.id} member={member} hierarchy={hierarchy} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
