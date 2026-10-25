import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";

export const Topbar = ({ title }: { title: string }) => (
  <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
    <MobileNav />
    <div className="lg:hidden">
      <Logo />
    </div>
    <span className="hidden truncate text-sm font-medium lg:block">{title}</span>
    <div className="ml-auto flex items-center gap-1">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  </header>
);
