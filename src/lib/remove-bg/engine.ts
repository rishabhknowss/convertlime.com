import { context2d, createCanvas, fitCanvas } from "@/lib/convert/canvas";
import { decodeFile } from "@/lib/convert/decode";
import { setLoading, setReady } from "@/lib/remove-bg/status";

type Model = "isnet_fp16" | "isnet_quint8";
type Device = "gpu" | "cpu";

const MAX_SIDE = 4096;
const cutOuts = new WeakMap<File, Promise<Blob>>();
const downloads = new Map<string, [number, number]>();

const lowMemory = () => {
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  return (memory !== undefined && memory <= 4) || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

const hasWebGpu = () => "gpu" in navigator;

const trackDownload = (key: string, current: number, total: number) => {
  if (!key.startsWith("fetch:") || !total) return;
  downloads.set(key, [current, total]);
  const [done, size] = [...downloads.values()].reduce(([a, b], [c, d]) => [a + c, b + d], [0, 0]);
  setLoading(size ? done / size : 0);
};

const canvasToPng = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not read this image."))), "image/png"),
  );

const run = async (input: Blob, model: Model, device: Device) => {
  const { removeBackground } = await import("@imgly/background-removal");
  return removeBackground(input, {
    model,
    device,
    proxyToWorker: true,
    output: { format: "image/png" },
    progress: trackDownload,
  });
};

const cutOut = async (file: File) => {
  const canvas = fitCanvas(await decodeFile(file), MAX_SIDE);
  const input = await canvasToPng(canvas);
  const model: Model = lowMemory() ? "isnet_quint8" : "isnet_fp16";
  setLoading(0);
  try {
    const result = await run(input, model, hasWebGpu() ? "gpu" : "cpu").catch((error) => {
      if (!hasWebGpu()) throw error;
      return run(input, model, "cpu");
    });
    setReady();
    return result;
  } catch (error) {
    setReady();
    throw error;
  }
};

export const cutOutFile = (file: File) => {
  const cached = cutOuts.get(file);
  if (cached) return cached;
  const job = cutOut(file);
  cutOuts.set(file, job);
  job.catch(() => cutOuts.delete(file));
  return job;
};

const loadImage = (blob: Blob) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read this image."));
    };
    image.src = url;
  });

export type ExportFormat = "png" | "jpg" | "webp";

const MIME: Record<ExportFormat, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp" };

export const exportImage = async (cutout: Blob, background: string, format: ExportFormat) => {
  const fill = background === "transparent" && format === "jpg" ? "#ffffff" : background;
  if (fill === "transparent" && format === "png") return cutout;
  const image = await loadImage(cutout);
  const canvas = createCanvas(image.naturalWidth, image.naturalHeight);
  const ctx = context2d(canvas);
  if (fill !== "transparent") {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(image, 0, 0);
  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not save this image."))), MIME[format], 0.92),
  );
};

export const previewImage = async (file: File) => {
  const canvas = fitCanvas(await decodeFile(file), 1600);
  return canvasToPng(canvas);
};
