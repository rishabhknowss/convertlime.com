import type { Tool } from "@/data/tools";
import type { ToolContent } from "@/lib/content";
import { SITE } from "@/config/site";
import { pageUrl, toolDescription, toolHeading, toolUrl } from "@/lib/seo";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { JsonLd } from "@/components/seo/json-ld";

type ToolJsonLdProps = { tool: Tool; content: ToolContent; locale: Locale };

export const ToolJsonLd = ({ tool, content, locale }: ToolJsonLdProps) => {
  const url = toolUrl(tool, locale);
  const heading = toolHeading(tool, locale);
  const dict = getDictionary(locale);
  return (
    <JsonLd
      graph={[
        {
          "@type": "SoftwareApplication",
          name: heading,
          url,
          inLanguage: LOCALE_META[locale].hreflang,
          applicationCategory: tool.kind === "invoice" ? "BusinessApplication" : "MultimediaApplication",
          operatingSystem: "Any (runs in the browser)",
          description: toolDescription(tool, locale),
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
          "@type": "HowTo",
          name: dict.tool.howToUse(heading),
          inLanguage: LOCALE_META[locale].hreflang,
          step: content.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
        },
        {
          "@type": "FAQPage",
          inLanguage: LOCALE_META[locale].hreflang,
          mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE.name, item: pageUrl(locale, "/") },
            { "@type": "ListItem", position: 2, name: heading, item: url },
          ],
        },
      ]}
    />
  );
};
