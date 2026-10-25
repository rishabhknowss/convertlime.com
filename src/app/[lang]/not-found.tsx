import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { ToolCard } from "@/components/tool/tool-card";
import { TOOLS } from "@/data/tools";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const NotFound = () => {
  const locale = DEFAULT_LOCALE;
  const { notFound } = getDictionary(locale);
  return (
    <AppShell title={notFound.title} locale={locale}>
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">{notFound.h1}</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {notFound.body}{" "}
          <Link href="/" className="text-foreground underline decoration-primary underline-offset-4">
            {notFound.allTools}
          </Link>
          .
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {TOOLS.filter((tool) => tool.featured).map((tool) => (
            <ToolCard key={tool.slug} tool={tool} locale={locale} />
          ))}
        </div>
      </div>
    </AppShell>
  );
};

export default NotFound;
