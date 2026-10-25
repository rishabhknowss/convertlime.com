import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

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
const CTA_MARKER = "<!-- cta -->";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const renderMarkdown = (markdown: string) => {
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
      : `<a href="${href}">${text}</a>`;
  };
  const sections = markdown.split(CTA_MARKER).map((part) => marked.parse(part, { renderer, async: false }));
  return { sections, headings };
};

const readPost = (file: string): BlogPost => {
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf8"));
  const { sections, headings } = renderMarkdown(content);
  const words = content.split(/\s+/).length;
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

export const getPosts = () =>
  fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.published.localeCompare(a.published));

export const getPost = (slug: string) => getPosts().find((post) => post.slug === slug);

export const postsForTool = (toolSlug: string) =>
  getPosts().filter((post) => post.tool === toolSlug || post.related.includes(toolSlug));
