"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

const MAX_SIDE = 480;

const toPngDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, MAX_SIDE / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      canvas.getContext("2d")?.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unreadable"));
    };
    image.src = url;
  });

type LogoSlotProps = {
  logo: string | null;
  onChange: (logo: string | null) => void;
  labels: { add: string; remove: string; error: string };
};

export const LogoSlot = ({ logo, onChange, labels }: LogoSlotProps) => {
  const input = useRef<HTMLInputElement>(null);
  const pick = async (file: File | undefined) => {
    if (!file) return;
    try {
      onChange(await toPngDataUrl(file));
    } catch {
      toast.error(labels.error);
    }
  };
  return (
    <div className="group/logo relative w-fit">
      <input
        ref={input}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="hidden"
        onChange={(event) => {
          pick(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      {logo ? (
        <>
          <button type="button" onClick={() => input.current?.click()} className="block rounded-md outline-none focus-visible:shadow-[0_0_0_1.5px_var(--inv-accent)]">
            <img src={logo} alt="" className="max-h-14 max-w-[150px] object-contain" />
          </button>
          <button
            type="button"
            aria-label={labels.remove}
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full bg-foreground text-background opacity-0 shadow transition group-hover/logo:opacity-100 focus-visible:opacity-100 print:hidden"
          >
            <X className="size-3" />
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="flex h-14 w-36 items-center justify-center gap-2 rounded-lg border-[1.5px] border-dashed border-[color-mix(in_oklab,var(--inv-accent)_45%,transparent)] text-xs font-medium text-[var(--inv-accent)] transition hover:bg-[color-mix(in_oklab,var(--inv-accent)_7%,transparent)] print:hidden"
        >
          <ImagePlus className="size-4" />
          {labels.add}
        </button>
      )}
    </div>
  );
};
