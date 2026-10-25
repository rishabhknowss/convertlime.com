import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Meta-ExternalAgent",
  "CCBot",
];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    { userAgent: "*", allow: "/" },
    { userAgent: AI_CRAWLERS, allow: "/" },
  ],
  sitemap: `${SITE.url}/sitemap.xml`,
  host: SITE.url,
});

export default robots;
