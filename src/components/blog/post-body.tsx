import { Fragment } from "react";
import type { Tool } from "@/data/tools";
import { ToolCta } from "@/components/blog/tool-cta";
import type { Locale } from "@/i18n/config";

type PostBodyProps = { sections: string[]; tool: Tool; locale: Locale };

export const PostBody = ({ sections, tool, locale }: PostBodyProps) => (
  <div className="prose-blog">
    {sections.map((html, index) => (
      <Fragment key={index}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {index < sections.length - 1 && <ToolCta tool={tool} locale={locale} />}
      </Fragment>
    ))}
  </div>
);
