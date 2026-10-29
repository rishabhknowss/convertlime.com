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

type ItemsTableProps = {
  invoice: Invoice;
  store: InvoiceStore;
  text: InvoiceUi;
  locale: string;
};

const GRID =
  "grid grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-3 gap-y-1.5 sm:grid-cols-[minmax(0,1fr)_4.5rem_7rem_7.5rem_1.5rem] sm:gap-y-0";

const Cell = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="min-w-0">
    <span className="mb-0.5 block text-[9px] font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:hidden">
      {label}
    </span>
    {children}
  </div>
);

export const ItemsTable = ({ invoice, store, text, locale }: ItemsTableProps) => {
  const pendingFocus = useRef<string | null>(null);

  const add = () => {
    pendingFocus.current = store.addItem();
  };
  const money = (value: number) => formatMoney(value, invoice.currency, locale);

  return (
    <div>
      <div
        className={`${GRID} max-sm:hidden rounded-lg bg-[color-mix(in_oklab,var(--inv-accent)_10%,transparent)] px-3 py-2 text-[10px] font-semibold tracking-[0.12em] text-[var(--inv-accent)] uppercase`}
      >
        <span>{text.description}</span>
        <span className="text-right">{text.quantity}</span>
        <span className="text-right">{text.rate}</span>
        <span className="text-right">{text.amount}</span>
        <span />
      </div>
      <ul>
        {invoice.items.map((item, index) => (
          <li
            key={item.id}
            className={`${GRID} group/row relative animate-in fade-in-0 slide-in-from-top-1 border-b border-dashed border-border/80 px-3 py-2.5 duration-200 last:border-solid`}
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
              className="col-span-3 text-sm font-medium text-foreground max-sm:pr-7 sm:col-span-1"
            />
            <Cell label={text.quantity}>
              <NumberField
                label={text.quantity}
                value={item.quantity}
                onValue={(quantity) => store.setItem(item.id, { quantity })}
                onEnter={index === invoice.items.length - 1 ? add : undefined}
                className="text-sm max-sm:text-left"
              />
            </Cell>
            <Cell label={text.rate}>
              <NumberField
                label={text.rate}
                value={item.rate}
                format={money}
                onValue={(rate) => store.setItem(item.id, { rate })}
                onEnter={index === invoice.items.length - 1 ? add : undefined}
                className="text-sm max-sm:text-left"
              />
            </Cell>
            <Cell label={text.amount}>
              <span className="block pt-0.5 text-right text-sm font-semibold tabular-nums text-foreground">
                {money(lineAmount(item))}
              </span>
            </Cell>
            <button
              type="button"
              aria-label={text.removeItem}
              onClick={() => store.removeItem(item.id)}
              className="mt-0.5 flex size-5 items-center justify-center rounded-full max-sm:absolute max-sm:top-2.5 max-sm:right-3 text-muted-foreground opacity-0 transition group-hover/row:opacity-100 hover:bg-destructive/10 hover:text-destructive focus-visible:opacity-100 max-sm:opacity-60 print:hidden"
            >
              <X className="size-3.5" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--inv-accent)] transition hover:bg-[color-mix(in_oklab,var(--inv-accent)_10%,transparent)] print:hidden"
      >
        <Plus className="size-3.5" />
        {text.addItem}
      </button>
    </div>
  );
};
