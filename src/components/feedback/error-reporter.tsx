"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/report-error";

const IGNORED = /ResizeObserver loop|chrome-extension:|moz-extension:|safari-extension:|Script error/i;

export const ErrorReporter = () => {
  useEffect(() => {
    const onError = (event: ErrorEvent) => {
      if (IGNORED.test(`${event.message} ${event.filename}`)) return;
      reportError(event.error ?? event.message, { action: "unhandled-error" });
    };
    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason instanceof Error ? `${event.reason.message} ${event.reason.stack}` : String(event.reason);
      if (IGNORED.test(reason)) return;
      reportError(event.reason, { action: "unhandled-rejection" });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
};
