import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import type { Locale } from "@/i18n/config";

type AppShellProps = { title: string; locale: Locale; children: React.ReactNode };

export const AppShell = ({ title, locale, children }: AppShellProps) => (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="flex min-w-0 flex-1 flex-col">
      <Topbar title={title} />
      <main className="flex-1 px-4 py-10 lg:px-12 lg:py-14">{children}</main>
      <Footer locale={locale} />
    </div>
  </div>
);
