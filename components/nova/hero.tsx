"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Play, Command, Check } from "lucide-react";

// WebGL components load as separate chunks only when actually rendered —
// on mobile the LazyVisible gates show static fallbacks, so the OGL code
// is never even downloaded there.
const Orb = dynamic(() => import("@/components/Orb"), { ssr: false });
const Particles = dynamic(() => import("@/components/Particles"), {
  ssr: false,
});
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import GradientText from "@/components/GradientText";
import AnimatedContent from "@/components/AnimatedContent";
import BeamButton from "@/components/nova/beam-button";
import LazyVisible from "@/components/nova/lazy-visible";
import { useMountTrace } from "@/hooks/use-mount-trace";

const headlineLine =
  "block font-display text-[clamp(2.3rem,7vw,5.6rem)] leading-[1.06] tracking-[0.06em]";

export default function Hero() {
  useMountTrace("Hero mounted");
  const copyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // LCP: the server (and mobile) render the headline as plain, instantly
  // visible text. Desktop upgrades to the char-by-char reveal after mount —
  // behind the preloader veil, so the swap is never seen. GSAP-hidden text
  // was the measured 3.5s mobile LCP.
  const [cinematic, setCinematic] = useState(false);
  useEffect(() => {
    if (
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setCinematic(true);
    }
  }, []);

  // Gentle camera pull on scroll — direct style writes, no re-renders.
  // Touch devices skip it: the fade is subtle there but the listener isn't.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const apply = () => {
      raf = 0;
      const exit = Math.min(
        1,
        Math.max(0, window.scrollY / (window.innerHeight * 0.9))
      );
      if (copyRef.current) {
        copyRef.current.style.opacity = String(Math.max(0, 1 - exit * 1.15));
        copyRef.current.style.transform = `translateY(${exit * -50}px)`;
      }
      if (stageRef.current) {
        stageRef.current.style.opacity = String(Math.max(0, 1 - exit * 1.3));
        stageRef.current.style.transform = `translateY(${exit * -80}px) scale(${
          1 - exit * 0.06
        })`;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      className="nova-noise relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Ambient light */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-nova-blue/12 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-nova-violet/14 blur-[150px]" />
      <div className="nova-grid absolute inset-0" />

      {/* Neural particle drift — lightweight point cloud, not a full-screen shader */}
      <LazyVisible
        className="absolute inset-0"
        rootMargin="300px"
        desktopOnly
        fallback={
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(27,31,46,0.7),transparent)]" />
        }
      >
        <Particles
          className="absolute inset-0"
          particleColors={["#3D5AFE", "#7B5CFF", "#BDE2FF"]}
          particleCount={200}
          particleSpread={11}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover
          particleHoverFactor={0.4}
          alphaParticles
        />
      </LazyVisible>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,6,10,0.55)_100%)]" />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 pb-24 pt-[clamp(7rem,16vh,10rem)] lg:grid-cols-[7fr_5fr] lg:gap-8 lg:pb-16">
        {/* ── Left: editorial typography ─────────────────────────────── */}
        <div ref={copyRef} className="relative will-change-transform">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-10 bg-nova-ice/40" />
            <ShinyText
              text="THE AI WORKSPACE"
              speed={3.2}
              color="#A9B0C2"
              shineColor="#BDE2FF"
              className="text-[11px] font-medium tracking-[0.5em]"
            />
          </div>

          <h1
            className="font-display"
            style={{
              fontFamily: "var(--font-michroma), var(--font-inter), sans-serif",
            }}
          >
            {cinematic ? (
              <>
                <SplitText
                  text="ONE"
                  tag="span"
                  className={`${headlineLine} text-nova-text`}
                  splitType="chars"
                  delay={40}
                  duration={1.1}
                  ease="power4.out"
                  from={{ opacity: 0, y: 64, rotateX: -70 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                  threshold={0.1}
                />
                <SplitText
                  text="WORKSPACE."
                  tag="span"
                  className={`${headlineLine} text-nova-text`}
                  splitType="chars"
                  delay={34}
                  duration={1.1}
                  ease="power4.out"
                  from={{ opacity: 0, y: 64, rotateX: -70 }}
                  to={{ opacity: 1, y: 0, rotateX: 0 }}
                  threshold={0.1}
                />
                <AnimatedContent distance={44} duration={1.2} delay={0.55} ease="power3.out" threshold={0.1}>
                  <GradientText
                    colors={["#3D5AFE", "#BDE2FF", "#7B5CFF", "#3D5AFE"]}
                    animationSpeed={7}
                    className={`${headlineLine} !mx-0 mt-1 !block`}
                  >
                    INFINITE
                  </GradientText>
                </AnimatedContent>
                <AnimatedContent distance={44} duration={1.2} delay={0.7} ease="power3.out" threshold={0.1}>
                  <GradientText
                    colors={["#7B5CFF", "#BDE2FF", "#3D5AFE", "#7B5CFF"]}
                    animationSpeed={7}
                    className={`${headlineLine} !mx-0 !block`}
                  >
                    INTELLIGENCE.
                  </GradientText>
                </AnimatedContent>
              </>
            ) : (
              <>
                {/* Instantly visible headline: SSR, mobile, reduced motion */}
                <span className={`${headlineLine} text-nova-text`}>ONE</span>
                <span className={`${headlineLine} text-nova-text`}>
                  WORKSPACE.
                </span>
                <span
                  className={`${headlineLine} mt-1 bg-gradient-to-r from-nova-blue via-nova-ice to-nova-violet bg-clip-text text-transparent`}
                >
                  INFINITE
                </span>
                <span
                  className={`${headlineLine} bg-gradient-to-r from-nova-violet via-nova-ice to-nova-blue bg-clip-text text-transparent`}
                >
                  INTELLIGENCE.
                </span>
              </>
            )}
          </h1>

          <div className="mt-8 max-w-md">
            {cinematic ? (
              <BlurText
                text="Conversations, documents, research and automation — one intelligent surface."
                animateBy="words"
                delay={60}
                direction="top"
                className="text-[15px] leading-relaxed text-nova-muted sm:text-base"
              />
            ) : (
              <p className="text-[15px] leading-relaxed text-nova-muted sm:text-base">
                Conversations, documents, research and automation — one
                intelligent surface.
              </p>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <BeamButton href="#core">Start Exploring</BeamButton>

            <a
              href="#workspace"
              className="group flex cursor-pointer items-center gap-2.5 py-2 text-[13px] font-medium tracking-wide text-nova-muted transition-colors duration-300 hover:text-nova-text"
            >
              <span className="flex size-6 items-center justify-center rounded-full border border-nova-ice/25 transition-all duration-300 group-hover:border-nova-ice/50 group-hover:shadow-[0_0_16px_-2px_rgba(189,226,255,0.5)]">
                <Play className="size-2.5 fill-nova-ice text-nova-ice" />
              </span>
              Watch Experience
            </a>
          </div>
        </div>

        {/* ── Right: the AI core stage ───────────────────────────────── */}
        <div
          ref={stageRef}
          className="relative mx-auto aspect-square w-[min(88vw,26rem)] will-change-transform lg:w-full lg:max-w-[30rem]"
        >
          {/* Halo ring — CSS only */}
          <div
            className="absolute inset-2 animate-nova-spin-slow rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(189,226,255,0.5) 40deg, transparent 85deg, transparent 200deg, rgba(123,92,255,0.45) 240deg, transparent 300deg)",
              WebkitMask:
                "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), black calc(100% - 1.5px))",
            }}
            aria-hidden="true"
          />

          {/* The orb — the only WebGL on this hero */}
          <LazyVisible
            className="absolute inset-0"
            rootMargin="200px"
            fallback={
              <div className="h-full w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(123,92,255,0.28),rgba(61,90,254,0.13)_45%,transparent_70%)]" />
            }
          >
            <Orb hue={0} hoverIntensity={0.4} rotateOnHover backgroundColor="#05060A" />
          </LazyVisible>

          {/* Soft bloom behind */}
          <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(61,90,254,0.28),transparent_65%)] blur-3xl" />

          {/* Floating glass micro-panels */}
          <AnimatedContent distance={36} duration={1.1} delay={1} threshold={0.1}>
            <div className="glass absolute -left-3 top-[16%] flex animate-nova-float items-center gap-2.5 rounded-2xl px-4 py-2.5 sm:-left-8">
              <span className="flex size-5 items-center justify-center rounded-md border border-white/15 bg-white/5">
                <Command className="size-3 text-nova-ice" />
              </span>
              <span className="text-xs text-nova-muted">Ask anything</span>
            </div>
          </AnimatedContent>
          <AnimatedContent distance={36} duration={1.1} delay={1.15} threshold={0.1}>
            <div className="glass absolute -right-2 top-[38%] flex animate-nova-float-slow items-center gap-2.5 rounded-2xl px-4 py-2.5 sm:-right-6">
              <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
              <span className="text-xs text-nova-muted">Research synced</span>
            </div>
          </AnimatedContent>
          <AnimatedContent distance={36} duration={1.1} delay={1.3} threshold={0.1}>
            <div className="glass absolute bottom-[12%] left-[8%] flex animate-nova-float items-center gap-2.5 rounded-2xl px-4 py-2.5 [animation-delay:1.4s]">
              <span className="flex size-4 items-center justify-center rounded-full bg-nova-blue/30">
                <Check className="size-2.5 text-nova-ice" />
              </span>
              <span className="text-xs text-nova-muted">Draft ready</span>
            </div>
          </AnimatedContent>
        </div>
      </div>

      {/* Editorial footer line */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-8">
        <div className="flex items-center gap-4">
          <span className="font-display text-[10px] tracking-[0.3em] text-nova-muted/70">
            01 — SCROLL
          </span>
          <span className="block h-px w-16 overflow-hidden bg-white/10 sm:w-24">
            <span className="block h-full w-full animate-nova-scroll-cue-x bg-gradient-to-r from-transparent via-nova-ice to-transparent" />
          </span>
        </div>
        <span className="hidden font-display text-[10px] tracking-[0.3em] text-nova-muted/50 sm:block">
          EST. 2026 — THE OS OF WORK
        </span>
      </div>

      {/* Blend into the core awakening */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-nova-base" />
    </section>
  );
}
