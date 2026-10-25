import { postsForTool } from "@/lib/blog";
import { PostCard } from "@/components/blog/post-card";

export const ToolGuides = ({ slug }: { slug: string }) => {
  const posts = postsForTool(slug).slice(0, 4);
  if (!posts.length) return null;
  return (
    <section className="mx-auto mt-16 max-w-5xl">
      <h2 className="mb-4 text-xl font-semibold">Helpful guides</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
