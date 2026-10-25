import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";
import { TOOLS } from "@/data/tools";
import { getPosts } from "@/lib/blog";

const LAST_UPDATED = "2026-10-25";

const sitemap = (): MetadataRoute.Sitemap => [
  { url: SITE.url, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 1 },
  ...TOOLS.map((tool) => ({
    url: `${SITE.url}/${tool.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: "monthly" as const,
    priority: tool.featured ? 0.9 : 0.7,
  })),
  { url: `${SITE.url}/blog`, lastModified: LAST_UPDATED, changeFrequency: "weekly", priority: 0.7 },
  ...getPosts().map((post) => ({
    url: `${SITE.url}/blog/${post.slug}`,
    lastModified: post.updated,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  })),
  { url: `${SITE.url}/about`, lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE.url}/privacy`, lastModified: LAST_UPDATED, changeFrequency: "yearly", priority: 0.3 },
];

export default sitemap;
