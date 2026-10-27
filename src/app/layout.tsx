import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";

import { WaitlistModal } from "@/components/landing/waitlist-modal";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { jsonLdGraph, organizationJsonLd, websiteJsonLd } from "@/lib/json-ld";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Two5 — Play a sharper game",
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: "Two5 — Play a sharper game",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Two5 — Give your brain a run",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Two5 — Play a sharper game",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/brand/apple-touch.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  category: "games",
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  other: {
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${outfit.className} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink antialiased">
        <JsonLd data={jsonLdGraph([organizationJsonLd(), websiteJsonLd()])} />
        <SmoothScroll>{children}</SmoothScroll>
        <WaitlistModal />
      </body>
    </html>
  );
}
