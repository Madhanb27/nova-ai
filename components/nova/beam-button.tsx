"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * NOVA's primary CTA: a clean blue→violet gradient pill with an inner top
 * highlight and a soft ambient glow that blooms on hover.
 */
export default function BeamButton({
  href,
  children,
  size = "md",
  className,
}: {
  href: string;
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-nova-blue to-nova-violet font-medium tracking-wide text-white transition-all duration-400 hover:scale-[1.03] active:scale-[0.98]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_28px_-6px_rgba(61,90,254,0.55),0_8px_24px_-12px_rgba(0,0,0,0.8)]",
        "hover:border-white/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_52px_-6px_rgba(61,90,254,0.85),0_0_24px_-8px_rgba(123,92,255,0.6),0_8px_24px_-12px_rgba(0,0,0,0.8)]",
        size === "lg"
          ? "px-12 py-[17px] text-base"
          : "px-9 py-[14px] text-sm",
        className
      )}
    >
      {children}
    </a>
  );
}
