import type { PDFDocument, PDFFont, PDFImage, PDFPage, RGB } from "pdf-lib";
import { PAGE, drawRun, formatPdfMoney, measure } from "@/lib/invoice/pdf/primitives";
import { formatDate } from "@/lib/invoice/money";
import type { Invoice, InvoiceTotals } from "@/lib/invoice/types";
import type { InvoicePdfLabels } from "@/lib/invoice/pdf/labels";

export type PdfTheme = {
  paper: RGB;
  ink: RGB;
  muted: RGB;
  faint: RGB;
  line: RGB;
  accent: RGB;
};

export type LabelStyle = {
  size: number;
  bold: boolean;
  color: RGB;
  tracking: number;
  format: (label: string) => string;
};

export type PdfCtx = {
  pdf: PDFDocument;
  page: PDFPage;
  y: number;
  regular: PDFFont;
  bold: PDFFont;
  invoice: Invoice;
  labels: InvoicePdfLabels;
  locale: string;
  totals: InvoiceTotals;
  theme: PdfTheme;
  label: LabelStyle;
  decorate: (page: PDFPage) => void;
  continueAt: number;
};

export const text = (
  ctx: PdfCtx,
  value: string,
  x: number,
  y: number,
  size: number,
  font: PDFFont,
  color: RGB = ctx.theme.ink,
  tracking = 0,
) => drawRun(ctx.page, value, x, y, size, font, color, tracking);

export const rightText = (
  ctx: PdfCtx,
  value: string,
  right: number,
  y: number,
  size: number,
  font: PDFFont,
  color: RGB = ctx.theme.ink,
  tracking = 0,
) => text(ctx, value, right - measure(font, value, size, tracking), y, size, font, color, tracking);

export const labelText = (ctx: PdfCtx, value: string, x: number, y: number, align: "left" | "right" = "left") => {
  const style = ctx.label;
  const font = style.bold ? ctx.bold : ctx.regular;
  const formatted = style.format(value);
  if (align === "right") rightText(ctx, formatted, x, y, style.size, font, style.color, style.tracking);
  else text(ctx, formatted, x, y, style.size, font, style.color, style.tracking);
};

export const addPage = (ctx: PdfCtx) => {
  ctx.page = ctx.pdf.addPage([PAGE.width, PAGE.height]);
  ctx.decorate(ctx.page);
  ctx.y = PAGE.height - ctx.continueAt;
};

export const ensureSpace = (ctx: PdfCtx, needed: number, bottom: number, onNewPage?: () => void) => {
  if (ctx.y - needed >= bottom) return false;
  addPage(ctx);
  onNewPage?.();
  return true;
};

export const money = (ctx: PdfCtx, value: number) => formatPdfMoney(value, ctx.invoice.currency, ctx.locale);

export const quantity = (ctx: PdfCtx, value: number) =>
  new Intl.NumberFormat(ctx.locale, { maximumFractionDigits: 3 }).format(value);

export const date = (ctx: PdfCtx, iso: string) => formatDate(iso, ctx.locale);

export const embedImage = async (pdf: PDFDocument, dataUrl: string | null): Promise<PDFImage | null> => {
  if (!dataUrl) return null;
  const bytes = await (await fetch(dataUrl)).arrayBuffer();
  return dataUrl.startsWith("data:image/png") ? pdf.embedPng(bytes) : pdf.embedJpg(bytes);
};

export const fitImage = (image: PDFImage, maxWidth: number, maxHeight: number) => {
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  return { width: image.width * scale, height: image.height * scale };
};

export const drawPageNumbers = (ctx: PdfCtx, left: number, right: number) => {
  const pages = ctx.pdf.getPages();
  if (pages.length < 2) return;
  pages.forEach((page, index) => {
    const label = `${index + 1} / ${pages.length}`;
    drawRun(page, ctx.invoice.number, left, 24, 8, ctx.regular, ctx.theme.faint);
    drawRun(page, label, right - measure(ctx.regular, label, 8), 24, 8, ctx.regular, ctx.theme.faint);
  });
};
