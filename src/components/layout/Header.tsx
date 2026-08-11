"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileNav } from "@/hooks/useMobileNav";
import { useScrollHeader } from "@/hooks/useScrollHeader";
import { NAV_LINKS } from "@/lib/nav-links";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrollHeader();
  const mobileNav = useMobileNav();

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className="container">
        <nav className={styles.nav}>
          <Link href="/" className={styles.navBrand}>
            <Image src="/images/bp.png" alt="The Building Practice Ltd." width={40} height={40} priority />
            <div className={styles.navBrandText}>
              <span className={styles.navBrandName}>The Building Practice Ltd.</span>
              <span className={styles.navBrandTagline}>...Building Spaces that Feel</span>
            </div>
          </Link>

          <ul className={`${styles.navMenu} ${mobileNav.isOpen ? styles.active : ""}`}>
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    onClick={mobileNav.close}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.navActions}>
            <button
              type="button"
              className={`${styles.navToggle} ${mobileNav.isOpen ? styles.active : ""}`}
              aria-label="Toggle navigation"
              onClick={mobileNav.toggle}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
