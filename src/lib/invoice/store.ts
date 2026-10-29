import type { Invoice } from "@/lib/invoice/types";

const STORAGE_KEY = "convertlime:invoice:v1";

type Snapshot = { invoice: Invoice | null; savedAt: number | null };

const EMPTY: Snapshot = { invoice: null, savedAt: null };

let snapshot: Snapshot | null = null;
let saveTimer: number | undefined;
const listeners = new Set<() => void>();

const load = (): Invoice | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Invoice>;
    if (!Array.isArray(parsed.items)) return null;
    return { template: "classic", cover: null, ...parsed } as Invoice;
  } catch {
    return null;
  }
};

const emit = () => listeners.forEach((listener) => listener());

const persist = (invoice: Invoice) => {
  window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
      snapshot = { invoice, savedAt: Date.now() };
      emit();
    } catch {
      return;
    }
  }, 300);
};

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getSnapshot = (): Snapshot => {
  if (!snapshot) snapshot = { invoice: load(), savedAt: null };
  return snapshot;
};

export const getServerSnapshot = () => EMPTY;

export const updateInvoice = (fallback: Invoice, change: (current: Invoice) => Invoice) => {
  const invoice = change(getSnapshot().invoice ?? fallback);
  snapshot = { invoice, savedAt: getSnapshot().savedAt };
  emit();
  persist(invoice);
};
