import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage, type RGB } from "pdf-lib";
import { computeTotals, lineAmount } from "@/lib/invoice/totals";
import { formatDate } from "@/lib/invoice/money";
import { loadFontPack, pickFontPack } from "@/lib/invoice/fonts";
import { subsetFont } from "@/lib/invoice/subset";
import type { Invoice } from "@/lib/invoice/types";

export const PDF_LABEL_KEYS = [
  "from",
  "billTo",
  "number",
  "issued",
  "due",
  "description",
  "quantity",
  "rate",
  "amount",
  "subtotal",
  "discount",
  "tax",
  "shipping",
  "total",
  "paid",
  "balance",
  "notes",
  "terms",
] as const;

export type InvoicePdfLabels = Record<(typeof PDF_LABEL_KEYS)[number], string>;

export const pickPdfLabels = (text: InvoicePdfLabels): InvoicePdfLabels =>
  Object.fromEntries(PDF_LABEL_KEYS.map((key) => [key, text[key]])) as InvoicePdfLabels;

export class UnsupportedTextError extends Error {}

const PAGE = { width: 595.28, height: 841.89 };
const MARGIN = 48;
const INK = rgb(0.09, 0.09, 0.09);
const MUTED = rgb(0.42, 0.42, 0.42);
const LINE = rgb(0.9, 0.9, 0.9);

const hexToRgb = (hex: string) => {
  const value = hex.replace("#", "");
  const n = Number.parseInt(value.length === 3 ? value.replace(/(.)/g, "$1$1") : value, 16);
  return rgb(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
};

const tint = (hex: string, amount: number) => {
  const color = hexToRgb(hex);
  return rgb(
    color.red + (1 - color.red) * amount,
    color.green + (1 - color.green) * amount,
    color.blue + (1 - color.blue) * amount,
  );
};

const assertEncodable = (font: PDFFont, text: string) => {
  try {
    font.encodeText(text);
  } catch {
    throw new UnsupportedTextError(text);
  }
};

const unkernedWidth = (font: PDFFont, value: string, size: number) =>
  Array.from(value).reduce((sum, char) => sum + font.widthOfTextAtSize(char, size), 0);

const measure = (font: PDFFont, value: string, size: number) => unkernedWidth(font, value, size);

const drawRun = (page: PDFPage, value: string, x: number, y: number, size: number, font: PDFFont, color: RGB) => {
  const space = font.widthOfTextAtSize(" ", size);
  let cursor = x;
  for (const word of value.split(" ")) {
    if (word) page.drawText(word, { x: cursor, y, size, font, color });
    cursor += (word ? unkernedWidth(font, word, size) : 0) + space;
  }
};

const wrap = (text: string, font: PDFFont, size: number, width: number) => {
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

const pdfMoney = (font: PDFFont, value: number, currency: string, locale: string) => {
  const attempts: Intl.NumberFormatOptions[] = [
    { style: "currency", currency },
    { style: "currency", currency, currencyDisplay: "code" },
  ];
  for (const options of attempts) {
    try {
      const text = new Intl.NumberFormat(locale, options).format(value).replace(/ | /g, " ");
      font.encodeText(text);
      return text;
    } catch {
      continue;
    }
  }
  return `${currency} ${value.toFixed(2)}`;
};

const embedLogo = async (pdf: PDFDocument, dataUrl: string | null): Promise<PDFImage | null> => {
  if (!dataUrl) return null;
  const bytes = await (await fetch(dataUrl)).arrayBuffer();
  return dataUrl.startsWith("data:image/png") ? pdf.embedPng(bytes) : pdf.embedJpg(bytes);
};

type Ctx = {
  pdf: PDFDocument;
  page: PDFPage;
  y: number;
  regular: PDFFont;
  bold: PDFFont;
};

const text = (ctx: Ctx, value: string, x: number, y: number, size: number, font: PDFFont, color = INK) => {
  assertEncodable(font, value);
  drawRun(ctx.page, value, x, y, size, font, color);
};

const rightText = (ctx: Ctx, value: string, right: number, y: number, size: number, font: PDFFont, color = INK) =>
  text(ctx, value, right - measure(font, value, size), y, size, font, color);

const newPage = (ctx: Ctx, accent: string) => {
  ctx.page = ctx.pdf.addPage([PAGE.width, PAGE.height]);
  ctx.page.drawRectangle({ x: 0, y: PAGE.height - 6, width: PAGE.width, height: 6, color: hexToRgb(accent) });
  ctx.y = PAGE.height - MARGIN;
};

const collectStrings = (invoice: Invoice, labels: InvoicePdfLabels, locale: string) => {
  const sample = (() => {
    try {
      return new Intl.NumberFormat(locale, { style: "currency", currency: invoice.currency }).format(-1234567.89);
    } catch {
      return invoice.currency;
    }
  })();
  return [
    ...Object.values(labels),
    invoice.title,
    invoice.number,
    invoice.from.name,
    invoice.from.details,
    invoice.to.name,
    invoice.to.details,
    invoice.notes,
    invoice.terms,
    formatDate(invoice.issueDate, locale),
    formatDate(invoice.dueDate, locale),
    sample,
    ...invoice.items.map((item) => item.description),
  ].map((value) => value.replace(/[\n\u00a0\u202f]/g, " "));
};

const canEncode = (font: PDFFont, value: string) => {
  try {
    font.encodeText(value);
    return true;
  } catch {
    return false;
  }
};

const PLAIN_GLYPHS = { locl: false, liga: false, clig: false, calt: false, dlig: false };

const embedFonts = async (pdf: PDFDocument, strings: string[], locale: string) => {
  const helvetica = await pdf.embedFont(StandardFonts.Helvetica);
  if (strings.every((value) => canEncode(helvetica, value)))
    return { regular: helvetica, bold: await pdf.embedFont(StandardFonts.HelveticaBold) };
  const joined = strings.join(" ");
  const all = `${joined} ${joined.toUpperCase()} 0123456789/-.,:()%`;
  const [{ default: fontkit }, pack] = await Promise.all([import("@pdf-lib/fontkit"), loadFontPack(pickFontPack(all, locale))]);
  pdf.registerFontkit(fontkit);
  const [regularBytes, boldBytes] = await Promise.all([subsetFont(pack.regular, all), subsetFont(pack.bold, all)]);
  const face = fontkit.create(regularBytes);
  for (const char of all) {
    const codePoint = char.codePointAt(0) ?? 0;
    if (codePoint > 32 && !face.hasGlyphForCodePoint(codePoint)) throw new UnsupportedTextError(char);
  }
  return {
    regular: await pdf.embedFont(regularBytes, { subset: false, features: PLAIN_GLYPHS }),
    bold: await pdf.embedFont(boldBytes, { subset: false, features: PLAIN_GLYPHS }),
  };
};

export const buildInvoicePdf = async (invoice: Invoice, labels: InvoicePdfLabels, locale: string) => {
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${invoice.title} ${invoice.number}`.trim());
  pdf.setProducer("ConvertLime");
  pdf.setCreator("ConvertLime Invoice Maker");
  const { regular, bold } = await embedFonts(pdf, collectStrings(invoice, labels, locale), locale);
  const ctx: Ctx = { pdf, page: pdf.addPage([PAGE.width, PAGE.height]), y: 0, regular, bold };
  const accent = invoice.accent;
  const accentColor = hexToRgb(accent);
  const right = PAGE.width - MARGIN;
  const money = (value: number) => pdfMoney(regular, value, invoice.currency, locale);
  const totals = computeTotals(invoice);

  ctx.page.drawRectangle({ x: 0, y: PAGE.height - 6, width: PAGE.width, height: 6, color: accentColor });
  ctx.y = PAGE.height - MARGIN;

  const logo = await embedLogo(pdf, invoice.logo);
  let leftBottom = ctx.y;
  if (logo) {
    const scale = Math.min(150 / logo.width, 56 / logo.height, 1);
    const w = logo.width * scale;
    const h = logo.height * scale;
    ctx.page.drawImage(logo, { x: MARGIN, y: ctx.y - h, width: w, height: h });
    leftBottom = ctx.y - h - 14;
  }
  const fromName = invoice.from.name.trim();
  if (fromName) {
    text(ctx, fromName, MARGIN, leftBottom - 14, 14, bold);
    leftBottom -= 20;
  }
  for (const line of wrap(invoice.from.details, regular, 9.5, 230)) {
    text(ctx, line, MARGIN, leftBottom - 12, 9.5, regular, MUTED);
    leftBottom -= 13;
  }

  const title = invoice.title.trim().toUpperCase() || "INVOICE";
  rightText(ctx, title, right, ctx.y - 24, 24, bold, accentColor);
  let metaY = ctx.y - 46;
  const meta: [string, string][] = [
    [labels.number, invoice.number],
    [labels.issued, formatDate(invoice.issueDate, locale)],
    [labels.due, formatDate(invoice.dueDate, locale)],
  ];
  for (const [label, value] of meta) {
    if (!value) continue;
    rightText(ctx, value, right, metaY, 9.5, bold);
    rightText(ctx, label, right - measure(bold, value, 9.5) - 10, metaY, 9.5, regular, MUTED);
    metaY -= 14;
  }

  ctx.y = Math.min(leftBottom, metaY) - 22;
  text(ctx, labels.billTo.toUpperCase(), MARGIN, ctx.y, 8, bold, accentColor);
  ctx.y -= 16;
  if (invoice.to.name.trim()) {
    text(ctx, invoice.to.name.trim(), MARGIN, ctx.y, 11.5, bold);
    ctx.y -= 15;
  }
  for (const line of wrap(invoice.to.details, regular, 9.5, 260)) {
    text(ctx, line, MARGIN, ctx.y, 9.5, regular, MUTED);
    ctx.y -= 13;
  }
  ctx.y -= 18;

  const cols = { qty: right - 200, rate: right - 110, amount: right };
  const descWidth = cols.qty - MARGIN - 30;
  const header = () => {
    ctx.page.drawRectangle({ x: MARGIN - 8, y: ctx.y - 8, width: right - MARGIN + 16, height: 24, color: tint(accent, 0.9) });
    text(ctx, labels.description.toUpperCase(), MARGIN, ctx.y, 8, bold, accentColor);
    rightText(ctx, labels.quantity.toUpperCase(), cols.qty, ctx.y, 8, bold, accentColor);
    rightText(ctx, labels.rate.toUpperCase(), cols.rate, ctx.y, 8, bold, accentColor);
    rightText(ctx, labels.amount.toUpperCase(), cols.amount, ctx.y, 8, bold, accentColor);
    ctx.y -= 26;
  };
  header();

  for (const item of invoice.items) {
    const lines = wrap(item.description || " ", regular, 10, descWidth);
    const height = lines.length * 13 + 16;
    if (ctx.y - height < MARGIN + 40) {
      newPage(ctx, accent);
      header();
    }
    lines.forEach((line, index) => text(ctx, line, MARGIN, ctx.y - index * 13, 10, regular));
    rightText(ctx, new Intl.NumberFormat(locale, { maximumFractionDigits: 3 }).format(item.quantity), cols.qty, ctx.y, 10, regular);
    rightText(ctx, money(item.rate), cols.rate, ctx.y, 10, regular);
    rightText(ctx, money(lineAmount(item)), cols.amount, ctx.y, 10, bold);
    ctx.y -= height;
    ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y + 11 }, end: { x: right, y: ctx.y + 11 }, thickness: 0.6, color: LINE });
  }

  const rows: [string, string][] = [[labels.subtotal, money(totals.subtotal)]];
  if (totals.discount) rows.push([`${labels.discount} (${invoice.discountRate}%)`, `-${money(totals.discount)}`]);
  if (totals.tax) rows.push([`${labels.tax} (${invoice.taxRate}%)`, money(totals.tax)]);
  if (totals.shipping) rows.push([labels.shipping, money(totals.shipping)]);
  const needed = rows.length * 16 + 70 + (totals.paid ? 32 : 0);
  if (ctx.y - needed < MARGIN) newPage(ctx, accent);
  ctx.y -= 10;
  const labelX = right - 190;
  for (const [label, value] of rows) {
    text(ctx, label, labelX, ctx.y, 10, regular, MUTED);
    rightText(ctx, value, right, ctx.y, 10, regular);
    ctx.y -= 16;
  }
  ctx.y -= 6;
  ctx.page.drawLine({ start: { x: labelX, y: ctx.y + 4 }, end: { x: right, y: ctx.y + 4 }, thickness: 1.5, color: accentColor });
  ctx.y -= 18;
  text(ctx, labels.total.toUpperCase(), labelX, ctx.y + 2, 8.5, bold, accentColor);
  rightText(ctx, money(totals.total), right, ctx.y, 15, bold);
  ctx.y -= 26;
  if (totals.paid) {
    text(ctx, labels.paid, labelX, ctx.y, 10, regular, MUTED);
    rightText(ctx, `-${money(totals.paid)}`, right, ctx.y, 10, regular);
    ctx.y -= 16;
    text(ctx, labels.balance, labelX, ctx.y, 11, bold);
    rightText(ctx, money(totals.balance), right, ctx.y, 12, bold);
    ctx.y -= 20;
  }

  for (const [label, body] of [
    [labels.notes, invoice.notes],
    [labels.terms, invoice.terms],
  ] as const) {
    if (!body.trim()) continue;
    const lines = wrap(body, regular, 9.5, right - MARGIN);
    if (ctx.y - (lines.length * 13 + 30) < MARGIN) newPage(ctx, accent);
    ctx.y -= 14;
    text(ctx, label.toUpperCase(), MARGIN, ctx.y, 8, bold, accentColor);
    ctx.y -= 15;
    for (const line of lines) {
      text(ctx, line, MARGIN, ctx.y, 9.5, regular, MUTED);
      ctx.y -= 13;
    }
  }

  const pages = pdf.getPages();
  if (pages.length > 1) {
    pages.forEach((page, index) => {
      const label = `${index + 1} / ${pages.length}`;
      drawRun(page, invoice.number, MARGIN, 24, 8, regular, MUTED);
      drawRun(page, label, right - measure(regular, label, 8), 24, 8, regular, MUTED);
    });
  }

  return pdf.save();
};
