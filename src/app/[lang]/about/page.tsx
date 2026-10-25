import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE } from "@/config/site";
import { getTool } from "@/data/tools";
import { isLocale, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates, toolHeading } from "@/lib/seo";

export const generateMetadata = async ({ params }: PageProps<"/[lang]/about">): Promise<Metadata> => {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { about, ui } = getDictionary(lang);
  return { title: ui.nav.about, description: about.metaDescription, alternates: localizedAlternates(lang, "/about") };
};

const About = async ({ params }: PageProps<"/[lang]/about">) => {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { about, ui, tool } = getDictionary(lang);
  return (
    <AppShell title={ui.nav.about} locale={lang}>
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ name: tool.breadcrumbHome, href: localePath(lang, "/") }, { name: ui.nav.about }]} />
        <h1 className="text-4xl font-bold tracking-tight">{about.h1}</h1>
        <div className="prose-blog mt-6">
          <p>{about.intro}</p>
          <h2>{about.whyHeading}</h2>
          <p>{about.whyBody}</p>
          <h2>{about.costHeading}</h2>
          <p>
            {about.costBody} <Link href={localePath(lang, "/")}>{about.installLink}</Link> {about.costEnd}
          </p>
          <h2>{about.contactHeading}</h2>
          <p>
            {about.contactBody} <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            {["ja", "zh"].includes(lang) ? "。" : "."}
          </p>
          <h2>{about.startHeading}</h2>
          <ul>
            {about.start.map((item) => {
              const target = getTool(item.slug);
              return target ? (
                <li key={item.slug}>
                  <Link href={localePath(lang, `/${item.slug}`)}>{toolHeading(target, lang)}</Link> – {item.text}
                </li>
              ) : null;
            })}
            <li>
              <Link href={localePath(lang, "/blog")}>{ui.nav.guides}</Link>
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
};

export default About;
