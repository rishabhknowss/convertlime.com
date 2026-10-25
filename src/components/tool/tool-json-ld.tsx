import type { Tool } from "@/data/tools";
import type { ToolContent } from "@/lib/content";
import { SITE } from "@/config/site";
import { toolDescription, toolHeading } from "@/lib/seo";

export const ToolJsonLd = ({ tool, content }: { tool: Tool; content: ToolContent }) => {
  const url = `${SITE.url}/${tool.slug}`;
  const graph = [
    {
      "@type": "SoftwareApplication",
      name: toolHeading(tool),
      url,
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any (runs in the browser)",
      description: toolDescription(tool),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@type": "HowTo",
      name: `How to use the ${toolHeading(tool)}`,
      step: content.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
    },
    {
      "@type": "FAQPage",
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.name, item: SITE.url },
        { "@type": "ListItem", position: 2, name: toolHeading(tool), item: url },
      ],
    },
  ];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
};
