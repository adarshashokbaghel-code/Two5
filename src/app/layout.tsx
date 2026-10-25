import type { Metadata } from "next";
import { Bebas_Neue, Geist_Mono, Inter } from "next/font/google";

import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/config/site";

import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Two5 — Play a sharper game",
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Two5 — Play a sharper game",
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
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
