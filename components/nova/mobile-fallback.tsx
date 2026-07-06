"use client";

import { useState } from "react";

/**
 * The mobile cover page — a premium product poster, not a fallback screen.
 * Three editorial regions: wordmark, the brand statement (typography as the
 * hero), and a short close. No orb, no card, no glass. One slow ambient
 * animation on the background only — no WebGL, no navigation.
 */
export default function MobileFallback() {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-nova-base px-8">
      {/* The environment — an enormous NOVA core, mostly outside the frame.
          Barely perceptible; exists only to make the space feel inhabited,
          not to be looked at. One breathing cycle, nothing else moves. */}
      <div className="pointer-events-none absolute -right-[950px] -top-[950px] size-[1400px] opacity-[0.06]">
        <div
          className="absolute inset-0 animate-nova-pulse rounded-full"
          style={{ animationDuration: "9s" }}
        >
          {/* Faint atmospheric halo */}
          <div className="absolute -inset-32 rounded-full bg-[radial-gradient(circle,rgba(61,90,254,0.5),transparent_70%)] blur-[160px]" />
          {/* The sphere — near-black core, electric-blue rim, violet edge */}
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_42%_40%,rgba(5,6,10,0.95)_0%,rgba(5,6,10,0.9)_55%,rgba(61,90,254,0.55)_80%,rgba(123,92,255,0.45)_92%,transparent_100%)] blur-[6px]" />
          {/* Thin outer energy ring — static */}
          <div className="absolute -inset-3 rounded-full border border-nova-ice/60 blur-[1px]" />
        </div>
      </div>
      <div className="nova-grid pointer-events-none absolute inset-0" />

      {/* Top ~15% — wordmark only */}
      <div className="relative flex justify-center pt-14">
        <span className="font-display text-xs tracking-[0.4em] text-nova-muted">
          NOVA<span className="text-nova-ice">·</span>AI
        </span>
      </div>

      {/* Center ~55% — the statement is the hero */}
      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <h1
          className="font-display leading-[1.15] tracking-[0.03em]"
          style={{
            fontFamily: "var(--font-michroma), var(--font-inter), sans-serif",
          }}
        >
          <span className="block text-[2.15rem] text-nova-text">
            ONE WORKSPACE.
          </span>
          <span className="mt-1.5 block bg-gradient-to-r from-nova-blue via-nova-ice to-nova-violet bg-clip-text text-[2.15rem] text-transparent">
            INFINITE
            <br />
            INTELLIGENCE.
          </span>
        </h1>
      </div>

      {/* Bottom ~30% — the close */}
      <div className="relative flex flex-col items-center pb-14 text-center">
        <p className="max-w-[16rem] text-[13px] leading-relaxed text-nova-muted">
          Crafted as a desktop-first cinematic experience.
        </p>

        <div className="mt-7">
          <button
            type="button"
            onClick={() => setShowMessage(true)}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-nova-blue to-nova-violet px-9 py-[14px] text-sm font-medium tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_28px_-6px_rgba(61,90,254,0.55),0_8px_24px_-12px_rgba(0,0,0,0.8)] transition-transform duration-300 active:scale-[0.98]"
          >
            Desktop Experience
          </button>
        </div>

        {showMessage && (
          <p className="mt-4 max-w-[16rem] text-[12px] leading-relaxed text-nova-ice/80">
            Please open this link on a laptop or desktop screen.
          </p>
        )}

        <p className="mt-5 text-[11px] tracking-wide text-nova-muted/50">
          Best experienced on larger displays.
        </p>
      </div>
    </div>
  );
}
