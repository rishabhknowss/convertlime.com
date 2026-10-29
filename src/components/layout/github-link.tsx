"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/brand/github-icon";
import { SITE } from "@/config/site";
import { useLocale } from "@/i18n/locale-provider";

export const GithubLink = () => {
  const { ui } = useLocale();
  return (
    <Button variant="ghost" asChild className="gap-2 px-2.5 text-muted-foreground hover:text-foreground">
      <a href={SITE.github} target="_blank" rel="noopener" aria-label={ui.nav.openSource} title={ui.nav.openSource}>
        <span className="hidden text-sm font-normal md:inline">GitHub</span>
        <GithubIcon className="text-foreground" />
      </a>
    </Button>
  );
};
