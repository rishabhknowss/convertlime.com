import { canvasToBlob, fitCanvas, pixels } from "@/lib/convert/canvas";

export const writeBmp = (canvas: HTMLCanvasElement) => {
  const { data, width, height } = pixels(canvas);
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const imageSize = rowSize * height;
  const buffer = new ArrayBuffer(54 + imageSize);
  const view = new DataView(buffer);
  view.setUint16(0, 0x4d42, true);
  view.setUint32(2, 54 + imageSize, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, imageSize, true);
  const bytes = new Uint8Array(buffer);
  for (let y = 0; y < height; y++) {
    const rowStart = 54 + (height - 1 - y) * rowSize;
    for (let x = 0; x < width; x++) {
      const source = (y * width + x) * 4;
      const alpha = data[source + 3] / 255;
      const target = rowStart + x * 3;
      bytes[target] = Math.round(data[source + 2] * alpha + 255 * (1 - alpha));
      bytes[target + 1] = Math.round(data[source + 1] * alpha + 255 * (1 - alpha));
      bytes[target + 2] = Math.round(data[source] * alpha + 255 * (1 - alpha));
    }
  }
  return new Blob([buffer], { type: "image/bmp" });
};

export const writeIco = async (canvas: HTMLCanvasElement) => {
  const icon = fitCanvas(canvas, 256);
  const png = new Uint8Array(await (await canvasToBlob(icon, "image/png")).arrayBuffer());
  const header = new ArrayBuffer(22);
  const view = new DataView(header);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);
  view.setUint8(6, icon.width >= 256 ? 0 : icon.width);
  view.setUint8(7, icon.height >= 256 ? 0 : icon.height);
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, png.byteLength, true);
  view.setUint32(18, 22, true);
  return new Blob([header, png], { type: "image/x-icon" });
};

export const writeGif = async (canvas: HTMLCanvasElement) => {
  const { GIFEncoder, quantize, applyPalette } = await import("gifenc");
  const { data, width, height } = pixels(canvas);
  const palette = quantize(data, 256, { format: "rgba4444", oneBitAlpha: true });
  const index = applyPalette(data, palette, "rgba4444");
  const transparentIndex = palette.findIndex((color) => color[3] === 0);
  const encoder = GIFEncoder();
  encoder.writeFrame(index, width, height, {
    palette,
    transparent: transparentIndex >= 0,
    transparentIndex: Math.max(0, transparentIndex),
  });
  encoder.finish();
  return new Blob([encoder.bytes() as BlobPart], { type: "image/gif" });
};

export const writeTiff = async (canvas: HTMLCanvasElement) => {
  const { default: UTIF } = await import("utif");
  const { data, width, height } = pixels(canvas);
  const buffer = UTIF.encodeImage(data.slice().buffer, width, height);
  return new Blob([buffer], { type: "image/tiff" });
};

export const writeAvif = async (canvas: HTMLCanvasElement, quality: number) => {
  const { default: encode } = await import("@jsquash/avif/encode");
  const buffer = await encode(pixels(canvas), { quality: Math.round(quality * 100) });
  return new Blob([buffer], { type: "image/avif" });
};

export const writeWebp = async (canvas: HTMLCanvasElement, quality: number) => {
  const blob = await canvasToBlob(canvas, "image/webp", quality);
  if (blob.type !== "image/webp")
    throw new Error("This browser cannot create WebP files. Try Chrome, Edge or Firefox.");
  return blob;
};
