"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./SplashScreen.module.css";

const SPLASH_DURATION = 3000;
const REMOVE_DELAY = 500;

export function SplashScreen() {
  const [phase, setPhase] = useState<"visible" | "hiding" | "gone">("visible");

  useEffect(() => {
    if (phase !== "visible") return;

    document.body.classList.add("no-scroll");
    const hide = () => setPhase("hiding");
    const timer = window.setTimeout(hide, SPLASH_DURATION);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "hiding") return;

    document.body.classList.remove("no-scroll");
    const timer = window.setTimeout(() => setPhase("gone"), REMOVE_DELAY);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={`${styles.splash} ${phase === "hiding" ? styles.hide : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.logoWrapper}>
        <svg className={styles.ring} viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <linearGradient id="tbpSplashRingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1A5F7A" />
              <stop offset="100%" stopColor="#C9A227" />
            </linearGradient>
          </defs>
          <circle cx="60" cy="60" r="54" stroke="url(#tbpSplashRingGradient)" fill="none" />
        </svg>
        <Image src="/images/bp.png" alt="TBP Logo" width={70} height={70} className={styles.logo} priority />
      </div>

      <h1 className={styles.title}>The Building Practice Ltd.</h1>
      <p className={styles.tagline}>...Building Spaces that Feel</p>

      <div className={styles.loader} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <button type="button" className={styles.skip} onClick={() => setPhase("hiding")}>
        Tap to skip
      </button>
    </div>
  );
}
