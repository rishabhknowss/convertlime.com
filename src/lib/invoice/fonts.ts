export type FontPackId = "latin" | "ja" | "ko" | "zh";

const NOTO_SANS = "https://cdn.jsdelivr.net/gh/notofonts/notofonts.github.io@NotoSans-v2.013/fonts/NotoSans/hinted/ttf";
const NOTO_CJK = "https://cdn.jsdelivr.net/gh/notofonts/noto-cjk@Sans2.004/Sans/SubsetOTF";

const PACKS: Record<FontPackId, { regular: string; bold: string }> = {
  latin: { regular: `${NOTO_SANS}/NotoSans-Regular.ttf`, bold: `${NOTO_SANS}/NotoSans-Bold.ttf` },
  ja: { regular: `${NOTO_CJK}/JP/NotoSansJP-Regular.otf`, bold: `${NOTO_CJK}/JP/NotoSansJP-Bold.otf` },
  ko: { regular: `${NOTO_CJK}/KR/NotoSansKR-Regular.otf`, bold: `${NOTO_CJK}/KR/NotoSansKR-Bold.otf` },
  zh: { regular: `${NOTO_CJK}/SC/NotoSansSC-Regular.otf`, bold: `${NOTO_CJK}/SC/NotoSansSC-Bold.otf` },
};

const KANA = /[぀-ヿㇰ-ㇿ]/;
const HANGUL = /[ᄀ-ᇿ㄰-㆏가-힯]/;
const HAN = /[㐀-䶿一-鿿豈-﫿]/;

export const pickFontPack = (text: string, locale: string): FontPackId => {
  if (KANA.test(text)) return "ja";
  if (HANGUL.test(text)) return "ko";
  if (HAN.test(text)) return locale.startsWith("ja") ? "ja" : locale.startsWith("ko") ? "ko" : "zh";
  return "latin";
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

export const loadFontPack = async (id: FontPackId) => {
  const pack = PACKS[id];
  const [regular, bold] = await Promise.all([fetchFont(pack.regular), fetchFont(pack.bold)]);
  return { regular, bold };
};
