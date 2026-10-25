import { relatedTools, type Tool } from "@/data/tools";
import { ToolCard } from "@/components/tool/tool-card";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const RelatedTools = ({ tool, locale }: { tool: Tool; locale: Locale }) => (
  <section className="mx-auto mt-16 max-w-5xl">
    <h2 className="mb-4 text-xl font-semibold">{getDictionary(locale).tool.moreConverters}</h2>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {relatedTools(tool).map((related) => (
        <ToolCard key={related.slug} tool={related} locale={locale} />
      ))}
    </div>
  </section>
);
