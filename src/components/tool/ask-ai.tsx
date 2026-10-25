"use client";

import { usePathname } from "next/navigation";
import { SITE } from "@/config/site";
import { AI_LOGOS } from "@/data/ai-logos";
import { fill } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

const providers = (text: string) => {
  const q = encodeURIComponent(text);
  return [
    { name: "ChatGPT", logo: AI_LOGOS.chatgpt, href: `https://chatgpt.com/?q=${q}` },
    { name: "Claude", logo: AI_LOGOS.claude, href: `https://claude.ai/new?q=${q}` },
    { name: "Perplexity", logo: AI_LOGOS.perplexity, href: `https://www.perplexity.ai/search?q=${q}` },
    { name: "Gemini", logo: AI_LOGOS.gemini, href: `https://www.google.com/search?udm=50&q=${q}` },
  ];
};

export const AskAi = () => {
  const pathname = usePathname();
  const { ui } = useLocale();
  return (
    <div className="px-3">
      <p className="mb-2 text-xs text-muted-foreground">{ui.askAi.label}</p>
      <div className="grid grid-cols-2 gap-1.5">
        {providers(fill(ui.askAi.prompt, { url: `${SITE.url}${pathname}` })).map((provider) => (
          <a
            key={provider.name}
            href={provider.href}
            target="_blank"
            rel="noopener nofollow"
            className="flex items-center justify-center gap-1.5 rounded-md border px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <span className="flex shrink-0 text-foreground" dangerouslySetInnerHTML={{ __html: provider.logo }} />
            {provider.name}
          </a>
        ))}
      </div>
    </div>
  );
};
