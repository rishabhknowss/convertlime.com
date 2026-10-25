"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { InstallDialog } from "@/components/pwa/install-dialog";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export type InstallMode = "prompt" | "ios" | "manual";

type InstallContextValue = {
  installed: boolean;
  openInstall: () => void;
};

const InstallContext = createContext<InstallContextValue>({ installed: false, openInstall: () => {} });

export const useInstall = () => useContext(InstallContext);

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent);

export const InstallProvider = ({ children }: { children: React.ReactNode }) => {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<InstallMode>("manual");

  useEffect(() => {
    setInstalled(isStandalone());
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production")
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
      setOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const openInstall = () => {
    setMode(promptEvent ? "prompt" : isIos() ? "ios" : "manual");
    setOpen(true);
  };

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;
    setPromptEvent(null);
    if (outcome === "accepted") setInstalled(true);
    setOpen(false);
  };

  return (
    <InstallContext.Provider value={{ installed, openInstall }}>
      {children}
      <InstallDialog open={open} mode={mode} onOpenChange={setOpen} onInstall={install} />
    </InstallContext.Provider>
  );
};
