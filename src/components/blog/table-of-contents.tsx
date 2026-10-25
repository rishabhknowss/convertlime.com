import type { BlogPost } from "@/lib/blog";

export const TableOfContents = ({ headings }: { headings: BlogPost["headings"] }) =>
  headings.length > 2 ? (
    <nav aria-label="On this page" className="mb-10 rounded-2xl border bg-card p-5 text-sm">
      <p className="mb-3 font-medium">On this page</p>
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
