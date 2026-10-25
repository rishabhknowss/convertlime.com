import type { Metadata } from "next";
import { FORMATS, type FormatId } from "@/data/formats";
import type { Tool } from "@/data/tools";
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

export const toolHeading = (tool: Tool, locale: Locale) => getDictionary(locale).tool.heading(toolVars(tool));

export const toolTitle = (tool: Tool, locale: Locale) =>
  `${getDictionary(locale).tool.title(toolVars(tool))} | ${SITE.name}`;

export const toolDescription = (tool: Tool, locale: Locale) => getDictionary(locale).tool.description(toolVars(tool));

export const toolLead = (tool: Tool, locale: Locale) => getDictionary(locale).tool.lead(toolVars(tool));

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

export const toolMetadata = (tool: Tool, locale: Locale): Metadata => {
  const title = toolTitle(tool, locale);
  const description = toolDescription(tool, locale);
  const url = pageUrl(locale, `/${tool.slug}`);
  return {
    title: { absolute: title },
    description,
    keywords: getDictionary(locale).tool.keywords(toolVars(tool)),
    alternates: localizedAlternates(locale, `/${tool.slug}`),
    openGraph: { title, description, url, siteName: SITE.name, type: "website", locale: LOCALE_META[locale].ogLocale },
    twitter: { card: "summary_large_image", title, description },
  };
};
