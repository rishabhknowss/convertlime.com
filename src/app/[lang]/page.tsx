import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock, WifiOff, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SearchTrigger } from "@/components/search/search-trigger";
import { ToolCard } from "@/components/tool/tool-card";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomeGuides } from "@/components/home/home-guides";
import { HomeFaq } from "@/components/home/home-faq";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/data/tools";
import { SITE } from "@/config/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates } from "@/lib/seo";

const ICONS = [Lock, Zap, WifiOff];

export const generateMetadata = async ({ params }: PageProps<"/[lang]">): Promise<Metadata> => {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return {
    title: { absolute: `${dict.site.homeTitle} | ${SITE.name}` },
    description: dict.site.description,
    alternates: { ...localizedAlternates(lang, "/"), types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
  };
};

const Home = async ({ params }: PageProps<"/[lang]">) => {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { home, categories, ui } = getDictionary(lang);
  return (
    <AppShell title={ui.nav.allTools} locale={lang}>
      <HomeJsonLd locale={lang} />
      <div className="mx-auto max-w-5xl">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          {home.h1} <span className="text-primary">{home.h1Accent}</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          {home.intro} <span className="font-medium text-foreground">{home.introStrong}</span> {home.introEnd}
        </p>
        <SearchTrigger size="lg" className="mt-8 max-w-2xl" />
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
          {home.promises.map(({ title, text }, index) => {
            const Icon = ICONS[index] ?? Lock;
            return (
              <li key={title} className="flex items-center gap-2">
                <Icon className="size-4 text-primary" />
                <span className="font-medium text-foreground">{title}</span> {text}
              </li>
            );
          })}
        </ul>

        <h2 className="mt-14 mb-4 text-sm font-medium text-muted-foreground">{home.startWith}</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {TOOLS.filter((tool) => tool.featured).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={lang} size="lg" />
          ))}
        </div>

        {CATEGORIES.map((category) => (
          <section key={category.id} className="mt-14">
            <h2 className="mb-4 border-b pb-3 text-sm font-medium text-muted-foreground">{categories[category.id]}</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {toolsByCategory(category.id).map((tool) => (
                <ToolCard key={tool.slug} tool={tool} locale={lang} />
              ))}
            </div>
          </section>
        ))}
        <HomeGuides locale={lang} />
        <HomeFaq locale={lang} />
      </div>
    </AppShell>
  );
};

export default Home;
