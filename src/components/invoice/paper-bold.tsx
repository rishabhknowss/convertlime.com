"use client";

import type { CSSProperties } from "react";
import { ItemsTable } from "@/components/invoice/items-table";
import { LogoSlot } from "@/components/invoice/logo-slot";
import { PaperShell } from "@/components/invoice/paper-shell";
import { DateInput, NotesFields, NumberInput, PartyFields, StackedMeta, TitleField } from "@/components/invoice/sheet-fields";
import { TotalsPanel } from "@/components/invoice/totals-panel";
import { readableOn } from "@/lib/invoice/templates";
import type { PaperProps } from "@/components/invoice/paper-props";

const tone = (ink: string, muted: string, background: string) =>
  ({ "--foreground": ink, "--muted-foreground": muted, color: ink, backgroundColor: background }) as CSSProperties;

export const PaperBold = ({ invoice, totals, store, text, locale }: PaperProps) => {
  const fields = { invoice, store, text };
  const onAccent = readableOn(invoice.accent);
  const accentTone = tone(onAccent, `color-mix(in oklab, ${onAccent} 72%, transparent)`, invoice.accent);
  return (
    <PaperShell accent={invoice.accent} className="rounded-xl">
      <header style={accentTone} className="flex flex-col gap-10 p-6 transition-colors duration-300 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <TitleField {...fields} className="-ml-1 text-6xl leading-none font-black tracking-[-0.045em] uppercase sm:text-7xl" />
          <LogoSlot
            logo={invoice.logo}
            onChange={(logo) => store.setField("logo", logo)}
            labels={{ add: text.addLogo, remove: text.removeLogo, error: text.logoError }}
          />
        </div>
        <div className="grid gap-6 text-[13px] uppercase sm:grid-cols-[11rem_minmax(0,1fr)]">
          <div className="flex flex-col gap-3">
            <StackedMeta label={text.issued} align="left">
              <DateInput {...fields} field="issueDate" className="w-36 uppercase" />
            </StackedMeta>
            <StackedMeta label={text.due} align="left">
              <DateInput {...fields} field="dueDate" className="w-36 uppercase" />
            </StackedMeta>
            <StackedMeta label={text.number} align="left">
              <NumberInput {...fields} className="w-40" />
            </StackedMeta>
          </div>
          <PartyFields {...fields} side="to" label={text.billTo} nameClassName="uppercase" detailsClassName="text-[13px] uppercase" />
        </div>
      </header>
      <section style={tone("#111111", "#3f3f3f", "#eeebe6")} className="pb-6">
        <ItemsTable invoice={invoice} store={store} text={text} locale={locale} />
        <div className="mt-6 border-t border-black/10 px-4 pt-3 sm:px-4">
          <TotalsPanel invoice={invoice} totals={totals} store={store} text={text} locale={locale} />
        </div>
      </section>
      <section style={tone("#111111", "#3a3a3a", "#e2ddd3")} className="border-t-2 border-neutral-900 p-6 sm:p-8">
        <NotesFields {...fields} className="sm:grid sm:grid-cols-2 sm:gap-8 sm:[&>*+*]:border-l sm:[&>*+*]:border-black/15 sm:[&>*+*]:pl-8" />
      </section>
      <footer style={accentTone} className="p-6 transition-colors duration-300 sm:p-8">
        <PartyFields {...fields} side="from" nameClassName="uppercase font-bold" detailsClassName="text-[13px]" className="max-w-sm" />
      </footer>
    </PaperShell>
  );
};
