export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

export type InvoiceParty = {
  name: string;
  details: string;
};

export type TemplateId = "classic" | "studio" | "midnight" | "editorial" | "bold";

export type Invoice = {
  template: TemplateId;
  cover: string | null;
  title: string;
  number: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  currencyPinned?: boolean;
  accent: string;
  logo: string | null;
  from: InvoiceParty;
  to: InvoiceParty;
  items: InvoiceItem[];
  taxRate: number;
  discountRate: number;
  shipping: number;
  paid: number;
  notes: string;
  terms: string;
};

export type InvoiceTotals = {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paid: number;
  balance: number;
};
