import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Our Locations | The Building Practice Ltd. - Lagos, Abuja, Port Harcourt";
const DESCRIPTION =
  "Find our architecture offices in Lekki Lagos, Abuja, and Port Harcourt. ARCON-registered architects serving Nigeria with residential, commercial designs. Contact for consultations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/locations") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/locations") },
};

const NAV_LINKS = [
  { href: "/contact", icon: "bx-phone", title: "Contact Lagos HQ", subtitle: "Lekki Phase 1 architects office" },
  { href: "/services", icon: "bx-building-house", title: "Our Services", subtitle: "Nationwide residential & commercial" },
  { href: "/projects", icon: "bx-grid-alt", title: "Projects Portfolio", subtitle: "Lagos, Abuja, PH showcase" },
  { href: "/team", icon: "bx-group", title: "Our Team", subtitle: "Nigerian registered architects" },
  { href: "/reviews", icon: "bx-star", title: "Client Reviews", subtitle: "Nationwide testimonials" },
  { href: "/careers", icon: "bx-briefcase", title: "Careers Nationwide", subtitle: "Architecture jobs across Nigeria" },
];

const LOCATIONS = [
  {
    title: "Lagos Headquarters",
    address: "Plot 6 Remi Olowude Street, Lekki Phase 1, Lagos 106104",
    phone: "+234 904 972 1840",
    email: "lagos@thebuildingpractice.com",
    hours: "Mon-Fri: 9AM-5PM | Sat: 10AM-2PM",
    services: "Residential, Commercial, Luxury Villas",
    badge: "HQ",
  },
  {
    title: "Abuja Branch",
    address: "Plot 245, Shettima Ali Monguno Cres, Utako, Abuja",
    phone: "+234 803 123 4567",
    email: "abuja@thebuildingpractice.com",
    hours: "Mon-Fri: 8AM-5PM",
    services: "Government, Corporate HQs, Urban",
    badge: "North",
  },
  {
    title: "Port Harcourt Branch",
    address: "12 Old Aba-PH Expressway, Rumuobiakani, PH",
    phone: "+234 803 987 6543",
    email: "ph@thebuildingpractice.com",
    hours: "Mon-Fri: 8AM-6PM",
    services: "Industrial, Oil & Gas, Residential",
    badge: "South-South",
  },
];

const LOCAL_SERVICES = [
  { icon: "bx-building-house", title: "Lagos Architecture", desc: "Luxury villas, high-rise apartments, commercial spaces in Lekki, Ikoyi, VI." },
  { icon: "bx-city", title: "Abuja Design", desc: "Government buildings, corporate HQs, sustainable urban developments." },
  { icon: "bx-home", title: "Port Harcourt Projects", desc: "Oil & gas facilities, residential estates, industrial architecture." },
];

const TESTIMONIALS = [
  { quote: "Outstanding work on our Lekki villa. True professionals.", author: "Dr. Adebayo, Lagos Client" },
  { quote: "Delivered our Abuja office complex on time, under budget.", author: "Zenith Corp, Abuja" },
  { quote: "Expertise in industrial designs for PH operations.", author: "Shell Nigeria, PH" },
];

export default function LocationsPage() {
  return (
    <main>
      <section className={styles.navSection}>
        <div className={styles.navContainer}>
          <div className={styles.navHeader}>
            <div className={styles.navBadge}>
              <i className="bx bx-map" aria-hidden="true" />
              <span>Our Presence</span>
            </div>
            <h2 className={styles.navTitle}>Architects Nationwide</h2>
            <p className={styles.navSubtitle}>Lagos Lekki HQ, Abuja branch, Port Harcourt office — Nigerian architecture coverage</p>
          </div>
          <div className={styles.navGrid}>
            {NAV_LINKS.map((link, i) => (
              <Link key={`${link.title}-${i}`} href={link.href} className={styles.navBtn}>
                <div className={styles.navBtnIcon}>
                  <i className={`bx ${link.icon}`} aria-hidden="true" />
                </div>
                <h3 className={styles.navBtnTitle}>{link.title}</h3>
                <p className={styles.navBtnSubtitle}>{link.subtitle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageHero
        badgeIcon="bx-map-pin"
        badgeLabel="Our Offices"
        title={
          <>
            Find Us Across <span>Nigeria</span>
          </>
        }
        description="Premier architecture offices in Lagos (Lekki Phase 1 HQ), Abuja, and Port Harcourt. Visit for consultations, site visits, and design discussions."
      />

      <section className={styles.locationsSection}>
        <div className={styles.locationsGrid}>
          {LOCATIONS.map((location, i) => (
            <article key={`${location.title}-${i}`} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <Image src="/images/bp.png" alt={location.title} fill sizes="(max-width: 968px) 100vw, 50vw" style={{ objectFit: "contain", padding: "2.5rem" }} />
                <div className={styles.cardBadge}>{location.badge}</div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{location.title}</h3>
                <div className={styles.cardAddress}>
                  <i className="bx bx-map-pin" aria-hidden="true" />
                  <span>{location.address}</span>
                </div>
                <div className={styles.cardHours}>
                  <i className="bx bx-time" aria-hidden="true" /> {location.hours}
                </div>
                <div className={styles.cardCta}>
                  <a href={`tel:${location.phone.replace(/\s/g, "")}`} className={styles.btnPrimary}>
                    <i className="bx bx-phone" aria-hidden="true" /> Call
                  </a>
                  <a href={`mailto:${location.email}`} className={styles.btnSecondary}>
                    <i className="bx bx-envelope" aria-hidden="true" /> Email
                  </a>
                </div>
                <p className={styles.cardServices}>{location.services}</p>
              </div>
            </article>
          ))}
        </div>

        <section className={`${styles.mapSection} reveal`}>
          <h2 className={styles.mapTitle}>
            <i className="bx bx-map" aria-hidden="true" />
            Lagos Headquarters Location
          </h2>
          <div className={styles.mapContainer}>
            <iframe
              title="Google map showing The Building Practice headquarters in Lekki Phase 1"
              src="https://www.google.com/maps?q=Plot%206%20Remi%20Olowude%20Street%2C%20Lekki%20Phase%201%2C%20Lagos%2C%20Nigeria&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className={styles.mapCaption}>Plot 6 Remi Olowude Street, Lekki Phase 1, Lagos. Ample parking available.</p>
        </section>
      </section>

      <section className={styles.servicesSection}>
        <h2 className={styles.sectionTitle}>Local Expertise</h2>
        <div className={styles.servicesGrid}>
          {LOCAL_SERVICES.map((service, i) => (
            <div key={`${service.title}-${i}`} className={`${styles.serviceCard} reveal`}>
              <div className={styles.serviceIcon}>
                <i className={`bx ${service.icon}`} aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.testimonialsSection} reveal`}>
        <h2 className={styles.testimonialsTitle}>Trusted in Every City</h2>
        <div className={styles.testimonialGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={`${t.author}-${i}`} className={styles.testimonial}>
              <p>&quot;{t.quote}&quot;</p>
              <div className={styles.testimonialAuthor}>- {t.author}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
