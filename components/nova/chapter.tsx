"use client";

import ShinyText from "@/components/ShinyText";
import { cn } from "@/lib/utils";

/**
 * Editorial chapter rule: index number, hairline, section eyebrow. Continues
 * the hero's "01 — SCROLL" grammar so the page reads as numbered scenes of
 * one story — while each scene composes its content differently below.
 */
export default function Chapter({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-14 flex items-center gap-5", className)}>
      <span className="font-display text-[10px] tracking-[0.3em] text-nova-muted/60">
        {index}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-white/12 via-white/6 to-transparent" />
      <ShinyText
        text={title}
        speed={3.5}
        color="#A9B0C2"
        shineColor="#BDE2FF"
        className="text-[11px] font-medium tracking-[0.5em]"
      />
    </div>
  );
}
