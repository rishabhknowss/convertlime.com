import type { InvoiceUi } from "@/i18n/types";
import type { InvoiceStore } from "@/hooks/use-invoice";
import type { Invoice, InvoiceTotals } from "@/lib/invoice/types";

export type PaperProps = {
  invoice: Invoice;
  totals: InvoiceTotals;
  store: InvoiceStore;
  text: InvoiceUi;
  locale: string;
};
