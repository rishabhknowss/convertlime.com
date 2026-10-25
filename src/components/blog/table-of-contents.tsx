import type { BlogPost } from "@/lib/blog";

type TableOfContentsProps = { headings: BlogPost["headings"]; title: string };

export const TableOfContents = ({ headings, title }: TableOfContentsProps) =>
  headings.length > 2 ? (
    <nav aria-label={title} className="mb-10 rounded-2xl border bg-card p-5 text-sm">
      <p className="mb-3 font-medium">{title}</p>
      <ol className="flex flex-col gap-2 text-muted-foreground">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="hover:text-foreground">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  ) : null;
