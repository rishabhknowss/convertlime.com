import { zipSync } from "fflate";

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

export const renameExtension = (name: string, extension: string) => {
  const base = name.replace(/\.[^.]+$/, "") || "image";
  return `${base}.${extension}`;
};

export const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const zipBlobs = async (entries: { name: string; blob: Blob }[]) => {
  const used = new Map<string, number>();
  const files: Record<string, Uint8Array> = {};
  for (const { name, blob } of entries) {
    const count = used.get(name) ?? 0;
    used.set(name, count + 1);
    const unique = count === 0 ? name : name.replace(/(\.[^.]+)$/, `-${count}$1`);
    files[unique] = new Uint8Array(await blob.arrayBuffer());
  }
  return new Blob([zipSync(files, { level: 0 }) as BlobPart], { type: "application/zip" });
};
