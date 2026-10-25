import { canvasToBlob, flattenOnWhite, scaleCanvas } from "@/lib/convert/canvas";

const MIN_QUALITY = 0.35;
const STEPS = 7;

const bestUnder = async (canvas: HTMLCanvasElement, maxBytes: number) => {
  let low = MIN_QUALITY;
  let high = 0.95;
  let best: Blob | null = null;
  for (let step = 0; step < STEPS; step++) {
    const quality = (low + high) / 2;
    const blob = await canvasToBlob(canvas, "image/jpeg", quality);
    if (blob.size <= maxBytes) {
      best = blob;
      low = quality;
    } else {
      high = quality;
    }
  }
  return best;
};

export const jpegUnderSize = async (source: HTMLCanvasElement, maxBytes: number) => {
  let canvas = flattenOnWhite(source);
  for (let attempt = 0; attempt < 12; attempt++) {
    const blob = await bestUnder(canvas, maxBytes);
    if (blob) return blob;
    canvas = scaleCanvas(canvas, 0.85);
  }
  return canvasToBlob(canvas, "image/jpeg", MIN_QUALITY);
};

export const compressJpeg = (source: HTMLCanvasElement, quality: number) =>
  canvasToBlob(flattenOnWhite(source), "image/jpeg", quality);
