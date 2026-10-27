type ErrorContext = { action: string; tool?: string; file?: File };

export const reportError = (error: unknown, context: ErrorContext) => {
  const failure = error instanceof Error ? error : new Error(String(error));
  const body = JSON.stringify({
    tool: context.tool,
    action: context.action,
    message: failure.message,
    stack: failure.stack,
    fileType: context.file?.type || context.file?.name.split(".").pop(),
    fileSize: context.file?.size,
    page: window.location.pathname,
  });
  if (process.env.NODE_ENV !== "production") console.error(failure);
  try {
    const sent = navigator.sendBeacon?.("/api/client-error", new Blob([body], { type: "application/json" }));
    if (!sent) fetch("/api/client-error", { method: "POST", body, keepalive: true }).catch(() => undefined);
  } catch {
    return;
  }
};
