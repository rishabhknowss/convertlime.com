"use client";

import { useSyncExternalStore } from "react";
import { IDLE_STATUS, getStatus, subscribe } from "@/lib/remove-bg/status";

export const useRemoveBgStatus = () => useSyncExternalStore(subscribe, getStatus, () => IDLE_STATUS);
