import { mix, wrap } from "@/lib/invoice/pdf/primitives";
import { ensureSpace, labelText, money, quantity, rightText, text, type PdfCtx } from "@/lib/invoice/pdf/doc";
import { lineAmount } from "@/lib/invoice/totals";

type Columns = { left: number; right: number; bottom: number };

export const drawItems = (ctx: PdfCtx, style: "tint" | "rule", { left, right, bottom }: Columns) => {
  const qty = right - 196;
  const rate = right - 104;
  const descWidth = qty - left - 34;
  const header = () => {
    if (style === "tint") {
      ctx.page.drawRectangle({
        x: left - 8,
        y: ctx.y - 8,
        width: right - left + 16,
        height: 24,
        color: mix(ctx.theme.accent, ctx.theme.paper, 0.88),
      });
    }
    labelText(ctx, ctx.labels.description, left, ctx.y);
    labelText(ctx, ctx.labels.quantity, qty, ctx.y, "right");
    labelText(ctx, ctx.labels.rate, rate, ctx.y, "right");
    labelText(ctx, ctx.labels.amount, right, ctx.y, "right");
    if (style === "rule") {
      ctx.page.drawLine({ start: { x: left, y: ctx.y - 9 }, end: { x: right, y: ctx.y - 9 }, thickness: 0.8, color: ctx.theme.line });
      ctx.y -= 30;
    } else {
      ctx.y -= 28;
    }
  };
  header();
  ctx.invoice.items.forEach((item) => {
    const lines = wrap(item.description || " ", ctx.regular, 10, descWidth);
    const height = lines.length * 13 + 17;
    ensureSpace(ctx, height, bottom, header);
    lines.forEach((line, index) => text(ctx, line, left, ctx.y - index * 13, 10, ctx.regular));
    const quiet = style === "rule" ? ctx.theme.muted : ctx.theme.ink;
    rightText(ctx, quantity(ctx, item.quantity), qty, ctx.y, 10, ctx.regular, quiet);
    rightText(ctx, money(ctx, item.rate), rate, ctx.y, 10, ctx.regular, quiet);
    rightText(ctx, money(ctx, lineAmount(item)), right, ctx.y, 10, ctx.bold);
    ctx.y -= height;
    ctx.page.drawLine({
      start: { x: left, y: ctx.y + 11 },
      end: { x: right, y: ctx.y + 11 },
      thickness: 0.6,
      color: ctx.theme.line,
    });
  });
};

export const drawTotals = (ctx: PdfCtx, style: "accentRule" | "rule", { right, bottom }: { right: number; bottom: number }) => {
  const { totals, invoice, labels, theme } = ctx;
  const rows: [string, string][] = [[labels.subtotal, money(ctx, totals.subtotal)]];
  if (totals.discount) rows.push([`${labels.discount} (${invoice.discountRate}%)`, `-${money(ctx, totals.discount)}`]);
  if (totals.tax) rows.push([`${labels.tax} (${invoice.taxRate}%)`, money(ctx, totals.tax)]);
  if (totals.shipping) rows.push([labels.shipping, money(ctx, totals.shipping)]);
  ensureSpace(ctx, rows.length * 16 + 70 + (totals.paid ? 36 : 0), bottom);
  const left = right - 200;
  ctx.y -= 8;
  for (const [label, value] of rows) {
    text(ctx, label, left, ctx.y, 10, ctx.regular, theme.muted);
    rightText(ctx, value, right, ctx.y, 10, ctx.regular);
    ctx.y -= 17;
  }
  ctx.y -= 4;
  const ruleColor = style === "accentRule" ? theme.accent : theme.ink;
  ctx.page.drawLine({
    start: { x: left, y: ctx.y + 6 },
    end: { x: right, y: ctx.y + 6 },
    thickness: style === "accentRule" ? 1.5 : 0.8,
    color: ruleColor,
  });
  ctx.y -= 16;
  if (style === "accentRule") {
    text(ctx, labels.total.toUpperCase(), left, ctx.y + 2, 8.5, ctx.bold, theme.accent);
    rightText(ctx, money(ctx, totals.total), right, ctx.y, 15, ctx.bold);
  } else {
    text(ctx, labels.total, left, ctx.y, 11, ctx.bold);
    rightText(ctx, money(ctx, totals.total), right, ctx.y, 12, ctx.bold);
  }
  ctx.y -= 24;
  if (!totals.paid) return;
  text(ctx, labels.paid, left, ctx.y, 10, ctx.regular, theme.muted);
  rightText(ctx, `-${money(ctx, totals.paid)}`, right, ctx.y, 10, ctx.regular);
  ctx.y -= 17;
  text(ctx, labels.balance, left, ctx.y, 11, ctx.bold);
  rightText(ctx, money(ctx, totals.balance), right, ctx.y, 12, ctx.bold);
  ctx.y -= 22;
};

export const drawNotes = (ctx: PdfCtx, { left, width, bottom }: { left: number; width: number; bottom: number }) => {
  const sections: [string, string][] = [
    [ctx.labels.terms, ctx.invoice.terms],
    [ctx.labels.notes, ctx.invoice.notes],
  ];
  for (const [label, body] of sections) {
    if (!body.trim()) continue;
    const lines = wrap(body, ctx.regular, 9.5, width);
    ensureSpace(ctx, lines.length * 13 + 30, bottom);
    ctx.y -= 14;
    labelText(ctx, label, left, ctx.y);
    ctx.y -= 15;
    for (const line of lines) {
      text(ctx, line, left, ctx.y, 9.5, ctx.regular, ctx.theme.muted);
      ctx.y -= 13;
    }
  }
};

export const partyBlock = (
  ctx: PdfCtx,
  label: string,
  party: { name: string; details: string },
  x: number,
  y: number,
  width: number,
  nameSize = 11,
) => {
  let cursor = y;
  labelText(ctx, label, x, cursor);
  cursor -= 16;
  if (party.name.trim()) {
    text(ctx, party.name.trim(), x, cursor, nameSize, ctx.bold);
    cursor -= nameSize + 4;
  }
  for (const line of wrap(party.details, ctx.regular, 9, width)) {
    text(ctx, line, x, cursor, 9, ctx.regular, ctx.theme.muted);
    cursor -= 12.5;
  }
  return cursor;
};
