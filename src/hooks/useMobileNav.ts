"use client";

import { useEffect, useState } from "react";

/**
 * Mobile hamburger nav state: toggles `body.no-scroll` while open and
 * exposes a `close` callback for nav-link clicks.
 */
export function useMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  return {
    isOpen,
    toggle: () => setIsOpen((open) => !open),
    close: () => setIsOpen(false),
  };
}
