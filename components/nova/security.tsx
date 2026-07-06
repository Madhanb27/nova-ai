"use client";

import { ShieldCheck, Lock, EyeOff, FileCheck, Database } from "lucide-react";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import Chapter from "@/components/nova/chapter";
import Seam from "@/components/nova/seam";
import { useMountTrace } from "@/hooks/use-mount-trace";

const STATUS_ROWS = [
  {
    icon: ShieldCheck,
    title: "End-to-end encryption",
    copy: "Sealed in transit and at rest.",
    value: "AES-256",
    live: true,
  },
  {
    icon: Database,
    title: "Zero retention",
    copy: "Your data never trains anyone.",
    value: "0 BYTES",
    live: false,
  },
  {
    icon: EyeOff,
    title: "Private by design",
    copy: "Decrypted locally. Readable only by you.",
    value: "VERIFIED",
    live: false,
  },
  {
    icon: FileCheck,
    title: "Continuous audit",
    copy: "SOC 2 Type II · ISO 27001 · GDPR.",
    value: "LIVE",
    live: true,
  },
];

const CREDENTIALS = [
  { label: "AES-256", x: 50, y: 6 },
  { label: "SOC 2", x: 94, y: 50 },
  { label: "GDPR", x: 50, y: 94 },
  { label: "ISO 27001", x: 6, y: 50 },
];

export default function Security() {
  useMountTrace("Security mounted");
  return (
    <section id="security" className="relative overflow-hidden py-32 sm:py-44">
      {/* Quiet, protective light */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[24rem] w-[50rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(61,90,254,0.12),transparent_65%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[26rem] w-[26rem] rounded-full bg-nova-violet/10 blur-[150px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Chapter index="06" title="TRUST, ENGINEERED" />

        {/* The statement — same blur-rise grammar as the finale */}
        <div className="mb-16 text-center">
          <SplitText
            text="Everything you create stays yours. Nothing leaves the workspace without your intent."
            tag="h2"
            className="max-w-4xl font-display text-[clamp(1.3rem,3.4vw,2.4rem)] leading-snug tracking-[0.04em] text-nova-text"
            splitType="words"
            delay={60}
            duration={1.2}
            ease="power4.out"
            from={{ opacity: 0, y: 60, filter: "blur(8px)" }}
            to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            threshold={0.2}
          />
        </div>

        {/* ── The vault — security as a living system panel ──────────── */}
        <AnimatedContent distance={70} duration={1.2} ease="power3.out" threshold={0.15}>
          <div className="glass-deep glass-hover w-full overflow-hidden rounded-3xl">
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-3.5 sm:px-6">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/12" />
                  <span className="size-2.5 rounded-full bg-white/12" />
                  <span className="size-2.5 rounded-full bg-nova-blue/60" />
                </span>
                <span className="hidden font-display text-[10px] tracking-[0.3em] text-nova-muted sm:block">
                  NOVA — ZERO-KNOWLEDGE CORE
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-nova-ice/20 bg-nova-blue/10 px-2.5 py-0.5 text-[9px] font-medium tracking-wide text-nova-ice">
                <Lock className="size-2.5" />
                SEALED
              </span>
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-[5fr_7fr]">
              {/* The vault lock — rings of the core, holding */}
              <div className="relative flex items-center justify-center border-b border-white/6 p-10 sm:p-14 lg:border-b-0 lg:border-r">
                <div className="relative aspect-square w-full max-w-[17rem]">
                  {/* Counter-rotating hairline rings */}
                  <div
                    className="absolute inset-0 animate-nova-spin-slow rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(189,226,255,0.5) 50deg, transparent 115deg, transparent 215deg, rgba(123,92,255,0.45) 275deg, transparent 335deg)",
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                    }}
                  />
                  <div
                    className="absolute inset-7 animate-nova-spin-slower rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 180deg, transparent 0deg, rgba(61,90,254,0.45) 60deg, transparent 130deg)",
                      WebkitMask:
                        "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
                    }}
                  />
                  <div className="absolute inset-7 rounded-full border border-white/6" />

                  {/* Credentials docked on the ring */}
                  {CREDENTIALS.map((c) => (
                    <span
                      key={c.label}
                      className="glass absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-3 py-1 font-mono text-[9px] tracking-wide text-nova-muted"
                      style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    >
                      {c.label}
                    </span>
                  ))}

                  {/* The lock core */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="absolute -inset-6 animate-nova-pulse rounded-full bg-[radial-gradient(circle,rgba(61,90,254,0.35),transparent_70%)] blur-md" />
                    <span className="glass relative flex size-16 items-center justify-center rounded-full">
                      <Lock className="size-5 text-nova-ice" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Live status readout */}
              <div className="flex flex-col justify-center">
                {STATUS_ROWS.map((row, i) => (
                  <AnimatedContent
                    key={row.title}
                    distance={36}
                    duration={1}
                    delay={0.15 + i * 0.1}
                    threshold={0.3}
                  >
                    <div
                      className={`group flex items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-white/3 sm:px-8 ${
                        i < STATUS_ROWS.length - 1 ? "border-b border-white/6" : ""
                      }`}
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-nova-ice/20 bg-gradient-to-b from-nova-blue/20 to-nova-violet/15 shadow-[0_0_20px_-6px_rgba(61,90,254,0.5)]">
                        <row.icon className="size-4 text-nova-ice" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold tracking-wide text-nova-text">
                          {row.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs leading-relaxed text-nova-muted">
                          {row.copy}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-wide text-nova-ice">
                        {row.live && (
                          <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
                        )}
                        {row.value}
                      </span>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>

            {/* Status strip */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/6 px-5 py-3 sm:px-6">
              <span className="flex items-center gap-2 text-[10px] tracking-wide text-nova-muted/80">
                <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
                Zero-knowledge by default
              </span>
              <span className="text-[10px] tracking-wide text-nova-muted/80">
                1,284 external requests denied this month
              </span>
              <span className="ml-auto font-mono text-[10px] text-nova-muted/50">
                incidents · 0
              </span>
            </div>
          </div>
        </AnimatedContent>
      </div>

      <Seam />
    </section>
  );
}
