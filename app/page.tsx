import { Suspense } from "react";
import dynamic from "next/dynamic";
import ClickSpark from "@/components/ClickSpark";
import NavBar from "@/components/nova/nav-bar";
import NovaCursor from "@/components/nova/nova-cursor";
import Preloader from "@/components/nova/preloader";
import RevealGate from "@/components/nova/reveal-gate";
import TraceErrorBoundary from "@/components/nova/trace-error-boundary";
import MobileFallback from "@/components/nova/mobile-fallback";
import Hero from "@/components/nova/hero";

// Below-fold scenes are code-split into their own chunks (SSR HTML is
// preserved). The hero hydrates first; the rest stream in behind Suspense
// boundaries, so the page is usable before every scene's JS has arrived.
//
// Diagnostic note: import-resolution timing can't be logged from this file
// (a Server Component) — dynamic() resolves server-side during SSR too, and
// calling a "use client" function from server code violates the RSC
// boundary. Each section's own useMountTrace() call is the safe proxy: a
// lazy component cannot mount before its chunk has resolved, so "mounted"
// and "import resolved" are effectively the same instant here.
const AiCore = dynamic(() => import("@/components/nova/ai-core"));
const Workspace = dynamic(() => import("@/components/nova/workspace"));
const Marquee = dynamic(() => import("@/components/nova/marquee"));
const Automation = dynamic(() => import("@/components/nova/automation"));
const Collaboration = dynamic(() => import("@/components/nova/collaboration"));
const Intelligence = dynamic(() => import("@/components/nova/intelligence"));
const Security = dynamic(() => import("@/components/nova/security"));
const FinalCta = dynamic(() => import("@/components/nova/final-cta"));

export default function Home() {
  return (
    <>
      {/* Below 768px: a dedicated static screen instead of the cinematic
          site. The desktop tree below is untouched — `md:contents` removes
          this wrapper from the box tree at 768px+, so it has zero effect on
          desktop's layout, and `hidden` here just stops it from painting. */}
      <div className="md:hidden">
        <MobileFallback />
      </div>

      <div className="hidden md:contents">
        <ClickSpark
          sparkColor="#BDE2FF"
          sparkSize={9}
          sparkRadius={22}
          sparkCount={8}
          duration={450}
        >
          <Preloader />
          <NovaCursor />
          <NavBar />
          <main className="relative flex-1">
            <RevealGate>
              <TraceErrorBoundary name="Hero">
                <Hero />
              </TraceErrorBoundary>
            </RevealGate>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="AiCore">
                <AiCore />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="Workspace">
                <Workspace />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="Marquee">
                <Marquee />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="Automation">
                <Automation />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="Collaboration">
                <Collaboration />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="Intelligence">
                <Intelligence />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="Security">
                <Security />
              </TraceErrorBoundary>
            </Suspense>
            <Suspense fallback={null}>
              <TraceErrorBoundary name="FinalCta">
                <FinalCta />
              </TraceErrorBoundary>
            </Suspense>
          </main>
        </ClickSpark>
      </div>
    </>
  );
}
