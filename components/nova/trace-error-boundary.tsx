"use client";

import React from "react";
import { trace } from "@/lib/trace";

/**
 * Per-section error boundary used only for this diagnostic pass. Logs which
 * section threw and the component stack, then renders a small visible
 * marker instead of silently going blank — so a crashed section is
 * distinguishable from a section that simply hasn't revealed yet.
 */
export default class TraceErrorBoundary extends React.Component<
  { name: string; children: React.ReactNode },
  { hasError: boolean; message: string }
> {
  constructor(props: { name: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    trace(
      `REACT ERROR in "${this.props.name}": ${error.message} | stack: ${(info.componentStack ?? "").slice(0, 400)}`
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "40px 24px",
            color: "#ff8a8a",
            fontFamily: "monospace",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          [{this.props.name}] failed to render: {this.state.message}
        </div>
      );
    }
    return this.props.children;
  }
}
