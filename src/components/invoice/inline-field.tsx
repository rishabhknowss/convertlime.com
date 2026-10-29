"use client";

import { useLayoutEffect, useRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";

const FIELD =
  "w-full min-w-0 rounded-md bg-transparent px-1.5 py-0.5 -mx-1.5 outline-none transition-[background-color,box-shadow] duration-150 placeholder:text-muted-foreground/55 hover:bg-[color-mix(in_oklab,var(--inv-accent)_7%,transparent)] focus:bg-[color-mix(in_oklab,var(--inv-accent)_9%,transparent)] focus:shadow-[0_0_0_1.5px_var(--inv-accent)] print:placeholder:text-transparent print:hover:bg-transparent";

type InlineInputProps = Omit<ComponentProps<"input">, "onChange"> & { onValue: (value: string) => void };

export const InlineInput = ({ className, onValue, ...props }: InlineInputProps) => (
  <input {...props} onChange={(event) => onValue(event.target.value)} className={cn(FIELD, className)} />
);

type InlineTextareaProps = Omit<ComponentProps<"textarea">, "onChange" | "ref"> & {
  onValue: (value: string) => void;
  ref?: (element: HTMLTextAreaElement | null) => void;
};

export const InlineTextarea = ({ className, onValue, value, ref: forwarded, ...props }: InlineTextareaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.style.height = "0px";
    element.style.height = `${element.scrollHeight}px`;
  }, [value]);
  return (
    <textarea
      {...props}
      ref={(element) => {
        ref.current = element;
        forwarded?.(element);
      }}
      rows={1}
      value={value}
      onChange={(event) => onValue(event.target.value)}
      className={cn(FIELD, "block resize-none overflow-hidden leading-relaxed", className)}
    />
  );
};
