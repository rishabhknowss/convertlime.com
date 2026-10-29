import type { PDFPage } from "pdf-lib";
import { MARGIN, PAGE, hexToRgb } from "@/lib/invoice/pdf/primitives";
import { date, embedImage, fitImage, labelText, rightText, text, type PdfCtx } from "@/lib/invoice/pdf/doc";
import { drawItems, drawNotes, drawTotals, partyBlock } from "@/lib/invoice/pdf/blocks";
import { coverSource, renderCoverForPdf } from "@/lib/invoice/covers";
import type { InvoiceTemplate } from "@/lib/invoice/templates";

const drawCover = async (ctx: PdfCtx, template: InvoiceTemplate) => {
  const source = coverSource(ctx.invoice.cover, ctx.invoice.accent);
  if (!source || template.cover === "none") return PAGE.height - MARGIN;
  const fade = template.cover === "fade";
  const frame = fade
    ? { x: 0, top: PAGE.height, width: PAGE.width, height: 176, radius: 0 }
    : { x: MARGIN, top: PAGE.height - 34, width: PAGE.width - MARGIN * 2, height: 118, radius: 10 };
  const rendered = await renderCoverForPdf(source, {
    width: frame.width,
    height: frame.height,
    radius: frame.radius,
    fade,
    paper: template.theme.paper,
  });
  const image = await embedImage(ctx.pdf, rendered);
  if (!image) return PAGE.height - MARGIN;
  ctx.page.drawImage(image, { x: frame.x, y: frame.top - frame.height, width: frame.width, height: frame.height });
  return frame.top - frame.height - (fade ? 8 : 34);
};

export const drawStudio = async (ctx: PdfCtx, template: InvoiceTemplate) => {
  const right = PAGE.width - MARGIN;
  const paperBackground = (page: PDFPage) => {
    if (template.theme.dark)
      page.drawRectangle({ x: 0, y: 0, width: PAGE.width, height: PAGE.height, color: hexToRgb(template.theme.paper) });
  };
  ctx.decorate = paperBackground;
  ctx.continueAt = MARGIN;
  paperBackground(ctx.page);
  ctx.y = await drawCover(ctx, template);

  const logo = await embedImage(ctx.pdf, ctx.invoice.logo);
  const rowTop = ctx.y;
  let logoBottom = rowTop;
  if (logo) {
    const size = fitImage(logo, 120, 34);
    ctx.page.drawImage(logo, { x: MARGIN, y: rowTop - size.height, ...size });
    logoBottom = rowTop - size.height;
  }

  const title = ctx.invoice.title.trim();
  if (template.titleStyle === "caps") {
    rightText(ctx, title.toUpperCase(), right, rowTop - 16, 17, ctx.bold, ctx.theme.ink, 2.6);
    rightText(ctx, ctx.invoice.number, right, rowTop - 38, 13, ctx.regular);
    ctx.y = Math.min(logoBottom, rowTop - 44) - 20;
    ctx.page.drawLine({ start: { x: MARGIN, y: ctx.y }, end: { x: right, y: ctx.y }, thickness: 0.8, color: ctx.theme.line });
    ctx.y -= 30;
  } else {
    rightText(ctx, ctx.invoice.number, right, rowTop - 10, 10, ctx.bold);
    ctx.y = Math.min(logoBottom, rowTop - 14) - 58;
    text(ctx, title.toUpperCase(), MARGIN - 3, ctx.y, 58, ctx.bold);
    ctx.y -= 42;
  }

  const width = right - MARGIN;
  const fromBottom = partyBlock(ctx, ctx.labels.from, ctx.invoice.from, MARGIN, ctx.y, width * 0.36, 11);
  const toBottom = partyBlock(ctx, ctx.labels.billTo, ctx.invoice.to, MARGIN + width * 0.42, ctx.y, width * 0.34, 11);
  let metaY = ctx.y;
  for (const [label, value] of [
    [ctx.labels.issued, date(ctx, ctx.invoice.issueDate)],
    [ctx.labels.due, date(ctx, ctx.invoice.dueDate)],
  ] as const) {
    if (!value) continue;
    labelText(ctx, label, right, metaY, "right");
    rightText(ctx, value, right, metaY - 15, 11, ctx.regular);
    metaY -= 34;
  }
  ctx.y = Math.min(fromBottom, toBottom, metaY) - 22;

  drawItems(ctx, "rule", { left: MARGIN, right, bottom: MARGIN + 40 });
  drawTotals(ctx, "rule", { right, bottom: MARGIN });
  drawNotes(ctx, { left: MARGIN, width: width * 0.6, bottom: MARGIN });
};
