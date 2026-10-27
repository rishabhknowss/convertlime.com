"use client";

import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

type BackgroundPickerProps = { value: string; onChange: (value: string) => void };

export const BackgroundPicker = ({ value, onChange }: BackgroundPickerProps) => {
  const { ui } = useLocale();
  const text = ui.removeBg;
  const swatches = [
    { value: "transparent", label: text.transparent, className: "cl-checker bg-[length:8px_8px]" },
    { value: "#ffffff", label: text.white, className: "bg-white" },
    { value: "#000000", label: text.black, className: "bg-black" },
  ];
  const custom = !swatches.some((swatch) => swatch.value === value);
  const option = (active: boolean) =>
    cn(
      "flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-sm",
      active ? "border-primary bg-accent text-foreground" : "text-muted-foreground hover:text-foreground",
    );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-muted-foreground">{text.background}</span>
      {swatches.map((swatch) => (
        <button
          key={swatch.value}
          type="button"
          onClick={() => onChange(swatch.value)}
          aria-pressed={value === swatch.value}
          className={option(value === swatch.value)}
        >
          <span className={cn("size-4 rounded border", swatch.className)} />
          {swatch.label}
        </button>
      ))}
      <label className={cn(option(custom), "cursor-pointer")}>
        <input
          type="color"
          value={custom ? value : "#a3e635"}
          onChange={(event) => onChange(event.target.value)}
          className="size-4 cursor-pointer rounded border-0 bg-transparent p-0"
          aria-label={text.pickColor}
        />
        {text.pickColor}
      </label>
    </div>
  );
};
