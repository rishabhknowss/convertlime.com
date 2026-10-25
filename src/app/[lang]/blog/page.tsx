import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/blog";
import { SITE } from "@/config/site";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[lang]/blog">): Promise<Metadata> => {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { blog } = getDictionary(lang);
  return {
    title: { absolute: `${blog.metaTitle} | ${SITE.name}` },
    description: blog.description,
    alternates: { ...localizedAlternates(lang, "/blog"), types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
  };
};

const BlogIndex = async ({ params }: PageProps<"/[lang]/blog">) => {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { blog, tool } = getDictionary(lang);
  const posts = getPosts(lang);
  return (
    <AppShell title={blog.title} locale={lang}>
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={[{ name: tool.breadcrumbHome, href: localePath(lang, "/") }, { name: blog.title }]} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{blog.h1}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{blog.intro}</p>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={lang} />
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default BlogIndex;
