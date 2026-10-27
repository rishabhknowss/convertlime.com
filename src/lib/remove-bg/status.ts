export type RemoveBgStatus = { phase: "idle" | "loading" | "ready"; progress: number };

let status: RemoveBgStatus = { phase: "idle", progress: 0 };
const listeners = new Set<() => void>();

const publish = (next: RemoveBgStatus) => {
  status = next;
  listeners.forEach((listener) => listener());
};

export const setLoading = (progress: number) => {
  if (status.phase === "ready") return;
  publish({ phase: "loading", progress: Math.max(status.progress, Math.min(1, progress)) });
};

export const setReady = () => publish({ phase: "ready", progress: 1 });

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getStatus = () => status;

export const IDLE_STATUS: RemoveBgStatus = { phase: "idle", progress: 0 };
