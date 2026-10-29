"use client";

import { useState, type KeyboardEvent } from "react";
import { InlineInput } from "@/components/invoice/inline-field";
import { parseNumber } from "@/lib/invoice/money";
import { cn } from "@/lib/utils";

type NumberFieldProps = {
  value: number;
  onValue: (value: number) => void;
  label: string;
  suffix?: string;
  className?: string;
  onEnter?: () => void;
  format?: (value: number) => string;
};

const display = (value: number) => (value ? String(value) : "");

export const NumberField = ({ value, onValue, label, suffix, className, onEnter, format }: NumberFieldProps) => {
  const [draft, setDraft] = useState<string | null>(null);
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && onEnter) {
      event.preventDefault();
      onEnter();
    }
  };
  return (
    <span className="relative flex items-center">
      <InlineInput
        aria-label={label}
        inputMode="decimal"
        placeholder="0"
        value={draft ?? (format && value ? format(value) : display(value))}
        onFocus={() => setDraft(display(value))}
        onBlur={() => setDraft(null)}
        onKeyDown={onKeyDown}
        onValue={(raw) => {
          setDraft(raw);
          onValue(parseNumber(raw));
        }}
        className={cn("text-right tabular-nums", suffix && "pr-5", className)}
      />
      {suffix && <span className="pointer-events-none absolute right-0 text-muted-foreground">{suffix}</span>}
    </span>
  );
};
