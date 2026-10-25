import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import { pt } from "@/i18n/dictionaries/pt";
import { fr } from "@/i18n/dictionaries/fr";
import { de } from "@/i18n/dictionaries/de";
import { ja } from "@/i18n/dictionaries/ja";
import { ko } from "@/i18n/dictionaries/ko";
import { zh } from "@/i18n/dictionaries/zh";

const DICTIONARIES: Record<Locale, Dictionary> = { en, es, pt, fr, de, ja, ko, zh };

export const getDictionary = (locale: Locale) => DICTIONARIES[locale];
