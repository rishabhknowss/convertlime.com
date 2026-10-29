export const PDF_LABEL_KEYS = [
  "from",
  "billTo",
  "number",
  "issued",
  "due",
  "description",
  "quantity",
  "rate",
  "amount",
  "subtotal",
  "discount",
  "tax",
  "shipping",
  "total",
  "paid",
  "balance",
  "notes",
  "terms",
] as const;

export type InvoicePdfLabels = Record<(typeof PDF_LABEL_KEYS)[number], string>;

export const pickPdfLabels = (text: InvoicePdfLabels): InvoicePdfLabels =>
  Object.fromEntries(PDF_LABEL_KEYS.map((key) => [key, text[key]])) as InvoicePdfLabels;
