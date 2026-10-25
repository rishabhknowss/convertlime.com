import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const PostCard = ({ post, locale }: { post: BlogPost; locale: Locale }) => (
  <Link
    href={localePath(locale, `/blog/${post.slug}`)}
    className="group flex flex-col gap-2 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50"
  >
    <span className="text-xs text-muted-foreground">
      {post.readingMinutes} {getDictionary(locale).blog.minRead}
    </span>
    <span className="text-lg font-semibold leading-snug group-hover:text-primary">{post.title}</span>
    <span className="line-clamp-2 text-sm text-muted-foreground">{post.description}</span>
  </Link>
);
