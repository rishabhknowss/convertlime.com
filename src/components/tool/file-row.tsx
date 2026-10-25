"use client";

import { AlertCircle, Download, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Item } from "@/hooks/use-converter";
import { downloadBlob, formatBytes } from "@/lib/files";
import { fill } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";

const savingsPercent = (before: number, after: number) =>
  Math.round((1 - after / before) * 100);

export const FileRow = ({
  item,
  onRemove,
}: {
  item: Item;
  onRemove: (id: string) => void;
}) => {
  const { ui } = useLocale();
  const percent = item.output
    ? savingsPercent(item.file.size, item.output.blob.size)
    : 0;
  return (
    <li className="flex items-center gap-3 rounded-xl border bg-card px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">
          {item.output?.name ?? item.file.name}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatBytes(item.file.size)}
          {item.output && (
            <>
              {" → "}
              <span className="text-foreground">
                {formatBytes(item.output.blob.size)}
              </span>
              {percent > 0 && (
                <span className="ml-2 text-primary">
                  {fill(ui.converter.smaller, { percent })}
                </span>
              )}
            </>
          )}
          {item.status === "error" && (
            <span className="ml-2 text-destructive">{item.error}</span>
          )}
        </p>
      </div>
      {(item.status === "working" || item.status === "queued") && (
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      )}
      {item.status === "error" && (
        <AlertCircle className="size-4 text-destructive" />
      )}
      {item.output && (
        <Button
          size="sm"
          onClick={() => downloadBlob(item.output!.blob, item.output!.name)}
        >
          <Download />
          {ui.converter.download}
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={ui.converter.remove}
        onClick={() => onRemove(item.id)}
      >
        <X />
      </Button>
    </li>
  );
};
