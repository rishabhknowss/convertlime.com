import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { localePath, type Locale } from "@/i18n/config";

export type BlogFaq = { question: string; answer: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  published: string;
  updated: string;
  tool: string;
  related: string[];
  steps: string[];
  faqs: BlogFaq[];
  sections: string[];
  headings: { id: string; text: string }[];
  readingMinutes: number;
};

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const localeDir = (locale: Locale) => path.join(BLOG_DIR, locale);
const CTA_MARKER = "<!-- cta -->";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");

const renderMarkdown = (markdown: string, locale: Locale) => {
  const headings: BlogPost["headings"] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = renderer.parser.parseInline(tokens);
    const id = slugify(text);
    if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, "") });
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };
  renderer.link = ({ href, tokens }) => {
    const text = renderer.parser.parseInline(tokens);
    const external = /^https?:\/\//.test(href);
    return external
      ? `<a href="${href}" target="_blank" rel="noopener">${text}</a>`
      : `<a href="${href.startsWith("/") ? localePath(locale, href) : href}">${text}</a>`;
  };
  const sections = markdown.split(CTA_MARKER).map((part) => marked.parse(part, { renderer, async: false }));
  return { sections, headings };
};

const readPost = (locale: Locale, file: string): BlogPost => {
  const { data, content } = matter(fs.readFileSync(path.join(localeDir(locale), file), "utf8"));
  const { sections, headings } = renderMarkdown(content, locale);
  const cjk = (content.match(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g) ?? []).length;
  const words = content.split(/\s+/).length + Math.round(cjk / 2);
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    keyword: data.keyword,
    published: data.published,
    updated: data.updated ?? data.published,
    tool: data.tool,
    related: data.related ?? [],
    steps: data.steps ?? [],
    faqs: data.faqs ?? [],
    sections,
    headings,
    readingMinutes: Math.max(2, Math.round(words / 220)),
  };
};

export const getPosts = (locale: Locale) => {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => readPost(locale, file))
    .sort((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug));
};

export const getPost = (locale: Locale, slug: string) => getPosts(locale).find((post) => post.slug === slug);

export const postLocales = (slug: string, locales: readonly Locale[]) =>
  locales.filter((locale) => fs.existsSync(path.join(localeDir(locale), `${slug}.md`)));

export const postsForTool = (locale: Locale, toolSlug: string) =>
  getPosts(locale).filter((post) => post.tool === toolSlug || post.related.includes(toolSlug));
