"use client";

import { useEffect, useState } from "react";
import { subscribeTrace, type TraceEntry } from "@/lib/trace";

/**
 * On-screen timeline readout for phones without remote-debugging access.
 * Opt-in only: visit the page with `?debug=1` in the URL. Renders nothing
 * otherwise — zero effect on the normal experience.
 */
export default function DebugHud() {
  const [enabled, setEnabled] = useState(false);
  const [entries, setEntries] = useState<TraceEntry[]>([]);

  useEffect(() => {
    setEnabled(new URLSearchParams(window.location.search).get("debug") === "1");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    return subscribeTrace(setEntries);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        maxHeight: "42vh",
        overflowY: "auto",
        background: "rgba(5,6,10,0.94)",
        color: "#BDE2FF",
        fontFamily: "monospace",
        fontSize: 11,
        lineHeight: 1.6,
        padding: "8px 10px",
        zIndex: 999999,
        borderTop: "1px solid rgba(255,255,255,0.15)",
        whiteSpace: "pre-wrap",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div style={{ color: "#fff", fontWeight: 700, marginBottom: 4 }}>
        NOVA TRACE — {entries.length} events (scroll to read)
      </div>
      {entries.map((e, i) => (
        <div key={i}>
          +{String(e.t).padStart(6, " ")}ms — {e.label}
        </div>
      ))}
    </div>
  );
}
