"use client";

import { Download } from "lucide-react";
import { useInstall } from "@/components/pwa/install-provider";
import { useLocale } from "@/i18n/locale-provider";

export const InstallButton = () => {
  const { installed, openInstall } = useInstall();
  const { ui } = useLocale();
  if (installed) return null;
  return (
    <button
      type="button"
      onClick={openInstall}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
    >
      <Download className="size-4" />
      {ui.install.button}
    </button>
  );
};
