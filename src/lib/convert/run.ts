import type { Tool } from "@/data/tools";
import { decodeFile } from "@/lib/convert/decode";
import { encodeCanvas } from "@/lib/convert/encode";
import { canvasesToPdf, type PageSize } from "@/lib/convert/pdf";
import { compressJpeg, jpegUnderSize } from "@/lib/convert/target-size";
import { renameExtension } from "@/lib/files";

export type RunOptions = {
  quality: number;
  pageSize: PageSize;
  targetKb?: number;
};

export type Output = { name: string; blob: Blob };

const extensionFor = (tool: Tool) => (tool.to === "jpeg" ? "jpeg" : tool.to);

const convertOne = async (tool: Tool, file: File, options: RunOptions): Promise<Output> => {
  const canvas = await decodeFile(file);
  if (tool.kind === "resize-kb") {
    const blob = await jpegUnderSize(canvas, (options.targetKb ?? tool.targetKb ?? 100) * 1024);
    return { name: renameExtension(file.name, "jpg"), blob };
  }
  if (tool.kind === "compress") {
    const blob = options.targetKb
      ? await jpegUnderSize(canvas, options.targetKb * 1024)
      : await compressJpeg(canvas, options.quality);
    return { name: renameExtension(file.name, "jpg"), blob };
  }
  const blob = await encodeCanvas(canvas, tool.to, { quality: options.quality });
  return { name: renameExtension(file.name, extensionFor(tool)), blob };
};

export const runOnFile = (tool: Tool, file: File, options: RunOptions) =>
  convertOne(tool, file, options);

export const runToPdf = async (files: File[], options: RunOptions) => {
  const canvases: HTMLCanvasElement[] = [];
  for (const file of files) canvases.push(await decodeFile(file));
  const blob = await canvasesToPdf(canvases, options.pageSize);
  const base = files.length === 1 ? files[0].name : "convertlime-images.pdf";
  return { name: renameExtension(base, "pdf"), blob };
};
