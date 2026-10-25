import { Lock } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SearchTrigger } from "@/components/search/search-trigger";
import { InstallButton } from "@/components/pwa/install-button";
import { AskAi } from "@/components/tool/ask-ai";

export const SidebarBody = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className="flex h-full flex-col">
    <div className="flex flex-col gap-4 p-4">
      <Logo />
      <SearchTrigger />
    </div>
    <div className="flex-1 overflow-y-auto px-3 pb-4">
      <SidebarNav onNavigate={onNavigate} />
    </div>
    <div className="flex flex-col gap-3 border-t p-3">
      <AskAi />
      <InstallButton />
      <p className="flex items-center gap-2 px-3 text-xs text-muted-foreground">
        <Lock className="size-3.5 text-primary" />
        Your files never leave your device
      </p>
    </div>
  </div>
);

export const Sidebar = () => (
  <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r bg-sidebar lg:block">
    <SidebarBody />
  </aside>
);
