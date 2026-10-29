"use client";

import type { CSSProperties } from "react";
import { InlineInput, InlineTextarea } from "@/components/invoice/inline-field";
import { ItemsTable } from "@/components/invoice/items-table";
import { LogoSlot } from "@/components/invoice/logo-slot";
import { TotalsPanel } from "@/components/invoice/totals-panel";
import type { InvoiceUi } from "@/i18n/types";
import type { InvoiceStore } from "@/hooks/use-invoice";
import type { Invoice, InvoiceTotals } from "@/lib/invoice/types";

type InvoicePaperProps = {
  invoice: Invoice;
  totals: InvoiceTotals;
  store: InvoiceStore;
  text: InvoiceUi;
  locale: string;
};

const Label = ({ children }: { children: string }) => (
  <p className="mb-1.5 text-[10px] font-semibold tracking-[0.16em] text-[var(--inv-accent)] uppercase">{children}</p>
);

const MetaRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="grid grid-cols-[auto_8.5rem] items-center justify-end gap-3 text-sm">
    <span className="text-right text-muted-foreground">{label}</span>
    {children}
  </label>
);

export const InvoicePaper = ({ invoice, totals, store, text, locale }: InvoicePaperProps) => (
  <article
    style={{ "--inv-accent": invoice.accent } as CSSProperties}
    className="invoice-print invoice-sheet relative overflow-hidden rounded-2xl bg-white text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 print:rounded-none print:shadow-none print:ring-0"
  >
    <div className="h-1.5 bg-[var(--inv-accent)] transition-colors duration-300" />
    <div className="flex flex-col gap-10 p-6 sm:p-10">
      <header className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <LogoSlot
            logo={invoice.logo}
            onChange={(logo) => store.setField("logo", logo)}
            labels={{ add: text.addLogo, remove: text.removeLogo, error: text.logoError }}
          />
          <div className="max-w-72">
            <InlineInput
              aria-label={text.from}
              placeholder={text.fromNamePlaceholder}
              value={invoice.from.name}
              onValue={(name) => store.setParty("from", { name })}
              className="text-lg font-bold tracking-tight"
            />
            <InlineTextarea
              aria-label={text.from}
              placeholder={text.fromDetailsPlaceholder}
              value={invoice.from.details}
              onValue={(details) => store.setParty("from", { details })}
              className="mt-1 text-sm text-muted-foreground"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <InlineInput
            aria-label={text.documentTitle}
            placeholder={text.documentTitle}
            value={invoice.title}
            onValue={(title) => store.setField("title", title)}
            className="w-auto text-4xl font-extrabold tracking-[-0.04em] text-[var(--inv-accent)] uppercase sm:max-w-64 sm:text-right"
          />
          <div className="flex flex-col gap-1">
            <MetaRow label={text.number}>
              <InlineInput value={invoice.number} onValue={(number) => store.setField("number", number)} className="text-right font-semibold" />
            </MetaRow>
            <MetaRow label={text.issued}>
              <InlineInput type="date" value={invoice.issueDate} onValue={(issueDate) => store.setField("issueDate", issueDate)} className="text-right" />
            </MetaRow>
            <MetaRow label={text.due}>
              <InlineInput type="date" value={invoice.dueDate} onValue={(dueDate) => store.setField("dueDate", dueDate)} className="text-right" />
            </MetaRow>
          </div>
        </div>
      </header>

      <section className="max-w-80">
        <Label>{text.billTo}</Label>
        <InlineInput
          aria-label={text.billTo}
          placeholder={text.toNamePlaceholder}
          value={invoice.to.name}
          onValue={(name) => store.setParty("to", { name })}
          className="font-semibold"
        />
        <InlineTextarea
          aria-label={text.billTo}
          placeholder={text.toDetailsPlaceholder}
          value={invoice.to.details}
          onValue={(details) => store.setParty("to", { details })}
          className="mt-0.5 text-sm text-muted-foreground"
        />
      </section>

      <ItemsTable invoice={invoice} store={store} text={text} locale={locale} />

      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex max-w-80 flex-1 flex-col gap-5">
          <div>
            <Label>{text.notes}</Label>
            <InlineTextarea
              aria-label={text.notes}
              placeholder={text.notesPlaceholder}
              value={invoice.notes}
              onValue={(notes) => store.setField("notes", notes)}
              className="text-sm text-muted-foreground"
            />
          </div>
          <div>
            <Label>{text.terms}</Label>
            <InlineTextarea
              aria-label={text.terms}
              placeholder={text.termsPlaceholder}
              value={invoice.terms}
              onValue={(terms) => store.setField("terms", terms)}
              className="text-sm text-muted-foreground"
            />
          </div>
        </div>
        <TotalsPanel invoice={invoice} totals={totals} store={store} text={text} locale={locale} />
      </div>
    </div>
  </article>
);
