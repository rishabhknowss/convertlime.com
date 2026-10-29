import type { FormatId } from "@/data/formats";
import { localePath, type Locale } from "@/i18n/config";

export type ToolKind = "convert" | "compress" | "resize-kb" | "to-pdf" | "remove-bg" | "invoice";

export type CategoryId = "edit" | "docs" | "iphone" | "web" | "everyday" | "compress" | "pdf";

export type Tool = {
  slug: string;
  kind: ToolKind;
  category: CategoryId;
  title: string;
  keyword: string;
  from: FormatId[];
  to: FormatId;
  targetKb?: number;
  featured?: boolean;
  localSlugs?: Partial<Record<Locale, string>>;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "edit", label: "Edit images" },
  { id: "docs", label: "Documents" },
  { id: "iphone", label: "iPhone photos" },
  { id: "web", label: "Web images" },
  { id: "everyday", label: "Everyday formats" },
  { id: "compress", label: "Compress & resize" },
  { id: "pdf", label: "Images to PDF" },
];

const convert = (
  from: FormatId,
  to: FormatId,
  category: CategoryId,
  featured = false,
): Tool => ({
  slug: `${from}-to-${to}`,
  kind: "convert",
  category,
  title: `${from.toUpperCase()} to ${to.toUpperCase()}`,
  keyword: `${from} to ${to}`,
  from: from === "jpg" ? ["jpg", "jpeg", "jfif"] : from === "tiff" ? ["tiff"] : [from],
  to,
  featured,
});

const toPdf = (from: FormatId, category: CategoryId = "pdf"): Tool => ({
  ...convert(from, "pdf", category),
  kind: "to-pdf",
});

const resizeKb = (kb: number): Tool => ({
  slug: `resize-image-to-${kb}kb`,
  kind: "resize-kb",
  category: "compress",
  title: `Resize image to ${kb}KB`,
  keyword: `resize image to ${kb}kb`,
  from: ["jpg", "jpeg", "png", "webp", "heic", "avif", "jfif"],
  to: "jpg",
  targetKb: kb,
});

const removeBackground: Tool = {
  slug: "remove-background",
  kind: "remove-bg",
  category: "edit",
  title: "Remove background",
  keyword: "remove background",
  from: ["jpg", "jpeg", "png", "webp", "heic", "avif", "jfif", "bmp", "gif"],
  to: "png",
  featured: true,
  localSlugs: {
    es: "quitar-fondo",
    pt: "remover-fundo",
    fr: "enlever-fond-image",
    de: "hintergrund-entfernen",
    ja: "背景透過",
    ko: "배경제거",
    zh: "去背",
  },
};

const invoiceGenerator: Tool = {
  slug: "invoice-generator",
  kind: "invoice",
  category: "docs",
  title: "Invoice generator",
  keyword: "invoice generator",
  from: ["pdf"],
  to: "pdf",
  featured: true,
  localSlugs: {
    es: "generador-de-facturas",
    pt: "gerador-de-invoice",
    fr: "faire-une-facture",
    de: "rechnung-schreiben",
    ja: "請求書作成",
    ko: "인보이스-양식",
    zh: "发票生成器",
  },
};

export const TOOL_ALIASES: Record<string, string> = {
  "remove-bg": "remove-background",
  "invoice-maker": "invoice-generator",
  "gerador-de-fatura": "invoice-generator",
  "generateur-de-facture": "invoice-generator",
  "rechnung-erstellen": "invoice-generator",
  "인보이스-만들기": "invoice-generator",
};

export const TOOLS: Tool[] = [
  removeBackground,
  invoiceGenerator,
  convert("heic", "jpg", "iphone", true),
  convert("heic", "png", "iphone", true),
  toPdf("heic", "iphone"),
  convert("heic", "webp", "iphone"),
  convert("heif", "jpg", "iphone"),
  convert("heif", "png", "iphone"),
  convert("avif", "jpg", "web", true),
  convert("avif", "png", "web", true),
  convert("avif", "webp", "web"),
  convert("avif", "gif", "web"),
  toPdf("avif"),
  convert("webp", "jpg", "web", true),
  convert("webp", "png", "web", true),
  convert("webp", "gif", "web"),
  convert("webp", "ico", "web"),
  toPdf("webp"),
  convert("jpg", "webp", "web"),
  convert("png", "webp", "web"),
  convert("jpg", "avif", "web"),
  convert("png", "avif", "web"),
  convert("jfif", "jpg", "everyday", true),
  convert("jfif", "png", "everyday"),
  toPdf("jfif"),
  convert("png", "jpg", "everyday", true),
  convert("jpg", "png", "everyday", true),
  convert("jpeg", "png", "everyday"),
  convert("jpg", "jpeg", "everyday"),
  convert("jpeg", "jpg", "everyday"),
  convert("gif", "png", "everyday"),
  convert("gif", "jpg", "everyday"),
  convert("png", "gif", "everyday"),
  convert("bmp", "jpg", "everyday"),
  convert("bmp", "png", "everyday"),
  convert("png", "bmp", "everyday"),
  convert("jpg", "bmp", "everyday"),
  convert("tiff", "jpg", "everyday"),
  convert("tiff", "png", "everyday"),
  convert("jpg", "tiff", "everyday"),
  convert("png", "tiff", "everyday"),
  convert("svg", "png", "everyday"),
  convert("svg", "jpg", "everyday"),
  convert("svg", "webp", "everyday"),
  convert("ico", "png", "everyday"),
  convert("png", "ico", "everyday"),
  convert("jpg", "ico", "everyday"),
  {
    slug: "compress-image",
    kind: "compress",
    category: "compress",
    title: "Compress image",
    keyword: "compress image",
    from: ["jpg", "jpeg", "png", "webp", "avif", "heic", "jfif"],
    to: "jpg",
    featured: true,
  },
  resizeKb(20),
  resizeKb(50),
  resizeKb(100),
  resizeKb(200),
  {
    ...toPdf("jpg"),
    slug: "image-to-pdf",
    title: "Image to PDF",
    keyword: "image to pdf converter",
    from: ["jpg", "jpeg", "png", "webp", "heic", "avif", "jfif", "gif", "bmp"],
    featured: true,
  },
  toPdf("jpg"),
  toPdf("png"),
  toPdf("tiff"),
];

export const getTool = (slug: string) => TOOLS.find((tool) => tool.slug === slug);

const decode = (slug: string) => {
  try {
    return decodeURIComponent(slug);
  } catch {
    return slug;
  }
};

export const toolSlug = (tool: Tool, locale: Locale) => tool.localSlugs?.[locale] ?? tool.slug;

export const toolPath = (tool: Tool, locale: Locale) => localePath(locale, `/${toolSlug(tool, locale)}`);

export const findTool = (slug: string, locale: Locale) => {
  const wanted = decode(slug);
  return TOOLS.find((tool) => toolSlug(tool, locale) === wanted);
};

export const toolRedirect = (slug: string, locale: Locale) => {
  const wanted = decode(slug);
  const tool = getTool(TOOL_ALIASES[wanted] ?? wanted) ?? TOOLS.find((item) => Object.values(item.localSlugs ?? {}).includes(wanted));
  if (!tool || toolSlug(tool, locale) === wanted) return null;
  return toolPath(tool, locale);
};

export const toolsByCategory = (category: CategoryId) =>
  TOOLS.filter((tool) => tool.category === category);

export const relatedTools = (tool: Tool, limit = 6) =>
  TOOLS.filter(
    (other) =>
      other.slug !== tool.slug &&
      (other.from[0] === tool.from[0] || other.to === tool.to || other.category === tool.category),
  ).slice(0, limit);
