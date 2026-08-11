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

const SOCIALS = ["bxl-facebook", "bxl-twitter", "bxl-linkedin"];

export function TeamPreview() {
  return (
    <section className={`${styles.section} section--alt`} id="team">
      <div className="container">
        <SectionHeader
          icon="bx-group"
          label="Our People"
          title="Meet Our Architects"
          description="Our award-winning team brings decades of combined experience and passion to every project we undertake."
          tags={[
            { href: "/team", icon: "bx-group", label: "Full Team", variant: "primary" },
            { href: "/careers", icon: "bx-briefcase", label: "Join Us", variant: "accent" },
            { href: "/about#leadership", icon: "bx-user-circle", label: "Leadership" },
            { href: "/about#philosophy", icon: "bx-shape-polygon", label: "Design Philosophy" },
            { href: "/services#architectural", icon: "bx-buildings", label: "Architecture Nigeria" },
            { href: "/services#interior", icon: "bx-palette", label: "Interior Design" },
            { href: "/locations#lagos", icon: "bx-map", label: "Lagos Studio" },
            { href: "/locations#abuja", icon: "bx-map-alt", label: "Abuja Studio" },
            { href: "/locations#port-harcourt", icon: "bx-map-pin", label: "Port Harcourt" },
            { href: "/projects", icon: "bx-image", label: "Project Leaders" },
          ]}
        />

        <div className={styles.grid}>
          {TEAM.map((member, i) => (
            <article key={`${member.name}-${i}`} className={`${styles.card} reveal`}>
              <div className={styles.cardImage}>
                <LazyImage
                  src={member.image}
                  alt={`${member.name} - ${member.role}`}
                  fill
                  sizes="(max-width: 968px) 50vw, 25vw"
                />
                <div className={styles.cardSocial}>
                  {SOCIALS.map((icon) => (
                    <a key={icon} href="#" aria-label={icon.replace("bxl-", "")} target="_blank" rel="noreferrer">
                      <i className={`bx ${icon}`} aria-hidden="true" />
                    </a>
                  ))}
                </div>
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
