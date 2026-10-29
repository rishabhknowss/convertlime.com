"use client";

import { CoverSlot } from "@/components/invoice/cover-slot";
import { ItemsTable } from "@/components/invoice/items-table";
import { useLook } from "@/components/invoice/invoice-look";
import { LogoSlot } from "@/components/invoice/logo-slot";
import { PaperShell } from "@/components/invoice/paper-shell";
import { DateInput, NotesFields, NumberInput, PartyFields, StackedMeta, TitleField } from "@/components/invoice/sheet-fields";
import { TotalsPanel } from "@/components/invoice/totals-panel";
import type { PaperProps } from "@/components/invoice/paper-props";

export const PaperStudio = ({ invoice, totals, store, text, locale }: PaperProps) => {
  const { template } = useLook();
  const caps = template.titleStyle === "caps";
  const fields = { invoice, store, text };
  return (
    <PaperShell accent={invoice.accent}>
      {template.cover === "fade" && <CoverSlot {...fields} variant="fade" />}
      <div className="flex flex-col gap-9 p-6 sm:p-10">
        {template.cover === "banner" && <CoverSlot {...fields} variant="banner" />}
        <div>
          <div className="flex items-start justify-between gap-6">
            <LogoSlot
              logo={invoice.logo}
              onChange={(logo) => store.setField("logo", logo)}
              labels={{ add: text.addLogo, remove: text.removeLogo, error: text.logoError }}
            />
            {caps ? (
              <div className="flex flex-col items-end">
                <TitleField {...fields} className="w-auto text-right text-xl font-bold tracking-[0.18em] uppercase sm:max-w-64" />
                <NumberInput {...fields} className="w-auto text-right text-lg sm:max-w-56" />
              </div>
            ) : (
              <NumberInput {...fields} className="w-auto max-w-56 text-right text-sm font-semibold" />
            )}
          </div>
          {caps ? (
            <div className="mt-8 border-t border-border" />
          ) : (
            <TitleField {...fields} className="mt-6 -ml-1 text-6xl leading-none font-bold tracking-[-0.035em] uppercase sm:text-7xl" />
          )}
        </div>
        <div className="grid gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
          <PartyFields {...fields} side="from" label={text.from} detailsClassName="text-[13px]" />
          <PartyFields {...fields} side="to" label={text.billTo} detailsClassName="text-[13px]" />
          <div className="flex flex-col gap-4 sm:items-end">
            <StackedMeta label={text.issued}>
              <DateInput {...fields} field="issueDate" className="w-36 sm:text-right" />
            </StackedMeta>
            <StackedMeta label={text.due}>
              <DateInput {...fields} field="dueDate" className="w-36 sm:text-right" />
            </StackedMeta>
          </div>
        </div>
        <ItemsTable invoice={invoice} store={store} text={text} locale={locale} />
        <TotalsPanel invoice={invoice} totals={totals} store={store} text={text} locale={locale} />
        <NotesFields {...fields} className="max-w-md" />
      </div>
    </PaperShell>
  );
};
