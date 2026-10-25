import type { Locale } from "@/i18n/config";

const FAMILY: Record<Locale, string> = {
  en: "Noto Sans",
  es: "Noto Sans",
  pt: "Noto Sans",
  fr: "Noto Sans",
  de: "Noto Sans",
  ja: "Noto Sans JP",
  ko: "Noto Sans KR",
  zh: "Noto Sans SC",
};

type Weight = 500 | 800;

const loadWeight = async (family: string, weight: Weight, text: string) => {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
    { signal: AbortSignal.timeout(10_000) },
  ).then((response) => {
    if (!response.ok) throw new Error(`Font stylesheet request failed: ${response.status}`);
    return response.text();
  });
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) return null;
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Font request failed: ${response.status}`);
  return { name: family, data: await response.arrayBuffer(), weight, style: "normal" as const };
};

export const ogFonts = async (locale: Locale, text: string) => {
  try {
    const family = FAMILY[locale];
    const fonts = await Promise.all([loadWeight(family, 500, text), loadWeight(family, 800, text)]);
    return fonts.filter((font): font is NonNullable<typeof font> => Boolean(font));
  } catch {
    return [];
  }
};

export const ogFontFamily = (locale: Locale) => FAMILY[locale];
