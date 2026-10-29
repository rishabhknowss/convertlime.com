"use client";

import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TEMPLATES, type InvoiceTemplate } from "@/lib/invoice/templates";

type Look = {
  template: InvoiceTemplate;
  labelClass: string;
  formatLabel: (label: string) => string;
};

const LABELS: Record<InvoiceTemplate["layout"], Omit<Look, "template">> = {
  classic: {
    labelClass: "text-[10px] font-semibold tracking-[0.16em] uppercase text-[var(--inv-accent)]",
    formatLabel: (label) => label,
  },
  studio: {
    labelClass: "text-[9px] font-medium tracking-[0.2em] uppercase text-[var(--inv-faint)]",
    formatLabel: (label) => label,
  },
  bold: {
    labelClass: "text-[10px] font-bold uppercase",
    formatLabel: (label) => `(${label})`,
  },
};

const LookContext = createContext<Look>({ template: TEMPLATES.classic, ...LABELS.classic });

export const LookProvider = ({ template, children }: { template: InvoiceTemplate; children: ReactNode }) => (
  <LookContext.Provider value={{ template, ...LABELS[template.layout] }}>{children}</LookContext.Provider>
);

export const useLook = () => useContext(LookContext);

export const SheetLabel = ({ children, className }: { children: string; className?: string }) => {
  const look = useLook();
  return <p className={cn("mb-1.5", look.labelClass, className)}>{look.formatLabel(children)}</p>;
};
