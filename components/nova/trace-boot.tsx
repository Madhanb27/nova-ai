"use client";

import { useEffect } from "react";
import { trace } from "@/lib/trace";

/**
 * Mounted as early as possible in the tree. Captures:
 * - the moment client-side React effects start running (hydration proof)
 * - document.readyState / window load timing
 * - every uncaught runtime exception and unhandled promise rejection
 * - every long task (>50ms) reported by the browser, if supported
 *
 * Diagnostic only — renders nothing, changes no behavior.
 */
export default function TraceBoot() {
  useEffect(() => {
    trace(`Root hydrated — document.readyState=${document.readyState}`);

    const onLoad = () => trace("window 'load' event fired");
    window.addEventListener("load", onLoad);

    const onError = (e: ErrorEvent) => {
      trace(
        `RUNTIME ERROR: ${e.message} @ ${e.filename ?? "?"}:${e.lineno ?? "?"}:${e.colno ?? "?"}`
      );
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      trace(`UNHANDLED REJECTION: ${String(e.reason)}`);
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    let po: PerformanceObserver | undefined;
    try {
      po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          trace(
            `LONG TASK ${Math.round(entry.duration)}ms (started @ +${Math.round(entry.startTime)}ms)`
          );
        }
      });
      po.observe({ entryTypes: ["longtask"] });
    } catch (err) {
      trace(`longtask PerformanceObserver unsupported: ${(err as Error).message}`);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
      po?.disconnect();
    };
  }, []);

  return null;
}
