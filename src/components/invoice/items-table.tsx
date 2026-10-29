"use client";

import { useRef, type ReactNode } from "react";
import { Plus, X } from "lucide-react";
import { InlineTextarea } from "@/components/invoice/inline-field";
import { NumberField } from "@/components/invoice/number-field";
import { formatMoney } from "@/lib/invoice/money";
import { lineAmount } from "@/lib/invoice/totals";
import type { InvoiceUi } from "@/i18n/types";
import type { InvoiceStore } from "@/hooks/use-invoice";
import type { Invoice } from "@/lib/invoice/types";
import { useLook } from "@/components/invoice/invoice-look";
import { cn } from "@/lib/utils";

type ItemsTableProps = {
  invoice: Invoice;
  store: InvoiceStore;
  text: InvoiceUi;
  locale: string;
};

const GRID =
  "grid grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_4rem_7.5rem_8rem] sm:gap-y-0";

const STYLES = {
  classic: {
    header: "rounded-lg bg-[color-mix(in_oklab,var(--inv-accent)_10%,transparent)] px-4 py-2.5",
    row: "border-b border-dashed border-border/80 px-4 py-3 last:border-solid",
    cell: "",
  },
  studio: {
    header: "border-b border-border pb-2.5",
    row: "border-b border-border py-3.5",
    cell: "",
  },
  bold: {
    header: "border-b-2 border-neutral-900 px-8 py-4 sm:gap-x-0",
    row: "px-8 py-2 sm:gap-x-0",
    cell: "sm:border-l sm:border-black/10 sm:pr-3 sm:-my-2 sm:py-2",
  },
};

const Cell = ({ label, children, className }: { label: string; children: ReactNode; className?: string }) => (
  <div className={cn("min-w-0", className)}>
    <span className="mb-0.5 block text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:hidden">
      {label}
    </span>
    {children}
  </div>
);

export const ItemsTable = ({ invoice, store, text, locale }: ItemsTableProps) => {
  const pendingFocus = useRef<string | null>(null);
  const look = useLook();
  const layout = look.template.layout;
  const style = STYLES[layout];
  const quiet = layout === "studio" ? "text-muted-foreground" : "";

  const add = () => {
    pendingFocus.current = store.addItem();
  };
  const money = (value: number) => formatMoney(value, invoice.currency, locale);

  return (
    <div>
      <div className={cn(GRID, "max-sm:hidden", style.header, look.labelClass)}>
        <span>{look.formatLabel(text.description)}</span>
        <span className={cn("text-right", style.cell)}>{look.formatLabel(text.quantity)}</span>
        <span className={cn("text-right", style.cell)}>{look.formatLabel(text.rate)}</span>
        <span className={cn("text-right", style.cell)}>{look.formatLabel(text.amount)}</span>
      </div>
      <ul>
        {invoice.items.map((item, index) => (
          <li
            key={item.id}
            className={cn(GRID, "group/row relative animate-in fade-in-0 slide-in-from-top-1 duration-200", style.row)}
          >
            <InlineTextarea
              ref={(element: HTMLTextAreaElement | null) => {
                if (!element || pendingFocus.current !== item.id) return;
                pendingFocus.current = null;
                element.focus();
              }}
              aria-label={`${text.description} ${index + 1}`}
              placeholder={text.itemPlaceholder}
              value={item.description}
              onValue={(description) => store.setItem(item.id, { description })}
              onKeyDown={(event) => {
                if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  add();
                }
              }}
              className={cn("col-span-3 text-sm font-medium text-foreground max-sm:pr-7 sm:col-span-1 sm:pr-2", layout === "bold" && "uppercase")}
            />
            <Cell label={text.quantity} className={style.cell}>
              <NumberField
                label={text.quantity}
                value={item.quantity}
                onValue={(quantity) => store.setItem(item.id, { quantity })}
                onEnter={index === invoice.items.length - 1 ? add : undefined}
                className={cn("text-sm max-sm:text-left", quiet)}
              />
            </Cell>
            <Cell label={text.rate} className={style.cell}>
              <NumberField
                label={text.rate}
                value={item.rate}
                format={money}
                placeholder={money(0)}
                onValue={(rate) => store.setItem(item.id, { rate })}
                onEnter={index === invoice.items.length - 1 ? add : undefined}
                className={cn("text-sm max-sm:text-left", quiet)}
              />
            </Cell>
            <Cell label={text.amount} className={style.cell}>
              <span className="block pt-0.5 text-right text-sm font-semibold tabular-nums text-foreground">
                {money(lineAmount(item))}
              </span>
            </Cell>
            <button
              type="button"
              aria-label={text.removeItem}
              onClick={() => store.removeItem(item.id)}
              className="absolute top-3 right-4 flex size-5 items-center justify-center rounded-full sm:top-3.5 sm:-right-3 text-muted-foreground opacity-0 transition group-hover/row:opacity-100 hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 max-sm:opacity-60 print:hidden"
            >
              <X className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        className="mt-3 ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--inv-accent)] transition hover:bg-[color-mix(in_oklab,var(--inv-accent)_10%,transparent)] print:hidden"
      >
        <Plus className="size-3.5" />
        {text.addItem}
      </button>
    </div>
  );
};
