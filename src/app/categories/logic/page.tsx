import type { Metadata } from "next";

import { LogicArena } from "@/components/logic/logic-arena";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/config/site";
import { logicDescription, logicGames, logicPath, logicTitle } from "@/content/logic-arena";
import { breadcrumbJsonLd, collectionPageJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
  title: { absolute: logicTitle },
  description: logicDescription,
  keywords: [
    "Brain games",
    "Brain training",
    "Logic games",
    "Pattern recognition games",
    "Odd one out puzzles",
    "Visual pattern puzzles",
    "Rule switching games",
    "Reasoning games",
  ],
  alternates: { canonical: logicPath },
  openGraph: {
    title: logicTitle,
    description: logicDescription,
    url: logicPath,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Two5 Logic & Patterns — OddOne, Missing and Switch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: logicTitle,
    description: logicDescription,
    images: [siteConfig.ogImage],
  },
};

export default function LogicCategoryPage() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph([
          webPageJsonLd({
            path: logicPath,
            name: logicTitle,
            description: logicDescription,
          }),
          breadcrumbJsonLd([
            { name: "Two5", path: "/" },
            { name: "Arenas", path: "/#challenges" },
            { name: "Logic & Patterns", path: logicPath },
          ]),
          collectionPageJsonLd({
            path: logicPath,
            name: "Logic & Patterns",
            description: logicDescription,
            items: logicGames.map((game) => ({
              name: game.name,
              description: game.description,
            })),
          }),
        ])}
      />
      <LogicArena />
    </>
  );
}
