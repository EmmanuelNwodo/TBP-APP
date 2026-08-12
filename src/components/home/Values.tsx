import Link from "next/link";
import styles from "./Values.module.css";

const VALUES = [
  { icon: "bx-shield-quarter", title: "Integrity", desc: "Honest & transparent", href: "/about#who-we-are" },
  { icon: "bx-star", title: "Excellence", desc: "Quality in every detail", href: "/about#expertise" },
  { icon: "bx-bulb", title: "Innovation", desc: "Creative solutions", href: "/about#philosophy" },
  { icon: "bx-leaf", title: "Sustainability", desc: "Eco-friendly design", href: "/about#certifications" },
  { icon: "bx-group", title: "Collaboration", desc: "Team-driven success", href: "/about#clients-partners" },
  { icon: "bx-user-check", title: "Client Focus", desc: "Your vision first", href: "/about#who-we-are" },
  { icon: "bx-wrench", title: "Craftsmanship", desc: "Precision building", href: "/projects" },
  { icon: "bx-buildings", title: "Legacy", desc: "Enduring structures", href: "/about#ethos" },
];

export function Values() {
  return (
    <section className={`${styles.section} section--alt`} id="values">
      <div className="container">
        <div className={`${styles.values} reveal`}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              <i className="bx bx-diamond" aria-hidden="true" />
              Our Core Values
            </h3>
            <p className={styles.subtitle}>The principles that guide every project and decision we make</p>
          </div>

          <div className={styles.grid}>
            {VALUES.map((value, i) => (
              <Link key={`${value.title}-${i}`} href={value.href} className={`${styles.card} reveal`}>
                <div className={styles.cardIcon}>
                  <i className={`bx ${value.icon}`} aria-hidden="true" />
                </div>
                <h4 className={styles.cardTitle}>{value.title}</h4>
                <p className={styles.cardDesc}>{value.desc}</p>
              </Link>
            ))}
          </div>

          <div className={styles.cta}>
            <Link href="/about" className="btn btn--secondary btn--sm">
              <span>Learn More About Us</span>
              <i className="bx bx-right-arrow-alt" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
