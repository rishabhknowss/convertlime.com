"use client";

import type { ReactNode } from "react";
import { NumberField } from "@/components/invoice/number-field";
import { formatMoney } from "@/lib/invoice/money";
import type { InvoiceUi } from "@/i18n/types";
import type { InvoiceStore } from "@/hooks/use-invoice";
import type { Invoice, InvoiceTotals } from "@/lib/invoice/types";

type TotalsPanelProps = {
  invoice: Invoice;
  totals: InvoiceTotals;
  store: InvoiceStore;
  text: InvoiceUi;
  locale: string;
};

const Row = ({ label, children, value }: { label: string; children?: ReactNode; value: string }) => (
  <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
    <span className="flex items-center gap-2.5 text-muted-foreground">
      {label}
      {children}
    </span>
    <span className="tabular-nums text-foreground">{value}</span>
  </div>
);

const Rate = ({ value, onValue, label }: { value: number; onValue: (value: number) => void; label: string }) => (
  <span className="w-14">
    <NumberField label={label} value={value} onValue={onValue} suffix="%" className="text-xs" />
  </span>
);

export const TotalsPanel = ({ invoice, totals, store, text, locale }: TotalsPanelProps) => {
  const money = (value: number) => formatMoney(value, invoice.currency, locale);
  return (
    <div className="ml-auto w-full max-w-72">
      <Row label={text.subtotal} value={money(totals.subtotal)} />
      <Row label={text.discount} value={totals.discount ? `-${money(totals.discount)}` : money(0)}>
        <Rate label={text.discount} value={invoice.discountRate} onValue={(value) => store.setField("discountRate", value)} />
      </Row>
      <Row label={text.tax} value={money(totals.tax)}>
        <Rate label={text.tax} value={invoice.taxRate} onValue={(value) => store.setField("taxRate", value)} />
      </Row>
      <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
        <span className="text-muted-foreground">{text.shipping}</span>
        <span className="w-28">
          <NumberField label={text.shipping} value={invoice.shipping} format={money} onValue={(value) => store.setField("shipping", value)} />
        </span>
      </div>
      <div className="relative mt-2 overflow-hidden rounded-xl bg-[var(--inv-accent)] px-4 py-3 text-white shadow-[0_10px_30px_-14px_var(--inv-accent)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.18)_50%,transparent_60%)]" />
        <div className="relative flex items-baseline justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.14em] uppercase opacity-85">{text.total}</span>
          <span className="text-xl font-bold tabular-nums tracking-tight transition-all duration-300">{money(totals.total)}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 py-1 text-sm">
        <span className="text-muted-foreground">{text.paid}</span>
        <span className="w-28">
          <NumberField label={text.paid} value={invoice.paid} format={money} onValue={(value) => store.setField("paid", value)} />
        </span>
      </div>
      {totals.paid > 0 && (
        <div className="flex items-baseline justify-between gap-3 border-t pt-2 text-sm font-semibold animate-in fade-in-0">
          <span>{text.balance}</span>
          <span className="tabular-nums">{money(totals.balance)}</span>
        </div>
      )}
    </div>
  );
};
