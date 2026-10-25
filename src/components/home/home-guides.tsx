import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const HomeGuides = ({ locale }: { locale: Locale }) => {
  const posts = getPosts(locale).slice(0, 4);
  const text = getDictionary(locale).home;
  if (!posts.length) return null;
  return (
    <section className="mt-14">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <h2 className="text-sm font-medium text-muted-foreground">{text.guides}</h2>
        <Link href={localePath(locale, "/blog")} className="text-sm text-muted-foreground hover:text-foreground">
          {text.allGuides}
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
};
