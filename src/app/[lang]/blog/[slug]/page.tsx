import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PostBody } from "@/components/blog/post-body";
import { PostFaq } from "@/components/blog/post-faq";
import { PostCard } from "@/components/blog/post-card";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { ToolCta } from "@/components/blog/tool-cta";
import { ToolCard } from "@/components/tool/tool-card";
import { getPost, getPosts } from "@/lib/blog";
import { postGraph, postMetadata } from "@/lib/blog-seo";
import { getTool, type Tool } from "@/data/tools";
import { LOCALES, LOCALE_META, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => getPosts(lang).map((post) => ({ lang, slug: post.slug })));

export const generateMetadata = async ({ params }: PageProps<"/[lang]/blog/[slug]">) => {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const post = getPost(lang, slug);
  return post ? postMetadata(post, lang) : {};
};

const formatDate = (iso: string, hreflang: string) =>
  new Date(iso).toLocaleDateString(hreflang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const PostPage = async ({ params }: PageProps<"/[lang]/blog/[slug]">) => {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const post = getPost(lang, slug);
  if (!post) notFound();
  const tool = getTool(post.tool);
  if (!tool) notFound();
  const { blog, tool: toolText } = getDictionary(lang);
  const related = post.related.map(getTool).filter((item): item is Tool => Boolean(item));
  const morePosts = getPosts(lang).filter((other) => other.slug !== post.slug).slice(0, 4);

  return (
    <AppShell title={post.title} locale={lang}>
      <JsonLd graph={postGraph(post, lang)} />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { name: toolText.breadcrumbHome, href: localePath(lang, "/") },
            { name: blog.title, href: localePath(lang, "/blog") },
            { name: post.title },
          ]}
        />
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {blog.updated} <time dateTime={post.updated}>{formatDate(post.updated, LOCALE_META[lang].hreflang)}</time> ·{" "}
          {post.readingMinutes} {blog.minRead}
        </p>
        <ToolCta tool={tool} locale={lang} />
        <TableOfContents headings={post.headings} title={blog.onThisPage} />
        <PostBody sections={post.sections} tool={tool} locale={lang} />
        <PostFaq faqs={post.faqs} title={blog.faqTitle} />
        <ToolCta tool={tool} locale={lang} />
      </article>
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-4 text-xl font-semibold">{blog.relatedTools}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((item) => (
              <ToolCard key={item.slug} tool={item} locale={lang} />
            ))}
          </div>
        </section>
      )}
      {morePosts.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-4 text-xl font-semibold">{blog.moreGuides}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {morePosts.map((other) => (
              <PostCard key={other.slug} post={other} locale={lang} />
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
};

export default PostPage;
