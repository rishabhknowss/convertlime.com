import type { Tool } from "@/data/tools";
import { FORMATS } from "@/data/formats";
import type { ToolContent } from "@/lib/content";
import { toolHeading } from "@/lib/seo";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type ToolArticleProps = { tool: Tool; content: ToolContent; locale: Locale };

export const ToolArticle = ({ tool, content, locale }: ToolArticleProps) => {
  const heading = toolHeading(tool, locale);
  const text = getDictionary(locale).tool;
  return (
    <article className="mx-auto mt-16 flex max-w-3xl flex-col gap-12 text-[15px] leading-7 text-muted-foreground">
      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">{text.howToUse(heading)}</h2>
        <ol className="flex flex-col gap-3">
          {content.steps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>
      {content.compare && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            {text.versus(FORMATS[tool.from[0]].label, FORMATS[tool.to].label)}
          </h2>
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="bg-card text-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium" />
                  <th className="px-4 py-3 font-medium">{FORMATS[tool.from[0]].label}</th>
                  <th className="px-4 py-3 font-medium">{FORMATS[tool.to].label}</th>
                </tr>
              </thead>
              <tbody>
                {content.compare.map((row) => (
                  <tr key={row.label} className="border-t">
                    <td className="px-4 py-3 text-foreground">{row.label}</td>
                    <td className="px-4 py-3">{row.from}</td>
                    <td className="px-4 py-3">{row.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {content.sections.map((section) => (
        <section key={section.heading}>
          <h2 className="mb-3 text-xl font-semibold text-foreground">{section.heading}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mb-3">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-foreground">{text.faqHeading(heading)}</h2>
        <div className="flex flex-col gap-2">
          {content.faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border bg-card px-4 py-3">
              <summary className="cursor-pointer list-none font-medium text-foreground">{faq.question}</summary>
              <p className="mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
};
