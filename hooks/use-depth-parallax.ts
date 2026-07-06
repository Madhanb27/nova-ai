"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-driven depth parallax for a section: every descendant carrying a
 * `data-depth` attribute drifts vertically by its own depth factor as the
 * section crosses the viewport. Positive depth sinks, negative rises —
 * layered foreground/background movement from one passive scroll listener,
 * written straight to styles (no React re-renders). Inert under reduced
 * motion.
 */
export function useDepthParallax<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The depth drift is imperceptible on small screens but its scroll
    // listener is not — skip it on touch devices.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const layers = Array.from(
      el.querySelectorAll<HTMLElement>("[data-depth]")
    ).map((node) => ({ node, depth: Number(node.dataset.depth) || 0 }));
    if (layers.length === 0) return;

    let raf = 0;
    const apply = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / total)
      );
      layers.forEach(({ node, depth }) => {
        node.style.transform = `translateY(${(p - 0.5) * depth}px)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
