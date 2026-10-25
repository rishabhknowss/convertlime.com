import Link from "next/link";
import type { Tool } from "@/data/tools";
import { toolHeading } from "@/lib/seo";
import { ToolIcon } from "@/components/tool/tool-icon";
import { cn } from "@/lib/utils";

export const ToolCard = ({ tool, size = "md" }: { tool: Tool; size?: "md" | "lg" }) => (
  <Link
    href={`/${tool.slug}`}
    className={cn(
      "group flex flex-col justify-between gap-6 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-accent",
      size === "lg" ? "min-h-36" : "min-h-28",
    )}
  >
    <span className="flex size-10 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary">
      <ToolIcon tool={tool} className="size-[18px]" />
    </span>
    <span className="font-medium">{toolHeading(tool)}</span>
  </Link>
);
