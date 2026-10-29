import { rgb, type PDFFont, type PDFPage, type RGB } from "pdf-lib";

export const PAGE = { width: 595.28, height: 841.89 };
export const MARGIN = 48;

export const hexToRgb = (hex: string): RGB => {
  const value = hex.replace("#", "");
  const n = Number.parseInt(value.length === 3 ? value.replace(/(.)/g, "$1$1") : value.slice(0, 6), 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

export const mix = (from: RGB, to: RGB, amount: number) =>
  rgb(
    from.red + (to.red - from.red) * amount,
    from.green + (to.green - from.green) * amount,
    from.blue + (to.blue - from.blue) * amount,
  );

export const luminance = (color: RGB) => 0.2126 * color.red + 0.7152 * color.green + 0.0722 * color.blue;

const unkernedWidth = (font: PDFFont, value: string, size: number) =>
  Array.from(value).reduce((sum, char) => sum + font.widthOfTextAtSize(char, size), 0);

export const measure = (font: PDFFont, value: string, size: number, tracking = 0) =>
  unkernedWidth(font, value, size) + tracking * Math.max(0, Array.from(value).length - 1);

export const drawRun = (
  page: PDFPage,
  value: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: RGB,
  tracking = 0,
) => {
  if (tracking) {
    let cursor = x;
    for (const char of value) {
      if (char !== " ") page.drawText(char, { x: cursor, y, size, font, color });
      cursor += font.widthOfTextAtSize(char, size) + tracking;
    }
    return;
  }
  const space = font.widthOfTextAtSize(" ", size);
  let cursor = x;
  for (const word of value.split(" ")) {
    if (word) page.drawText(word, { x: cursor, y, size, font, color });
    cursor += (word ? unkernedWidth(font, word, size) : 0) + space;
  }
};

export const wrap = (text: string, font: PDFFont, size: number, width: number) => {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      lines.push("");
      continue;
    }
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (measure(font, candidate, size) <= width) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      line = word;
      while (measure(font, line, size) > width && line.length > 1) {
        let cut = line.length - 1;
        while (cut > 1 && measure(font, line.slice(0, cut), size) > width) cut--;
        lines.push(line.slice(0, cut));
        line = line.slice(cut);
      }
    }
    lines.push(line);
  }
  return lines;
};

export const formatPdfMoney = (value: number, currency: string, locale: string) => {
  try {
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value).replace(/[  ]/g, " ");
  } catch {
    return `${currency} ${value.toFixed(2)}`;
  }
};
