"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  { href: "https://www.facebook.com/thebuildingpractice", label: "Facebook", icon: "bxl-facebook" },
  { href: "https://x.com/thebplimited", label: "Twitter", icon: "bxl-twitter" },
  { href: "https://www.instagram.com/thebuildingpractice", label: "Instagram", icon: "bxl-instagram" },
  { href: "https://www.linkedin.com/company/the-building-practice-ltd/", label: "LinkedIn", icon: "bxl-linkedin" },
];

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
];

const SERVICE_LINKS = [
  { href: "/services", label: "Architecture" },
  { href: "/services", label: "Interior Design" },
  { href: "/services", label: "Construction" },
  { href: "/services", label: "Consultancy" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.footerMain}>
            <div className={styles.footerBrand}>
              <Link href="/" className={styles.footerLogo}>
                <Image src="/images/bp.png" alt="TBP Logo" width={28} height={28} />
                <span className={styles.footerLogoText}>The Building Practice</span>
              </Link>
              <p>
                An architectural firm dedicated to shaping spaces that inspire, endure, and connect. Creating
                thoughtful, sustainable, and contextually relevant designs since 2013.
              </p>
              <div className={styles.footerSocial}>
                {SOCIAL_LINKS.map((social, i) => (
                  <a key={`${social.label}-${i}`} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <i className={`bx ${social.icon}`} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4>Quick Links</h4>
              <ul className={styles.footerLinks}>
                {QUICK_LINKS.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link href={link.href}>
                      <i className="bx bx-chevron-right" aria-hidden="true" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Our Services</h4>
              <ul className={styles.footerLinks}>
                {SERVICE_LINKS.map((link, i) => (
                  <li key={`${link.label}-${i}`}>
                    <Link href={link.href}>
                      <i className="bx bx-chevron-right" aria-hidden="true" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.footerColumn} ${styles.footerMainBottom}`}>
              <h4>Contact Info</h4>
              <ul className={styles.footerLinks}>
                <li>
                  <i className="bx bx-map" aria-hidden="true" />
                  <span>Plot 6, Remi Olowude, Lekki Phase 1</span>
                </li>
                <li>
                  <a href="tel:+2349049721840">
                    <i className="bx bx-phone" aria-hidden="true" />
                    <span>+234 904 972 1840</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@buildingpractice.biz">
                    <i className="bx bx-envelope" aria-hidden="true" />
                    <span>info@buildingpractice.biz</span>
                  </a>
                </li>
                <li>
                  <i className="bx bx-time" aria-hidden="true" />
                  <span>Mon - Fri: 9AM - 5PM</span>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footerNewsletter}>
            <h4 className={styles.newsletterTitle}>Subscribe</h4>
            <p className={styles.newsletterDescription}>Get the latest updates and insights</p>
            <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
              <input type="email" name="email" placeholder="Email address" aria-label="Email address" required />
              <button type="submit" className="btn btn--primary btn--sm">
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
            <p className={styles.newsletterPrivacy}>We respect your privacy.</p>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>
            &copy; {new Date().getFullYear()} The Building Practice Ltd. All Rights Reserved.
          </p>
          <div className={styles.footerLegal}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
