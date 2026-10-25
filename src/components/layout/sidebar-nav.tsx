"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ChevronRight, Info, LayoutGrid, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES, toolsByCategory } from "@/data/tools";
import { toolHeading } from "@/lib/seo";

const navLink = (active: boolean) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
    active ? "bg-sidebar-accent font-medium text-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
  );

export const SidebarNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-1 text-sm">
      <Link href="/" onClick={onNavigate} className={navLink(pathname === "/")}>
        <LayoutGrid className="size-4" />
        All tools
      </Link>
      <p className="mt-5 mb-1 px-3 text-xs font-medium text-muted-foreground/70">Tools</p>
      {CATEGORIES.map((category) => {
        const tools = toolsByCategory(category.id);
        const open = tools.some((tool) => pathname === `/${tool.slug}`);
        return (
          <details key={category.id} open={open} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground">
              <span>{category.label}</span>
              <span className="flex items-center gap-2 text-xs">
                {tools.length}
                <ChevronRight className="size-3.5 transition-transform group-open:rotate-90" />
              </span>
            </summary>
            <div className="ml-3 flex flex-col border-l pl-2">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  onClick={onNavigate}
                  className={cn(navLink(pathname === `/${tool.slug}`), "py-1.5")}
                >
                  {toolHeading(tool)}
                </Link>
              ))}
            </div>
          </details>
        );
      })}
      <p className="mt-5 mb-1 px-3 text-xs font-medium text-muted-foreground/70">Resources</p>
      <Link href="/blog" onClick={onNavigate} className={navLink(pathname.startsWith("/blog"))}>
        <BookOpen className="size-4" />
        Guides
      </Link>
      <Link href="/about" onClick={onNavigate} className={navLink(pathname === "/about")}>
        <Info className="size-4" />
        About
      </Link>
      <Link href="/privacy" onClick={onNavigate} className={navLink(pathname === "/privacy")}>
        <ShieldCheck className="size-4" />
        Privacy
      </Link>
    </nav>
  );
};
