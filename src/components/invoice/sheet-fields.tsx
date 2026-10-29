"use client";

import type { ReactNode } from "react";
import { InlineInput, InlineTextarea } from "@/components/invoice/inline-field";
import { SheetLabel } from "@/components/invoice/invoice-look";
import type { InvoiceUi } from "@/i18n/types";
import type { InvoiceStore } from "@/hooks/use-invoice";
import type { Invoice } from "@/lib/invoice/types";
import { cn } from "@/lib/utils";

type FieldProps = {
  invoice: Invoice;
  store: InvoiceStore;
  text: InvoiceUi;
};

type PartyFieldsProps = FieldProps & {
  side: "from" | "to";
  label?: string;
  nameClassName?: string;
  detailsClassName?: string;
  className?: string;
};

export const PartyFields = ({ invoice, store, text, side, label, nameClassName, detailsClassName, className }: PartyFieldsProps) => {
  const party = invoice[side];
  const from = side === "from";
  return (
    <section className={className}>
      {label && <SheetLabel>{label}</SheetLabel>}
      <InlineInput
        aria-label={from ? text.from : text.billTo}
        placeholder={from ? text.fromNamePlaceholder : text.toNamePlaceholder}
        value={party.name}
        onValue={(name) => store.setParty(side, { name })}
        className={cn("font-semibold", nameClassName)}
      />
      <InlineTextarea
        aria-label={from ? text.from : text.billTo}
        placeholder={from ? text.fromDetailsPlaceholder : text.toDetailsPlaceholder}
        value={party.details}
        onValue={(details) => store.setParty(side, { details })}
        className={cn("mt-0.5 text-sm text-muted-foreground", detailsClassName)}
      />
    </section>
  );
};

export const TitleField = ({ invoice, store, text, className }: FieldProps & { className?: string }) => (
  <InlineInput
    aria-label={text.documentTitle}
    placeholder={text.documentTitle}
    value={invoice.title}
    onValue={(title) => store.setField("title", title)}
    className={className}
  />
);

export const NumberInput = ({ invoice, store, text, className }: FieldProps & { className?: string }) => (
  <InlineInput
    aria-label={text.number}
    value={invoice.number}
    onValue={(number) => store.setField("number", number)}
    className={className}
  />
);

export const DateInput = ({
  invoice,
  store,
  text,
  field,
  className,
}: FieldProps & { field: "issueDate" | "dueDate"; className?: string }) => (
  <InlineInput
    type="date"
    aria-label={field === "issueDate" ? text.issued : text.due}
    value={invoice[field]}
    onValue={(value) => store.setField(field, value)}
    className={className}
  />
);

export const StackedMeta = ({ label, children, align = "right" }: { label: string; children: ReactNode; align?: "left" | "right" }) => (
  <div className={align === "right" ? "text-right" : undefined}>
    <SheetLabel className="mb-0.5">{label}</SheetLabel>
    {children}
  </div>
);

export const NotesFields = ({ invoice, store, text, className }: FieldProps & { className?: string }) => (
  <div className={cn("flex flex-col gap-5", className)}>
    <div>
      <SheetLabel>{text.terms}</SheetLabel>
      <InlineTextarea
        aria-label={text.terms}
        placeholder={text.termsPlaceholder}
        value={invoice.terms}
        onValue={(terms) => store.setField("terms", terms)}
        className="text-sm text-muted-foreground"
      />
    </div>
    <div>
      <SheetLabel>{text.notes}</SheetLabel>
      <InlineTextarea
        aria-label={text.notes}
        placeholder={text.notesPlaceholder}
        value={invoice.notes}
        onValue={(notes) => store.setField("notes", notes)}
        className="text-sm text-muted-foreground"
      />
    </div>
  </div>
);
