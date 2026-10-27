"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, Info, LayoutGrid, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale, useLocalePath } from "@/i18n/locale-provider";

const safeDecode = (path: string) => {
  try {
    return decodeURI(path);
  } catch {
    return path;
  }
};

const navLink = (active: boolean) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
    active ? "bg-sidebar-accent font-medium text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
  );

export const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const { ui, tools, categories } = useLocale();
  const toPath = useLocalePath();
  const isActive = (path: string) => pathname === toPath(path);
  const isCurrent = (path: string) => safeDecode(pathname) === path;

  return (
    <nav className="flex flex-col gap-1 text-sm">
      <Link href={toPath("/")} onClick={onNavigate} className={navLink(isActive("/"))}>
        <LayoutGrid className="size-4" />
        {ui.nav.allTools}
      </Link>
      <p className="mt-5 mb-1 px-3 text-xs font-medium text-muted-foreground/70">{ui.nav.tools}</p>
      {categories.map((category) => {
        const items = tools.filter((tool) => tool.category === category.id);
        const open = items.some((tool) => isCurrent(tool.path));
        return (
          <details key={category.id} open={open} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground">
              <span>{category.label}</span>
              <span className="flex items-center gap-2 text-xs">
                {items.length}
                <ChevronRight className="size-3.5 transition-transform group-open:rotate-90" />
              </span>
            </summary>
            <div className="ml-3 flex flex-col border-l pl-2">
              {items.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.path}
                  onClick={onNavigate}
                  className={cn(navLink(isCurrent(tool.path)), "py-1.5")}
                >
                  {tool.heading}
                </Link>
              ))}
            </div>
          </details>
        );
      })}
      <p className="mt-5 mb-1 px-3 text-xs font-medium text-muted-foreground/70">{ui.nav.resources}</p>
      <Link href={toPath("/blog")} onClick={onNavigate} className={navLink(pathname.startsWith(toPath("/blog")))}>
        <BookOpen className="size-4" />
        {ui.nav.guides}
      </Link>
      <Link href={toPath("/about")} onClick={onNavigate} className={navLink(isActive("/about"))}>
        <Info className="size-4" />
        {ui.nav.about}
      </Link>
      <Link href={toPath("/privacy")} onClick={onNavigate} className={navLink(isActive("/privacy"))}>
        <ShieldCheck className="size-4" />
        {ui.nav.privacy}
      </Link>
    </nav>
  );
};
