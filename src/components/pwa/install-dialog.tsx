"use client";

import Image from "next/image";
import { Share, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { InstallIllustration } from "@/components/pwa/install-illustration";
import type { InstallMode } from "@/components/pwa/install-provider";
import { SITE } from "@/config/site";
import { useLocale } from "@/i18n/locale-provider";

type InstallDialogProps = {
  open: boolean;
  mode: InstallMode;
  onOpenChange: (open: boolean) => void;
  onInstall: () => void;
};

export const InstallDialog = ({
  open,
  mode,
  onOpenChange,
  onInstall,
}: InstallDialogProps) => {
  const { ui } = useLocale();
  const text = ui.install;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 rounded-2xl sm:max-w-md">
        <InstallIllustration />
        <div>
          <DialogTitle className="text-xl">{text.title}</DialogTitle>
          <DialogDescription className="mt-1">
            {text.description}
          </DialogDescription>
        </div>
        <div className="flex items-center gap-3">
          <Image
            src="/brand/icon-192.png"
            width={44}
            height={44}
            alt=""
            className="rounded-xl"
          />
          <div className="min-w-0">
            <p className="truncate font-medium">{text.appName}</p>
            <p className="text-sm text-muted-foreground">
              {new URL(SITE.url).host}
            </p>
          </div>
        </div>
        {mode === "ios" && (
          <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              {text.iosStep1} <Share className="size-4 text-foreground" />{" "}
              <span className="text-foreground">{text.iosShare}</span>
            </li>
            <li className="flex items-center gap-2">
              {text.iosStep2} <SquarePlus className="size-4 text-foreground" />
              <span className="text-foreground">{text.iosAdd}</span>
            </li>
          </ol>
        )}
        {mode === "manual" && (
          <p className="text-sm text-muted-foreground">{text.manual}</p>
        )}
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-5"
            onClick={() => onOpenChange(false)}
          >
            {mode === "prompt" ? text.cancel : text.close}
          </Button>
          {mode === "prompt" && (
            <Button size="lg" className="rounded-full px-6" onClick={onInstall}>
              {text.install}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
