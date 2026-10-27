"use client";

import { Upload } from "lucide-react";
import { useLocale } from "@/i18n/locale-provider";

export const DropOverlay = ({ show }: { show: boolean }) => {
  const { ui } = useLocale();
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-primary bg-card px-12 py-10 text-lg font-medium shadow-xl">
        <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Upload className="size-5" />
        </span>
        {ui.converter.dropAnywhere}
      </div>
    </div>
  );
};
