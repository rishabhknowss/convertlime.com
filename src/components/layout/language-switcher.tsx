"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { LOCALES, LOCALE_COOKIE, LOCALE_META, localePath, stripLocale, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

export const LanguageSwitcher = () => {
  const { locale, ui } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const change = (next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(localePath(next, stripLocale(pathname)));
  };

  return (
    <label className="relative flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
      <Languages className="size-4" />
      <span className="sr-only">{ui.nav.language}</span>
      <select
        value={locale}
        onChange={(event) => change(event.target.value as Locale)}
        className="cursor-pointer appearance-none bg-transparent pr-1 outline-none"
        aria-label={ui.nav.language}
      >
        {LOCALES.map((item) => (
          <option key={item} value={item} className="bg-popover text-foreground">
            {LOCALE_META[item].name}
          </option>
        ))}
      </select>
    </label>
  );
};
