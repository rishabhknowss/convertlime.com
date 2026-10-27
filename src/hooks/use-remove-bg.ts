"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cutOutFile, exportImage, previewImage, type ExportFormat } from "@/lib/remove-bg/engine";
import { toast } from "sonner";
import { downloadBlob, renameExtension, zipBlobs } from "@/lib/files";
import { reportError } from "@/lib/report-error";

export type RemoveBgMessages = { readError: string; failed: string; generic: string; copy: string };

const TOOL = "remove-background";

export type BgStatus = "ready" | "working" | "done" | "error";

export type BgItem = {
  id: string;
  file: File;
  status: BgStatus;
  preview?: string;
  cutout?: Blob;
  result?: string;
  error?: boolean;
};

const outputName = (name: string, format: ExportFormat) =>
  renameExtension(name, format).replace(/\.(\w+)$/, "-no-bg.$1");

export const useRemoveBg = (messages: RemoveBgMessages) => {
  const [items, setItems] = useState<BgItem[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [background, setBackground] = useState("transparent");
  const [format, setFormat] = useState<ExportFormat>("png");
  const [busy, setBusy] = useState(false);
  const urls = useRef<string[]>([]);

  useEffect(() => () => urls.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const track = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    urls.current.push(url);
    return url;
  };

  const update = (id: string, patch: Partial<BgItem>) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const addFiles = useCallback((files: File[]) => {
    const added = files.map((file) => ({ id: `${file.name}-${crypto.randomUUID()}`, file, status: "ready" as const }));
    setItems((current) => [...current, ...added]);
    setSelectedId(added[0]?.id);
    added.forEach((item) =>
      previewImage(item.file)
        .then((blob) => update(item.id, { preview: track(blob) }))
        .catch((error) => {
          reportError(error, { action: "preview", tool: TOOL, file: item.file });
          toast.error(messages.readError);
          update(item.id, { status: "error", error: true });
        }),
    );
  }, [messages.readError]);

  const removeBackgrounds = async () => {
    const pending = items.filter((item) => item.status === "ready" || item.status === "error");
    setBusy(true);
    for (const item of pending) {
      setSelectedId(item.id);
      update(item.id, { status: "working", error: false });
      try {
        const cutout = await cutOutFile(item.file);
        update(item.id, { status: "done", cutout, result: track(cutout) });
      } catch (error) {
        reportError(error, { action: "remove-background", tool: TOOL, file: item.file });
        toast.error(messages.failed);
        update(item.id, { status: "error", error: true });
      }
    }
    setBusy(false);
  };

  const exported = async (item: BgItem, as: ExportFormat = format) => ({
    name: outputName(item.file.name, as),
    blob: await exportImage(item.cutout as Blob, background, as),
  });

  const download = async (item: BgItem) => {
    try {
      const output = await exported(item);
      downloadBlob(output.blob, output.name);
    } catch (error) {
      reportError(error, { action: `download-${format}`, tool: TOOL, file: item.file });
      toast.error(messages.generic);
    }
  };

  const downloadAll = async () => {
    const done = items.filter((item) => item.cutout);
    setBusy(true);
    try {
      const outputs = await Promise.all(done.map((item) => exported(item)));
      downloadBlob(await zipBlobs(outputs), "convertlime-no-background.zip");
    } catch (error) {
      reportError(error, { action: "zip", tool: TOOL });
      toast.error(messages.generic);
    } finally {
      setBusy(false);
    }
  };

  const copy = async (item: BgItem) => {
    try {
      const { blob } = await exported(item, "png");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      return true;
    } catch (error) {
      reportError(error, { action: "copy", tool: TOOL, file: item.file });
      toast.error(messages.copy);
      return false;
    }
  };

  const remove = (id: string) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    if (selectedId === id) setSelectedId(next[0]?.id);
  };

  const clear = () => {
    setItems([]);
    setSelectedId(undefined);
  };

  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return {
    items,
    selected,
    background,
    format,
    busy,
    setSelectedId,
    setBackground,
    setFormat,
    addFiles,
    removeBackgrounds,
    download,
    downloadAll,
    copy,
    remove,
    clear,
  };
};
