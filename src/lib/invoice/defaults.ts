import type { Invoice, InvoiceItem } from "@/lib/invoice/types";

export const ACCENTS = ["#65a30d", "#0f766e", "#1d4ed8", "#7c3aed", "#be123c", "#c2410c", "#171717"] as const;

export const DEFAULT_ACCENT = "#1d4ed8";

const isoDate = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 86_400_000);

export const newItemId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const createItem = (): InvoiceItem => ({ id: newItemId(), description: "", quantity: 1, rate: 0 });

export const nextInvoiceNumber = (previous: string | null) => {
  if (!previous) return "INV-0001";
  const match = previous.match(/^(.*?)(\d+)(\D*)$/);
  if (!match) return `${previous}-2`;
  const [, prefix, digits, suffix] = match;
  return `${prefix}${String(Number(digits) + 1).padStart(digits.length, "0")}${suffix}`;
};

export type InvoiceSeed = {
  title: string;
  currency: string;
};

export const createInvoice = (seed: InvoiceSeed, previous?: Invoice | null): Invoice => {
  const today = new Date();
  return {
    template: previous?.template ?? "classic",
    cover: previous?.cover ?? null,
    title: seed.title,
    number: nextInvoiceNumber(previous?.number ?? null),
    issueDate: isoDate(today),
    dueDate: isoDate(addDays(today, 14)),
    currency: previous?.currencyPinned ? previous.currency : seed.currency,
    currencyPinned: previous?.currencyPinned,
    accent: previous?.accent ?? DEFAULT_ACCENT,
    logo: previous?.logo ?? null,
    from: previous?.from ?? { name: "", details: "" },
    to: { name: "", details: "" },
    items: [createItem()],
    taxRate: previous?.taxRate ?? 0,
    discountRate: 0,
    shipping: 0,
    paid: 0,
    notes: previous?.notes ?? "",
    terms: previous?.terms ?? "",
  };
};

export const defaultCurrencyFor = (locale: string) => {
  const region = locale.split("-")[1]?.toUpperCase();
  const byLocale: Record<string, string> = {
    en: "USD",
    es: "EUR",
    pt: "BRL",
    fr: "EUR",
    de: "EUR",
    ja: "JPY",
    ko: "KRW",
    zh: "CNY",
  };
  const byRegion: Record<string, string> = { GB: "GBP", IN: "INR", CA: "CAD", AU: "AUD", MX: "MXN", BR: "BRL", PT: "EUR" };
  return (region && byRegion[region]) || byLocale[locale.split("-")[0] ?? "en"] || "USD";
};
