import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";
import { SITE } from "@/config/site";

export const postUrl = (post: BlogPost) => `${SITE.url}/blog/${post.slug}`;

export const postMetadata = (post: BlogPost): Metadata => ({
  title: { absolute: `${post.title} | ${SITE.name}` },
  description: post.description,
  keywords: [post.keyword],
  alternates: { canonical: postUrl(post) },
  openGraph: {
    title: post.title,
    description: post.description,
    url: postUrl(post),
    siteName: SITE.name,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated,
  },
  twitter: { card: "summary_large_image", title: post.title, description: post.description },
});

export const postGraph = (post: BlogPost) => {
  const url = postUrl(post);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
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
        { "@type": "ListItem", position: 1, name: SITE.name, item: SITE.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.steps.length)
    graph.push({
      "@type": "HowTo",
      name: post.title,
      step: post.steps.map((text, index) => ({ "@type": "HowToStep", position: index + 1, text })),
    });
  if (post.faqs.length)
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  return graph;
};
