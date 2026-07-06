"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "@/components/CountUp";
import ShinyText from "@/components/ShinyText";
import { cn } from "@/lib/utils";

const SESSION_KEY = "nova-intro-seen";
/** Fired the moment the curtains start parting — RevealGate listens for it. */
export const REVEAL_EVENT = "nova:reveal";

type Phase = "loading" | "revealing" | "done";

export default function Preloader() {
  // Veil is visible in server HTML so there is never a flash of raw page.
  const [phase, setPhase] = useState<Phase>("loading");
  const [skipped, setSkipped] = useState(false);
  const revealedRef = useRef(false);

  const reveal = () => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Storage can be unavailable (private mode) — the intro just replays.
    }
    window.dispatchEvent(new Event(REVEAL_EVENT));
    setPhase("revealing");
    document.documentElement.style.overflow = "";
    setTimeout(() => setPhase("done"), 1000);
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = Boolean(sessionStorage.getItem(SESSION_KEY));
    } catch {
      seen = false;
    }
    // Touch devices skip the intro entirely — on mobile networks the veil
    // otherwise gates first meaningful paint behind the whole JS bundle.
    if (window.matchMedia("(pointer: coarse)").matches || seen) {
      setSkipped(true);
      setPhase("done");
      return;
    }
    document.documentElement.style.overflow = "hidden";

    // Safety net: whatever happens, the veil must lift and scrolling must
    // return within a few seconds.
    const safety = setTimeout(reveal, 4000);

    // Reduced motion: no counter, just a brief branded beat.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = setTimeout(reveal, 500);
      return () => {
        clearTimeout(t);
        clearTimeout(safety);
        document.documentElement.style.overflow = "";
      };
    }
    return () => {
      clearTimeout(safety);
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="nova-preloader fixed inset-0 z-[100]"
      aria-hidden="true"
      style={{ visibility: skipped ? "hidden" : undefined }}
    >
      {/* Curtain halves */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 bg-nova-base transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === "revealing" && "-translate-y-full"
        )}
      >
        <div className="nova-grid absolute inset-0" />
      </div>
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/2 bg-nova-base transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]",
          phase === "revealing" && "translate-y-full"
        )}
      >
        <div className="nova-grid absolute inset-0" />
      </div>

      {/* Seam light — a hairline that flares as the curtains part */}
      <div
        className={cn(
          "absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-nova-ice/70 to-transparent transition-opacity duration-500",
          phase === "revealing" ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Wordmark + counter */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-400",
          phase === "revealing" && "opacity-0"
        )}
      >
        <ShinyText
          text="NOVA·AI"
          speed={2.2}
          color="#A9B0C2"
          shineColor="#FFFFFF"
          className="font-display text-2xl tracking-[0.45em] sm:text-3xl"
        />

        <div className="flex w-56 flex-col items-center gap-4 sm:w-72">
          {/* Progress hairline */}
          <div className="h-px w-full overflow-hidden bg-white/10">
            <div className="h-full w-full origin-left animate-[nova-line-grow_1.6s_cubic-bezier(0.22,1,0.36,1)_both] bg-gradient-to-r from-nova-blue via-nova-ice to-nova-violet" />
          </div>
          <div className="font-display text-[11px] tracking-[0.3em] text-nova-muted/70 tabular-nums">
            <CountUp to={100} from={0} duration={1.4} onEnd={reveal} />
          </div>
        </div>
      </div>
    </div>
  );
}
