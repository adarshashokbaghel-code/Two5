import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";

import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/config/site";

import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Two5 — Your Brain’s Gym",
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Two5 — Your Brain’s Gym",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-reel="out"
      className={`${sans.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full bg-ink font-sans text-paper antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
