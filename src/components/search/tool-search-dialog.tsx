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
import { CATEGORIES, toolsByCategory } from "@/data/tools";
import { toolHeading } from "@/lib/seo";
import { ToolIcon } from "@/components/tool/tool-icon";

type ToolSearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ToolSearchDialog = ({ open, onOpenChange }: ToolSearchDialogProps) => {
  const router = useRouter();

  const go = (slug: string) => {
    onOpenChange(false);
    router.push(`/${slug}`);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} title="Search tools">
      <Command>
        <CommandInput placeholder="Search tools… e.g. heic to jpg" />
        <CommandList>
          <CommandEmpty>No tool found.</CommandEmpty>
          {CATEGORIES.map((category) => (
            <CommandGroup key={category.id} heading={category.label}>
              {toolsByCategory(category.id).map((tool) => (
                <CommandItem
                  key={tool.slug}
                  value={`${toolHeading(tool)} ${tool.keyword}`}
                  onSelect={() => go(tool.slug)}
                >
                  <ToolIcon tool={tool} className="size-4 text-muted-foreground" />
                  {toolHeading(tool)}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
