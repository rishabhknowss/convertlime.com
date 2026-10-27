"use client";

import { Loader2 } from "lucide-react";
import { fill } from "@/i18n/config";
import { useLocale } from "@/i18n/locale-provider";
import { useRemoveBgStatus } from "@/components/remove-bg/use-remove-bg-status";

const DOTS = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 53) % 100}%`,
  delay: `${(index % 6) * 0.25}s`,
}));

export const ScanOverlay = () => {
  const { ui } = useLocale();
  const status = useRemoveBgStatus();
  const preparing = status.phase === "loading" && status.progress < 1;
  const label = preparing
    ? fill(ui.removeBg.preparing, { percent: Math.round(status.progress * 100) })
    : ui.removeBg.working;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" role="status" aria-live="polite">
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,color-mix(in_oklch,var(--primary)_35%,transparent)_95%),linear-gradient(90deg,transparent_95%,color-mix(in_oklch,var(--primary)_35%,transparent)_95%)] bg-[length:28px_28px] opacity-40" />
      {DOTS.map((dot) => (
        <span
          key={`${dot.left}-${dot.top}`}
          className="cl-sparkle absolute size-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]"
          style={{ left: dot.left, top: dot.top, animationDelay: dot.delay }}
        />
      ))}
      <div className="cl-scan absolute inset-x-0 top-0 h-full">
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[color-mix(in_oklch,var(--primary)_45%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary shadow-[0_0_18px_4px_var(--primary)]" />
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
        <div className="flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur">
          <Loader2 className="size-4 animate-spin text-primary" />
          {label}
        </div>
      </div>
      {preparing && (
        <div className="absolute inset-x-0 top-0 h-1 bg-black/30">
          <div className="h-full bg-primary transition-[width]" style={{ width: `${Math.round(status.progress * 100)}%` }} />
        </div>
      )}
    </div>
  );
};
