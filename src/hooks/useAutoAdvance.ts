"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cycles an index 0..count-1 on an interval, pausing while `paused` is true.
 * Backs the hero slider and any other auto-advancing carousel.
 */
export function useAutoAdvance(count: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count, intervalMs]);

  return {
    index,
    setIndex,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}
