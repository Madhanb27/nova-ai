"use client";

import { cn } from "@/lib/utils";

/**
 * A small CSS-only echo of the AI Core — the same glowing heart, recurring
 * in every scene so the whole page reads as one organism. A breathing
 * radial glow with a slowly orbiting hairline ring around a white spark.
 */
export default function CoreEcho({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex size-9 items-center justify-center",
        className
      )}
      aria-hidden="true"
    >
      {/* Breathing energy */}
      <span className="absolute inset-0 animate-nova-pulse rounded-full bg-[radial-gradient(circle,rgba(189,226,255,0.85),rgba(61,90,254,0.4)_45%,transparent_72%)] blur-[3px]" />
      {/* Orbiting hairline */}
      <span
        className="absolute -inset-1 animate-nova-spin-slow rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(189,226,255,0.7) 60deg, transparent 130deg, transparent 220deg, rgba(123,92,255,0.6) 280deg, transparent 340deg)",
          WebkitMask:
            "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
          mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
        }}
      />
      {/* The spark */}
      <span className="relative size-[5px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
    </span>
  );
}
