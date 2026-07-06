"use client";

/**
 * Diagnostic-only event timeline. Records a timestamped label, mirrors it to
 * console.log, and notifies any subscribed HUD. No effect on rendering,
 * layout, or animation — purely observational.
 */

export type TraceEntry = { t: number; label: string };

const entries: TraceEntry[] = [];
const listeners = new Set<(entries: TraceEntry[]) => void>();

export function trace(label: string): void {
  if (typeof window === "undefined") return;
  const t = Math.round(performance.now());
  const entry = { t, label };
  entries.push(entry);
  // eslint-disable-next-line no-console
  console.log(`[NOVA-TRACE +${t}ms] ${label}`);
  listeners.forEach((cb) => cb(entries.slice()));
}

export function subscribeTrace(cb: (entries: TraceEntry[]) => void): () => void {
  listeners.add(cb);
  cb(entries.slice());
  return () => listeners.delete(cb);
}

export function getTraceEntries(): TraceEntry[] {
  return entries.slice();
}
