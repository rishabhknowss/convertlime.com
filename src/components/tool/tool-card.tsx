import Link from "next/link";
import type { Tool } from "@/data/tools";
import { toolHeading } from "@/lib/seo";
import { ToolIcon } from "@/components/tool/tool-icon";
import { cn } from "@/lib/utils";
import { localePath, type Locale } from "@/i18n/config";

type ToolCardProps = { tool: Tool; locale: Locale; size?: "md" | "lg" };

export const ToolCard = ({ tool, locale, size = "md" }: ToolCardProps) => (
  <Link
    href={localePath(locale, `/${tool.slug}`)}
    className={cn(
      "group flex flex-col justify-between gap-6 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent",
      size === "lg" ? "min-h-36" : "min-h-28",
    )}
  >
    <span className="flex size-10 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
      <ToolIcon category={tool.category} slug={tool.slug} className="size-[18px]" />
    </span>
    <span className="font-medium">{toolHeading(tool, locale)}</span>
  </Link>
);
