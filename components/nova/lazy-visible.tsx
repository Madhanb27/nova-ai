"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts expensive children (WebGL canvases) only while the wrapper is near
 * the viewport — and unmounts them again once scrolled well past, so only
 * the scenes around the current scroll position burn GPU time. Swaps to a
 * static fallback when the visitor prefers reduced motion.
 */
export default function LazyVisible({
  children,
  fallback = null,
  className,
  rootMargin = "600px",
  desktopOnly = false,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  /** Render only the static fallback on touch devices / small screens. */
  desktopOnly?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const blocked =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      (desktopOnly &&
        (window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 768));
    setReducedMotion(blocked);
    if (blocked) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, desktopOnly]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {visible && !reducedMotion ? children : fallback}
    </div>
  );
}
