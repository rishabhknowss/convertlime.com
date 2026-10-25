export const LOCALES = ["en", "es", "pt", "fr", "de", "ja", "ko", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_META: Record<Locale, { name: string; hreflang: string; ogLocale: string }> = {
  en: { name: "English", hreflang: "en", ogLocale: "en_US" },
  es: { name: "Español", hreflang: "es", ogLocale: "es_ES" },
  pt: { name: "Português", hreflang: "pt", ogLocale: "pt_BR" },
  fr: { name: "Français", hreflang: "fr", ogLocale: "fr_FR" },
  de: { name: "Deutsch", hreflang: "de", ogLocale: "de_DE" },
  ja: { name: "日本語", hreflang: "ja", ogLocale: "ja_JP" },
  ko: { name: "한국어", hreflang: "ko", ogLocale: "ko_KR" },
  zh: { name: "简体中文", hreflang: "zh-Hans", ogLocale: "zh_CN" },
};

export const LOCALE_COOKIE = "cl_locale";

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

export const localePath = (locale: Locale, path: string) => {
  const clean = path === "/" ? "" : path;
  return locale === DEFAULT_LOCALE ? clean || "/" : `/${locale}${clean}`;
};

export const stripLocale = (pathname: string) => {
  const [, first, ...rest] = pathname.split("/");
  return isLocale(first) ? `/${rest.join("/")}` : pathname;
};

export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
