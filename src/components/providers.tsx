"use client";

import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SearchProvider } from "@/components/search/search-provider";
import { InstallProvider } from "@/components/pwa/install-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <TooltipProvider>
      <InstallProvider>
        <SearchProvider>{children}</SearchProvider>
      </InstallProvider>
    </TooltipProvider>
  </ThemeProvider>
);
