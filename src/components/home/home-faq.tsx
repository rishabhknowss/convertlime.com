import { JsonLd } from "@/components/seo/json-ld";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const HomeFaq = ({ locale }: { locale: Locale }) => {
  const { home } = getDictionary(locale);
  return (
    <section className="mt-14">
      <JsonLd
        graph={[
          {
            "@type": "FAQPage",
            inLanguage: LOCALE_META[locale].hreflang,
            mainEntity: home.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
      <h2 className="mb-4 border-b pb-3 text-sm font-medium text-muted-foreground">{home.questions}</h2>
      <div className="flex flex-col gap-2">
        {home.faqs.map((faq) => (
          <details key={faq.question} className="rounded-xl border bg-card px-4 py-3">
            <summary className="cursor-pointer list-none font-medium">{faq.question}</summary>
            <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
