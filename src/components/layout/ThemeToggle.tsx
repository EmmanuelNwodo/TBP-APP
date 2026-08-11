"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

// Exact icon shown is the mode you'd switch TO, matching the old site's
// theme-sync.js: a moon while in light mode (tap to go dark), a sun while
// in dark mode (tap to go light) — not the current mode's own icon.
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.5 14.25A7.6 7.6 0 0 1 9.75 3.5a8.5 8.5 0 1 0 10.75 10.75Z" />
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.64 5.64 3.87 3.87m16.26 16.26-1.77-1.77m0-12.72 1.77-1.77M3.87 20.13l1.77-1.77" />
    <circle cx="12" cy="12" r="4.25" />
  </svg>
);

/**
 * A single global floating toggle, fixed bottom-right — matches the old
 * site's theme-sync.js exactly, which hides the per-page navbar toggle and
 * injects this one control instead.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={styles.globalToggle}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted && (isDark ? <SunIcon /> : <MoonIcon />)}
    </button>
  );
}
