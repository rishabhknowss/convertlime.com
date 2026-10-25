import type { FormatId } from "@/data/formats";

export type ToolKind = "convert" | "compress" | "resize-kb" | "to-pdf";

export type CategoryId = "iphone" | "web" | "everyday" | "compress" | "pdf";

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
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
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

export const TOOLS: Tool[] = [
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

export const toolsByCategory = (category: CategoryId) =>
  TOOLS.filter((tool) => tool.category === category);

export const relatedTools = (tool: Tool, limit = 6) =>
  TOOLS.filter(
    (other) =>
      other.slug !== tool.slug &&
      (other.from[0] === tool.from[0] || other.to === tool.to || other.category === tool.category),
  ).slice(0, limit);
