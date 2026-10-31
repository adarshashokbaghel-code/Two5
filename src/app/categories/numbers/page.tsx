import type { Metadata } from "next";

import { NumbersArena } from "@/components/categories/numbers-arena";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { games, numbersDescription, numbersPath, numbersTitle } from "@/content/numbers-arena";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: numbersTitle },
  description: numbersDescription,
  keywords: [
    "Number games",
    "Number puzzles",
    "Numerical reasoning games",
    "Mental maths games",
    "Number sequence puzzles",
    "Number estimation games",
    "Pattern recognition games",
  ],
  alternates: { canonical: numbersPath },
  openGraph: {
    title: numbersTitle,
    description: numbersDescription,
    url: numbersPath,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Two5 Numbers arena — Target 25, Sequence and Pinpoint",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: numbersTitle,
    description: numbersDescription,
    images: [siteConfig.ogImage],
  },
};

export default function NumbersCategoryPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            path: numbersPath,
            name: numbersTitle,
            description: numbersDescription,
          }),
          breadcrumbJsonLd([
            { name: "Two5", path: "/" },
            { name: "Arenas", path: "/#challenges" },
            { name: "Numbers", path: numbersPath },
          ]),
          collectionPageJsonLd({
            path: numbersPath,
            name: "Numbers Arena",
            description: numbersDescription,
            items: games.map((game) => ({
              name: game.name,
              description: game.description,
            })),
          }),
        ])}
      />
      <NumbersArena />
    </>
  );
}
