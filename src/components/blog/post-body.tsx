import { Fragment } from "react";
import type { Tool } from "@/data/tools";
import { ToolCta } from "@/components/blog/tool-cta";

export const PostBody = ({ sections, tool }: { sections: string[]; tool: Tool }) => (
  <div className="prose-blog">
    {sections.map((html, index) => (
      <Fragment key={index}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {index < sections.length - 1 && <ToolCta tool={tool} />}
      </Fragment>
    ))}
  </div>
);
