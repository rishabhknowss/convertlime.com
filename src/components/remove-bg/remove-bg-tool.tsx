"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Download, Eraser, FileArchive, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatAccept } from "@/data/formats";
import { getTool } from "@/data/tools";
import { fill } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { usePageFiles } from "@/hooks/use-page-files";
import { useRemoveBg } from "@/hooks/use-remove-bg";
import { Dropzone } from "@/components/tool/dropzone";
import { DropOverlay } from "@/components/tool/drop-overlay";
import { BackgroundPicker } from "@/components/remove-bg/background-picker";
import { FormatPicker } from "@/components/remove-bg/format-picker";
import { Stage } from "@/components/remove-bg/stage";
import { Thumbnails } from "@/components/remove-bg/thumbnails";
import { useRemoveBgStatus } from "@/components/remove-bg/use-remove-bg-status";

const ACCEPT = formatAccept(getTool("remove-background")!.from);

const hasTextSelection = () => Boolean(window.getSelection()?.toString());

export const RemoveBgTool = () => {
  const { ui } = useLocale();
  const text = ui.removeBg;
  const tool = useRemoveBg();
  const status = useRemoveBgStatus();
  const input = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const { items, selected } = tool;
  const pending = items.filter((item) => item.status === "ready" || item.status === "error").length;
  const doneCount = items.filter((item) => item.status === "done").length;
  const working = items.some((item) => item.status === "working");

  const dragging = usePageFiles(ACCEPT, tool.addFiles, items.length > 0);

  const copy = useCallback(async () => {
    if (!selected?.cutout) return;
    await tool.copy(selected);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }, [selected, tool]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "c" && selected?.cutout && !hasTextSelection()) {
        event.preventDefault();
        copy();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [copy, selected]);

  if (items.length === 0) {
    return <Dropzone accept={ACCEPT} label={fill(ui.converter.choose, { files: ui.converter.images })} onFiles={tool.addFiles} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <DropOverlay show={dragging} />
      <input
        ref={input}
        type="file"
        multiple
        accept={ACCEPT}
        className="hidden"
        onChange={(event) => {
          if (event.target.files?.length) tool.addFiles(Array.from(event.target.files));
          event.target.value = "";
        }}
      />
      {selected && <Stage item={selected} background={tool.background} />}
      {status.phase === "loading" && <p className="text-xs text-muted-foreground">{text.preparingNote}</p>}
      <Thumbnails
        items={items}
        selectedId={selected?.id}
        onSelect={tool.setSelectedId}
        onRemove={tool.remove}
        onAdd={() => input.current?.click()}
      />
      {pending > 0 || working ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button size="lg" onClick={tool.removeBackgrounds} disabled={working || pending === 0} className="min-w-56">
            {working ? <Loader2 className="animate-spin" /> : <Eraser />}
            {working ? text.working : pending > 1 ? fill(text.removeMany, { count: pending }) : text.removeButton}
          </Button>
          <Button size="lg" variant="ghost" onClick={tool.clear} disabled={working}>
            <Trash2 />
            {ui.converter.clear}
          </Button>
        </div>
      ) : null}
      {doneCount > 0 && !working && (
        <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4">
          <BackgroundPicker value={tool.background} onChange={tool.setBackground} />
          <FormatPicker value={tool.format} onChange={tool.setFormat} />
          {tool.format === "jpg" && tool.background === "transparent" && (
            <p className="text-xs text-muted-foreground">{text.jpgNote}</p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="lg" onClick={() => selected && tool.download(selected)} disabled={!selected?.cutout}>
              <Download />
              {fill(text.downloadAs, { format: tool.format.toUpperCase() })}
            </Button>
            <Button size="lg" variant="outline" onClick={copy} disabled={!selected?.cutout}>
              {copied ? <Check /> : <Copy />}
              {copied ? text.copied : text.copy}
            </Button>
            {doneCount > 1 && (
              <Button size="lg" variant="outline" onClick={tool.downloadAll} disabled={tool.busy}>
                {tool.busy ? <Loader2 className="animate-spin" /> : <FileArchive />}
                {fill(ui.converter.downloadAll, { count: doneCount })}
              </Button>
            )}
            {pending === 0 && (
              <Button size="lg" variant="ghost" onClick={tool.clear}>
                <Trash2 />
                {ui.converter.clear}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
