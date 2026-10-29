import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const args = process.argv.slice(2);
const localeFlag = args.indexOf("--locale");
const locale = localeFlag >= 0 ? args[localeFlag + 1] : "en";
const only = args.filter((arg, index) => index !== localeFlag && index !== localeFlag + 1);
const cjk = ["ja", "zh", "ko"].includes(locale);
const dir = path.join(process.cwd(), "src/content/blog", locale);
const enDir = path.join(process.cwd(), "src/content/blog/en");
const toolsSource = fs.readFileSync(path.join(process.cwd(), "src/data/tools.ts"), "utf8");
const slugs = new Set();
for (const m of toolsSource.matchAll(/convert\("(\w+)", "(\w+)"/g)) slugs.add(`${m[1]}-to-${m[2]}`);
for (const m of toolsSource.matchAll(/toPdf\("(\w+)"/g)) slugs.add(`${m[1]}-to-pdf`);
for (const m of toolsSource.matchAll(/resizeKb\((\d+)\)/g)) slugs.add(`resize-image-to-${m[1]}kb`);
["compress-image", "image-to-pdf", "remove-background", "invoice-generator", ""].forEach((s) => slugs.add(s));
const posts = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
const postSlugs = new Set(posts.map((f) => f.replace(/\.md$/, "")));
let failed = 0;
for (const file of posts) {
  if (only.length && !only.some((o) => file.includes(o))) continue;
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const errors = [];
  for (const key of ["title", "description", "keyword", "published", "tool"]) if (!data[key]) errors.push(`missing ${key}`);
  const maxTitle = cjk ? 45 : 70;
  const [minDesc, maxDesc] = cjk ? [50, 120] : [100, 165];
  if (data.title && data.title.length > maxTitle) errors.push(`title ${data.title.length} chars (max ${maxTitle})`);
  if (data.description && (data.description.length > maxDesc || data.description.length < minDesc)) errors.push(`description ${data.description.length} chars (${minDesc}-${maxDesc})`);
  if (data.tool && !slugs.has(data.tool)) errors.push(`unknown tool ${data.tool}`);
  for (const r of data.related ?? []) if (!slugs.has(r)) errors.push(`unknown related ${r}`);
  if ((data.faqs ?? []).length < 4) errors.push("need 4+ faqs");
  if ((data.steps ?? []).length < 3) errors.push("need 3+ steps");
  const ctas = content.split("<!-- cta -->").length - 1;
  if (ctas < 1 || ctas > 2) errors.push(`cta markers ${ctas} (1-2)`);
  const cjkChars = (content.match(/[\u3040-\u30ff\u3400-\u9fff\uac00-\ud7af]/g) ?? []).length;
  const words = content.split(/\s+/).length + Math.round(cjkChars / 2);
  if (words < 700) errors.push(`only ${words} words (700+)`);
  if (locale !== "en" && !fs.existsSync(path.join(enDir, file))) errors.push("no English original with the same slug");
  const kw = (data.keyword ?? "").toLowerCase();
  const firstPara = content.trim().split(/\n\s*\n/)[0].toLowerCase();
  const h2s = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1].toLowerCase());
  const words2 = kw.split(/\s+/).filter((w) => w.length > (cjk ? 1 : 2));
  const hasAll = (t) => words2.every((w) => t.includes(w));
  if (!hasAll((data.title ?? "").toLowerCase())) errors.push("keyword words not all in title");
  if (!hasAll(firstPara)) errors.push("keyword words not all in first paragraph");
  if (!h2s.some(hasAll) && !h2s.some((h) => words2.filter((w) => h.includes(w)).length >= Math.min(2, words2.length))) errors.push("keyword not reflected in any H2");
  for (const m of content.matchAll(/\]\((\/[^)\s#]*)/g)) {
    const link = m[1].replace(/^\//, "");
    const ok = slugs.has(link) || link === "blog" || (link.startsWith("blog/") && postSlugs.has(link.slice(5))) || link === "privacy";
    if (!ok) errors.push(`broken internal link /${link}`);
  }
  const internal = [...content.matchAll(/\]\(\//g)].length;
  if (internal < 3) errors.push(`only ${internal} internal links (3+)`);
  if (/unleash|elevate|seamless|game.?changer|in today's|dive into|look no further/i.test(content)) errors.push("contains banned slop words");
  console.log(`${errors.length ? "FAIL" : "PASS"} ${file} (${words} words)${errors.length ? "\n   - " + errors.join("\n   - ") : ""}`);
  if (errors.length) failed++;
}
process.exit(failed ? 1 : 0);
