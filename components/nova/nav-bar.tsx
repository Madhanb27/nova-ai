"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Workspace", href: "#workspace" },
  { label: "Automation", href: "#automation" },
  { label: "Intelligence", href: "#intelligence" },
  { label: "Security", href: "#security" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
      <nav
        className={cn(
          "glass flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 sm:px-7",
          scrolled &&
            "bg-nova-base/45 shadow-[0_16px_48px_-16px_rgba(5,6,10,0.9)]"
        )}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-sm tracking-[0.32em] text-nova-text"
        >
          NOVA<span className="text-nova-ice">·</span>AI
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative py-2 text-[13px] font-medium tracking-wide text-nova-muted transition-colors duration-300 hover:text-nova-text"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-nova-blue via-nova-ice to-nova-violet transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#enter"
          className="inline-flex h-9 cursor-pointer items-center rounded-full border border-white/15 bg-gradient-to-b from-nova-blue to-nova-violet px-5 text-[13px] font-medium tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_0_20px_-6px_rgba(61,90,254,0.5)] transition-all duration-300 hover:scale-[1.04] hover:border-white/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_36px_-6px_rgba(61,90,254,0.8)] active:scale-[0.98]"
        >
          Launch
        </a>
      </nav>
    </header>
  );
}
