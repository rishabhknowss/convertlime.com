import type { Metadata } from "next";
import { FORMATS, type FormatId } from "@/data/formats";
import { toolSlug, type Tool } from "@/data/tools";
import { SITE } from "@/config/site";
import { LOCALES, LOCALE_META, localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { ToolVars } from "@/i18n/types";

const titleWord = (word: string) => {
  const format = FORMATS[word as FormatId];
  if (format) return format.label;
  if (/^\d+kb$/i.test(word)) return word.toUpperCase();
  if (/^(to|and|of)$/.test(word)) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const toolVars = (tool: Tool): ToolVars => ({
  kind: tool.kind,
  from: FORMATS[tool.from[0]].label,
  to: FORMATS[tool.to].label,
  fromId: tool.from[0],
  toId: tool.to,
  kb: tool.targetKb ?? 0,
  imageToPdf: tool.slug === "image-to-pdf",
  toLossless: FORMATS[tool.to].compression === "lossless",
  englishKeyword: tool.keyword.split(" ").map(titleWord).join(" "),
});

const removeBgText = (tool: Tool, locale: Locale) =>
  tool.kind === "remove-bg" ? getDictionary(locale).removeBg : null;

export const toolHeading = (tool: Tool, locale: Locale) =>
  removeBgText(tool, locale)?.heading ?? getDictionary(locale).tool.heading(toolVars(tool));

export const toolTitle = (tool: Tool, locale: Locale) =>
  `${removeBgText(tool, locale)?.title ?? getDictionary(locale).tool.title(toolVars(tool))} | ${SITE.name}`;

export const toolDescription = (tool: Tool, locale: Locale) =>
  removeBgText(tool, locale)?.description ?? getDictionary(locale).tool.description(toolVars(tool));

export const toolLead = (tool: Tool, locale: Locale) =>
  removeBgText(tool, locale)?.lead ?? getDictionary(locale).tool.lead(toolVars(tool));

export const toolKeywords = (tool: Tool, locale: Locale) =>
  removeBgText(tool, locale)?.keywords ?? getDictionary(locale).tool.keywords(toolVars(tool));

export const toolPromises = (tool: Tool, locale: Locale) =>
  removeBgText(tool, locale)?.promises ?? getDictionary(locale).tool.promises;

export const pageUrl = (locale: Locale, path: string) => {
  const localized = localePath(locale, path);
  return localized === "/" ? SITE.url : `${SITE.url}${localized}`;
};

export const languageAlternates = (path: string) => ({
  ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_META[locale].hreflang, pageUrl(locale, path)])),
  "x-default": pageUrl("en", path),
});

export const localizedAlternates = (locale: Locale, path: string) => ({
  canonical: pageUrl(locale, path),
  languages: languageAlternates(path),
});

export const toolUrl = (tool: Tool, locale: Locale) => pageUrl(locale, `/${encodeURIComponent(toolSlug(tool, locale))}`);

export const toolLanguageAlternates = (tool: Tool) => ({
  ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_META[locale].hreflang, toolUrl(tool, locale)])),
  "x-default": toolUrl(tool, "en"),
});

export const toolMetadata = (tool: Tool, locale: Locale): Metadata => {
  const title = toolTitle(tool, locale);
  const description = toolDescription(tool, locale);
  const url = toolUrl(tool, locale);
  return {
    title: { absolute: title },
    description,
    keywords: toolKeywords(tool, locale),
    alternates: { canonical: url, languages: toolLanguageAlternates(tool) },
    openGraph: { title, description, url, siteName: SITE.name, type: "website", locale: LOCALE_META[locale].ogLocale },
    twitter: { card: "summary_large_image", title, description },
  };
};
