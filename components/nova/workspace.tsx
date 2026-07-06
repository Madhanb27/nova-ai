"use client";

import type { ReactNode } from "react";
import {
  Command,
  FileText,
  MessageSquare,
  NotebookPen,
  Search,
  BarChart3,
  Sparkles,
  ArrowRight,
  Workflow,
} from "lucide-react";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import TextType from "@/components/TextType";
import Chapter from "@/components/nova/chapter";
import Seam from "@/components/nova/seam";
import { useMountTrace } from "@/hooks/use-mount-trace";

function TileHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="flex size-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-nova-ice [&_svg]:size-3.5">
        {icon}
      </span>
      <span className="font-display text-[10px] tracking-[0.25em] text-nova-muted">
        {title}
      </span>
    </div>
  );
}

const skeleton = "h-2 rounded-full bg-white/8";

export default function Workspace() {
  useMountTrace("Workspace mounted");
  return (
    <section
      id="workspace"
      className="nova-noise relative overflow-hidden py-32 sm:py-44"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-[30rem] w-[42rem] -translate-x-1/2 rounded-full bg-nova-blue/8 blur-[160px]" />

      <div className="mx-auto max-w-6xl px-6">
        <Chapter index="02" title="EVERYTHING, IN ONE PLACE" />
        <div className="mb-20 text-center">
          <SplitText
            text="The workspace builds itself."
            tag="h2"
            className="font-display text-[clamp(1.6rem,4.6vw,3.4rem)] tracking-[0.05em] text-nova-text"
            splitType="words"
            delay={90}
            duration={0.9}
            ease="power3.out"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
          />
        </div>

        {/* ── Bento grid — cursor spotlight lives on every tile ────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          {/* Command — the large hero tile */}
          <AnimatedContent
            distance={70}
            duration={1.1}
            ease="power3.out"
            threshold={0.15}
            className="md:col-span-2 lg:col-span-4 lg:row-span-2"
          >
            <SpotlightCard className="flex h-full flex-col p-6 sm:p-8">
              <TileHeader icon={<Command />} title="COMMAND" />

              {/* Live command bar */}
              <div className="flex items-center gap-3 rounded-2xl border border-nova-ice/20 bg-white/4 px-4 py-3.5 shadow-[0_0_32px_-12px_rgba(61,90,254,0.5)]">
                <Sparkles className="size-4 shrink-0 text-nova-ice" />
                <TextType
                  as="span"
                  text={[
                    "draft the launch plan from this thread…",
                    "summarize today's research into one brief…",
                    "automate the weekly digest for the team…",
                    "find every decision we made this quarter…",
                  ]}
                  typingSpeed={42}
                  deletingSpeed={22}
                  pauseDuration={1800}
                  loop
                  showCursor
                  cursorCharacter="▍"
                  cursorClassName="text-nova-ice"
                  className="min-w-0 truncate text-[13px] text-nova-text/85 sm:text-sm"
                />
                <kbd className="ml-auto hidden shrink-0 rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-nova-muted sm:block">
                  ⌘K
                </kbd>
              </div>

              {/* Suggestions the AI is offering */}
              <div className="mt-4 flex flex-1 flex-col gap-1.5">
                {[
                  { icon: FileText, label: "Turn thread into launch brief", meta: "Docs" },
                  { icon: Workflow, label: "Schedule the weekly digest", meta: "Automation" },
                  { icon: Search, label: "Pull sources on interface trends", meta: "Research" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
                  >
                    <row.icon className="size-3.5 text-nova-muted transition-colors duration-200 group-hover:text-nova-ice" />
                    <span className="text-[13px] text-nova-muted transition-colors duration-200 group-hover:text-nova-text">
                      {row.label}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 text-[10px] tracking-wide text-nova-muted/50">
                      {row.meta}
                      <ArrowRight className="size-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-white/6 pt-4 text-[10px] tracking-wide text-nova-muted/60">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice" />
                  Neural engine online
                </span>
                <span className="hidden sm:block">One command away from anything</span>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Chat */}
          <AnimatedContent
            distance={70}
            duration={1.1}
            ease="power3.out"
            delay={0.1}
            threshold={0.15}
            className="lg:col-span-2"
          >
            <SpotlightCard className="h-full p-6">
              <TileHeader icon={<MessageSquare />} title="CHAT" />
              <div className="space-y-2.5">
                <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-white/8 bg-white/5 px-3 py-2 text-xs leading-relaxed text-nova-muted">
                  Where did we land on pricing?
                </div>
                <div className="ml-auto max-w-[88%] rounded-xl rounded-br-sm border border-nova-blue/25 bg-nova-blue/15 px-3 py-2 text-xs leading-relaxed text-nova-ice">
                  Decided May 12 — usage-based. Doc linked.
                </div>
                <div className="flex gap-1 pl-1 pt-0.5">
                  <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice/70" />
                  <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice/70 [animation-delay:0.3s]" />
                  <span className="size-1.5 animate-nova-pulse rounded-full bg-nova-ice/70 [animation-delay:0.6s]" />
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Documents */}
          <AnimatedContent
            distance={70}
            duration={1.1}
            ease="power3.out"
            delay={0.18}
            threshold={0.15}
            className="lg:col-span-2"
          >
            <SpotlightCard className="h-full p-6">
              <TileHeader icon={<FileText />} title="DOCUMENTS" />
              <div className="space-y-2">
                <div className="h-2.5 w-2/3 rounded-full bg-white/15" />
                <div className={skeleton} />
                <div className={`${skeleton} w-11/12`} />
                <div className={`${skeleton} w-4/5`} />
                <div className="!mt-3.5 flex items-center gap-2">
                  <span className="h-3.5 w-px animate-nova-caret bg-nova-ice" />
                  <span className="text-[11px] text-nova-muted/70">
                    NOVA is writing…
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Research */}
          <AnimatedContent
            distance={70}
            duration={1.1}
            ease="power3.out"
            delay={0.26}
            threshold={0.15}
            className="lg:col-span-2"
          >
            <SpotlightCard className="h-full p-6">
              <TileHeader icon={<Search />} title="RESEARCH" />
              <div className="mb-3 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <Search className="size-3 text-nova-muted" />
                <span className="text-xs text-nova-muted">
                  emerging interface paradigms
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["12 sources", "3 papers", "synthesis ready"].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-nova-violet/30 bg-nova-violet/10 px-2.5 py-1 text-[10px] font-medium tracking-wide text-nova-ice"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Notes */}
          <AnimatedContent
            distance={70}
            duration={1.1}
            ease="power3.out"
            delay={0.34}
            threshold={0.15}
            className="lg:col-span-2"
          >
            <SpotlightCard className="h-full p-6">
              <TileHeader icon={<NotebookPen />} title="NOTES" />
              <ul className="space-y-2.5 text-xs text-nova-muted">
                {[
                  "Narrow the launch narrative",
                  "Ship the core demo",
                  "Invite design partners",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="size-1 rounded-full bg-nova-ice/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </AnimatedContent>

          {/* Dashboard */}
          <AnimatedContent
            distance={70}
            duration={1.1}
            ease="power3.out"
            delay={0.42}
            threshold={0.15}
            className="lg:col-span-2"
          >
            <SpotlightCard className="h-full p-6">
              <div className="mb-4 flex items-center justify-between">
                <TileHeader icon={<BarChart3 />} title="DASHBOARD" />
                <span className="-mt-4 text-[10px] font-medium text-nova-ice">
                  +38%
                </span>
              </div>
              <div className="flex h-16 items-end gap-1.5">
                {[38, 62, 45, 78, 56, 92, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-nova-blue/50 to-nova-violet/60"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>

      <Seam />
    </section>
  );
}
