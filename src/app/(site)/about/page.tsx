import type { Metadata } from "next";
import Link from "next/link";
import { AboutHero } from "@/components/about/AboutHero";
import { ClientsPartnersTabs } from "@/components/about/ClientsPartnersTabs";
import { LazyImage } from "@/components/ui/LazyImage";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "ARCON Registered Architects Nigeria | Lagos Abuja Architecture Firm | TBP";
const DESCRIPTION =
  "ARCON registered architects Nigeria since 2013 - Lagos architecture firm, Abuja Port Harcourt design studio. Modern sustainable architecture services Nigeria.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/about") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/about") },
};

const EXPERTISE = [
  { icon: "bx-edit", title: "Architectural Planning, Design & Documentation", desc: "Comprehensive architectural services from conceptualization through detailed construction documentation.", tags: ["View Projects", "Learn More"] },
  { icon: "bx-hard-hat", title: "Construction Management", desc: "Expert oversight of construction processes ensuring quality, timeline adherence, and budget management.", tags: ["Our Projects", "Get Quote"] },
  { icon: "bx-building", title: "Building Construction", desc: "Full-scale construction services delivering exceptional quality in every project we undertake.", tags: ["Construction", "Certified"] },
  { icon: "bx-home-heart", title: "Interior Design", desc: "Creating interior spaces that blend aesthetics with functionality for enhanced user experience.", tags: ["Interior Design", "Gallery"] },
  { icon: "bx-task", title: "Project Management", desc: "Strategic project coordination ensuring seamless execution from inception to completion.", tags: ["Project Mgmt", "Inquire"] },
  { icon: "bx-building-house", title: "Real Estate Development", desc: "Strategic real estate development solutions that maximize value and market potential.", tags: ["Real Estate", "Portfolio"] },
  { icon: "bxs-flame", title: "Architectural Fire Consultancy", desc: "Specialized fire safety design and consultancy ensuring compliance with international fire codes.", tags: ["Fire Safety", "Consult"], badge: "New" },
  { icon: "bx-leaf", title: "Green Buildings Documentation & Advisory", desc: "Sustainable building solutions with EDGE and LEED documentation and advisory services.", tags: ["Green Buildings", "Certifications"], badge: "New" },
];

const ETHOS = [
  { title: "Curiosity", desc: "We approach each project with an inquisitive mindset, exploring innovative solutions that push the boundaries of conventional design." },
  { title: "Accountability", desc: "Every project is approached with a deep sense of responsibility, ensuring we deliver on our promises and exceed expectations." },
  { title: "Quality", desc: "An unrelenting pursuit of excellence drives every decision, from material selection to the finest design details." },
  { title: "Transformation", desc: "Architecture becomes not only functional but transformative — reflecting both identity and innovation in every space." },
];

const CERTIFICATIONS = [
  { image: "/images/certifications/arcon.jpg", title: "ARCON", desc: "Architects Registration Council of Nigeria" },
  { image: "/images/certifications/leed.jpg", title: "LEED", desc: "Leadership in Energy and Environmental Design" },
  { image: "/images/certifications/pmp.jpg", title: "PMP", desc: "Project Management Professional Certification" },
  { image: "/images/certifications/nia.jpg", title: "NIA", desc: "Nigerian Institute of Architects" },
  { image: "/images/certifications/edge.png", title: "EDGE", desc: "Excellence in Design for Greater Efficiencies" },
  { image: "/images/certifications/nfpa.jpg", title: "NFPA", desc: "National Fire Protection Association" },
  { image: "/images/certifications/acan.png", title: "ACAN", desc: "Association of Consulting Architects Nigeria" },
  { image: "/images/certifications/corbon.jpg", title: "CORBON", desc: "Council of Registered Builders of Nigeria" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/thebuildingpractice", icon: "bxl-instagram", label: "Instagram" },
  { href: "https://www.facebook.com/thebuildingpractice", icon: "bxl-facebook", label: "Facebook" },
  { href: "https://www.youtube.com/@thebuildingpractice", icon: "bxl-youtube", label: "YouTube" },
  { href: "https://www.linkedin.com/company/the-building-practice-ltd/", icon: "bxl-linkedin", label: "LinkedIn" },
  { href: "https://x.com/thebplimited", icon: "bxl-twitter", label: "X (Twitter)" },
  { href: "https://www.buildingpractice.biz", icon: "bx-globe", label: "Website" },
];

export default function AboutPage() {
  return (
    <main>
      <AboutHero />

      <section className={styles.section} id="who-we-are">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div>
              <span className="section-label">Who We Are</span>
              <h2 className={styles.contentTitle}>The Building Practice Ltd.</h2>
              <p className={styles.paragraph}>
                The Building Practice Ltd. (TBP) is an architectural firm dedicated to shaping spaces that inspire,
                endure, and connect. Since its founding in October 2013, TBP has evolved into a trusted name in the
                Nigerian built environment, delivering thoughtful, sustainable, and contextually relevant designs
                across residential, commercial, hospitality, educational, retail, industrial and institutional
                sectors.
              </p>
              <p className={styles.paragraph}>
                Our revised portfolio spans projects such as Sapphire Tower, Promasidor Nigeria Head Office,
                Odunayo&apos;s House Iju, FUPRE campus facilities, Bloom Towers, Oju Olobun Residences, Mandilas
                Tower and No. 24 Awolowo Road. From concept development to construction management, every TBP
                project reflects a deep commitment to functionality, beauty, cultural resonance and dependable
                delivery.
              </p>
              <div className={styles.foundedCard}>
                <div className={styles.foundedIcon}>
                  <i className="bx bx-calendar" aria-hidden="true" />
                </div>
                <div>
                  <h4>Year Founded</h4>
                  <p>October, 2013</p>
                </div>
              </div>
            </div>

            <div className={styles.aboutVisual}>
              <LazyImage
                src="/images/projects/PROMASIDOR/promasidor1.jpg"
                alt="Promasidor Nigeria Head Office"
                fill
                sizes="(max-width: 968px) 100vw, 45vw"
              />
              <div className={styles.floatingBadge}>
                <h3>12+</h3>
                <p>Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} section--alt`} id="expertise">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">Our Expertise</span>
            <h2 className={styles.sectionTitle}>Areas of Specialization</h2>
            <div className={styles.divider} />
            <p className={styles.sectionDesc}>
              Our comprehensive range of services covers every aspect of the architectural and construction
              process, from initial concept to project completion.
            </p>
          </header>

          <div className={styles.expertiseGrid}>
            {EXPERTISE.map((item, i) => (
              <div key={`${item.title}-${i}`} className={styles.expertiseCard}>
                {item.badge && <span className={styles.newBadge}>{item.badge}</span>}
                <div className={styles.expertiseIcon}>
                  <i className={`bx ${item.icon}`} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="mission-vision">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">Our Purpose</span>
            <h2 className={styles.sectionTitle}>Mission &amp; Vision</h2>
            <div className={styles.divider} />
          </header>

          <div className={styles.mvGrid}>
            <div className={styles.mvCard}>
              <span className={styles.mvNumber}>01</span>
              <div className={styles.mvIcon}>
                <i className="bx bx-target-lock" aria-hidden="true" />
              </div>
              <h3>Our Mission</h3>
              <p>
                To provide outstanding, sustainable, complete and functionally designed buildings and spaces for
                people and other activities.
              </p>
            </div>
            <div className={styles.mvCard}>
              <span className={styles.mvNumber}>02</span>
              <div className={styles.mvIcon}>
                <i className="bx bx-show" aria-hidden="true" />
              </div>
              <h3>Our Vision</h3>
              <p>To be a benchmark name in the delivery of top-notch architectural services in Africa &amp; beyond.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} section--alt`} id="ethos">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">Design Philosophy</span>
            <h2 className={styles.sectionTitle}>Our Design Ethos</h2>
            <div className={styles.divider} />
          </header>

          <div className={styles.ethosGrid}>
            <div className={styles.quoteCard}>
              <span className={styles.quoteIcon}>&quot;</span>
              <blockquote>
                At TBP, we don&apos;t just solve design problems — we ensure each project is tied to a traditional
                or cultural relevance.
              </blockquote>
              <cite>The Building Practice Philosophy</cite>
            </div>

            <div className={styles.ethosCards}>
              {ETHOS.map((item, i) => (
                <div key={`${item.title}-${i}`} className={styles.ethosItem}>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} id="philosophy">
        <div className="container">
          <div className={styles.philosophyGrid}>
            <div>
              <span className="section-label">Our Beliefs</span>
              <h2 className={styles.contentTitle}>Our Philosophy</h2>
              <p className={styles.paragraph}>
                Our Philosophy is that design should be simple, be people oriented and complete, that it must
                enhance the user&apos;s experience.
              </p>
              <div className={styles.highlightBox}>
                <p>
                  &quot;At The Building Practice, there are no superstars, we are just ordinary people that achieve
                  extraordinary feats.&quot;
                </p>
              </div>
              <p className={styles.paragraph}>
                The Building Practice Ltd is a group of dynamic professionals whose sole aim is to provide
                outstanding architectural services that evoke appealing moods and ideas capable of absolutely
                stoking human emotions. The company employs the use of in-depth knowledge, skill and artistry to
                stay at the frontier of the industry at all times.
              </p>
            </div>

            <div className={styles.philosophyQuotes}>
              <div className={styles.philosophyQuoteCard}>
                <p>&quot;There is no substitute for good architecture.&quot;</p>
              </div>
              <div className={styles.philosophyQuoteCard}>
                <p>&quot;Design is a statement of one&apos;s intentions. Our intention is to solve problems in delightful ways.&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} section--alt`} id="certifications">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">Credentials</span>
            <h2 className={styles.sectionTitle}>Certifications &amp; Memberships</h2>
            <div className={styles.divider} />
            <p className={styles.sectionDesc}>
              Our work is guided by the highest standards of practice, professionalism, and integrity. TBP
              maintains active membership and certifications with leading architectural and project-management
              bodies, ensuring that every design meets global benchmarks in safety, sustainability, and delivery.
            </p>
          </header>

          <div className={styles.certGrid}>
            {CERTIFICATIONS.map((cert, i) => (
              <div key={`${cert.title}-${i}`} className={styles.certCard}>
                <div className={styles.certIcon}>
                  <LazyImage src={cert.image} alt={cert.title} width={56} height={56} objectFit="contain" />
                </div>
                <h4>{cert.title}</h4>
                <p>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="clients-partners">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">Collaborations</span>
            <h2 className={styles.sectionTitle}>Clients &amp; Partners</h2>
            <div className={styles.divider} />
            <p className={styles.sectionDesc}>
              At TBP, collaboration sits at the core of everything we do. Over the years, we have built enduring
              relationships with clients and partners who share our vision for thoughtful, high-performance, and
              culturally relevant architecture.
            </p>
          </header>

          <ClientsPartnersTabs />
        </div>
      </section>

      <section className={`${styles.section} section--alt`} id="contact-info">
        <div className="container">
          <header className={styles.sectionHeader}>
            <span className="section-label">Get In Touch</span>
            <h2 className={styles.sectionTitle}>Connect With Us</h2>
            <div className={styles.divider} />
          </header>

          <div className={styles.contactGrid}>
            <div className={styles.contactCardLarge}>
              <div className={styles.contactItemLarge}>
                <div className={styles.contactIconLarge}>
                  <i className="bx bx-globe" aria-hidden="true" />
                </div>
                <div>
                  <h4>Website</h4>
                  <p>
                    <a href="https://www.buildingpractice.biz" target="_blank" rel="noreferrer">
                      www.buildingpractice.biz
                    </a>
                  </p>
                </div>
              </div>
              <div className={styles.contactItemLarge}>
                <div className={styles.contactIconLarge}>
                  <i className="bx bx-envelope" aria-hidden="true" />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:info@buildingpractice.biz">info@buildingpractice.biz</a>
                  </p>
                </div>
              </div>
              <div className={styles.contactItemLarge}>
                <div className={styles.contactIconLarge}>
                  <i className="bx bx-map" aria-hidden="true" />
                </div>
                <div>
                  <h4>Office Location</h4>
                  <p>
                    Plot 6, Remi Olowude Street,
                    <br />
                    Lekki Phase 1, Lagos State, Nigeria
                  </p>
                </div>
              </div>
              <div className={styles.contactItemLarge}>
                <div className={styles.contactIconLarge}>
                  <i className="bx bx-phone" aria-hidden="true" />
                </div>
                <div>
                  <h4>Phone Number</h4>
                  <p>
                    <a href="tel:+2349049721840">+234 (904) 972 1840</a>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.socialCard}>
              <h3>Follow Us</h3>
              <div className={styles.socialLinksGrid}>
                {SOCIAL_LINKS.map((social, i) => (
                  <a key={`${social.label}-${i}`} href={social.href} target="_blank" rel="noreferrer" className={styles.socialLinkCard}>
                    <div className={styles.socialIcon}>
                      <i className={`bx ${social.icon}`} aria-hidden="true" />
                    </div>
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Build Your Vision?</h2>
            <p>Let&apos;s collaborate to create spaces that inspire, endure, and transform the built environment.</p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className="btn btn--primary btn--lg">
                <span>Start a Project</span>
                <i className="bx bx-right-arrow-alt" aria-hidden="true" />
              </Link>
              <Link href="/projects" className="btn btn--secondary btn--lg">
                <span>View Our Work</span>
                <i className="bx bx-images" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
