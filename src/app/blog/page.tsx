import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PostCard } from "@/components/blog/post-card";
import { getPosts } from "@/lib/blog";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `Guides – Open, Convert & Compress Image Files | ${SITE.name}` },
  description:
    "Step-by-step guides to open HEIC, AVIF, WebP and JFIF files, convert them to JPG or PNG, and shrink photos for forms – free, with no uploads.",
  alternates: { canonical: `${SITE.url}/blog`, types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
};

const BlogIndex = () => {
  const posts = getPosts();
  return (
    <AppShell title="Guides">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Image file guides</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Clear, step-by-step answers for opening, converting and shrinking image files on Windows, Mac,
          iPhone and Android.
        </p>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default BlogIndex;
