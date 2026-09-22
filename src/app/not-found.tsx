import Link from "next/link";
import styles from "./not-found.module.css";

/**
 * Root 404 page.
 *
 * Rendered outside the `(site)` route group, so the splash overlay is absent
 * and this page carries exactly one H1. Next.js adds the `noindex` robots
 * directive to not-found responses automatically, and the root layout no
 * longer emits a competing "index, follow", so a 404 now carries a single,
 * unambiguous signal.
 *
 * It renders no CMS data, so a missing article costs one CMS lookup and
 * nothing more.
 */
export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>This page could not be found</h1>
        <p className={styles.text}>
          The page you are looking for may have moved, or the link that brought you here may be out
          of date.
        </p>

        <div className={styles.actions}>
          <Link href="/" className="btn btn--primary">
            <span>Back to Home</span>
            <i className="bx bx-right-arrow-alt" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn btn--secondary">
            Contact Us
          </Link>
        </div>

        <nav className={styles.links} aria-label="Site sections">
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/team">Team</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
    </main>
  );
}
