import type { Metadata } from "next";
import Link from "next/link";
import { absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";

const TITLE = "Privacy Policy | The Building Practice Ltd";
const DESCRIPTION = "Privacy policy for The Building Practice Ltd.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/privacy") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/privacy") },
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link className={styles.brand} href="/">
            The Building Practice Ltd
          </Link>
          <Link href="/">Home</Link>
          <Link href="/team">Team</Link>
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <article className={styles.policy}>
          <h1>Privacy Policy</h1>
          <p>Last updated: July 1, 2026</p>

          <p>
            The Building Practice Ltd respects your privacy. This page explains the basic information we may
            collect when you contact us or use our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect contact details, project enquiry information, and messages you choose to send through
            our website, email, phone, or social channels.
          </p>

          <h2>How We Use Information</h2>
          <ul>
            <li>To respond to enquiries and project requests.</li>
            <li>To coordinate consultations, proposals, and client communication.</li>
            <li>To improve our website, services, and client experience.</li>
          </ul>

          <h2>Data Sharing</h2>
          <p>
            We do not sell personal information. We may share information only when needed to provide our
            services, meet legal obligations, or work with trusted service providers.
          </p>

          <h2>Contact</h2>
          <p>
            For privacy questions, contact us at <a href="mailto:info@buildingpractice.biz">info@buildingpractice.biz</a>.
          </p>
        </article>
      </main>
    </div>
  );
}
