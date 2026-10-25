"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchProvider } from "@/components/search/search-provider";
import { InstallProvider } from "@/components/pwa/install-provider";
import { LocaleProvider } from "@/i18n/locale-provider";
import type { localeContext } from "@/i18n/locale-context";

type ProvidersProps = { locale: ReturnType<typeof localeContext>; children: React.ReactNode };

export const Providers = ({ locale, children }: ProvidersProps) => (
  <LocaleProvider value={locale}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <TooltipProvider>
        <InstallProvider>
          <SearchProvider>{children}</SearchProvider>
        </InstallProvider>
      </TooltipProvider>
    </ThemeProvider>
  </LocaleProvider>
);
