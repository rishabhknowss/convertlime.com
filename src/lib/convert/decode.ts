import { context2d, createCanvas } from "@/lib/convert/canvas";

const HEIC_PATTERN = /\.(heic|heif|hif)$/i;
const TIFF_PATTERN = /\.(tiff?)$/i;
const SVG_PATTERN = /\.svg$/i;

const isHeic = (file: File) => HEIC_PATTERN.test(file.name) || /hei[cf]/i.test(file.type);
const isTiff = (file: File) => TIFF_PATTERN.test(file.name) || file.type === "image/tiff";
const isSvg = (file: File) => SVG_PATTERN.test(file.name) || file.type === "image/svg+xml";
const isAvif = (file: File) => /\.avif$/i.test(file.name) || file.type === "image/avif";

const drawSource = (source: CanvasImageSource, width: number, height: number) => {
  const canvas = createCanvas(width, height);
  context2d(canvas).drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
};

const loadImageElement = (blob: Blob) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("This file could not be read as an image."));
    };
    image.src = url;
  });

const isBlank = (canvas: HTMLCanvasElement) => {
  const { data } = context2d(canvas).getImageData(0, 0, canvas.width, canvas.height);
  const step = Math.max(4, Math.floor(data.length / 4 / 2000) * 4);
  for (let index = 3; index < data.length; index += step) if (data[index] !== 0) return false;
  return true;
};

const fitted = (width: number, height: number, maxSide?: number) => {
  const scale = maxSide ? Math.min(1, maxSide / Math.max(width, height)) : 1;
  return [width * scale, height * scale] as const;
};

const decodeBitmap = async (blob: Blob, maxSide?: number) => {
  const bitmap = await createImageBitmap(blob);
  const canvas = drawSource(bitmap, ...fitted(bitmap.width, bitmap.height, maxSide));
  bitmap.close();
  return canvas;
};

const decodeImageElement = async (blob: Blob, maxSide?: number) => {
  const image = await loadImageElement(blob);
  if (!image.naturalWidth || !image.naturalHeight) throw new Error("This file could not be read as an image.");
  const canvas = drawSource(image, ...fitted(image.naturalWidth, image.naturalHeight, maxSide));
  if (isBlank(canvas)) throw new Error("This file could not be read as an image.");
  return canvas;
};

const decodeWithBrowser = async (blob: Blob, maxSide?: number) => {
  if (maxSide) return decodeImageElement(blob, maxSide).catch(() => decodeBitmap(blob, maxSide));
  try {
    return await decodeBitmap(blob);
  } catch {
    return decodeImageElement(blob);
  }
};

const decodeAvif = async (file: File) => {
  try {
    return await decodeBitmap(file);
  } catch {
    const { default: decode } = await import("@jsquash/avif/decode");
    const data = await decode(await file.arrayBuffer()).catch(() => null);
    if (!data) throw new Error("This AVIF file could not be read. Try opening and re-saving it first.");
    const canvas = createCanvas(data.width, data.height);
    context2d(canvas).putImageData(data, 0, 0);
    return canvas;
  }
};

const decodeSvg = async (file: File) => {
  const image = await loadImageElement(file);
  const width = image.naturalWidth || 1024;
  const height = image.naturalHeight || 1024;
  const scale = Math.max(1, 2048 / Math.max(width, height));
  return drawSource(image, width * scale, height * scale);
};

const decodeHeic = async (file: File, maxSide?: number) => {
  if (maxSide) {
    const native = await decodeImageElement(file, maxSide).catch(() => null);
    if (native) return native;
  }
  const { default: heic2any } = await import("heic2any");
  const result = await heic2any(maxSide ? { blob: file, toType: "image/jpeg", quality: 0.95 } : { blob: file, toType: "image/png" });
  return decodeWithBrowser(Array.isArray(result) ? result[0] : result, maxSide);
};

const decodeTiff = async (file: File) => {
  const { default: UTIF } = await import("utif");
  const buffer = await file.arrayBuffer();
  const [ifd] = UTIF.decode(buffer);
  UTIF.decodeImage(buffer, ifd);
  const rgba = UTIF.toRGBA8(ifd);
  const canvas = createCanvas(ifd.width, ifd.height);
  context2d(canvas).putImageData(
    new ImageData(new Uint8ClampedArray(rgba), ifd.width, ifd.height),
    0,
    0,
  );
  return canvas;
};

export const decodeFile = (file: File, maxSide?: number): Promise<HTMLCanvasElement> => {
  if (isHeic(file)) return decodeHeic(file, maxSide);
  if (isTiff(file)) return decodeTiff(file);
  if (isSvg(file)) return decodeSvg(file);
  if (isAvif(file)) return decodeAvif(file);
  return decodeWithBrowser(file, maxSide);
};
