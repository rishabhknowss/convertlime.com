"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/locale-provider";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const { ui } = useLocale();
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={ui.nav.toggleTheme}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
};
