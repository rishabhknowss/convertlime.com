"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { renderPresetCover } from "@/lib/invoice/covers";
import { TEMPLATE_ORDER, readableOn } from "@/lib/invoice/templates";
import type { InvoiceUi } from "@/i18n/types";
import type { TemplateId } from "@/lib/invoice/types";
import { cn } from "@/lib/utils";

type TemplatePickerProps = {
  value: TemplateId;
  accent: string;
  text: InvoiceUi;
  onChange: (template: TemplateId) => void;
};

const Lines = ({ count, className }: { count: number; className: string }) => (
  <div className="flex flex-col gap-[3px]">
    {Array.from({ length: count }, (_, index) => (
      <span key={index} className={cn("h-[2px] rounded-full", className)} style={{ width: `${90 - index * 18}%` }} />
    ))}
  </div>
);

const Preview = ({ id, accent, covers }: { id: TemplateId; accent: string; covers: { meadow: string; dusk: string } }) => {
  if (id === "classic")
    return (
      <div className="flex h-full flex-col bg-white">
        <span className="h-1" style={{ background: accent }} />
        <div className="flex flex-1 flex-col gap-2 p-2">
          <span className="ml-auto h-1.5 w-8 rounded-sm" style={{ background: accent }} />
          <Lines count={2} className="bg-neutral-300" />
          <span className="h-2 rounded-sm" style={{ background: `color-mix(in oklab, ${accent} 15%, white)` }} />
          <Lines count={3} className="bg-neutral-200" />
        </div>
      </div>
    );
  if (id === "bold")
    return (
      <div className="flex h-full flex-col">
        <div className="flex h-[42%] flex-col justify-between p-2" style={{ background: accent }}>
          <span className="h-2.5 w-11 rounded-[2px]" style={{ background: readableOn(accent) }} />
          <Lines count={2} className="bg-black/30" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5 bg-[#eeebe6] p-2">
          <span className="h-[2px] bg-neutral-900" />
          <Lines count={3} className="bg-neutral-400/70" />
        </div>
        <span className="h-3 bg-[#8f9297]" />
      </div>
    );
  const dark = id === "midnight";
  const editorial = id === "editorial";
  return (
    <div className={cn("flex h-full flex-col", dark ? "bg-[#16161a]" : "bg-white")}>
      <img
        src={dark ? covers.dusk : covers.meadow}
        alt=""
        className={cn(
          "object-cover",
          editorial ? "h-9 w-full [mask-image:linear-gradient(to_bottom,black_40%,transparent)]" : "m-1.5 mb-0 h-6 rounded-[3px]",
        )}
      />
      <div className="flex flex-1 flex-col gap-2 p-2">
        {editorial ? (
          <span className="ml-auto h-1 w-8 rounded-sm bg-neutral-800" />
        ) : (
          <span className={cn("h-3 w-12 rounded-[2px]", dark ? "bg-white" : "bg-neutral-900")} />
        )}
        <Lines count={2} className={dark ? "bg-white/25" : "bg-neutral-300"} />
        <span className={cn("h-px", dark ? "bg-white/20" : "bg-neutral-300")} />
        <Lines count={3} className={dark ? "bg-white/15" : "bg-neutral-200"} />
      </div>
    </div>
  );
};

export const TemplatePicker = ({ value, accent, text, onChange }: TemplatePickerProps) => {
  const covers = useMemo(
    () => ({ meadow: renderPresetCover("meadow", accent), dusk: renderPresetCover("dusk", accent) }),
    [accent],
  );
  return (
    <div role="radiogroup" aria-label={text.template} className="-mx-1 flex gap-3 overflow-x-auto px-1 pt-1 pb-2 print:hidden">
      {TEMPLATE_ORDER.map((id) => {
        const active = id === value;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(id)}
            className="group/tpl flex shrink-0 flex-col items-center gap-1.5 outline-none"
          >
            <span
              className={cn(
                "relative block h-[92px] w-[68px] overflow-hidden rounded-lg shadow-sm ring-1 ring-black/10 transition duration-200 group-hover/tpl:-translate-y-0.5 group-hover/tpl:shadow-md group-focus-visible/tpl:ring-2 group-focus-visible/tpl:ring-ring",
                active && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              )}
            >
              <Preview id={id} accent={accent} covers={covers} />
              {active && (
                <span className="absolute right-1 bottom-1 flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-2.5" />
                </span>
              )}
            </span>
            <span className={cn("text-xs", active ? "font-semibold text-foreground" : "text-muted-foreground")}>
              {text.templates[id]}
            </span>
          </button>
        );
      })}
    </div>
  );
};
