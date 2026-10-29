import { PDFDocument } from "pdf-lib";
import { MARGIN, PAGE, hexToRgb } from "@/lib/invoice/pdf/primitives";
import { drawPageNumbers, type LabelStyle, type PdfCtx, type PdfTheme } from "@/lib/invoice/pdf/doc";
import { embedFonts } from "@/lib/invoice/pdf/fonts";
import { drawClassic } from "@/lib/invoice/pdf/layouts/classic";
import { drawStudio } from "@/lib/invoice/pdf/layouts/studio";
import { drawBold } from "@/lib/invoice/pdf/layouts/bold";
import type { InvoicePdfLabels } from "@/lib/invoice/pdf/labels";
import { formatDate } from "@/lib/invoice/money";
import { getTemplate, type InvoiceTemplate } from "@/lib/invoice/templates";
import { computeTotals } from "@/lib/invoice/totals";
import type { Invoice } from "@/lib/invoice/types";

export { UnsupportedTextError } from "@/lib/invoice/pdf/fonts";
export { pickPdfLabels, type InvoicePdfLabels } from "@/lib/invoice/pdf/labels";

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
  ].map((value) => value.replace(/[\n  ]/g, " "));
};

const upper = (label: string) => label.toUpperCase();

const labelStyle = (template: InvoiceTemplate, theme: PdfTheme): LabelStyle => {
  if (template.layout === "classic") return { size: 8, bold: true, color: theme.accent, tracking: 0.4, format: upper };
  if (template.layout === "bold") return { size: 8.5, bold: true, color: theme.ink, tracking: 0, format: (label) => `(${upper(label)})` };
  return { size: 7, bold: false, color: theme.faint, tracking: 0.9, format: upper };
};

export const buildInvoicePdf = async (invoice: Invoice, labels: InvoicePdfLabels, locale: string) => {
  const template = getTemplate(invoice.template);
  const pdf = await PDFDocument.create();
  pdf.setTitle(`${invoice.title} ${invoice.number}`.trim());
  pdf.setProducer("ConvertLime");
  pdf.setCreator("ConvertLime Invoice Generator");
  const { regular, bold } = await embedFonts(pdf, collectStrings(invoice, labels, locale), locale, template.family);
  const theme: PdfTheme = {
    paper: hexToRgb(template.theme.paper),
    ink: hexToRgb(template.theme.ink),
    muted: hexToRgb(template.theme.muted),
    faint: hexToRgb(template.theme.faint),
    line: hexToRgb(template.theme.line),
    accent: hexToRgb(invoice.accent),
  };
  const ctx: PdfCtx = {
    pdf,
    page: pdf.addPage([PAGE.width, PAGE.height]),
    y: PAGE.height - MARGIN,
    regular,
    bold,
    invoice,
    labels,
    locale,
    totals: computeTotals(invoice),
    theme,
    label: labelStyle(template, theme),
    decorate: () => {},
    continueAt: MARGIN,
  };
  if (template.layout === "studio") await drawStudio(ctx, template);
  else if (template.layout === "bold") await drawBold(ctx);
  else await drawClassic(ctx);
  const side = template.layout === "bold" ? 40 : MARGIN;
  drawPageNumbers(ctx, side, PAGE.width - side);
  return pdf.save();
};
