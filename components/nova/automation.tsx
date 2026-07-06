"use client";

import { Zap, BrainCircuit, Workflow, Send } from "lucide-react";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import Chapter from "@/components/nova/chapter";
import Seam from "@/components/nova/seam";
import { useDepthParallax } from "@/hooks/use-depth-parallax";
import { useMountTrace } from "@/hooks/use-mount-trace";

const STEPS = [
  { icon: Zap, title: "Trigger", copy: "A signal arrives." },
  { icon: BrainCircuit, title: "Reason", copy: "NOVA understands intent." },
  { icon: Workflow, title: "Act", copy: "Work flows across tools." },
  { icon: Send, title: "Deliver", copy: "Results, already done." },
];

export default function Automation() {
  useMountTrace("Automation mounted");
  const ref = useDepthParallax<HTMLElement>();

  return (
    <section
      id="automation"
      ref={ref}
      className="nova-fade-top relative overflow-hidden bg-nova-surface/40 py-32 sm:py-44"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full bg-nova-violet/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Chapter index="03" title="INVISIBLE WORKFLOWS" />
        <div className="mb-20 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <BlurText
            text="Automation that thinks ahead."
            animateBy="words"
            delay={110}
            className="max-w-xl font-display text-[clamp(1.6rem,4.6vw,3.4rem)] tracking-[0.05em] text-nova-text"
          />
          <AnimatedContent distance={30} duration={1} delay={0.3} threshold={0.3}>
            <p className="max-w-[16rem] text-sm leading-relaxed text-nova-muted sm:text-right">
              Signals in. Finished work out. Nothing for you in between.
            </p>
          </AnimatedContent>
        </div>

        <div className="relative">
          {/* Energy line connecting the flow (desktop) */}
          <svg
            className="pointer-events-none absolute left-0 top-1/2 hidden h-2 w-full -translate-y-1/2 lg:block"
            aria-hidden="true"
          >
            <line
              x1="6%"
              y1="4"
              x2="94%"
              y2="4"
              stroke="url(#nova-flow)"
              strokeWidth="1.5"
              strokeDasharray="6 18"
              className="animate-nova-dash"
            />
            <defs>
              <linearGradient id="nova-flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#3D5AFE" stopOpacity="0.1" />
                <stop offset="0.5" stopColor="#BDE2FF" stopOpacity="0.8" />
                <stop offset="1" stopColor="#7B5CFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* A pulse of core energy traveling through the workflow */}
          <span
            className="pointer-events-none absolute top-1/2 hidden size-2 -translate-y-1/2 animate-nova-travel rounded-full bg-nova-ice shadow-[0_0_14px_3px_rgba(189,226,255,0.55)] lg:block"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <AnimatedContent
                key={step.title}
                distance={64}
                duration={1}
                ease="power3.out"
                delay={i * 0.12}
                threshold={0.2}
              >
                <div
                  className="glass glass-hover relative rounded-3xl px-6 py-8 text-center will-change-transform"
                  data-depth={i % 2 === 0 ? -14 : 18}
                >
                  <span className="absolute right-4 top-4 font-mono text-[10px] text-nova-muted/50">
                    0{i + 1}
                  </span>
                  <span className="mx-auto mb-5 flex size-12 items-center justify-center rounded-2xl border border-nova-ice/20 bg-gradient-to-b from-nova-blue/20 to-nova-violet/15 shadow-[0_0_24px_-6px_rgba(61,90,254,0.5)]">
                    <step.icon className="size-5 text-nova-ice" />
                  </span>
                  <h3 className="mb-1.5 text-sm font-semibold tracking-wide text-nova-text">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-nova-muted">
                    {step.copy}
                  </p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>

        {/* Run summary — the receipt of the workflow above */}
        <AnimatedContent distance={40} duration={1} delay={0.5} threshold={0.3}>
          <div className="mt-14 flex justify-center">
            <div className="glass flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full px-7 py-3">
              <span className="flex items-center gap-2 text-[11px] tracking-wide text-nova-muted">
                <span className="size-1.5 rounded-full bg-nova-ice" />
                4 steps executed
              </span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <span className="text-[11px] tracking-wide text-nova-muted">
                2.3s end-to-end
              </span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <span className="flex items-center gap-2 text-[11px] tracking-wide text-nova-muted">
                <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-blue" />
                99.9% success
              </span>
            </div>
          </div>
        </AnimatedContent>
      </div>

      <Seam />
    </section>
  );
}
