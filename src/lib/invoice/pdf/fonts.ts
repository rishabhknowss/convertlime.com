import type { PDFDocument } from "pdf-lib";
import { subsetFont } from "@/lib/invoice/subset";

export class UnsupportedTextError extends Error {}

type Pack = { regular: string; bold: string };

const GEIST = "https://cdn.jsdelivr.net/npm/geist@1.7.0/dist/fonts/geist-sans";
const NOTO = "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io";
const NOTO_SANS = `${NOTO}@NotoSans-v2.013/fonts/NotoSans/hinted/ttf`;
const NOTO_SERIF = `${NOTO}@NotoSerif-v2.013/fonts/NotoSerif/hinted/ttf`;
const CJK_SANS = "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@Sans2.004/Sans/SubsetOTF";
const CJK_SERIF = "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@Serif2.003/Serif/SubsetOTF";

const PACKS = {
  geist: { regular: `${GEIST}/Geist-Regular.ttf`, bold: `${GEIST}/Geist-Bold.ttf` },
  notoSans: { regular: `${NOTO_SANS}/NotoSans-Regular.ttf`, bold: `${NOTO_SANS}/NotoSans-Bold.ttf` },
  notoSerif: { regular: `${NOTO_SERIF}/NotoSerif-Regular.ttf`, bold: `${NOTO_SERIF}/NotoSerif-Bold.ttf` },
  jaSans: { regular: `${CJK_SANS}/JP/NotoSansJP-Regular.otf`, bold: `${CJK_SANS}/JP/NotoSansJP-Bold.otf` },
  koSans: { regular: `${CJK_SANS}/KR/NotoSansKR-Regular.otf`, bold: `${CJK_SANS}/KR/NotoSansKR-Bold.otf` },
  zhSans: { regular: `${CJK_SANS}/SC/NotoSansSC-Regular.otf`, bold: `${CJK_SANS}/SC/NotoSansSC-Bold.otf` },
  jaSerif: { regular: `${CJK_SERIF}/JP/NotoSerifJP-Regular.otf`, bold: `${CJK_SERIF}/JP/NotoSerifJP-Bold.otf` },
  koSerif: { regular: `${CJK_SERIF}/KR/NotoSerifKR-Regular.otf`, bold: `${CJK_SERIF}/KR/NotoSerifKR-Bold.otf` },
  zhSerif: { regular: `${CJK_SERIF}/SC/NotoSerifSC-Regular.otf`, bold: `${CJK_SERIF}/SC/NotoSerifSC-Bold.otf` },
} satisfies Record<string, Pack>;

type PackId = keyof typeof PACKS;
export type FontFamily = "sans" | "serif";

const KANA = /[぀-ヿㇰ-ㇿ]/;
const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힯]/;
const HAN = /[㐀-䶿一-鿿豈-﫿]/;

const candidates = (family: FontFamily, text: string, locale: string): PackId[] => {
  const serif = family === "serif";
  if (KANA.test(text)) return [serif ? "jaSerif" : "jaSans"];
  if (HANGUL.test(text)) return [serif ? "koSerif" : "koSans"];
  if (HAN.test(text)) {
    if (locale.startsWith("ja")) return [serif ? "jaSerif" : "jaSans"];
    if (locale.startsWith("ko")) return [serif ? "koSerif" : "koSans"];
    return [serif ? "zhSerif" : "zhSans"];
  }
  return serif ? ["notoSerif"] : ["geist", "notoSans"];
};

const cache = new Map<string, Promise<ArrayBuffer>>();

const fetchFont = (url: string) => {
  const existing = cache.get(url);
  if (existing) return existing;
  const request = fetch(url).then((response) => {
    if (!response.ok) throw new Error(`font ${response.status}`);
    return response.arrayBuffer();
  });
  request.catch(() => cache.delete(url));
  cache.set(url, request);
  return request;
};

const PLAIN_GLYPHS = { locl: false, liga: false, clig: false, calt: false, dlig: false };

export const embedFonts = async (pdf: PDFDocument, strings: string[], locale: string, family: FontFamily) => {
  const joined = strings.join(" ");
  const text = `${joined} ${joined.toUpperCase()} 0123456789/-–.,:()%#`;
  const { default: fontkit } = await import("@pdf-lib/fontkit");
  pdf.registerFontkit(fontkit);
  for (const id of candidates(family, text, locale)) {
    const pack = PACKS[id];
    const [regularSource, boldSource] = await Promise.all([fetchFont(pack.regular), fetchFont(pack.bold)]);
    const [regular, bold] = await Promise.all([subsetFont(regularSource, text), subsetFont(boldSource, text)]);
    const face = fontkit.create(regular);
    const covered = Array.from(text).every((char) => {
      const codePoint = char.codePointAt(0) ?? 0;
      return codePoint <= 32 || face.hasGlyphForCodePoint(codePoint);
    });
    if (!covered) continue;
    return {
      regular: await pdf.embedFont(regular, { subset: false, features: PLAIN_GLYPHS }),
      bold: await pdf.embedFont(bold, { subset: false, features: PLAIN_GLYPHS }),
    };
  }
  throw new UnsupportedTextError(text);
};
