"use client";

import { useMemo, useRef } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { COVER_PRESETS, coverPresetId, coverSource, presetCover, renderPresetCover } from "@/lib/invoice/covers";
import { readImageFile } from "@/lib/invoice/image";
import type { InvoiceUi } from "@/i18n/types";
import type { InvoiceStore } from "@/hooks/use-invoice";
import type { Invoice } from "@/lib/invoice/types";
import { cn } from "@/lib/utils";

type CoverSlotProps = {
  invoice: Invoice;
  store: InvoiceStore;
  text: InvoiceUi;
  variant: "banner" | "fade";
};

const CONTROL =
  "flex size-8 items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur-sm transition hover:bg-black/75";

export const CoverSlot = ({ invoice, store, text, variant }: CoverSlotProps) => {
  const input = useRef<HTMLInputElement>(null);
  const src = useMemo(() => coverSource(invoice.cover, invoice.accent), [invoice.cover, invoice.accent]);
  const thumbs = useMemo(
    () => COVER_PRESETS.map((id) => ({ id, src: renderPresetCover(id, invoice.accent) })),
    [invoice.accent],
  );
  const activePreset = coverPresetId(invoice.cover);
  const banner = variant === "banner";

  const upload = async (file: File | undefined) => {
    if (!file) return;
    try {
      store.setField("cover", await readImageFile(file, { maxSide: 2400, type: "image/jpeg" }));
    } catch {
      toast.error(text.coverError);
    }
  };

  const controls = (
    <div className="flex items-center gap-1.5 rounded-xl bg-black/35 p-1.5 backdrop-blur-md">
      {thumbs.map((thumb) => (
        <button
          key={thumb.id}
          type="button"
          aria-label={thumb.id}
          aria-pressed={activePreset === thumb.id}
          onClick={() => store.setField("cover", presetCover(thumb.id))}
          className={cn(
            "h-8 w-12 overflow-hidden rounded-md ring-2 ring-transparent transition hover:ring-white/70",
            activePreset === thumb.id && "ring-white",
          )}
        >
          <img src={thumb.src} alt="" className="size-full object-cover" />
        </button>
      ))}
      <button type="button" aria-label={text.uploadCover} title={text.uploadCover} onClick={() => input.current?.click()} className={CONTROL}>
        <Upload className="size-4" />
      </button>
      {invoice.cover && (
        <button
          type="button"
          aria-label={text.removeCover}
          title={text.removeCover}
          onClick={() => store.setField("cover", null)}
          className={CONTROL}
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className={cn("group/cover relative", !src && "print:hidden")}>
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => {
          upload(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {src ? (
        <img
          src={src}
          alt=""
          className={cn(
            "w-full object-cover",
            banner ? "h-36 rounded-xl sm:h-40" : "h-44 [mask-image:linear-gradient(to_bottom,black_45%,transparent)] sm:h-52",
          )}
        />
      ) : (
        <button
          type="button"
          onClick={() => store.setField("cover", presetCover(COVER_PRESETS[0]))}
          className={cn(
            "flex w-full items-center justify-center gap-2 border-[1.5px] border-dashed border-border text-sm font-medium text-muted-foreground transition hover:border-[var(--inv-accent)] hover:text-[var(--inv-accent)]",
            banner ? "h-28 rounded-xl" : "h-32",
          )}
        >
          <ImagePlus className="size-4" />
          {text.addCover}
        </button>
      )}
      {src && (
        <div className="absolute top-3 right-3 opacity-0 transition-opacity duration-200 group-hover/cover:opacity-100 focus-within:opacity-100 max-sm:opacity-100 print:hidden">
          {controls}
        </div>
      )}
    </div>
  );
};
