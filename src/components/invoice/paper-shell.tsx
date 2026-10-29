"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLook } from "@/components/invoice/invoice-look";
import { cn } from "@/lib/utils";
import { visibleAccent } from "@/lib/invoice/templates";

export const PaperShell = ({ accent, children, className }: { accent: string; children: ReactNode; className?: string }) => {
  const { template } = useLook();
  const { theme } = template;
  const style = {
    "--inv-accent": visibleAccent(accent, theme),
    "--inv-faint": theme.faint,
    "--foreground": theme.ink,
    "--muted-foreground": theme.muted,
    "--border": theme.line,
    backgroundColor: theme.paper,
    color: theme.ink,
    colorScheme: theme.dark ? "dark" : "light",
  } as CSSProperties;
  return (
    <article
      style={style}
      className={cn(
        "invoice-print invoice-sheet relative overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 transition-colors duration-300 print:rounded-none print:shadow-none print:ring-0",
        template.family === "serif" && "invoice-serif",
        className,
      )}
    >
      {children}
    </article>
  );
};
