"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Replicates testweb.js's fade-in-on-scroll behavior: every `.reveal`
 * element starts hidden/offset and animates in once it scrolls within
 * view. Rendered once in the site layout; re-scans on each route change
 * since the page content remounts but this component doesn't.
 */
export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    if (elements.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
