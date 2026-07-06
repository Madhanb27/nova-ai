"use client";

import { useEffect, useState, type ReactNode } from "react";
import { REVEAL_EVENT } from "@/components/nova/preloader";

/**
 * Remounts its children the moment the preloader curtains part, so entrance
 * animations play in sync with the reveal instead of finishing behind the
 * veil. On repeat visits (preloader skipped) nothing remounts.
 */
export default function RevealGate({ children }: { children: ReactNode }) {
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    const onReveal = () => setGeneration((g) => g + 1);
    window.addEventListener(REVEAL_EVENT, onReveal);
    return () => window.removeEventListener(REVEAL_EVENT, onReveal);
  }, []);

  return <div key={generation}>{children}</div>;
}
