"use client";

import { useRef, useState } from "react";
import { Lock, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/locale-provider";

type DropzoneProps = {
  accept: string;
  label: string;
  compact?: boolean;
  onFiles: (files: File[]) => void;
};

export const Dropzone = ({ accept, label, compact, onFiles }: DropzoneProps) => {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const { ui } = useLocale();

  const take = (list: FileList | null) => {
    if (list?.length) onFiles(Array.from(list));
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => input.current?.click()}
      onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && input.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        take(event.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-card text-center transition-colors",
        compact ? "px-6 py-6" : "px-6 py-14",
        dragging ? "border-primary bg-accent" : "hover:border-primary/50",
      )}
    >
      <input
        ref={input}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(event) => {
          take(event.target.files);
          event.target.value = "";
        }}
      />
      <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Upload className="size-5" />
      </span>
      <div>
        <p className="text-base font-medium">{label}</p>
        {!compact && <p className="mt-1 text-sm text-muted-foreground">{ui.converter.dragDrop}</p>}
      </div>
      {!compact && (
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3.5 text-primary" />
          {ui.converter.local}
        </p>
      )}
    </div>
  );
};
