"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// WebGL loads on demand; never downloaded on mobile (gates render fallbacks)
const Orb = dynamic(() => import("@/components/Orb"), { ssr: false });
const LightRays = dynamic(() => import("@/components/LightRays"), {
  ssr: false,
});
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import LazyVisible from "@/components/nova/lazy-visible";
import Seam from "@/components/nova/seam";
import { segment } from "@/hooks/use-section-progress";
import { useMountTrace } from "@/hooks/use-mount-trace";

/**
 * The System Awakening — a scroll-scrubbed boot sequence. As the visitor
 * descends: the core wakes → data filaments draw in from the edges → scan
 * waves ripple out → glass diagnostic modules assemble around the light →
 * the boot line reports NOVA online, and the workspace takes over.
 * Everything is written straight to styles in one rAF; React never
 * re-renders during the scrub.
 */

// Filaments converge on the orb (viewBox 1000×800, core at 500,400).
const FILAMENTS = [
  { d: "M-20,120 C200,180 320,300 500,400", from: 0.1, to: 0.34 },
  { d: "M1020,90 C780,160 660,300 500,400", from: 0.16, to: 0.4 },
  { d: "M-20,650 C220,600 340,480 500,400", from: 0.22, to: 0.46 },
  { d: "M1020,690 C760,620 650,480 500,400", from: 0.28, to: 0.52 },
];

// Boot line, staged by progress.
const BOOT_STAGES: [number, string][] = [
  [0.3, "initializing neural core…"],
  [0.55, "linking signals…"],
  [0.8, "assembling context…"],
  [1.01, "NOVA online"],
];

const MODULE_SEGMENTS = [
  { from: 0.42, to: 0.56 },
  { from: 0.5, to: 0.64 },
  { from: 0.58, to: 0.72 },
  { from: 0.66, to: 0.8 },
];

const SIGNAL_CHIPS = [
  { label: "Neural engine online", at: 0.35 },
  { label: "Context synchronized", at: 0.55 },
  { label: "Workspace ready", at: 0.75 },
];

export default function AiCore() {
  useMountTrace("AI Core mounted");
  const sectionRef = useRef<HTMLElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const floorRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const bootRef = useRef<HTMLSpanElement>(null);
  const memBarRef = useRef<HTMLDivElement>(null);
  const memPctRef = useRef<HTMLSpanElement>(null);
  const filamentRefs = useRef<(SVGPathElement | null)[]>([]);
  const pulseRefs = useRef<(SVGPathElement | null)[]>([]);
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const signalDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const setFinalState = () => {
      if (raysRef.current) raysRef.current.style.opacity = "1";
      if (orbRef.current) {
        orbRef.current.style.opacity = "1";
        orbRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
      if (bloomRef.current) bloomRef.current.style.opacity = "0.9";
      if (floorRef.current) floorRef.current.style.opacity = "0.6";
      if (ringsRef.current) ringsRef.current.style.opacity = "0.7";
      if (bootRef.current) bootRef.current.textContent = "NOVA online";
      if (memBarRef.current) memBarRef.current.style.width = "98.2%";
      if (memPctRef.current) memPctRef.current.textContent = "98.2%";
      filamentRefs.current.forEach((f) => {
        if (f) f.style.strokeDashoffset = "0";
      });
      pulseRefs.current.forEach((f) => {
        if (f) f.style.opacity = "1";
      });
      moduleRefs.current.forEach((m) => {
        if (m) {
          m.style.opacity = "1";
          m.style.transform = "none";
        }
      });
      signalDotRefs.current.forEach((d) => {
        if (d) d.style.opacity = "1";
      });
      chipRefs.current.forEach((c) => {
        if (c) {
          c.style.opacity = "1";
          c.style.transform = "none";
        }
      });
    };

    // Touch devices: skip the scroll-scrubbed boot sequence entirely and
    // show the fully-awakened state immediately. This mechanism sets every
    // ambient layer and the mobile signal chips to opacity:0 by default and
    // only reveals them via a scroll-position calculation — on phones that
    // calculation is unreliable (window.innerHeight shifts as the address
    // bar collapses, scroll events are throttled/batched during flings, and
    // this whole component is a separately-hydrated lazy chunk, so a user
    // who scrolls here before it hydrates sees nothing update). Content
    // must not depend on any of that on mobile.
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setFinalState();
      return;
    }

    let raf = 0;
    let bootStage = -1;
    let litSignals = -1;

    const apply = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const track = rect.height - window.innerHeight;
      const p = track > 0 ? Math.min(1, Math.max(0, -rect.top / track)) : 0;

      const awaken = segment(p, 0.05, 0.5);
      const expand = segment(p, 0.4, 0.9);

      // The core — sleeping, then the room's light source
      if (raysRef.current)
        raysRef.current.style.opacity = String(0.2 + expand * 0.8);
      if (orbRef.current) {
        orbRef.current.style.opacity = String(0.3 + awaken * 0.7);
        orbRef.current.style.transform = `translate(-50%, -50%) scale(${
          0.55 + awaken * 0.45
        })`;
      }
      if (bloomRef.current)
        bloomRef.current.style.opacity = String(expand * 0.9);
      if (floorRef.current)
        floorRef.current.style.opacity = String(expand * 0.6);

      // Scan waves ripple once the core is charged
      if (ringsRef.current)
        ringsRef.current.style.opacity = String(segment(p, 0.3, 0.55) * 0.8);

      // Data filaments draw toward the core, then carry pulses
      FILAMENTS.forEach((f, i) => {
        const draw = segment(p, f.from, f.to);
        const path = filamentRefs.current[i];
        if (path) path.style.strokeDashoffset = String(1 - draw);
        const pulse = pulseRefs.current[i];
        if (pulse) pulse.style.opacity = String(segment(p, f.to, f.to + 0.08));
      });

      // Diagnostic modules assemble around the light
      MODULE_SEGMENTS.forEach((m, i) => {
        const s = segment(p, m.from, m.to);
        const node = moduleRefs.current[i];
        if (!node) return;
        node.style.opacity = String(s);
        node.style.transform = `translateY(${(1 - s) * 24}px)`;
      });

      // Context memory fills
      const mem = segment(p, 0.5, 0.85) * 98.2;
      if (memBarRef.current) memBarRef.current.style.width = `${mem}%`;
      if (memPctRef.current)
        memPctRef.current.textContent = `${mem.toFixed(1)}%`;

      // Signal dots light one by one
      const lit = Math.round(segment(p, 0.58, 0.88) * 6);
      if (lit !== litSignals) {
        litSignals = lit;
        signalDotRefs.current.forEach((d, i) => {
          if (d) d.style.opacity = i < lit ? "1" : "0.18";
        });
      }

      // Boot line
      const stage = BOOT_STAGES.findIndex(([limit]) => p < limit);
      if (stage !== bootStage && bootRef.current) {
        bootStage = stage;
        bootRef.current.textContent =
          BOOT_STAGES[stage === -1 ? BOOT_STAGES.length - 1 : stage][1];
      }

      // Mobile signal chips
      SIGNAL_CHIPS.forEach((chip, i) => {
        const node = chipRefs.current[i];
        if (!node) return;
        const s = segment(p, chip.at, chip.at + 0.14);
        node.style.opacity = String(s);
        node.style.transform = `translateY(${(1 - s) * 28}px)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="core" ref={sectionRef} className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        {/* Volumetric light, revealed as the core awakens */}
        <LazyVisible
          className="absolute inset-0"
          desktopOnly
          fallback={
            <div className="absolute inset-x-0 top-0 h-2/3 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(61,90,254,0.18),transparent)]" />
          }
        >
          <div ref={raysRef} className="absolute inset-0" style={{ opacity: 0.2 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#7B5CFF"
              raysSpeed={0.9}
              lightSpread={0.9}
              rayLength={1.6}
              fadeDistance={1.1}
              saturation={0.85}
              followMouse
              mouseInfluence={0.08}
              noiseAmount={0.04}
              distortion={0.04}
              className="!absolute inset-0"
            />
          </div>
        </LazyVisible>

        {/* Data filaments, drawing in from the edges of the void */}
        <svg
          viewBox="0 0 1000 800"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          aria-hidden="true"
        >
          {FILAMENTS.map((f, i) => (
            <g key={i}>
              <path
                ref={(node) => {
                  filamentRefs.current[i] = node;
                }}
                d={f.d}
                fill="none"
                stroke="rgba(189,226,255,0.28)"
                strokeWidth="1"
                pathLength={1}
                strokeDasharray="1"
                style={{ strokeDashoffset: 1 }}
              />
              <path
                ref={(node) => {
                  pulseRefs.current[i] = node;
                }}
                d={f.d}
                fill="none"
                stroke="#BDE2FF"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="6 260"
                className="animate-nova-thread"
                style={{ opacity: 0, animationDelay: `${i * 0.8}s` }}
              />
            </g>
          ))}
        </svg>

        {/* The core — scales up and brightens with scroll */}
        <div
          ref={orbRef}
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(80vw,38rem)] will-change-transform"
          style={{
            transform: "translate(-50%, -50%) scale(0.55)",
            opacity: 0.3,
          }}
        >
          {/* Scan waves rippling from the waking core */}
          <div ref={ringsRef} className="absolute inset-[8%]" style={{ opacity: 0 }}>
            {[0, 1.5, 3].map((delay) => (
              <div
                key={delay}
                className="absolute inset-0 animate-nova-scan rounded-full border border-nova-ice/25"
                style={{ animationDelay: `${delay}s` }}
              />
            ))}
          </div>

          <LazyVisible
            className="h-full w-full"
            fallback={
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(123,92,255,0.3),rgba(61,90,254,0.14)_45%,transparent_70%)]" />
            }
          >
            <Orb hue={0} hoverIntensity={0.5} backgroundColor="#05060A" />
          </LazyVisible>
          {/* Energy bloom that grows behind the orb */}
          <div
            ref={bloomRef}
            className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(61,90,254,0.4),transparent_65%)] blur-3xl"
            style={{ opacity: 0 }}
          />
        </div>

        {/* The floor catches the core's light */}
        <div
          ref={floorRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_55%_90%_at_50%_100%,rgba(61,90,254,0.22),transparent_70%)]"
          style={{ opacity: 0 }}
        />

        {/* Copy */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center">
          <ShinyText
            text="SYSTEM AWAKENING"
            speed={3.5}
            color="#A9B0C2"
            shineColor="#BDE2FF"
            className="mb-6 text-[11px] font-medium tracking-[0.5em]"
          />
          <BlurText
            text="THE CORE AWAKENS."
            animateBy="words"
            delay={120}
            className="justify-center font-display text-[clamp(1.6rem,4.6vw,3.4rem)] tracking-[0.05em] text-nova-text"
          />
          {/* Boot line — live system state */}
          <div className="mt-6 flex items-center gap-2.5">
            <span className="h-3 w-px animate-nova-caret bg-nova-ice" />
            <span
              ref={bootRef}
              className="font-mono text-[11px] tracking-[0.2em] text-nova-muted/80"
            >
              initializing neural core…
            </span>
          </div>
        </div>

        {/* ── Diagnostic modules, assembling around the light (desktop) ── */}
        {/* Neural lattice */}
        <div
          ref={(node) => {
            moduleRefs.current[0] = node;
          }}
          className="glass absolute left-[6%] top-[26%] hidden w-52 rounded-2xl p-4 will-change-transform lg:block"
          style={{ opacity: 0, transform: "translateY(24px)" }}
        >
          <p className="mb-3 font-mono text-[9px] tracking-[0.3em] text-nova-muted/70">
            NEURAL LATTICE
          </p>
          <div className="flex h-8 items-end gap-1">
            {[45, 70, 55, 90, 62, 78, 50, 84].map((h, i) => (
              <span
                key={i}
                className="flex-1 animate-nova-pulse rounded-t bg-gradient-to-t from-nova-blue/50 to-nova-violet/60"
                style={{ height: `${h}%`, animationDelay: `${i * 0.25}s` }}
              />
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 font-mono text-[9px] text-nova-ice">
            <span className="size-1 animate-nova-pulse rounded-full bg-nova-ice" />
            ACTIVE
          </p>
        </div>

        {/* Context memory */}
        <div
          ref={(node) => {
            moduleRefs.current[1] = node;
          }}
          className="glass absolute right-[6%] top-[24%] hidden w-52 rounded-2xl p-4 will-change-transform lg:block"
          style={{ opacity: 0, transform: "translateY(24px)" }}
        >
          <p className="mb-3 font-mono text-[9px] tracking-[0.3em] text-nova-muted/70">
            CONTEXT MEMORY
          </p>
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div
              ref={memBarRef}
              className="h-full bg-gradient-to-r from-nova-blue via-nova-ice to-nova-violet"
              style={{ width: "0%" }}
            />
          </div>
          <p className="mt-3 flex items-center justify-between font-mono text-[9px] text-nova-muted/70">
            <span>syncing</span>
            <span ref={memPctRef} className="text-nova-ice">
              0.0%
            </span>
          </p>
        </div>

        {/* Telemetry */}
        <div
          ref={(node) => {
            moduleRefs.current[2] = node;
          }}
          className="glass absolute bottom-[22%] left-[8%] hidden w-52 rounded-2xl p-4 will-change-transform lg:block"
          style={{ opacity: 0, transform: "translateY(24px)" }}
        >
          <p className="mb-3 font-mono text-[9px] tracking-[0.3em] text-nova-muted/70">
            TELEMETRY
          </p>
          <div className="space-y-1.5 font-mono text-[9px] leading-relaxed text-nova-muted/70">
            <p className="flex justify-between">
              <span>core.temp</span>
              <span className="text-nova-ice">nominal</span>
            </p>
            <p className="flex justify-between">
              <span>lattice.sync</span>
              <span className="text-nova-ice">stable</span>
            </p>
            <p className="flex justify-between">
              <span>memory.context</span>
              <span className="text-nova-ice">linked</span>
            </p>
          </div>
        </div>

        {/* Signals */}
        <div
          ref={(node) => {
            moduleRefs.current[3] = node;
          }}
          className="glass absolute bottom-[24%] right-[8%] hidden w-52 rounded-2xl p-4 will-change-transform lg:block"
          style={{ opacity: 0, transform: "translateY(24px)" }}
        >
          <p className="mb-3 font-mono text-[9px] tracking-[0.3em] text-nova-muted/70">
            SIGNALS
          </p>
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                ref={(node) => {
                  signalDotRefs.current[i] = node;
                }}
                className="size-2 rounded-full bg-nova-ice shadow-[0_0_8px_rgba(189,226,255,0.5)]"
                style={{ opacity: 0.18 }}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[9px] text-nova-muted/70">
            channels connecting
          </p>
        </div>

        {/* Signal chips — the compact story on mobile */}
        <div className="absolute bottom-[12%] left-1/2 z-10 flex w-full max-w-3xl -translate-x-1/2 flex-col items-center justify-center gap-3 px-6 sm:flex-row sm:gap-5 lg:hidden">
          {SIGNAL_CHIPS.map((signal, i) => (
            <div
              key={signal.label}
              ref={(node) => {
                chipRefs.current[i] = node;
              }}
              className="glass flex items-center gap-3 rounded-2xl px-5 py-3.5 will-change-transform"
              style={{ opacity: 0, transform: "translateY(28px)" }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-nova-pulse rounded-full bg-nova-ice" />
                <span className="relative inline-flex size-2 rounded-full bg-nova-blue" />
              </span>
              <span className="whitespace-nowrap text-[13px] font-medium text-nova-muted">
                {signal.label}
              </span>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-nova-base" />
        <Seam />
      </div>
    </section>
  );
}
