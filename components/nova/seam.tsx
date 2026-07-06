"use client";

/**
 * The energy seam between scenes. A pulse of core light travels down a thin
 * thread and lands in a soft glow pool, while a faint field of light from
 * the next scene seeps up across the full section width — so the boundary
 * band reads as a composed light zone, not leftover darkness.
 */
export default function Seam() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
      aria-hidden="true"
    >
      {/* Light from the next scene, seeping across the full width */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_55%_100%_at_50%_100%,rgba(61,90,254,0.09),transparent_72%)]" />

      {/* Glow pool where the thread lands */}
      <div className="absolute bottom-0 left-1/2 h-8 w-44 -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-nova-ice/10 blur-xl" />

      {/* The thread with its traveling pulse */}
      <div className="absolute bottom-0 left-1/2 h-24 w-px -translate-x-1/2 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-nova-ice/25 to-transparent" />
        <div className="absolute inset-0 animate-nova-scroll-cue bg-gradient-to-b from-transparent via-nova-ice to-transparent" />
      </div>

      {/* Landing point */}
      <div className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 animate-nova-pulse rounded-full bg-nova-ice/70 shadow-[0_0_10px_2px_rgba(189,226,255,0.35)]" />
    </div>
  );
}
