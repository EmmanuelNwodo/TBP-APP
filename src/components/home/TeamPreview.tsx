import Link from "next/link";
import { LazyImage } from "@/components/ui/LazyImage";
import { SectionHeader } from "@/components/sections/SectionHeader";
import styles from "./TeamPreview.module.css";

const TEAM = [
  { image: "/images/team/micheal.jpg", name: "Michael Oluwafemi Alley", role: "Principal Partner" },
  { image: "/images/team/gbemi.jpg", name: "Oluwagbemisola Idowu", role: "Associate Partner" },
  { image: "/images/team/gboyega.jpg", name: "Olugboyega Tayo-Ojo", role: "Associate Partner" },
  { image: "/images/team/nduka.jpg", name: "Nduka Akanu", role: "Senior Associate" },
];

export function TeamPreview() {
  return (
    <section className={`${styles.section} section--alt`} id="team">
      <div className="container">
        <SectionHeader
          icon="bx-group"
          label="Our People"
          title="Meet Our Architects"
          description="Meet the architects and built-environment professionals behind our residential, commercial, and institutional projects."
          tags={[
            { href: "/team", icon: "bx-group", label: "Full Team", variant: "primary" },
            { href: "/careers", icon: "bx-briefcase", label: "Join Us", variant: "accent" },
            { href: "/about#who-we-are", icon: "bx-user-circle", label: "About the Studio" },
            { href: "/about#philosophy", icon: "bx-shape-polygon", label: "Design Philosophy" },
            { href: "/services", icon: "bx-buildings", label: "Architectural Services" },
            { href: "/services/interior-design", icon: "bx-palette", label: "Interior Architecture" },
            { href: "/locations", icon: "bx-map", label: "Lagos and Nigeria Presence" },
            { href: "/projects", icon: "bx-image", label: "View Project Team Work" },
          ]}
        />

        <div className={styles.grid}>
          {TEAM.map((member, i) => (
            <article key={`${member.name}-${i}`} className={`${styles.card} reveal`}>
              <div className={styles.cardImage}>
                <LazyImage
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 968px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardName}>{member.name}</h3>
                <p className={styles.cardRole}>{member.role}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="section-action reveal">
          <Link href="/team" className="btn btn--secondary btn--sm">
            <span>Meet Full Team</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/careers" className="btn btn--primary btn--sm" style={{ marginLeft: 12 }}>
            <span>Join Our Team</span>
            <i className="bx bx-briefcase" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
