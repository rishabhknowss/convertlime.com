import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/config/site";

const FAQS = [
  {
    question: `Is ${SITE.name} really free?`,
    answer: "Yes. Every converter is free with no sign-up, no daily limit and no watermark on your files.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. Conversion runs inside your web browser on your own phone or computer. Your photos never leave your device, which also makes it fast and lets it work offline.",
  },
  {
    question: "Which file types can I convert?",
    answer:
      "iPhone HEIC and HEIF photos, AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO and SVG. You can also compress images, resize them to an exact size in KB and turn images into a PDF.",
  },
  {
    question: "Does it work on iPhone and Android?",
    answer:
      "Yes. Open the site in Safari or Chrome, tap the drop area to pick photos and download the converted files. You can also add it to your home screen like an app.",
  },
];

export const HomeFaq = () => (
  <section className="mt-14">
    <JsonLd
      graph={[
        {
          "@type": "FAQPage",
          mainEntity: FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        },
      ]}
    />
    <h2 className="mb-4 border-b pb-3 text-sm font-medium text-muted-foreground">Questions</h2>
    <div className="flex flex-col gap-2">
      {FAQS.map((faq) => (
        <details key={faq.question} className="rounded-xl border bg-card px-4 py-3">
          <summary className="cursor-pointer list-none font-medium">{faq.question}</summary>
          <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  </section>
);
