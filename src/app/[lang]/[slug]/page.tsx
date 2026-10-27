import { notFound } from "next/navigation";
import { Lock, Sparkles, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Converter } from "@/components/tool/converter";
import { ToolArticle } from "@/components/tool/tool-article";
import { ToolJsonLd } from "@/components/tool/tool-json-ld";
import { RelatedTools } from "@/components/tool/related-tools";
import { ToolGuides } from "@/components/tool/tool-guides";
import { TOOLS, findTool, toolSlug } from "@/data/tools";
import { toolContent } from "@/lib/content";
import { toolHeading, toolLead, toolMetadata, toolPromises } from "@/lib/seo";
import { LOCALES, isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => TOOLS.map((tool) => ({ lang, slug: toolSlug(tool, lang) })));

export const generateMetadata = async ({ params }: PageProps<"/[lang]/[slug]">) => {
  const { lang, slug } = await params;
  const tool = isLocale(lang) ? findTool(slug, lang) : undefined;
  return tool && isLocale(lang) ? toolMetadata(tool, lang) : {};
};

const ICONS = [Lock, Zap, Sparkles];

const ToolPage = async ({ params }: PageProps<"/[lang]/[slug]">) => {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const tool = findTool(slug, lang);
  if (!tool) notFound();
  const content = toolContent(tool, lang);
  const heading = toolHeading(tool, lang);
  const { tool: text } = getDictionary(lang);

  return (
    <AppShell title={heading} locale={lang}>
      <ToolJsonLd tool={tool} content={content} locale={lang} />
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: text.breadcrumbHome, href: localePath(lang, "/") }, { name: heading }]} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{heading}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{toolLead(tool, lang)}</p>
        <ul className="mt-5 mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {toolPromises(tool, lang).map((promise, index) => {
            const Icon = ICONS[index];
            return (
              <li key={promise} className="flex items-center gap-2">
                <Icon className="size-4 text-primary" />
                {promise}
              </li>
            );
          })}
        </ul>
        <Converter slug={tool.slug} />
      </div>
      <ToolArticle tool={tool} content={content} locale={lang} />
      <ToolGuides slug={tool.slug} locale={lang} />
      <RelatedTools tool={tool} locale={lang} />
    </AppShell>
  );
};

export default ToolPage;
