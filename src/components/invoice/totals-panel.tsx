"use client";

import type { ReactNode } from "react";
import { NumberField } from "@/components/invoice/number-field";
import { PercentField } from "@/components/invoice/percent-field";
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

const Row = ({ label, control, children }: { label: string; control?: ReactNode; children: ReactNode }) => (
  <div className="grid min-h-9 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 text-sm">
    <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
      <span className="truncate">{label}</span>
      {control}
    </span>
    <span className="min-w-24 text-right tabular-nums text-foreground">{children}</span>
  </div>
);

export const TotalsPanel = ({ invoice, totals, store, text, locale }: TotalsPanelProps) => {
  const money = (value: number) => formatMoney(value, invoice.currency, locale);
  return (
    <div className="w-full sm:ml-auto sm:max-w-[19rem]">
      <Row label={text.subtotal}>{money(totals.subtotal)}</Row>
      <Row
        label={text.discount}
        control={
          <PercentField label={text.discount} value={invoice.discountRate} onValue={(value) => store.setField("discountRate", value)} />
        }
      >
        <span className={totals.discount ? undefined : "text-muted-foreground"}>
          {totals.discount ? `−${money(totals.discount)}` : money(0)}
        </span>
      </Row>
      <Row
        label={text.tax}
        control={<PercentField label={text.tax} value={invoice.taxRate} onValue={(value) => store.setField("taxRate", value)} />}
      >
        <span className={totals.tax ? undefined : "text-muted-foreground"}>{money(totals.tax)}</span>
      </Row>
      <Row label={text.shipping}>
        <NumberField
          label={text.shipping}
          value={invoice.shipping}
          format={money}
          placeholder={money(0)}
          onValue={(value) => store.setField("shipping", value)}
        />
      </Row>
      <div className="mx-4 mt-3 flex items-baseline justify-between gap-3 border-t-2 border-[var(--inv-accent)] pt-3 pb-1">
        <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--inv-accent)] uppercase">{text.total}</span>
        <span className="text-2xl font-bold tabular-nums tracking-tight text-foreground">{money(totals.total)}</span>
      </div>
      <div className="mt-1.5">
        <Row label={text.paid}>
          <NumberField
            label={text.paid}
            value={invoice.paid}
            format={money}
            placeholder={money(0)}
            onValue={(value) => store.setField("paid", value)}
          />
        </Row>
      </div>
      {totals.paid > 0 && (
        <div className="mx-4 flex animate-in items-baseline justify-between gap-3 border-t pt-2.5 text-sm font-semibold fade-in-0">
          <span>{text.balance}</span>
          <span className="tabular-nums">{money(totals.balance)}</span>
        </div>
      )}
    </div>
  );
};
