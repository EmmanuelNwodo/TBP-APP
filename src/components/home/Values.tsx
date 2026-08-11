import Link from "next/link";
import styles from "./Values.module.css";

const VALUES = [
  { icon: "bx-shield-quarter", title: "Integrity", desc: "Honest & transparent", anchor: "integrity" },
  { icon: "bx-star", title: "Excellence", desc: "Quality in every detail", anchor: "excellence" },
  { icon: "bx-bulb", title: "Innovation", desc: "Creative solutions", anchor: "innovation" },
  { icon: "bx-leaf", title: "Sustainability", desc: "Eco-friendly design", anchor: "sustainability" },
  { icon: "bx-group", title: "Collaboration", desc: "Team-driven success", anchor: "collaboration" },
  { icon: "bx-user-check", title: "Client Focus", desc: "Your vision first", anchor: "client-focus" },
  { icon: "bx-wrench", title: "Craftsmanship", desc: "Precision building", anchor: "craftsmanship" },
  { icon: "bx-buildings", title: "Legacy", desc: "Enduring structures", anchor: "legacy" },
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
              <Link key={`${value.title}-${i}`} href={`/about#${value.anchor}`} className={`${styles.card} reveal`}>
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
