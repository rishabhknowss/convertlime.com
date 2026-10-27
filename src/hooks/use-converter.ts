"use client";

import { useCallback, useRef, useState } from "react";
import type { Tool } from "@/data/tools";
import { runOnFile, runToPdf, type Output, type RunOptions } from "@/lib/convert/run";
import { downloadBlob, zipBlobs } from "@/lib/files";
import { toast } from "sonner";
import type { UiStrings } from "@/i18n/types";
import { reportError } from "@/lib/report-error";

export type ItemStatus = "queued" | "working" | "done" | "error";

export type Item = {
  id: string;
  file: File;
  status: ItemStatus;
  output?: Output;
  error?: string;
};

const errorMessage = (error: unknown, text: UiStrings["converter"]) => {
  const message = error instanceof Error ? error.message : "";
  if (/webp/i.test(message)) return text.webpError;
  if (/avif/i.test(message)) return text.avifError;
  return text.readError;
};

export const useConverter = (tool: Tool, text: UiStrings["converter"], errors: UiStrings["errors"]) => {
  const [items, setItems] = useState<Item[]>([]);
  const [pdf, setPdf] = useState<Output | null>(null);
  const [busy, setBusy] = useState(false);
  const [options, setOptions] = useState<RunOptions>({
    quality: tool.kind === "compress" ? 0.7 : 0.9,
    pageSize: "fit",
    targetKb: tool.targetKb,
  });
  const queue = useRef(Promise.resolve());

  const update = (id: string, patch: Partial<Item>) =>
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...patch } : item)));

  const convert = useCallback(
    (item: Item, runOptions: RunOptions) => {
      queue.current = queue.current.then(async () => {
        update(item.id, { status: "working", error: undefined });
        try {
          const output = await runOnFile(tool, item.file, runOptions);
          update(item.id, { status: "done", output });
        } catch (error) {
          const message = errorMessage(error, text);
          reportError(error, { action: "convert", tool: tool.slug, file: item.file });
          toast.error(message);
          update(item.id, { status: "error", error: message });
        }
      });
    },
    [tool, text],
  );

  const addFiles = (files: File[]) => {
    const added = files.map((file) => ({
      id: `${file.name}-${file.size}-${crypto.randomUUID()}`,
      file,
      status: "queued" as const,
    }));
    setPdf(null);
    setItems((current) => [...current, ...added]);
    if (tool.kind !== "to-pdf") added.forEach((item) => convert(item, options));
  };

  const reconvertAll = (next: RunOptions) => {
    setOptions(next);
    if (tool.kind === "to-pdf") return setPdf(null);
    items.forEach((item) => convert(item, next));
  };

  const remove = (id: string) => {
    setPdf(null);
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const clear = () => {
    setPdf(null);
    setItems([]);
  };

  const makePdf = async () => {
    setBusy(true);
    try {
      const output = await runToPdf(items.map((item) => item.file), options);
      setPdf(output);
      downloadBlob(output.blob, output.name);
    } catch (error) {
      reportError(error, { action: "make-pdf", tool: tool.slug });
      toast.error(errors.generic);
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = async () => {
    const done = items.filter((item) => item.output).map((item) => item.output as Output);
    if (done.length === 1) return downloadBlob(done[0].blob, done[0].name);
    setBusy(true);
    try {
      downloadBlob(await zipBlobs(done), `convertlime-${tool.slug}.zip`);
    } catch (error) {
      reportError(error, { action: "zip", tool: tool.slug });
      toast.error(errors.generic);
    } finally {
      setBusy(false);
    }
  };

  return { items, pdf, busy, options, addFiles, reconvertAll, remove, clear, makePdf, downloadAll };
};
