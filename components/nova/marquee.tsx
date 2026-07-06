"use client";

import { useEffect, useState } from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { useMountTrace } from "@/hooks/use-mount-trace";

const LINE =
  "CHAT · DOCUMENTS · RESEARCH · NOTES · AUTOMATION · INSIGHT · ONE WORKSPACE · INFINITE INTELLIGENCE · ";

export default function Marquee() {
  useMountTrace("Marquee mounted");
  // Touch devices get the same strip without the per-frame velocity engine.
  const [staticMode, setStaticMode] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) setStaticMode(true);
  }, []);

  return (
    <div className="relative overflow-hidden py-10 opacity-[0.16]" aria-hidden="true">
      {staticMode ? (
        <div className="whitespace-nowrap font-display text-2xl tracking-[0.3em] text-nova-ice">
          {LINE}
        </div>
      ) : (
        <ScrollVelocity
          texts={[
            "CHAT · DOCUMENTS · RESEARCH · NOTES · AUTOMATION · INSIGHT · ",
            "ONE WORKSPACE · INFINITE INTELLIGENCE · ",
          ]}
          velocity={54}
          numCopies={8}
          className="font-display text-2xl tracking-[0.3em] text-nova-ice sm:text-3xl"
          parallaxClassName="relative overflow-hidden"
          scrollerClassName="flex whitespace-nowrap"
        />
      )}
    </div>
  );
}
