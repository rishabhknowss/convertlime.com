"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const isEditable = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement ||
    (target instanceof HTMLInputElement && target.type !== "file"));

const accepts = (file: File, accept: string) => {
  const rules = accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean);
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return (
    rules.length === 0 ||
    rules.some((rule) =>
      rule.startsWith(".") ? name.endsWith(rule) : rule.endsWith("/*") ? type.startsWith(rule.slice(0, -1)) : type === rule,
    )
  );
};

const extensionOf = (type: string) => (type.split("/")[1] ?? "png").replace("jpeg", "jpg").replace("svg+xml", "svg");

const namePasted = (file: File, index: number) =>
  file.name && !/^image\.\w+$/i.test(file.name)
    ? file
    : new File([file], `pasted-image-${Date.now()}${index ? `-${index}` : ""}.${extensionOf(file.type)}`, {
        type: file.type,
        lastModified: Date.now(),
      });

const hasFiles = (event: DragEvent) => Array.from(event.dataTransfer?.types ?? []).includes("Files");

export const usePageFiles = (accept: string, onFiles: (files: File[]) => void, enabled = true) => {
  const [dragging, setDragging] = useState(false);
  const handler = useRef(onFiles);

  useEffect(() => {
    handler.current = onFiles;
  }, [onFiles]);

  useEffect(() => {
    if (!enabled) return;
    let depth = 0;
    const deliver = (files: File[]) => {
      const usable = files.filter((file) => accepts(file, accept));
      if (usable.length) handler.current(usable);
      return usable.length > 0;
    };
    const enter = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth += 1;
      setDragging(true);
    };
    const leave = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      depth = Math.max(0, depth - 1);
      if (depth === 0) setDragging(false);
    };
    const over = (event: DragEvent) => {
      if (hasFiles(event)) event.preventDefault();
    };
    const drop = (event: DragEvent) => {
      if (!hasFiles(event)) return;
      event.preventDefault();
      depth = 0;
      setDragging(false);
      deliver(Array.from(event.dataTransfer?.files ?? []));
    };
    const paste = (event: ClipboardEvent) => {
      if (isEditable(event.target)) return;
      const files = Array.from(event.clipboardData?.files ?? []).map(namePasted);
      if (deliver(files)) event.preventDefault();
    };
    window.addEventListener("dragenter", enter);
    window.addEventListener("dragleave", leave);
    window.addEventListener("dragover", over);
    window.addEventListener("drop", drop);
    window.addEventListener("paste", paste);
    return () => {
      window.removeEventListener("dragenter", enter);
      window.removeEventListener("dragleave", leave);
      window.removeEventListener("dragover", over);
      window.removeEventListener("drop", drop);
      window.removeEventListener("paste", paste);
    };
  }, [accept, enabled]);

  return enabled && dragging;
};

const noSubscribe = () => () => {};

export const useShortcutKey = () =>
  useSyncExternalStore(
    noSubscribe,
    () => (/Mac|iPhone|iPad/i.test(navigator.userAgent) ? "⌘" : "Ctrl"),
    () => "Ctrl",
  );
