"use client";

import { MessageCircle, MousePointer2, Check, Play } from "lucide-react";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import Chapter from "@/components/nova/chapter";
import Seam from "@/components/nova/seam";
import { useMountTrace } from "@/hooks/use-mount-trace";

const AVATARS = [
  { initials: "AK", from: "#3D5AFE", to: "#7B5CFF" },
  { initials: "MJ", from: "#7B5CFF", to: "#BDE2FF" },
  { initials: "SR", from: "#BDE2FF", to: "#3D5AFE" },
];

export default function Collaboration() {
  useMountTrace("Collaboration mounted");
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-44">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[26rem] w-[36rem] -translate-x-1/2 rounded-full bg-nova-blue/8 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Chapter index="04" title="LIVE, TOGETHER" />

        <div className="mb-14 text-center">
          <BlurText
            text="Made for many minds."
            animateBy="words"
            delay={110}
            className="justify-center font-display text-[clamp(1.6rem,4.6vw,3.4rem)] tracking-[0.05em] text-nova-text"
          />
          <AnimatedContent distance={30} duration={1} delay={0.25} threshold={0.3}>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-nova-muted">
              One shared canvas — live cursors, instant context, and an AI
              that resolves the threads.
            </p>
          </AnimatedContent>
        </div>

        {/* ── The live canvas ────────────────────────────────────────── */}
        <AnimatedContent distance={70} duration={1.2} ease="power3.out" threshold={0.15}>
          <div className="glass-deep w-full overflow-hidden rounded-3xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/12" />
                  <span className="size-2.5 rounded-full bg-white/12" />
                  <span className="size-2.5 rounded-full bg-nova-blue/60" />
                </span>
                <span className="hidden font-display text-[10px] tracking-[0.3em] text-nova-muted sm:block">
                  LAUNCH CANVAS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AVATARS.map((a) => (
                    <span
                      key={a.initials}
                      className="flex size-6 items-center justify-center rounded-full border-2 border-nova-surface text-[8px] font-semibold text-nova-base"
                      style={{
                        background: `linear-gradient(135deg, ${a.from}, ${a.to})`,
                      }}
                    >
                      {a.initials}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-nova-ice/20 bg-nova-blue/10 px-2.5 py-0.5 text-[9px] font-medium tracking-wide text-nova-ice">
                  <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
                  3 LIVE
                </span>
              </div>
            </div>

            {/* Board */}
            <div className="nova-grid relative h-[22rem] sm:h-[26rem]">
              {/* Launch narrative doc */}
              <div className="absolute left-[6%] top-[10%] w-[34%] rounded-2xl border border-white/7 bg-white/3 p-4 sm:left-[8%] sm:top-[12%] sm:w-[26%]">
                <p className="mb-2 text-[11px] font-semibold tracking-wide text-nova-text">
                  Launch narrative
                </p>
                <p className="text-[10px] leading-relaxed text-nova-muted">
                  One workspace, infinite intelligence. We open with the core
                  awakening, then let the product speak.
                </p>
                <div className="mt-3 flex gap-1.5">
                  <span className="rounded-full border border-nova-blue/30 bg-nova-blue/10 px-2 py-0.5 text-[8px] font-medium tracking-wide text-nova-ice">
                    v3 · final
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[8px] tracking-wide text-nova-muted">
                    keynote
                  </span>
                </div>
              </div>

              {/* Selected block — Milo's selection */}
              <div className="absolute right-[8%] top-[16%] w-[36%] sm:right-[12%] sm:w-[28%]">
                <div className="rounded-2xl border border-nova-violet/50 bg-nova-violet/8 p-4 shadow-[0_0_28px_-8px_rgba(123,92,255,0.5)]">
                  <p className="mb-2 text-[11px] font-semibold tracking-wide text-nova-text">
                    Pricing — three tiers
                  </p>
                  <div className="space-y-1.5 text-[10px] leading-relaxed text-nova-muted">
                    <p className="flex justify-between">
                      <span>Solo</span>
                      <span className="text-nova-ice">free</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Pro</span>
                      <span className="text-nova-ice">$16 / mo</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Teams</span>
                      <span className="text-nova-ice">usage-based</span>
                    </p>
                  </div>
                </div>
                <span className="absolute -top-2.5 left-3 rounded-full bg-nova-violet px-2 py-0.5 text-[9px] font-semibold text-white">
                  Milo
                </span>
                {/* Selection handles */}
                {["-left-1 -top-1", "-right-1 -top-1", "-left-1 -bottom-1", "-right-1 -bottom-1"].map(
                  (pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} size-1.5 rounded-sm bg-nova-violet`}
                    />
                  )
                )}
              </div>

              {/* Hero visual asset — a frame from the core reveal film */}
              <div className="absolute bottom-[14%] left-[14%] flex h-[30%] w-[28%] flex-col justify-end overflow-hidden rounded-2xl border border-white/8 bg-[linear-gradient(160deg,#10132244,#05060A)] p-3 sm:left-[18%] sm:w-[21%]">
                {/* Deep-space backdrop inside the frame */}
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_42%,rgba(27,31,46,0.9),transparent)]" />
                {/* The core, mid-awakening */}
                <span className="pointer-events-none absolute left-1/2 top-[42%] size-14 -translate-x-1/2 -translate-y-1/2 animate-nova-pulse rounded-full bg-[radial-gradient(circle,rgba(245,248,255,0.95),rgba(189,226,255,0.65)_30%,rgba(61,90,254,0.4)_55%,transparent_75%)] blur-[1.5px]" />
                <span
                  className="pointer-events-none absolute left-1/2 top-[42%] size-[4.5rem] -translate-x-1/2 -translate-y-1/2 animate-nova-spin-slow rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(189,226,255,0.7) 55deg, transparent 120deg, transparent 230deg, rgba(123,92,255,0.55) 285deg, transparent 340deg)",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                  }}
                />
                {/* Play control */}
                <span className="pointer-events-none absolute left-1/2 top-[42%] flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-nova-base/40 backdrop-blur-sm">
                  <Play className="ml-0.5 size-2.5 fill-white text-white" />
                </span>
                {/* Footer: filename + duration */}
                <span className="relative flex items-center justify-between">
                  <span className="font-mono text-[8px] tracking-wide text-white/70">
                    hero-core.mp4
                  </span>
                  <span className="rounded bg-nova-base/60 px-1.5 py-0.5 font-mono text-[7px] text-white/60">
                    0:24
                  </span>
                </span>
              </div>

              {/* Launch checklist with Aria typing */}
              <div className="absolute bottom-[18%] right-[10%] w-[34%] rounded-2xl border border-white/7 bg-white/3 p-4 sm:right-[14%] sm:w-[24%]">
                <p className="mb-2 text-[11px] font-semibold tracking-wide text-nova-text">
                  Launch checklist
                </p>
                <div className="space-y-1.5 text-[10px] leading-relaxed text-nova-muted">
                  <p className="flex items-center gap-2">
                    <Check className="size-2.5 text-nova-ice" />
                    <span className="line-through opacity-60">Ship the demo</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="size-2.5 text-nova-ice" />
                    <span className="line-through opacity-60">Brief the press</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-nova-ice/60" />
                    Final pricing sign-off
                  </p>
                </div>
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="h-3 w-px animate-nova-caret bg-nova-ice" />
                  <span className="text-[10px] text-nova-muted/70">
                    Aria is typing…
                  </span>
                </div>
              </div>

              {/* Comment bubble — pops in near Aria's path */}
              <div className="animate-nova-pop absolute left-[38%] top-[20%] hidden sm:block">
                <div className="glass flex items-start gap-2.5 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                  <MessageCircle className="mt-0.5 size-3 shrink-0 text-nova-ice" />
                  <span className="max-w-44 text-[11px] leading-relaxed text-nova-muted">
                    Tighten this intro before launch?
                  </span>
                </div>
              </div>

              {/* NOVA resolves — pops in on its own beat */}
              <div
                className="animate-nova-pop absolute bottom-[10%] left-[42%] hidden sm:block"
                style={{ animationDelay: "5s" }}
              >
                <div className="flex items-center gap-2 rounded-full border border-nova-ice/25 bg-nova-blue/15 px-3.5 py-1.5">
                  <span className="flex size-4 items-center justify-center rounded-full bg-gradient-to-br from-nova-blue to-nova-violet">
                    <Check className="size-2.5 text-white" />
                  </span>
                  <span className="text-[10px] font-medium tracking-wide text-nova-ice">
                    NOVA resolved this thread
                  </span>
                </div>
              </div>

              {/* Live cursors, wandering the board */}
              <div className="animate-nova-cursor-a absolute">
                <MousePointer2 className="size-4 fill-nova-blue text-nova-blue" />
                <span className="ml-3 rounded-full bg-nova-blue px-2 py-0.5 text-[9px] font-semibold text-white">
                  Aria
                </span>
              </div>
              <div className="animate-nova-cursor-b absolute">
                <MousePointer2 className="size-4 fill-nova-violet text-nova-violet" />
                <span className="ml-3 rounded-full bg-nova-violet px-2 py-0.5 text-[9px] font-semibold text-white">
                  Milo
                </span>
              </div>
            </div>

            {/* Status strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/6 px-5 py-3 sm:px-6">
              <span className="flex items-center gap-2 text-[10px] tracking-wide text-nova-muted/80">
                <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
                3 collaborators live
              </span>
              <span className="text-[10px] tracking-wide text-nova-muted/80">
                AI suggestions in context
              </span>
              <span className="ml-auto font-mono text-[10px] text-nova-muted/50">
                sync &lt; 40ms
              </span>
            </div>
          </div>
        </AnimatedContent>
      </div>

      <Seam />
    </section>
  );
}
