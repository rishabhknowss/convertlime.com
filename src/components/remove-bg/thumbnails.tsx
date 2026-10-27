"use client";

import { Check, Loader2, Plus, X } from "lucide-react";
import type { BgItem } from "@/hooks/use-remove-bg";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

type ThumbnailsProps = {
  items: BgItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
};

export const Thumbnails = ({ items, selectedId, onSelect, onRemove, onAdd }: ThumbnailsProps) => {
  const { ui } = useLocale();
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {items.map((item) => (
        <div key={item.id} className="group relative shrink-0">
          <button
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "block size-16 overflow-hidden rounded-xl border-2",
              item.id === selectedId ? "border-primary" : "border-transparent opacity-80 hover:opacity-100",
              item.status === "done" ? "cl-checker" : "bg-muted",
            )}
          >
            {(item.result ?? item.preview) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.result ?? item.preview} alt={item.file.name} className="size-full object-contain" />
            )}
          </button>
          <span className="pointer-events-none absolute bottom-1 left-1 flex size-4 items-center justify-center rounded-full bg-background/90">
            {item.status === "done" && <Check className="size-3 text-primary" />}
            {item.status === "working" && <Loader2 className="size-3 animate-spin text-primary" />}
          </span>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            aria-label={ui.converter.remove}
            className="absolute -top-1.5 -right-1.5 hidden size-5 items-center justify-center rounded-full border bg-background group-hover:flex"
          >
            <X className="size-3" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        aria-label={ui.removeBg.addMore}
        className="flex size-16 shrink-0 items-center justify-center rounded-xl border-2 border-dashed text-muted-foreground hover:border-primary/60 hover:text-foreground"
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
};
