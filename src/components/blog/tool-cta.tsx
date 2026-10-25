import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import type { Tool } from "@/data/tools";
import { toolHeading, toolLead } from "@/lib/seo";
import { ToolIcon } from "@/components/tool/tool-icon";

export const ToolCta = ({ tool }: { tool: Tool }) => (
  <Link
    href={`/${tool.slug}`}
    className="not-prose group my-10 flex flex-col gap-4 rounded-2xl border border-primary/30 bg-accent p-6 transition-colors hover:border-primary sm:flex-row sm:items-center"
  >
    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
      <ToolIcon tool={tool} className="size-5" />
    </span>
    <span className="flex-1">
      <span className="block text-lg font-semibold text-foreground">Use the free {toolHeading(tool)}</span>
      <span className="mt-1 block text-sm text-muted-foreground">{toolLead(tool)}</span>
      <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="size-3.5 text-primary" />
        No sign-up, no upload – runs in your browser
      </span>
    </span>
    <span className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground sm:self-center">
      Convert now
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
    </span>
  </Link>
);
