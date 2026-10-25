"use client";

import { Download } from "lucide-react";
import { useInstall } from "@/components/pwa/install-provider";

export const InstallButton = () => {
  const { installed, openInstall } = useInstall();
  if (installed) return null;
  return (
    <button
      type="button"
      onClick={openInstall}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
    >
      <Download className="size-4" />
      Install app
    </button>
  );
};
