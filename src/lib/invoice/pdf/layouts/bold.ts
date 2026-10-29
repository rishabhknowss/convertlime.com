import { rgb, type PDFPage } from "pdf-lib";
import { PAGE, hexToRgb, luminance, mix, wrap } from "@/lib/invoice/pdf/primitives";
import { addPage, date, embedImage, fitImage, labelText, money, quantity, rightText, text, type PdfCtx } from "@/lib/invoice/pdf/doc";
import { lineAmount } from "@/lib/invoice/totals";

const PAD = 40;
const TABLE_BG = hexToRgb("#eeebe6");
const FOOT_BG = hexToRgb("#e2ddd3");
const RULE = hexToRgb("#d4d0c9");
const BLACK = rgb(0.07, 0.07, 0.07);
const WHITE = rgb(1, 1, 1);

const block = (page: PDFPage, top: number, height: number, color: typeof TABLE_BG) =>
  page.drawRectangle({ x: 0, y: top - height, width: PAGE.width, height, color });

export const drawBold = async (ctx: PdfCtx) => {
  const right = PAGE.width - PAD;
  const accent = ctx.theme.accent;
  const onAccent = luminance(accent) < 0.5 ? WHITE : BLACK;
  const baseLabel = { ...ctx.label, color: BLACK };
  const withLabelColor = (color: typeof BLACK, draw: () => void) => {
    ctx.label = { ...baseLabel, color };
    draw();
    ctx.label = baseLabel;
  };

  const headerHeight = 250;
  block(ctx.page, PAGE.height, headerHeight, accent);
  const logo = await embedImage(ctx.pdf, ctx.invoice.logo);
  if (logo) {
    const size = fitImage(logo, 90, 30);
    ctx.page.drawImage(logo, { x: right - size.width, y: PAGE.height - PAD - size.height, ...size });
  }
  text(ctx, ctx.invoice.title.trim().toUpperCase(), PAD - 3, PAGE.height - PAD - 50, 62, ctx.bold, onAccent);
  const metaTop = PAGE.height - 150;
  let leftY = metaTop;
  for (const [label, value] of [
    [ctx.labels.issued, date(ctx, ctx.invoice.issueDate)],
    [ctx.labels.due, date(ctx, ctx.invoice.dueDate)],
    [ctx.labels.number, ctx.invoice.number],
  ] as const) {
    withLabelColor(onAccent, () => labelText(ctx, label, PAD, leftY));
    text(ctx, value.toUpperCase(), PAD, leftY - 12, 9, ctx.regular, onAccent);
    leftY -= 30;
  }
  const toX = PAD + 170;
  withLabelColor(onAccent, () => labelText(ctx, ctx.labels.billTo, toX, metaTop));
  let toY = metaTop - 12;
  for (const line of [ctx.invoice.to.name, ...wrap(ctx.invoice.to.details, ctx.regular, 9, right - toX)].filter(Boolean)) {
    text(ctx, line.toUpperCase(), toX, toY, 9, ctx.regular, onAccent);
    toY -= 12;
  }

  const qty = right - 200;
  const rate = right - 108;
  const amountLeft = rate + 14;
  const descWidth = qty - PAD - 60;
  const columnLines = [qty - 48, qty + 12, amountLeft];
  let segmentTop = PAGE.height - headerHeight;
  const tableBottom = 70;

  const tableHeader = () => {
    ctx.y -= 34;
    labelText(ctx, ctx.labels.description, PAD, ctx.y);
    labelText(ctx, ctx.labels.quantity, qty, ctx.y, "right");
    labelText(ctx, ctx.labels.rate, rate, ctx.y, "right");
    labelText(ctx, ctx.labels.amount, right, ctx.y, "right");
    ctx.y -= 18;
    ctx.page.drawLine({ start: { x: 0, y: ctx.y }, end: { x: PAGE.width, y: ctx.y }, thickness: 1.4, color: BLACK });
    ctx.y -= 26;
  };
  const closeSegment = (bottom: number) =>
    columnLines.forEach((x) =>
      ctx.page.drawLine({ start: { x, y: segmentTop }, end: { x, y: bottom }, thickness: 0.6, color: RULE }),
    );

  ctx.decorate = (page) => block(page, PAGE.height, PAGE.height, TABLE_BG);
  ctx.continueAt = 10;
  block(ctx.page, PAGE.height - headerHeight, PAGE.height - headerHeight, TABLE_BG);
  ctx.y = PAGE.height - headerHeight;
  tableHeader();

  for (const item of ctx.invoice.items) {
    const lines = wrap((item.description || " ").toUpperCase(), ctx.regular, 9, descWidth);
    const height = lines.length * 12 + 12;
    if (ctx.y - height < tableBottom) {
      closeSegment(tableBottom - 20);
      addPage(ctx);
      segmentTop = PAGE.height;
      tableHeader();
    }
    lines.forEach((line, index) => text(ctx, line, PAD, ctx.y - index * 12, 9, ctx.regular, BLACK));
    rightText(ctx, quantity(ctx, item.quantity), qty, ctx.y, 9, ctx.regular, BLACK);
    rightText(ctx, money(ctx, item.rate), rate, ctx.y, 9, ctx.regular, BLACK);
    rightText(ctx, money(ctx, lineAmount(item)), right, ctx.y, 9, ctx.regular, BLACK);
    ctx.y -= height;
  }

  const { totals, invoice, labels } = ctx;
  const rows: [string, string][] = [[labels.subtotal, money(ctx, totals.subtotal)]];
  if (totals.discount) rows.push([`${labels.discount} ${invoice.discountRate}%`, `-${money(ctx, totals.discount)}`]);
  if (totals.tax) rows.push([`${labels.tax} ${invoice.taxRate}%`, money(ctx, totals.tax)]);
  if (totals.shipping) rows.push([labels.shipping, money(ctx, totals.shipping)]);
  if (totals.paid) rows.push([labels.paid, `-${money(ctx, totals.paid)}`]);
  const totalsHeight = rows.length * 15 + 90;
  if (ctx.y - totalsHeight < tableBottom) {
    closeSegment(tableBottom - 20);
    addPage(ctx);
    segmentTop = PAGE.height;
  }
  ctx.y = Math.min(ctx.y - 30, ctx.y);
  closeSegment(ctx.y);
  ctx.page.drawLine({ start: { x: 0, y: ctx.y }, end: { x: PAGE.width, y: ctx.y }, thickness: 0.6, color: RULE });
  ctx.y -= 22;
  for (const [label, value] of rows) {
    labelText(ctx, label, PAD, ctx.y);
    rightText(ctx, value, right, ctx.y, 9, ctx.regular, BLACK);
    ctx.y -= 15;
  }
  ctx.y -= 8;
  ctx.page.drawLine({ start: { x: 0, y: ctx.y }, end: { x: PAGE.width, y: ctx.y }, thickness: 1.4, color: BLACK });
  ctx.y -= 26;
  labelText(ctx, totals.paid ? labels.balance : labels.total, PAD, ctx.y);
  rightText(ctx, money(ctx, totals.paid ? totals.balance : totals.total), right, ctx.y, 13, ctx.bold, BLACK);
  ctx.y -= 26;

  const sections = [
    [labels.terms, invoice.terms],
    [labels.notes, invoice.notes],
  ].filter(([, body]) => body.trim());
  const columnWidth = (right - PAD - 30) / 2;
  const sectionLines = sections.map(([label, body]) => [label, wrap(body, ctx.regular, 8.5, columnWidth)] as const);
  const footHeight = sections.length ? Math.max(...sectionLines.map(([, lines]) => lines.length)) * 11 + 52 : 0;
  const fromLines = [invoice.from.name, ...wrap(invoice.from.details, ctx.regular, 8.5, columnWidth)].filter(Boolean);
  const brandHeight = fromLines.length ? fromLines.length * 11 + 44 : 0;
  if (ctx.y - footHeight - brandHeight < 0) {
    addPage(ctx);
  }
  const bandsTop = Math.min(ctx.y, footHeight + brandHeight + 20);
  if (footHeight) {
    block(ctx.page, bandsTop, footHeight, FOOT_BG);
    ctx.page.drawLine({ start: { x: 0, y: bandsTop }, end: { x: PAGE.width, y: bandsTop }, thickness: 1.4, color: BLACK });
    if (sectionLines.length > 1) {
      const divider = PAD + columnWidth + 15;
      ctx.page.drawLine({ start: { x: divider, y: bandsTop - 18 }, end: { x: divider, y: bandsTop - footHeight + 18 }, thickness: 0.5, color: mix(BLACK, FOOT_BG, 0.82) });
    }
    sectionLines.forEach(([label, lines], index) => {
      const x = PAD + index * (columnWidth + 30);
      let y = bandsTop - 24;
      labelText(ctx, label, x, y);
      y -= 13;
      for (const line of lines) {
        text(ctx, line, x, y, 8.5, ctx.regular, BLACK);
        y -= 11;
      }
    });
  }
  if (brandHeight) {
    const top = bandsTop - footHeight;
    block(ctx.page, top, Math.max(brandHeight, top), accent);
    let y = top - 24;
    fromLines.forEach((line, index) => {
      text(ctx, index === 0 ? line.toUpperCase() : line, PAD, y, 8.5, index === 0 ? ctx.bold : ctx.regular, onAccent);
      y -= 11;
    });
  }
};
