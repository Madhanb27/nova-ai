"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progress (0 → 1) of a tall scroll-driven section as it moves past the
 * viewport. Designed for sticky "camera" scenes: the section is taller than
 * the viewport and its inner stage is position: sticky.
 */
export function useSectionProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const track = rect.height - window.innerHeight;
      const p = track > 0 ? Math.min(1, Math.max(0, -rect.top / track)) : 0;
      setProgress(p);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return { ref, progress };
}

/** Remaps a global progress value into a local 0 → 1 segment. */
export function segment(progress: number, from: number, to: number) {
  return Math.min(1, Math.max(0, (progress - from) / (to - from)));
}
