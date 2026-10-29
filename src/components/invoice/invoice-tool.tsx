"use client";

import { useMemo, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InvoicePaper } from "@/components/invoice/invoice-paper";
import { InvoiceToolbar } from "@/components/invoice/invoice-toolbar";
import { useInvoice } from "@/hooks/use-invoice";
import { defaultCurrencyFor } from "@/lib/invoice/defaults";
import { formatMoney } from "@/lib/invoice/money";
import { UnsupportedTextError, buildInvoicePdf, pickPdfLabels } from "@/lib/invoice/pdf";
import { useLocale } from "@/i18n/locale-provider";

const fileName = (title: string, number: string) =>
  `${[title, number].filter(Boolean).join(" ").trim().replace(/[\\/:*?"<>|]+/g, "-") || "invoice"}.pdf`;

const saveBytes = (bytes: Uint8Array, name: string) => {
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const PaperSkeleton = () => (
  <div className="flex flex-col gap-4">
    <div className="h-14 animate-pulse rounded-2xl bg-muted" />
    <div className="aspect-[1/1.2] animate-pulse rounded-2xl bg-muted/70" />
  </div>
);

export const InvoiceTool = () => {
  const { ui, locale } = useLocale();
  const text = ui.invoice;
  const seed = useMemo(
    () => ({
      title: text.documentTitle,
      currency: defaultCurrencyFor(typeof navigator === "undefined" ? locale : navigator.language || locale),
    }),
    [locale, text.documentTitle],
  );
  const store = useInvoice(seed);
  const { invoice, totals, savedAt } = store;
  const [busy, setBusy] = useState(false);

  if (!invoice || !totals) return <PaperSkeleton />;

  const download = async () => {
    setBusy(true);
    try {
      const bytes = await buildInvoicePdf(invoice, pickPdfLabels(text), locale);
      saveBytes(bytes, fileName(invoice.title, invoice.number));
    } catch (error) {
      if (error instanceof UnsupportedTextError) {
        toast.info(text.printInstead);
        window.print();
      } else {
        toast.error(text.pdfFailed);
      }
    } finally {
      setBusy(false);
    }
  };

  const startNew = () => {
    store.startNew();
    toast.success(text.newInvoiceDone);
  };

  return (
    <div className="flex flex-col gap-4 pb-24 sm:pb-0">
      <InvoiceToolbar
        invoice={invoice}
        text={text}
        savedAt={savedAt}
        busy={busy}
        onCurrency={(currency) => store.setField("currency", currency)}
        onAccent={(accent) => store.setField("accent", accent)}
        onNew={startNew}
        onPrint={() => window.print()}
        onDownload={download}
      />
      <div className="rounded-3xl bg-[radial-gradient(circle_at_1px_1px,color-mix(in_oklab,var(--foreground)_9%,transparent)_1px,transparent_0)] [background-size:18px_18px] p-2 sm:-mx-6 sm:p-6 print:bg-none print:p-0">
        <InvoicePaper invoice={invoice} totals={totals} store={store} text={text} locale={locale} />
      </div>
      <div className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-between gap-3 rounded-2xl border bg-background/90 p-2.5 pl-4 shadow-lg backdrop-blur-md sm:hidden print:hidden">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">{text.totalDue}</p>
          <p className="truncate text-lg font-bold tabular-nums">{formatMoney(totals.balance, invoice.currency, locale)}</p>
        </div>
        <Button onClick={download} disabled={busy}>
          {busy ? <Loader2 className="animate-spin" /> : <Download />}
          {text.downloadPdf}
        </Button>
      </div>
    </div>
  );
};
