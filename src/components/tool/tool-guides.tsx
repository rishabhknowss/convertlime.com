import { postsForTool } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const ToolGuides = ({ slug, locale }: { slug: string; locale: Locale }) => {
  const posts = postsForTool(locale, slug).slice(0, 4);
  if (!posts.length) return null;
  return (
    <section className="mx-auto mt-16 max-w-5xl">
      <h2 className="mb-4 text-xl font-semibold">{getDictionary(locale).tool.helpfulGuides}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
};
