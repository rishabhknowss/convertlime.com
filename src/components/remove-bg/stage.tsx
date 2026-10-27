"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import type { BgItem } from "@/hooks/use-remove-bg";
import { useLocale } from "@/i18n/locale-provider";
import { ScanOverlay } from "@/components/remove-bg/scan-overlay";
import { cn } from "@/lib/utils";

type StageProps = { item: BgItem; background: string };

export const Stage = ({ item, background }: StageProps) => {
  const { ui } = useLocale();
  const [split, setSplit] = useState(100);
  const done = item.status === "done" && item.result;
  const transparent = background === "transparent";

  return (
    <figure className="overflow-hidden rounded-2xl border bg-card">
      <div
        className={cn("relative flex min-h-64 items-center justify-center", done ? transparent && "cl-checker" : "bg-muted")}
        style={done && !transparent ? { backgroundColor: background } : undefined}
      >
        {!item.preview && item.status !== "error" && <Loader2 className="size-6 animate-spin text-muted-foreground" />}
        {item.preview && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={done ? item.result : item.preview}
              alt={done ? ui.removeBg.result : ui.removeBg.original}
              className={cn("block max-h-[30rem] w-auto max-w-full", done && "cl-reveal")}
            />
            {done && split < 100 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.preview}
                alt={ui.removeBg.original}
                className="absolute inset-0 block size-full"
                style={{ clipPath: `inset(0 0 0 ${split}%)` }}
              />
            )}
            {done && split < 100 && (
              <>
                <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-primary" style={{ left: `${split}%` }} />
                <span className="pointer-events-none absolute top-2 left-2 rounded-md bg-background/85 px-2 py-0.5 text-xs font-medium">
                  {ui.removeBg.result}
                </span>
                <span className="pointer-events-none absolute top-2 right-2 rounded-md bg-background/85 px-2 py-0.5 text-xs font-medium">
                  {ui.removeBg.original}
                </span>
              </>
            )}
            {item.status === "working" && <ScanOverlay />}
          </div>
        )}
        {item.status === "error" && (
          <p className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 rounded-xl bg-background/95 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="size-4 shrink-0" />
            {ui.removeBg.failed}
          </p>
        )}
      </div>
      {done && (
        <figcaption className="flex items-center gap-3 border-t px-4 py-2 text-xs text-muted-foreground">
          <span className="shrink-0">{ui.removeBg.compare}</span>
          <input
            type="range"
            min={0}
            max={100}
            value={split}
            onChange={(event) => setSplit(Number(event.target.value))}
            aria-label={ui.removeBg.compare}
            className="flex-1 accent-[var(--primary)]"
          />
        </figcaption>
      )}
    </figure>
  );
};
