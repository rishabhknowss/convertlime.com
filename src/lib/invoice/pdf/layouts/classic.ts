import { MARGIN, PAGE, measure, wrap } from "@/lib/invoice/pdf/primitives";
import { date, embedImage, fitImage, rightText, text, type PdfCtx } from "@/lib/invoice/pdf/doc";
import { drawItems, drawNotes, drawTotals, partyBlock } from "@/lib/invoice/pdf/blocks";

export const drawClassic = async (ctx: PdfCtx) => {
  const right = PAGE.width - MARGIN;
  const accentBar = (page: typeof ctx.page) =>
    page.drawRectangle({ x: 0, y: PAGE.height - 6, width: PAGE.width, height: 6, color: ctx.theme.accent });
  ctx.decorate = accentBar;
  ctx.continueAt = MARGIN;
  accentBar(ctx.page);
  ctx.y = PAGE.height - MARGIN;

  const logo = await embedImage(ctx.pdf, ctx.invoice.logo);
  let left = ctx.y;
  if (logo) {
    const size = fitImage(logo, 150, 56);
    ctx.page.drawImage(logo, { x: MARGIN, y: ctx.y - size.height, ...size });
    left = ctx.y - size.height - 14;
  }
  if (ctx.invoice.from.name.trim()) {
    text(ctx, ctx.invoice.from.name.trim(), MARGIN, left - 14, 14, ctx.bold);
    left -= 20;
  }
  for (const line of wrap(ctx.invoice.from.details, ctx.regular, 9.5, 230)) {
    text(ctx, line, MARGIN, left - 12, 9.5, ctx.regular, ctx.theme.muted);
    left -= 13;
  }

  rightText(ctx, ctx.invoice.title.trim().toUpperCase(), right, ctx.y - 24, 24, ctx.bold, ctx.theme.accent);
  let meta = ctx.y - 46;
  for (const [label, value] of [
    [ctx.labels.number, ctx.invoice.number],
    [ctx.labels.issued, date(ctx, ctx.invoice.issueDate)],
    [ctx.labels.due, date(ctx, ctx.invoice.dueDate)],
  ] as const) {
    if (!value) continue;
    rightText(ctx, value, right, meta, 9.5, ctx.bold);
    rightText(ctx, label, right - measure(ctx.bold, value, 9.5) - 10, meta, 9.5, ctx.regular, ctx.theme.muted);
    meta -= 14;
  }

  ctx.y = partyBlock(ctx, ctx.labels.billTo, ctx.invoice.to, MARGIN, Math.min(left, meta) - 22, 260, 11.5) - 18;
  drawItems(ctx, "tint", { left: MARGIN, right, bottom: MARGIN + 40 });
  drawTotals(ctx, "accentRule", { right, bottom: MARGIN });
  drawNotes(ctx, { left: MARGIN, width: right - MARGIN, bottom: MARGIN });
};
