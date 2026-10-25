import type { FormatId } from "@/data/formats";
import { canvasToBlob, flattenOnWhite } from "@/lib/convert/canvas";
import {
  writeAvif,
  writeBmp,
  writeGif,
  writeIco,
  writeTiff,
  writeWebp,
} from "@/lib/convert/writers";

export type EncodeOptions = { quality: number };

export const encodeCanvas = (
  canvas: HTMLCanvasElement,
  to: FormatId,
  { quality }: EncodeOptions,
): Promise<Blob> => {
  switch (to) {
    case "jpg":
    case "jpeg":
    case "jfif":
      return canvasToBlob(flattenOnWhite(canvas), "image/jpeg", quality);
    case "png":
      return canvasToBlob(canvas, "image/png");
    case "webp":
      return writeWebp(canvas, quality);
    case "avif":
      return writeAvif(canvas, quality);
    case "gif":
      return writeGif(canvas);
    case "bmp":
      return Promise.resolve(writeBmp(canvas));
    case "ico":
      return writeIco(canvas);
    case "tiff":
      return writeTiff(canvas);
    default:
      return Promise.reject(new Error(`Saving as ${to.toUpperCase()} is not supported here.`));
  }
};
