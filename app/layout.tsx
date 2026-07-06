import type { Metadata } from "next";
import { Inter, Michroma } from "next/font/google";
import "./globals.css";
import TraceBoot from "@/components/nova/trace-boot";
import DebugHud from "@/components/nova/debug-hud";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOVA AI — One Workspace. Infinite Intelligence.",
  description:
    "NOVA AI unifies conversations, documents, research, automation, collaboration and productivity into one intelligent workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${michroma.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nova-base text-nova-text font-sans overflow-x-clip">
        <TraceBoot />
        {children}
        <DebugHud />
      </body>
    </html>
  );
}
