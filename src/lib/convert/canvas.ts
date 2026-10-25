export const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  return canvas;
};

export const context2d = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Your browser could not open a drawing surface.");
  return ctx;
};

export const scaleCanvas = (source: HTMLCanvasElement, factor: number) => {
  const canvas = createCanvas(source.width * factor, source.height * factor);
  const ctx = context2d(canvas);
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const fitCanvas = (source: HTMLCanvasElement, maxSide: number) => {
  const largest = Math.max(source.width, source.height);
  return largest > maxSide ? scaleCanvas(source, maxSide / largest) : source;
};

export const flattenOnWhite = (source: HTMLCanvasElement) => {
  const canvas = createCanvas(source.width, source.height);
  const ctx = context2d(canvas);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(source, 0, 0);
  return canvas;
};

export const pixels = (canvas: HTMLCanvasElement) =>
  context2d(canvas).getImageData(0, 0, canvas.width, canvas.height);

export const canvasToBlob = (canvas: HTMLCanvasElement, type: string, quality?: number) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not create the image."))),
      type,
      quality,
    ),
  );
