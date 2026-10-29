"use client";

import { useState } from "react";
import { parseNumber } from "@/lib/invoice/money";

type PercentFieldProps = {
  value: number;
  onValue: (value: number) => void;
  label: string;
};

export const PercentField = ({ value, onValue, label }: PercentFieldProps) => {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <span className="inline-flex h-6 items-center rounded-md border border-border bg-white pr-1.5 text-xs tabular-nums transition-[border-color,box-shadow] focus-within:border-[var(--inv-accent)] focus-within:shadow-[0_0_0_2px_color-mix(in_oklab,var(--inv-accent)_22%,transparent)] hover:border-[color-mix(in_oklab,var(--inv-accent)_50%,var(--border))] print:border-transparent">
      <input
        aria-label={`${label} %`}
        inputMode="decimal"
        placeholder="0"
        value={draft ?? (value ? String(value) : "")}
        onFocus={() => setDraft(value ? String(value) : "")}
        onBlur={() => setDraft(null)}
        onChange={(event) => {
          setDraft(event.target.value);
          onValue(Math.min(100, Math.max(0, parseNumber(event.target.value))));
        }}
        className="w-9 bg-transparent pl-1.5 text-right text-foreground outline-none placeholder:text-muted-foreground/60"
      />
      <span className="pl-0.5 text-muted-foreground">%</span>
    </span>
  );
};
