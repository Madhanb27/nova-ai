"use client";

import dynamic from "next/dynamic";

// WebGL + the large ImageTrail load on demand; never downloaded on mobile
const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });
const Orb = dynamic(() => import("@/components/Orb"), { ssr: false });
const ImageTrail = dynamic(() => import("@/components/ImageTrail"), {
  ssr: false,
});
import SplitText from "@/components/SplitText";
import ShinyText from "@/components/ShinyText";
import BeamButton from "@/components/nova/beam-button";
import LazyVisible from "@/components/nova/lazy-visible";
import { useMountTrace } from "@/hooks/use-mount-trace";

/** Soft glowing energy orbs, generated inline — no external imagery. */
const orb = (from: string, to: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="190" height="172"><defs><radialGradient id="g" cx="50%" cy="45%" r="60%"><stop offset="0%" stop-color="${from}" stop-opacity="0.9"/><stop offset="55%" stop-color="${to}" stop-opacity="0.35"/><stop offset="100%" stop-color="${to}" stop-opacity="0"/></radialGradient></defs><rect width="100%" height="100%" fill="none"/><circle cx="95" cy="86" r="80" fill="url(#g)"/></svg>`
  )}`;

const TRAIL_ITEMS = [
  orb("#BDE2FF", "#3D5AFE"),
  orb("#7B5CFF", "#3D5AFE"),
  orb("#3D5AFE", "#7B5CFF"),
  orb("#BDE2FF", "#7B5CFF"),
  orb("#7B5CFF", "#BDE2FF"),
  orb("#3D5AFE", "#BDE2FF"),
];

export default function FinalCta() {
  useMountTrace("Finale mounted");
  return (
    <section
      id="enter"
      className="nova-noise relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
    >
      {/* Ambient aurora, tuned to the NOVA palette */}
      <LazyVisible
        className="absolute inset-x-0 top-0 h-[70%]"
        desktopOnly
        fallback={
          <div className="h-full w-full bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(123,92,255,0.2),transparent)]" />
        }
      >
        <Aurora
          colorStops={["#3D5AFE", "#7B5CFF", "#BDE2FF"]}
          amplitude={0.7}
          blend={0.55}
          speed={0.45}
        />
      </LazyVisible>

      {/* Cursor energy trail across the finale */}
      <LazyVisible className="absolute inset-0 hidden lg:block">
        <ImageTrail items={TRAIL_ITEMS} variant={1} />
      </LazyVisible>

      {/* The core returns for the finale — the same heart the journey began with */}
      <LazyVisible
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(80vw,34rem)] -translate-x-1/2 -translate-y-1/2 opacity-70"
        fallback={
          <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(123,92,255,0.25),rgba(61,90,254,0.12)_45%,transparent_70%)]" />
        }
      >
        <Orb hue={0} hoverIntensity={0.3} backgroundColor="#05060A" />
      </LazyVisible>

      <div className="pointer-events-none relative z-10 flex flex-col items-center px-6 text-center">
        <ShinyText
          text="THE FUTURE BEGINS"
          speed={3.5}
          color="#A9B0C2"
          shineColor="#BDE2FF"
          className="mb-8 inline-block text-[11px] font-medium tracking-[0.5em]"
        />
        <SplitText
          text="STEP INTO THE FUTURE OF WORK."
          tag="h2"
          className="max-w-5xl font-display text-[clamp(1.8rem,5.6vw,4.6rem)] leading-[1.18] tracking-[0.07em] text-nova-text"
          splitType="words"
          delay={120}
          duration={1.2}
          ease="power4.out"
          from={{ opacity: 0, y: 80, filter: "blur(8px)" }}
          to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          threshold={0.2}
        />

        <div className="pointer-events-auto mt-14">
          <BeamButton href="#top" size="lg">
            Enter NOVA
          </BeamButton>

          {/* Trust row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {["Privacy-first", "No credit card", "Launch in 60 seconds"].map(
              (item, i) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-[11px] tracking-wide text-nova-muted/70"
                >
                  {i > 0 && (
                    <span className="hidden size-1 rounded-full bg-nova-muted/40 sm:block" />
                  )}
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/6 px-6 py-7 sm:flex-row">
          <span className="font-display text-xs tracking-[0.32em] text-nova-text">
            NOVA<span className="text-nova-ice">·</span>AI
          </span>
          <span className="text-[11px] tracking-wide text-nova-muted/70">
            One Workspace. Infinite Intelligence.
          </span>
          <span className="text-[11px] tracking-wide text-nova-muted/50">
            © 2026 NOVA AI
          </span>
        </div>
      </footer>
    </section>
  );
}
