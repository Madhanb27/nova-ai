"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, [data-cursor='hover']";

/**
 * NOVA's cursor: a floating piece of frosted glass — a 38px translucent disc
 * with backdrop blur, a hairline blue→violet edge and a soft ambient glow,
 * easing behind the pointer in a single rAF (React never re-renders).
 * Breathes at idle, settles after 2s of stillness, brightens gently over
 * interactive elements and emits one glass ripple on click.
 *
 * Mounts only for fine pointers; touch devices and reduced-motion visitors
 * keep the native cursor.
 */
export default function NovaCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = rootRef.current;
    const glass = glassRef.current;
    if (!root || !glass) return;

    const disc = glass.firstElementChild as HTMLElement;
    document.documentElement.classList.add("nova-cursor-on");
    root.style.display = "block";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let gx = mx,
      gy = my;
    let raf = 0;
    let idle = true;
    let idleTimer: ReturnType<typeof setTimeout>;

    const loop = () => {
      // Slight easing behind the pointer — floats, never snaps.
      gx += (mx - gx) * 0.24;
      gy += (my - gy) * 0.24;
      glass.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      if (Math.abs(mx - gx) > 0.1 || Math.abs(my - gy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
        idle = true;
      }
    };
    const wake = () => {
      if (!raf) {
        idle = false;
        raf = requestAnimationFrame(loop);
      }
    };

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.style.opacity = "1";
      // Resting state: after 2s without movement the glow settles; the first
      // movement restores it seamlessly (both eased in CSS).
      root.classList.remove("is-idle");
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => root.classList.add("is-idle"), 2000);
      if (idle) wake();
    };
    const onOver = (e: PointerEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE))
        disc.classList.add("is-hover");
    };
    const onOut = (e: PointerEvent) => {
      if ((e.target as Element).closest?.(INTERACTIVE))
        disc.classList.remove("is-hover");
    };
    const onDown = (e: PointerEvent) => {
      disc.classList.add("is-down");
      const ripple = document.createElement("div");
      ripple.className = "nova-cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      root.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    const onUp = () => disc.classList.remove("is-down");
    const onLeave = () => (root.style.opacity = "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("nova-cursor-on");
      clearTimeout(idleTimer);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-[95] hidden opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    >
      {/* Glass disc — position from rAF, scale/lighting from CSS */}
      <div
        ref={glassRef}
        className="nova-cursor-track fixed left-0 top-0 will-change-transform"
      >
        <div className="nova-cursor-glass" />
      </div>
    </div>
  );
}
