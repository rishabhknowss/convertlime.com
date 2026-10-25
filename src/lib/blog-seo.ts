import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";
import { postLocales } from "@/lib/blog";
import { SITE } from "@/config/site";
import { LOCALES, LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageUrl } from "@/lib/seo";

export const postUrl = (locale: Locale, slug: string) => pageUrl(locale, `/blog/${slug}`);

const postAlternates = (locale: Locale, slug: string) => {
  const available = postLocales(slug, LOCALES);
  const languages: Record<string, string> = Object.fromEntries(
    available.map((item) => [LOCALE_META[item].hreflang, postUrl(item, slug)]),
  );
  if (available.includes("en")) languages["x-default"] = postUrl("en", slug);
  return { canonical: postUrl(locale, slug), languages };
};

export const postMetadata = (post: BlogPost, locale: Locale): Metadata => ({
  title: { absolute: `${post.title} | ${SITE.name}` },
  description: post.description,
  keywords: [post.keyword],
  alternates: postAlternates(locale, post.slug),
  openGraph: {
    title: post.title,
    description: post.description,
    url: postUrl(locale, post.slug),
    siteName: SITE.name,
    type: "article",
    locale: LOCALE_META[locale].ogLocale,
    publishedTime: post.published,
    modifiedTime: post.updated,
  },
  twitter: { card: "summary_large_image", title: post.title, description: post.description },
});

export const postGraph = (post: BlogPost, locale: Locale) => {
  const url = postUrl(locale, post.slug);
  const language = LOCALE_META[locale].hreflang;
  const { blog } = getDictionary(locale);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      inLanguage: language,
      url,
      mainEntityOfPage: url,
      datePublished: post.published,
      dateModified: post.updated,
      image: `${url}/opengraph-image`,
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: { "@type": "ImageObject", url: `${SITE.url}/brand/icon-512.png` },
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE.name, item: pageUrl(locale, "/") },
        { "@type": "ListItem", position: 2, name: blog.title, item: pageUrl(locale, "/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.steps.length)
    graph.push({
      "@type": "HowTo",
      name: post.title,
      inLanguage: language,
      step: post.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
    });
  if (post.faqs.length)
    graph.push({
      "@type": "FAQPage",
      inLanguage: language,
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  return graph;
};
