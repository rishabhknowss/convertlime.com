"use client";

import Image from "next/image";
import { Share, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { InstallIllustration } from "@/components/pwa/install-illustration";
import type { InstallMode } from "@/components/pwa/install-provider";
import { SITE } from "@/config/site";

type InstallDialogProps = {
  open: boolean;
  mode: InstallMode;
  onOpenChange: (open: boolean) => void;
  onInstall: () => void;
};

const IosSteps = () => (
  <ol className="flex flex-col gap-2 text-sm text-muted-foreground">
    <li className="flex items-center gap-2">
      1. Tap <Share className="size-4 text-foreground" /> <span className="text-foreground">Share</span> in Safari
    </li>
    <li className="flex items-center gap-2">
      2. Choose <SquarePlus className="size-4 text-foreground" />
      <span className="text-foreground">Add to Home Screen</span>
    </li>
  </ol>
);

const ManualSteps = () => (
  <p className="text-sm text-muted-foreground">
    Open this site in <span className="text-foreground">Chrome</span> or{" "}
    <span className="text-foreground">Edge</span>, then click the install icon at the right of the address bar.
  </p>
);

export const InstallDialog = ({ open, mode, onOpenChange, onInstall }: InstallDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="gap-5 rounded-2xl sm:max-w-md">
      <InstallIllustration />
      <div>
        <DialogTitle className="text-xl">Install app</DialogTitle>
        <DialogDescription className="mt-1">
          Convert files in their own window – it opens instantly and works even when you are offline.
        </DialogDescription>
      </div>
      <div className="flex items-center gap-3">
        <Image src="/brand/icon-192.png" width={44} height={44} alt="" className="rounded-xl" />
        <div className="min-w-0">
          <p className="truncate font-medium">{SITE.name} – Free File Converter</p>
          <p className="text-sm text-muted-foreground">{new URL(SITE.url).host}</p>
        </div>
      </div>
      {mode === "ios" && <IosSteps />}
      {mode === "manual" && <ManualSteps />}
      <div className="flex justify-end gap-2">
        <Button variant="outline" size="lg" className="rounded-full px-5" onClick={() => onOpenChange(false)}>
          {mode === "prompt" ? "Cancel" : "Close"}
        </Button>
        {mode === "prompt" && (
          <Button size="lg" className="rounded-full px-6" onClick={onInstall}>
            Install
          </Button>
        )}
      </div>
    </DialogContent>
  </Dialog>
);
