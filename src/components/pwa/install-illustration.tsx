import Image from "next/image";

export const InstallIllustration = () => (
  <div className="flex justify-center pt-2" aria-hidden>
    <div className="relative">
      <div className="h-28 w-44 rounded-t-xl border-4 border-b-0 border-border bg-gradient-to-b from-background to-accent p-2">
        <div className="flex h-full flex-col items-center justify-end gap-1.5 pb-1">
          <span className="text-primary">↓</span>
          <div className="flex items-center gap-1 rounded-md bg-muted px-1.5 py-1">
            <span className="size-3 rounded-sm bg-muted-foreground/30" />
            <span className="size-3 rounded-sm bg-muted-foreground/30" />
            <Image src="/brand/icon-192.png" width={16} height={16} alt="" className="rounded-[4px]" />
            <span className="size-3 rounded-sm bg-muted-foreground/30" />
            <span className="size-3 rounded-sm bg-muted-foreground/30" />
          </div>
        </div>
      </div>
      <div className="-mx-6 h-2 rounded-b-lg bg-border" />
    </div>
  </div>
);
