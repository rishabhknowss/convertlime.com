import { canvasToBlob, flattenOnWhite } from "@/lib/convert/canvas";

const A4 = { width: 595.28, height: 841.89 };
const MARGIN = 24;

export type PageSize = "fit" | "a4";

export const canvasesToPdf = async (canvases: HTMLCanvasElement[], pageSize: PageSize) => {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  for (const canvas of canvases) {
    const jpg = await canvasToBlob(flattenOnWhite(canvas), "image/jpeg", 0.92);
    const image = await pdf.embedJpg(await jpg.arrayBuffer());
    if (pageSize === "fit") {
      pdf.addPage([image.width, image.height]).drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
      continue;
    }
    const landscape = image.width > image.height;
    const pageWidth = landscape ? A4.height : A4.width;
    const pageHeight = landscape ? A4.width : A4.height;
    const scale = Math.min(
      (pageWidth - MARGIN * 2) / image.width,
      (pageHeight - MARGIN * 2) / image.height,
      1,
    );
    const width = image.width * scale;
    const height = image.height * scale;
    pdf.addPage([pageWidth, pageHeight]).drawImage(image, {
      x: (pageWidth - width) / 2,
      y: (pageHeight - height) / 2,
      width,
      height,
    });
  }
  const bytes = await pdf.save();
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
};
