import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "src/content/blog");
const toolsSource = fs.readFileSync(path.join(process.cwd(), "src/data/tools.ts"), "utf8");
const slugs = new Set();
for (const m of toolsSource.matchAll(/convert\("(\w+)", "(\w+)"/g)) slugs.add(`${m[1]}-to-${m[2]}`);
for (const m of toolsSource.matchAll(/toPdf\("(\w+)"/g)) slugs.add(`${m[1]}-to-pdf`);
for (const m of toolsSource.matchAll(/resizeKb\((\d+)\)/g)) slugs.add(`resize-image-to-${m[1]}kb`);
["compress-image", "image-to-pdf", ""].forEach((s) => slugs.add(s));
const posts = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
const postSlugs = new Set(posts.map((f) => f.replace(/\.md$/, "")));
const only = process.argv.slice(2);
let failed = 0;
for (const file of posts) {
  if (only.length && !only.some((o) => file.includes(o))) continue;
  const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
  const errors = [];
  for (const key of ["title", "description", "keyword", "published", "tool"]) if (!data[key]) errors.push(`missing ${key}`);
  if (data.title && data.title.length > 70) errors.push(`title ${data.title.length} chars (max 70)`);
  if (data.description && (data.description.length > 160 || data.description.length < 110)) errors.push(`description ${data.description.length} chars (110-160)`);
  if (data.tool && !slugs.has(data.tool)) errors.push(`unknown tool ${data.tool}`);
  for (const r of data.related ?? []) if (!slugs.has(r)) errors.push(`unknown related ${r}`);
  if ((data.faqs ?? []).length < 4) errors.push("need 4+ faqs");
  if ((data.steps ?? []).length < 3) errors.push("need 3+ steps");
  const ctas = content.split("<!-- cta -->").length - 1;
  if (ctas < 1 || ctas > 2) errors.push(`cta markers ${ctas} (1-2)`);
  const words = content.split(/\s+/).length;
  if (words < 700) errors.push(`only ${words} words (700+)`);
  const kw = (data.keyword ?? "").toLowerCase();
  const firstPara = content.trim().split(/\n\s*\n/)[0].toLowerCase();
  const h2s = [...content.matchAll(/^## (.+)$/gm)].map((m) => m[1].toLowerCase());
  const words2 = kw.split(" ").filter((w) => w.length > 2);
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
