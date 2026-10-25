import { notFound } from "next/navigation";
import { Lock, Sparkles, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { Converter } from "@/components/tool/converter";
import { ToolArticle } from "@/components/tool/tool-article";
import { ToolJsonLd } from "@/components/tool/tool-json-ld";
import { RelatedTools } from "@/components/tool/related-tools";
import { ToolGuides } from "@/components/tool/tool-guides";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { TOOLS, getTool } from "@/data/tools";
import { toolContent } from "@/lib/content";
import { toolHeading, toolLead, toolMetadata } from "@/lib/seo";

export const dynamicParams = false;

export const generateStaticParams = () => TOOLS.map((tool) => ({ slug: tool.slug }));

export const generateMetadata = async ({ params }: PageProps<"/[slug]">) => {
  const tool = getTool((await params).slug);
  return tool ? toolMetadata(tool) : {};
};

const PROMISES = [
  { icon: Lock, text: "No upload – stays on your device" },
  { icon: Zap, text: "Instant batch conversion" },
  { icon: Sparkles, text: "Free, no sign-up, no watermark" },
];

const ToolPage = async ({ params }: PageProps<"/[slug]">) => {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  const content = toolContent(tool);
  const heading = toolHeading(tool);

  return (
    <AppShell title={heading}>
      <ToolJsonLd tool={tool} content={content} />
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: heading }]} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{heading}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{toolLead(tool)}</p>
        <ul className="mt-5 mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {PROMISES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2">
              <Icon className="size-4 text-primary" />
              {text}
            </li>
          ))}
        </ul>
        <Converter slug={tool.slug} />
      </div>
      <ToolArticle tool={tool} content={content} />
      <ToolGuides slug={tool.slug} />
      <RelatedTools tool={tool} />
    </AppShell>
  );
};

export default ToolPage;
