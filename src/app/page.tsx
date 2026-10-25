import type { Metadata } from "next";
import { Lock, WifiOff, Zap } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { SearchTrigger } from "@/components/search/search-trigger";
import { ToolCard } from "@/components/tool/tool-card";
import { CATEGORIES, TOOLS, toolsByCategory } from "@/data/tools";
import { SITE } from "@/config/site";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomeGuides } from "@/components/home/home-guides";
import { HomeFaq } from "@/components/home/home-faq";

export const metadata: Metadata = {
  title: { absolute: "Free File Converter – HEIC, AVIF, WebP to JPG & PNG, No Upload | ConvertLime" },
  description: SITE.description,
  alternates: { canonical: SITE.url, types: { "application/rss+xml": `${SITE.url}/feed.xml` } },
};

const PROMISES = [
  { icon: Lock, title: "Private", text: "Files never leave your device" },
  { icon: Zap, title: "Instant", text: "Batch convert in one click" },
  { icon: WifiOff, title: "Works offline", text: "No upload, no waiting" },
];

const Home = () => (
  <AppShell title="All tools">
    <HomeJsonLd />
    <div className="mx-auto max-w-5xl">
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
        Free File Converter <span className="text-primary">Without Uploading</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
        Convert HEIC, AVIF, WebP, JFIF, PNG and JPG files instantly in your browser.{" "}
        <span className="font-medium text-foreground">100% free, no sign-up, no watermark</span> – your
        files never leave your device.
      </p>
      <SearchTrigger size="lg" className="mt-8 max-w-2xl" />
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted-foreground">
        {PROMISES.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex items-center gap-2">
            <Icon className="size-4 text-primary" />
            <span className="font-medium text-foreground">{title}</span> {text}
          </li>
        ))}
      </ul>

      <h2 className="mt-14 mb-4 text-sm font-medium text-muted-foreground">Start with</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {TOOLS.filter((tool) => tool.featured).map((tool) => (
          <ToolCard key={tool.slug} tool={tool} size="lg" />
        ))}
      </div>

      {CATEGORIES.map((category) => (
        <section key={category.id} className="mt-14">
          <h2 className="mb-4 border-b pb-3 text-sm font-medium text-muted-foreground">{category.label}</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {toolsByCategory(category.id).map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      ))}
      <HomeGuides />
      <HomeFaq />
    </div>
  </AppShell>
);

export default Home;
