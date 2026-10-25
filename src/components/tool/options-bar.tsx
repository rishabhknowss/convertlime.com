"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import type { Tool } from "@/data/tools";
import type { RunOptions } from "@/lib/convert/run";
import { useLocale } from "@/i18n/locale-provider";

const LOSSY = new Set(["jpg", "jpeg", "webp", "avif"]);

type OptionsBarProps = {
  tool: Tool;
  options: RunOptions;
  onChange: (options: RunOptions) => void;
};

export const OptionsBar = ({ tool, options, onChange }: OptionsBarProps) => {
  const [quality, setQuality] = useState(Math.round(options.quality * 100));
  const { ui } = useLocale();
  const showQuality =
    (tool.kind === "convert" && LOSSY.has(tool.to)) ||
    (tool.kind === "compress" && !options.targetKb);

  if (tool.kind === "resize-kb") return null;

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-xl border bg-card px-4 py-3 text-sm">
      {showQuality && (
        <div className="flex min-w-60 flex-1 items-center gap-4">
          <Label className="shrink-0">{ui.converter.quality}</Label>
          <Slider
            min={30}
            max={100}
            step={5}
            value={[quality]}
            onValueChange={([value]) => setQuality(value)}
            onValueCommit={([value]) => onChange({ ...options, quality: value / 100 })}
          />
          <span className="w-10 text-right tabular-nums text-muted-foreground">{quality}%</span>
        </div>
      )}
      {tool.kind === "compress" && (
        <div className="flex items-center gap-3">
          <Switch
            id="max-size"
            checked={Boolean(options.targetKb)}
            onCheckedChange={(checked) => onChange({ ...options, targetKb: checked ? 200 : undefined })}
          />
          <Label htmlFor="max-size">{ui.converter.maxSize}</Label>
          {options.targetKb && (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={5}
                defaultValue={options.targetKb}
                className="h-8 w-24"
                onBlur={(event) => onChange({ ...options, targetKb: Math.max(5, Number(event.target.value) || 200) })}
              />
              <span className="text-muted-foreground">KB</span>
            </div>
          )}
        </div>
      )}
      {tool.kind === "to-pdf" && (
        <div className="flex items-center gap-3">
          <Label>{ui.converter.pageSize}</Label>
          {(["fit", "a4"] as const).map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => onChange({ ...options, pageSize: size })}
              className={`rounded-lg border px-3 py-1.5 ${options.pageSize === size ? "border-primary bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {size === "fit" ? ui.converter.sameAsImage : ui.converter.a4}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
