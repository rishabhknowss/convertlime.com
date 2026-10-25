"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToolSearch } from "@/components/search/search-provider";
import { useLocale } from "@/i18n/locale-provider";

type SearchTriggerProps = { size?: "sm" | "lg"; className?: string };

export const SearchTrigger = ({ size = "sm", className }: SearchTriggerProps) => {
  const { open } = useToolSearch();
  const { ui } = useLocale();
  return (
    <button
      type="button"
      onClick={open}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl border bg-card text-left text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground",
        size === "lg" ? "h-14 px-5 text-base" : "h-10 px-3 text-sm",
        className,
      )}
    >
      <Search className={size === "lg" ? "size-5" : "size-4"} />
      <span className="flex-1">{ui.search.trigger}</span>
      <kbd className="rounded-md border px-1.5 py-0.5 font-mono text-[11px]">Ctrl K</kbd>
    </button>
  );
};
