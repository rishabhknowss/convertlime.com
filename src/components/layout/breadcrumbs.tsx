import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; href?: string };

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
    <ol className="flex flex-wrap items-center gap-1.5">
      {items.map((item, index) => (
        <li key={item.name} className="flex items-center gap-1.5">
          {index > 0 && <ChevronRight className="size-3.5" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground">
              {item.name}
            </Link>
          ) : (
            <span className="text-foreground">{item.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
