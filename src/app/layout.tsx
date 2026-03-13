import type { Metadata } from "next";
import { Bricolage_Grotesque, Lora } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "antd/dist/reset.css";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Essay Insight AI",
  description: "AI-inspired essay analyzer with transparent scoring and guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${lora.variable}`}>
        <SiteNav />
        {children}
        <footer className="border-t border-[var(--border)] bg-[color:rgba(255,255,255,0.72)] py-4">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-xs text-[var(--muted)]">
            <span>Essay Insight AI • Portfolio Multi-page Version</span>
            <span>NLP scoring API • Ant Design • Framer Motion</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
