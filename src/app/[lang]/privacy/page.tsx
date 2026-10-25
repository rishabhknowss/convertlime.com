import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { SITE } from "@/config/site";
import { fill, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> => {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { privacy } = getDictionary(lang);
  return { title: privacy.h1, description: privacy.metaDescription, alternates: localizedAlternates(lang, "/privacy") };
};

const Privacy = async ({ params }: PageProps<"/[lang]/privacy">) => {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { privacy } = getDictionary(lang);
  return (
    <AppShell title={privacy.h1} locale={lang}>
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight">{privacy.h1}</h1>
        <div className="mt-8 flex flex-col gap-8 leading-7 text-muted-foreground">
          {privacy.points.map((point) => (
            <section key={point.heading}>
              <h2 className="mb-2 text-xl font-semibold text-foreground">{point.heading}</h2>
              <p>{fill(point.body, { email: SITE.email })}</p>
            </section>
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default Privacy;
