"use client";

import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/brand/github-icon";
import { SITE } from "@/config/site";
import { useLocale } from "@/i18n/locale-provider";

export const GithubLink = () => {
  const { ui } = useLocale();
  return (
    <Button variant="ghost" size="icon" asChild>
      <a href={SITE.github} target="_blank" rel="noopener" aria-label={ui.nav.openSource} title={ui.nav.openSource}>
        <GithubIcon />
      </a>
    </Button>
  );
};
