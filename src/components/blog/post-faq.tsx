import type { BlogFaq } from "@/lib/blog";

export const PostFaq = ({ faqs, title }: { faqs: BlogFaq[]; title: string }) =>
  faqs.length ? (
    <section className="mt-14">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => (
          <details key={faq.question} className="rounded-xl border bg-card px-4 py-3">
            <summary className="cursor-pointer list-none font-medium">{faq.question}</summary>
            <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  ) : null;
