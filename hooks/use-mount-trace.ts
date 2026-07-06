"use client";

import { useEffect } from "react";
import { trace } from "@/lib/trace";

/** Logs the exact moment a component's effects first run (i.e. it mounted / hydrated). */
export function useMountTrace(label: string): void {
  useEffect(() => {
    trace(label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
