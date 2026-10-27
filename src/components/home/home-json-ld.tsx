import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/config/site";
import { TOOLS } from "@/data/tools";
import { pageUrl, toolHeading, toolUrl } from "@/lib/seo";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const HomeJsonLd = ({ locale }: { locale: Locale }) => {
  const dict = getDictionary(locale);
  const home = pageUrl(locale, "/");
  return (
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
          "@id": `${home}/#website`,
          name: SITE.name,
          url: home,
          inLanguage: LOCALE_META[locale].hreflang,
          description: dict.site.description,
          publisher: { "@id": `${SITE.url}/#organization` },
        },
        {
          "@type": "WebApplication",
          name: SITE.name,
          url: home,
          inLanguage: LOCALE_META[locale].hreflang,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any (runs in the browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
        {
          "@type": "ItemList",
          name: dict.home.toolListName,
          itemListElement: TOOLS.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: toolHeading(tool, locale),
            url: toolUrl(tool, locale),
          })),
        },
      ]}
    />
  );
};
