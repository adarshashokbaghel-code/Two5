import type { MetadataRoute } from "next";

import { researchPosts } from "@/content/research";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-24");
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/research`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...researchPosts.map((post) => ({
      url: `${siteConfig.url}/research/${post.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
