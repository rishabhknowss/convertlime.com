"use client";

import { ItemsTable } from "@/components/invoice/items-table";
import { LogoSlot } from "@/components/invoice/logo-slot";
import { PaperShell } from "@/components/invoice/paper-shell";
import { DateInput, NotesFields, NumberInput, PartyFields, TitleField } from "@/components/invoice/sheet-fields";
import { TotalsPanel } from "@/components/invoice/totals-panel";
import type { PaperProps } from "@/components/invoice/paper-props";

const MetaRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="grid grid-cols-[auto_8.5rem] items-center justify-end gap-3 text-sm">
    <span className="text-right text-muted-foreground">{label}</span>
    {children}
  </label>
);

export const PaperClassic = ({ invoice, totals, store, text, locale }: PaperProps) => (
  <PaperShell accent={invoice.accent}>
    <div className="h-1.5 bg-[var(--inv-accent)] transition-colors duration-300" />
    <div className="flex flex-col gap-10 p-6 sm:p-10">
      <header className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <LogoSlot
            logo={invoice.logo}
            onChange={(logo) => store.setField("logo", logo)}
            labels={{ add: text.addLogo, remove: text.removeLogo, error: text.logoError }}
          />
          <PartyFields
            invoice={invoice}
            store={store}
            text={text}
            side="from"
            className="max-w-72"
            nameClassName="text-lg font-bold tracking-tight"
          />
        </div>
        <div className="flex flex-col items-start gap-3 sm:items-end">
          <TitleField
            invoice={invoice}
            store={store}
            text={text}
            className="w-auto text-4xl font-extrabold tracking-[-0.04em] text-[var(--inv-accent)] uppercase sm:max-w-64 sm:text-right"
          />
          <div className="flex flex-col gap-1">
            <MetaRow label={text.number}>
              <NumberInput invoice={invoice} store={store} text={text} className="text-right font-semibold" />
            </MetaRow>
            <MetaRow label={text.issued}>
              <DateInput invoice={invoice} store={store} text={text} field="issueDate" className="text-right" />
            </MetaRow>
            <MetaRow label={text.due}>
              <DateInput invoice={invoice} store={store} text={text} field="dueDate" className="text-right" />
            </MetaRow>
          </div>
        </div>
      </header>
      <PartyFields invoice={invoice} store={store} text={text} side="to" label={text.billTo} className="max-w-80" />
      <ItemsTable invoice={invoice} store={store} text={text} locale={locale} />
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-start sm:justify-between">
        <NotesFields invoice={invoice} store={store} text={text} className="max-w-80 flex-1" />
        <TotalsPanel invoice={invoice} totals={totals} store={store} text={text} locale={locale} />
      </div>
    </div>
  </PaperShell>
);
