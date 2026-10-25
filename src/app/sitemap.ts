import type { MetadataRoute } from "next";
import { TOOLS } from "@/data/tools";
import { getPosts, postLocales } from "@/lib/blog";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { languageAlternates, pageUrl } from "@/lib/seo";

const LAST_UPDATED = "2026-10-25";

type Entry = MetadataRoute.Sitemap[number];

const allLanguages = (path: string, changeFrequency: Entry["changeFrequency"], priority: number): Entry[] =>
  LOCALES.map((locale) => ({
    url: pageUrl(locale, path),
    lastModified: LAST_UPDATED,
    changeFrequency,
    priority,
    alternates: { languages: languageAlternates(path) },
  }));

const postEntries = (): Entry[] => {
  const slugs = new Set(LOCALES.flatMap((locale) => getPosts(locale).map((post) => post.slug)));
  return [...slugs].flatMap((slug) => {
    const available = postLocales(slug, LOCALES);
    const languages = Object.fromEntries(
      available.map((locale) => [LOCALE_META[locale].hreflang, pageUrl(locale, `/blog/${slug}`)]),
    );
    return available.map((locale: Locale) => ({
      url: pageUrl(locale, `/blog/${slug}`),
      lastModified: getPosts(locale).find((post) => post.slug === slug)?.updated ?? LAST_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages },
    }));
  });
};

const sitemap = (): MetadataRoute.Sitemap => [
  ...allLanguages("/", "weekly", 1),
  ...TOOLS.flatMap((tool) => allLanguages(`/${tool.slug}`, "monthly", tool.featured ? 0.9 : 0.7)),
  ...allLanguages("/blog", "weekly", 0.7),
  ...postEntries(),
  ...allLanguages("/about", "yearly", 0.3),
  ...allLanguages("/privacy", "yearly", 0.3),
];

export default sitemap;
