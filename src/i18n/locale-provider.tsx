"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, localePath, type Locale } from "@/i18n/config";
import type { UiStrings } from "@/i18n/types";
import type { CategoryId } from "@/data/tools";
import { en } from "@/i18n/dictionaries/en";

export type ToolLink = { slug: string; path: string; heading: string; category: CategoryId; keyword: string };

type LocaleContextValue = {
  locale: Locale;
  ui: UiStrings;
  tools: ToolLink[];
  categories: { id: CategoryId; label: string }[];
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  ui: en.ui,
  tools: [],
  categories: [],
});

export const LocaleProvider = ({ value, children }: { value: LocaleContextValue; children: React.ReactNode }) => (
  <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
);

export const useLocale = () => useContext(LocaleContext);

export const useLocalePath = () => {
  const { locale } = useLocale();
  return (path: string) => localePath(locale, path);
};
