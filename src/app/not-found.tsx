import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { ToolCard } from "@/components/tool/tool-card";
import { TOOLS } from "@/data/tools";

const NotFound = () => (
  <AppShell title="Page not found">
    <div className="mx-auto max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight">This page doesn&apos;t exist</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        The link may be old. Try one of the most used converters below, or go to{" "}
        <Link href="/" className="text-foreground underline decoration-primary underline-offset-4">
          all tools
        </Link>
        .
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {TOOLS.filter((tool) => tool.featured).map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  </AppShell>
);

export default NotFound;
