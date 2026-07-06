"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import BlurText from "@/components/BlurText";
import AnimatedContent from "@/components/AnimatedContent";
import CountUp from "@/components/CountUp";
import GlareHover from "@/components/GlareHover";
import Chapter from "@/components/nova/chapter";
import Seam from "@/components/nova/seam";
import { useDepthParallax } from "@/hooks/use-depth-parallax";
import { useMountTrace } from "@/hooks/use-mount-trace";

const STATS = [
  { value: 98.2, suffix: "%", label: "Signal accuracy" },
  { value: 4.2, suffix: "×", label: "Faster decisions" },
  { value: 27, suffix: "h", label: "Saved weekly, per team" },
];

/** Smooth cubic-bezier area chart, drawn by hand — no chart library. */
const CHART_PATH =
  "M0,86 C40,80 60,64 100,60 C140,56 160,66 200,54 C240,42 260,48 300,34 C340,20 370,26 400,12";

export default function Intelligence() {
  useMountTrace("Intelligence mounted");
  const ref = useDepthParallax<HTMLElement>();

  return (
    <section
      id="intelligence"
      ref={ref}
      className="nova-fade-top relative overflow-hidden bg-nova-surface/40 py-32 sm:py-44"
    >
      <div className="pointer-events-none absolute -right-32 top-16 h-[28rem] w-[28rem] rounded-full bg-nova-blue/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Chapter index="05" title="SIGNAL OVER NOISE" />
        <div className="mb-20 flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <AnimatedContent distance={30} duration={1} delay={0.3} threshold={0.3}>
            <div className="glass flex items-center gap-2.5 rounded-full px-4 py-2">
              <Sparkles className="size-3 text-nova-ice" />
              <span className="text-[11px] tracking-wide text-nova-muted">
                NOVA insight — live data
              </span>
              <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
            </div>
          </AnimatedContent>
          <BlurText
            text="Intelligence you can measure."
            animateBy="words"
            delay={110}
            className="max-w-2xl justify-end text-right font-display text-[clamp(1.6rem,4.6vw,3.4rem)] tracking-[0.05em] text-nova-text"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[7fr_5fr]">
          {/* Analytics panel */}
          <AnimatedContent distance={70} duration={1.1} threshold={0.2}>
            <div className="glass-deep glass-hover h-full rounded-3xl p-6 sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-nova-text">
                    Workspace momentum
                  </p>
                  <p className="mt-0.5 text-xs text-nova-muted/70">
                    Last 30 days
                  </p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-nova-ice/20 bg-nova-blue/10 px-3 py-1 text-[11px] font-medium text-nova-ice">
                  <TrendingUp className="size-3" />
                  +38%
                </span>
              </div>

              <div className="relative">
              <svg
                viewBox="0 0 400 100"
                className="h-40 w-full sm:h-48"
                preserveAspectRatio="none"
                role="img"
                aria-label="Momentum trend rising 38 percent over the last 30 days"
              >
                <defs>
                  <linearGradient id="nova-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3D5AFE" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#3D5AFE" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="nova-stroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#3D5AFE" />
                    <stop offset="1" stopColor="#7B5CFF" />
                  </linearGradient>
                </defs>
                {[25, 50, 75].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="rgba(169,176,194,0.08)"
                    strokeWidth="1"
                  />
                ))}
                <path
                  d={`${CHART_PATH} L400,100 L0,100 Z`}
                  fill="url(#nova-area)"
                  className="nova-chart-fade"
                />
                <path
                  d={CHART_PATH}
                  fill="none"
                  stroke="url(#nova-stroke)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  pathLength={1}
                  className="nova-chart-draw"
                />
              </svg>
              {/* Endpoint dot — HTML so it stays a perfect, unclipped circle
                  while the chart SVG stretches responsively behind it */}
              <span
                className="absolute right-0 top-[12%] -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              >
                <span className="absolute -inset-1.5 animate-nova-pulse rounded-full bg-nova-ice/25" />
                <span className="relative block size-2 rounded-full bg-nova-ice shadow-[0_0_10px_2px_rgba(189,226,255,0.5)]" />
              </span>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-nova-violet/25 bg-nova-violet/8 p-4">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-nova-ice" />
                <p className="text-xs leading-relaxed text-nova-muted">
                  <span className="font-semibold text-nova-text">AI insight</span> —
                  research throughput doubles when briefs are auto-generated.
                  NOVA has enabled it for two teams.
                </p>
              </div>
            </div>
          </AnimatedContent>

          {/* Stat tiles */}
          <div className="flex flex-col gap-6">
            {STATS.map((stat, i) => (
              <AnimatedContent
                key={stat.label}
                distance={60}
                duration={1}
                delay={0.1 + i * 0.12}
                threshold={0.25}
                className="flex flex-1"
              >
                <div
                  className="h-full w-full will-change-transform"
                  data-depth={-12 - i * 8}
                >
                <GlareHover
                  width="100%"
                  height="100%"
                  background="transparent"
                  borderRadius="24px"
                  borderColor="transparent"
                  glareColor="#BDE2FF"
                  glareOpacity={0.12}
                  glareAngle={-40}
                  glareSize={300}
                  transitionDuration={800}
                  className="!cursor-default border-0"
                >
                  <div className="glass glass-hover flex h-full w-full flex-col justify-center rounded-3xl p-6">
                    <p className="font-display text-4xl tracking-wide text-nova-text tabular-nums">
                      <CountUp
                        to={stat.value}
                        duration={1.6}
                        className="tabular-nums"
                      />
                      <span className="text-nova-ice">{stat.suffix}</span>
                    </p>
                    <p className="mt-2 text-[13px] tracking-wide text-nova-muted">
                      {stat.label}
                    </p>
                  </div>
                </GlareHover>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>

      <Seam />
    </section>
  );
}
