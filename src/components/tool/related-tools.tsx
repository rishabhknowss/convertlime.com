import type { Tool } from "@/data/tools";
import { relatedTools } from "@/data/tools";
import { ToolCard } from "@/components/tool/tool-card";

export const RelatedTools = ({ tool }: { tool: Tool }) => (
  <section className="mx-auto mt-16 max-w-5xl">
    <h2 className="mb-4 text-xl font-semibold">More free converters</h2>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {relatedTools(tool).map((related) => (
        <ToolCard key={related.slug} tool={related} />
      ))}
    </div>
  </section>
);
