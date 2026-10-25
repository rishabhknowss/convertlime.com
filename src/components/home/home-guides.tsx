import Link from "next/link";
import { getPosts } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export const HomeGuides = () => {
  const posts = getPosts().slice(0, 4);
  if (!posts.length) return null;
  return (
    <section className="mt-14">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <h2 className="text-sm font-medium text-muted-foreground">Guides</h2>
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
          All guides →
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
