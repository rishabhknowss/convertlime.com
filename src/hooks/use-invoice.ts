"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { createInvoice, createItem, type InvoiceSeed } from "@/lib/invoice/defaults";
import { getServerSnapshot, getSnapshot, subscribe, updateInvoice } from "@/lib/invoice/store";
import { computeTotals } from "@/lib/invoice/totals";
import type { Invoice, InvoiceItem, InvoiceParty } from "@/lib/invoice/types";

type ScalarField = Exclude<keyof Invoice, "from" | "to" | "items">;

const noop = () => () => {};

export const useInvoice = (seed: InvoiceSeed) => {
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const fallback = useMemo(() => createInvoice(seed), [seed]);
  const invoice = hydrated ? (stored.invoice ?? fallback) : null;

  const update = useCallback((change: (current: Invoice) => Invoice) => updateInvoice(fallback, change), [fallback]);

  const setField = useCallback(
    <K extends ScalarField>(key: K, value: Invoice[K]) => update((current) => ({ ...current, [key]: value })),
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

  const startNew = useCallback(() => update((current) => createInvoice(seed, current)), [update, seed]);

  const totals = useMemo(() => (invoice ? computeTotals(invoice) : null), [invoice]);

  return { invoice, totals, savedAt: stored.savedAt, setField, setParty, setItem, addItem, removeItem, startNew };
};

export type InvoiceStore = ReturnType<typeof useInvoice>;
