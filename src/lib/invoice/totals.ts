import type { Invoice, InvoiceItem, InvoiceTotals } from "@/lib/invoice/types";

const round = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

const safe = (value: number) => (Number.isFinite(value) ? value : 0);

export const lineAmount = (item: InvoiceItem) => round(safe(item.quantity) * safe(item.rate));

export const computeTotals = (invoice: Invoice): InvoiceTotals => {
  const subtotal = round(invoice.items.reduce((sum, item) => sum + lineAmount(item), 0));
  const discount = round((subtotal * safe(invoice.discountRate)) / 100);
  const tax = round(((subtotal - discount) * safe(invoice.taxRate)) / 100);
  const shipping = round(safe(invoice.shipping));
  const total = round(subtotal - discount + tax + shipping);
  const paid = round(safe(invoice.paid));
  return { subtotal, discount, tax, shipping, total, paid, balance: round(total - paid) };
};
