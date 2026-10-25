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

export const dynamicParams = false;

export const generateStaticParams = () => getPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: PageProps<"/blog/[slug]">) => {
  const post = getPost((await params).slug);
  return post ? postMetadata(post) : {};
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

const PostPage = async ({ params }: PageProps<"/blog/[slug]">) => {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const tool = getTool(post.tool);
  if (!tool) notFound();
  const related = post.related.map(getTool).filter((item): item is Tool => Boolean(item));
  const morePosts = getPosts().filter((other) => other.slug !== post.slug).slice(0, 4);

  return (
    <AppShell title={post.title}>
      <JsonLd graph={postGraph(post)} />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/blog" }, { name: post.title }]} />
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time> · {post.readingMinutes} min read
        </p>
        <ToolCta tool={tool} />
        <TableOfContents headings={post.headings} />
        <PostBody sections={post.sections} tool={tool} />
        <PostFaq faqs={post.faqs} />
        <ToolCta tool={tool} />
      </article>
      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-5xl">
          <h2 className="mb-4 text-xl font-semibold">Related free tools</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {related.map((item) => (
              <ToolCard key={item.slug} tool={item} />
            ))}
          </div>
        </section>
      )}
      <section className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-xl font-semibold">More guides</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {morePosts.map((other) => (
            <PostCard key={other.slug} post={other} />
          ))}
        </div>
      </section>
    </AppShell>
  );
};

export default PostPage;
