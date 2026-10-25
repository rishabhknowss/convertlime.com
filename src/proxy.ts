import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/i18n/config";

const COUNTRY_LOCALE: Record<string, Locale> = {
  JP: "ja",
  KR: "ko",
  CN: "zh",
  SG: "zh",
  TW: "zh",
  HK: "zh",
  MO: "zh",
  BR: "pt",
  PT: "pt",
  AO: "pt",
  MZ: "pt",
  FR: "fr",
  BE: "fr",
  LU: "fr",
  MC: "fr",
  SN: "fr",
  CI: "fr",
  DE: "de",
  AT: "de",
  CH: "de",
  LI: "de",
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  VE: "es",
  EC: "es",
  GT: "es",
  CU: "es",
  BO: "es",
  DO: "es",
  HN: "es",
  PY: "es",
  SV: "es",
  NI: "es",
  CR: "es",
  PA: "es",
  UY: "es",
  PR: "es",
};

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|lighthouse|headless/i;

const COUNTRY_HEADERS = ["cf-ipcountry", "x-vercel-ip-country", "x-country-code", "cloudfront-viewer-country", "fly-region"];

const countryLocale = (request: NextRequest) => {
  for (const header of COUNTRY_HEADERS) {
    const country = request.headers.get(header)?.toUpperCase();
    if (country && COUNTRY_LOCALE[country]) return COUNTRY_LOCALE[country];
  }
  return null;
};

const languageLocale = (request: NextRequest) => {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.map(({ base }) => base).find(isLocale) ?? null;
};

const preferredLocale = (request: NextRequest): Locale => {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (saved && isLocale(saved)) return saved;
  if (!request.headers.get("accept-language")) return DEFAULT_LOCALE;
  return languageLocale(request) ?? countryLocale(request) ?? DEFAULT_LOCALE;
};

export const proxy = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;
  const [, first] = pathname.split("/");

  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(first)) return NextResponse.next();

  if (pathname === "/" && !BOT.test(request.headers.get("user-agent") ?? "")) {
    const locale = preferredLocale(request);
    if (locale !== DEFAULT_LOCALE) {
      const response = NextResponse.redirect(new URL(`/${locale}${search}`, request.url), 307);
      response.cookies.set(LOCALE_COOKIE, locale, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
      return response;
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
};

export const config = {
  matcher: [
    "/((?!_next|api|brand|sw\\.js|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|feed\\.xml|favicon\\.ico|icon\\.svg|apple-icon\\.png|.*\\.[a-z0-9]+$).*)",
  ],
};
