import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export const PostCard = ({ post }: { post: BlogPost }) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group flex flex-col gap-2 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50"
  >
    <span className="text-xs text-muted-foreground">{post.readingMinutes} min read</span>
    <span className="text-lg font-semibold leading-snug group-hover:text-primary">{post.title}</span>
    <span className="line-clamp-2 text-sm text-muted-foreground">{post.description}</span>
  </Link>
);
