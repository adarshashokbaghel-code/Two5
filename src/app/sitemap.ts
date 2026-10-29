import type { MetadataRoute } from "next";

import { blogPosts } from "@/content/blog";
import { researchPosts } from "@/content/research";
import { siteConfig } from "@/config/site";

const researchUpdated = new Date("2026-10-24");
const siteUpdated = new Date("2026-10-27");
const launchUpdated = new Date("2026-10-29");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: launchUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/roadmap`,
      lastModified: launchUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteConfig.url}/research`,
      lastModified: siteUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/research/methodology`,
      lastModified: siteUpdated,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/research/collaborate`,
      lastModified: siteUpdated,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...researchPosts.map((post) => ({
      url: `${siteConfig.url}/research/${post.slug}`,
      lastModified: siteUpdated,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: siteUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: researchUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/cookies`,
      lastModified: researchUpdated,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];
}
