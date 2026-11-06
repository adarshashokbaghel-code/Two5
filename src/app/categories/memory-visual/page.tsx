import type { Metadata } from "next";

import { MemoryArena } from "@/components/memory/memory-arena";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { memoryDescription, memoryGames, memoryPath, memoryTitle } from "@/content/memory-arena";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: memoryTitle },
  description: memoryDescription,
  keywords: [
    "Visual memory games",
    "Brain games",
    "Brain training",
    "Observation games",
    "Spatial reasoning games",
    "Flash Grid",
    "Snapshot",
    "Pattern Forge",
  ],
  alternates: { canonical: memoryPath },
  openGraph: {
    title: memoryTitle,
    description: memoryDescription,
    url: memoryPath,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Two5 Memory & Visual — Flash Grid, Snapshot and Pattern Forge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: memoryTitle,
    description: memoryDescription,
    images: [siteConfig.ogImage],
  },
};

export default function MemoryCategoryPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            path: memoryPath,
            name: memoryTitle,
            description: memoryDescription,
          }),
          breadcrumbJsonLd([
            { name: "Two5", path: "/" },
            { name: "Arenas", path: "/#challenges" },
            { name: "Memory & Visual", path: memoryPath },
          ]),
          collectionPageJsonLd({
            path: memoryPath,
            name: "Memory & Visual",
            description: memoryDescription,
            items: memoryGames.map((game) => ({
              name: game.name,
              description: game.description,
            })),
          }),
        ])}
      />
      <MemoryArena />
    </>
  );
}
