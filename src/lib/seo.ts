import type { Metadata } from "next";
import { FORMATS, type FormatId } from "@/data/formats";
import type { Tool } from "@/data/tools";
import { SITE } from "@/config/site";

const titleWord = (word: string) => {
  const format = FORMATS[word as FormatId];
  if (format) return format.label;
  if (/^\d+kb$/i.test(word)) return word.toUpperCase().replace("KB", "KB");
  if (/^(to|and|of)$/.test(word)) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const keywordTitle = (tool: Tool) => tool.keyword.split(" ").map(titleWord).join(" ");

export const toolHeading = (tool: Tool) => {
  const base = keywordTitle(tool);
  if (tool.kind === "convert" || tool.kind === "to-pdf")
    return /converter$/i.test(base) ? base : `${base} Converter`;
  return base;
};

export const toolTitle = (tool: Tool) => {
  const heading = toolHeading(tool);
  if (tool.kind === "resize-kb") return `${heading} Online – Free, Exact Size | ${SITE.name}`;
  if (tool.kind === "compress") return `${heading} Online – Free, No Upload | ${SITE.name}`;
  return `${heading} – Free, Private, No Upload | ${SITE.name}`;
};

export const toolDescription = (tool: Tool) => {
  const to = FORMATS[tool.to].label;
  const from = FORMATS[tool.from[0]].label;
  if (tool.kind === "resize-kb")
    return `${keywordTitle(tool)} in seconds. Get a photo under ${tool.targetKb}KB for forms and uploads, free, no sign-up, and your photo never leaves your device.`;
  if (tool.kind === "compress")
    return `Compress images online for free. Shrink JPG, PNG, WebP and iPhone photos in your browser – no sign-up, no upload, no watermark.`;
  return `Convert ${from} to ${to} free in your browser. Batch convert in one click – no sign-up, no upload, no watermark. Your files never leave your device.`;
};

export const toolLead = (tool: Tool) => {
  if (tool.kind === "resize-kb")
    return `Drop a photo and get a JPG under ${tool.targetKb}KB, ready for online forms and uploads.`;
  if (tool.kind === "compress") return "Make images smaller without making them look worse.";
  const from = FORMATS[tool.from[0]].label;
  const to = FORMATS[tool.to].label;
  return `Turn ${from} files into ${to} in seconds. Batch convert as many as you like.`;
};

export const toolMetadata = (tool: Tool): Metadata => {
  const title = toolTitle(tool);
  const description = toolDescription(tool);
  const url = `${SITE.url}/${tool.slug}`;
  return {
    title: { absolute: title },
    description,
    keywords: [tool.keyword, toolHeading(tool).toLowerCase(), `${tool.keyword} free`, `${tool.keyword} online`],
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
};
