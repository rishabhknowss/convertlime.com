"use client";

import { Check, Download, FilePlus2, Loader2, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACCENTS } from "@/lib/invoice/defaults";
import { CURRENCIES } from "@/lib/invoice/money";
import type { InvoiceUi } from "@/i18n/types";
import type { Invoice } from "@/lib/invoice/types";
import { cn } from "@/lib/utils";

type InvoiceToolbarProps = {
  invoice: Invoice;
  text: InvoiceUi;
  savedAt: number | null;
  busy: boolean;
  onCurrency: (currency: string) => void;
  onAccent: (accent: string) => void;
  onNew: () => void;
  onPrint: () => void;
  onDownload: () => void;
};

export const InvoiceToolbar = ({
  invoice,
  text,
  savedAt,
  busy,
  onCurrency,
  onAccent,
  onNew,
  onPrint,
  onDownload,
}: InvoiceToolbarProps) => (
  <div className="relative z-20 flex sm:sticky sm:top-[4.25rem] flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border bg-background/85 p-2.5 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/70 print:hidden">
    <label className="flex items-center gap-2 pl-1.5 text-xs font-medium text-muted-foreground">
      {text.currency}
      <select
        value={invoice.currency}
        onChange={(event) => onCurrency(event.target.value)}
        className="h-8 rounded-lg border bg-card px-2 text-sm font-semibold text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </label>
    <div role="radiogroup" aria-label={text.color} className="flex items-center gap-1.5">
      {ACCENTS.map((accent) => {
        const active = accent === invoice.accent;
        return (
          <button
            key={accent}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={accent}
            onClick={() => onAccent(accent)}
            style={{ backgroundColor: accent }}
            className={cn(
              "flex size-6 items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active && "scale-110 ring-2 ring-foreground/70",
            )}
          >
            {active && <Check className="size-3 text-white" />}
          </button>
        );
      })}
    </div>
    {savedAt && (
      <span
        key={savedAt}
        aria-live="polite"
        className="hidden animate-[invoice-saved_1.8s_ease_forwards] items-center gap-1 text-xs text-muted-foreground lg:flex"
      >
        <Check className="size-3.5 text-primary" />
        {text.saved}
      </span>
    )}
    <div className="ml-auto flex items-center gap-1.5">
      <Button variant="ghost" size="icon" onClick={onNew} aria-label={text.newInvoice} title={text.newInvoice}>
        <FilePlus2 />
      </Button>
      <Button variant="outline" size="icon" onClick={onPrint} aria-label={text.print} title={text.print}>
        <Printer />
      </Button>
      <Button size="sm" onClick={onDownload} disabled={busy} className="min-w-32">
        {busy ? <Loader2 className="animate-spin" /> : <Download />}
        {text.downloadPdf}
      </Button>
    </div>
  </div>
);
