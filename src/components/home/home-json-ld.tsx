import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/config/site";
import { TOOLS } from "@/data/tools";
import { toolHeading } from "@/lib/seo";

export const HomeJsonLd = () => (
  <JsonLd
    graph={[
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#organization`,
        name: SITE.name,
        url: SITE.url,
        logo: `${SITE.url}/brand/icon-512.png`,
        email: SITE.email,
        contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: SITE.email },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        publisher: { "@id": `${SITE.url}/#organization` },
      },
      {
        "@type": "WebApplication",
        name: SITE.name,
        url: SITE.url,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Any (runs in the browser)",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "ItemList",
        name: "Free file converters",
        itemListElement: TOOLS.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: toolHeading(tool),
          url: `${SITE.url}/${tool.slug}`,
        })),
      },
    ]}
  />
);
