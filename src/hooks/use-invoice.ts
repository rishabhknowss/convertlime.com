"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { createInvoice, createItem, type InvoiceSeed } from "@/lib/invoice/defaults";
import { getServerSnapshot, getSnapshot, subscribe, updateInvoice } from "@/lib/invoice/store";
import { computeTotals } from "@/lib/invoice/totals";
import type { Invoice, InvoiceItem, InvoiceParty, TemplateId } from "@/lib/invoice/types";
import { getTemplate } from "@/lib/invoice/templates";
import { presetCover } from "@/lib/invoice/covers";

type ScalarField = Exclude<keyof Invoice, "from" | "to" | "items">;

const noop = () => () => {};

export const useInvoice = (seed: InvoiceSeed) => {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const fallback = useMemo(() => createInvoice(seed), [seed]);
  const localized = useCallback(
    (current: Invoice) => (current.currencyPinned ? current : { ...current, currency: seed.currency }),
    [seed.currency],
  );
  const invoice = useMemo(
    () => (hydrated ? localized(stored.invoice ?? fallback) : null),
    [hydrated, localized, stored.invoice, fallback],
  );

  const update = useCallback(
    (change: (current: Invoice) => Invoice) => updateInvoice(fallback, (current) => change(localized(current))),
    [fallback, localized],
  );

  const setField = useCallback(
    <K extends ScalarField>(key: K, value: Invoice[K]) =>
      update((current) => ({ ...current, [key]: value, ...(key === "currency" && { currencyPinned: true }) })),
    [update],
  );

  const setParty = useCallback(
    (side: "from" | "to", value: Partial<InvoiceParty>) =>
      update((current) => ({ ...current, [side]: { ...current[side], ...value } })),
    [update],
  );

  const setItem = useCallback(
    (id: string, value: Partial<InvoiceItem>) =>
      update((current) => ({
        ...current,
        items: current.items.map((item) => (item.id === id ? { ...item, ...value } : item)),
      })),
    [update],
  );

  const addItem = useCallback(() => {
    const item = createItem();
    update((current) => ({ ...current, items: [...current.items, item] }));
    return item.id;
  }, [update]);

  const removeItem = useCallback(
    (id: string) =>
      update((current) => {
        const items = current.items.filter((item) => item.id !== id);
        return { ...current, items: items.length ? items : [createItem()] };
      }),
    [update],
  );

  const setTemplate = useCallback(
    (template: TemplateId) =>
      update((current) => ({
        ...current,
        template,
        cover:
          current.cover ?? (getTemplate(template).cover === "none" ? null : presetCover(template === "midnight" ? "dusk" : "meadow")),
      })),
    [update],
  );

  const startNew = useCallback(() => update((current) => createInvoice(seed, current)), [update, seed]);

  const totals = useMemo(() => (invoice ? computeTotals(invoice) : null), [invoice]);

  return { invoice, totals, savedAt: stored.savedAt, setField, setParty, setItem, addItem, removeItem, setTemplate, startNew };
};

export type InvoiceStore = ReturnType<typeof useInvoice>;
