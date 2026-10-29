"use client";

import { Check, ChevronDown, Download, FilePlus2, Loader2, Pipette, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACCENTS } from "@/lib/invoice/defaults";
import { CURRENCIES } from "@/lib/invoice/money";
import type { InvoiceUi } from "@/i18n/types";
import type { Invoice } from "@/lib/invoice/types";
import { readableOn } from "@/lib/invoice/templates";
import { cn } from "@/lib/utils";

const isPreset = (value: string) => ACCENTS.some((accent) => accent === value.toLowerCase());

const CustomSwatch = ({ value, label, onAccent }: { value: string; label: string; onAccent: (accent: string) => void }) => {
  const active = !isPreset(value);
  return (
    <label
      title={label}
      className={cn(
        "relative flex size-6 cursor-pointer items-center justify-center rounded-full ring-offset-2 ring-offset-background transition-transform duration-150 hover:scale-110 focus-within:ring-2 focus-within:ring-ring",
        active && "scale-110 ring-2 ring-foreground/70",
      )}
      style={{
        background: active
          ? value
          : "conic-gradient(from 180deg, #f43f5e, #f59e0b, #eab308, #22c55e, #06b6d4, #3b82f6, #a855f7, #f43f5e)",
      }}
    >
      <input
        type="color"
        aria-label={label}
        value={value}
        onChange={(event) => onAccent(event.target.value)}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
      />
      {active ? (
        <Check className="pointer-events-none size-3" style={{ color: readableOn(value) }} />
      ) : (
        <Pipette className="pointer-events-none size-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]" />
      )}
    </label>
  );
};

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
      <span className="relative inline-flex items-center">
        <select
          value={invoice.currency}
          onChange={(event) => onCurrency(event.target.value)}
          className="h-8 cursor-pointer appearance-none rounded-lg border bg-card py-0 pr-8 pl-2.5 text-sm font-semibold text-foreground outline-none transition-colors hover:border-foreground/25 focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {CURRENCIES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 size-3.5 text-muted-foreground" />
      </span>
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
      <CustomSwatch value={invoice.accent} label={text.customColor} onAccent={onAccent} />
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
