import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans } from "next/font/google";

import { WaitlistModal } from "@/components/landing/waitlist-modal";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { siteConfig } from "@/config/site";

import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink antialiased">
        <SmoothScroll>{children}</SmoothScroll>
        <WaitlistModal />
      </body>
    </html>
  );
}
