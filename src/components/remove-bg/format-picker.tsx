"use client";

import type { ExportFormat } from "@/lib/remove-bg/engine";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

const FORMATS: ExportFormat[] = ["png", "jpg", "webp"];

type FormatPickerProps = { value: ExportFormat; onChange: (value: ExportFormat) => void };

export const FormatPicker = ({ value, onChange }: FormatPickerProps) => {
  const { ui } = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted-foreground">{ui.removeBg.format}</span>
      <div className="flex rounded-lg border p-0.5">
        {FORMATS.map((format) => (
          <button
            key={format}
            type="button"
            onClick={() => onChange(format)}
            aria-pressed={value === format}
            className={cn(
              "rounded-md px-3 py-1 text-sm uppercase",
              value === format ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
};
