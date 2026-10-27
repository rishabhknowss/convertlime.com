"use client";

import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ToolIcon } from "@/components/tool/tool-icon";
import { useLocale } from "@/i18n/locale-provider";

type ToolSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ToolSearchDialog = ({ open, onOpenChange }: ToolSearchDialogProps) => {
  const router = useRouter();
  const { ui, tools, categories } = useLocale();

  const go = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title={ui.search.title}>
      <Command>
        <CommandInput placeholder={ui.search.placeholder} />
        <CommandList>
          <CommandEmpty>{ui.search.empty}</CommandEmpty>
          {categories.map((category) => (
            <CommandGroup key={category.id} heading={category.label}>
              {tools
                .filter((tool) => tool.category === category.id)
                .map((tool) => (
                  <CommandItem key={tool.slug} value={`${tool.heading} ${tool.keyword}`} onSelect={() => go(tool.path)}>
                    <ToolIcon category={tool.category} slug={tool.slug} className="size-4 text-muted-foreground" />
                    {tool.heading}
                  </CommandItem>
                ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
