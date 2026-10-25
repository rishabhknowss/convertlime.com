import Link from "next/link";
import { SITE } from "@/config/site";
import { TOOLS } from "@/data/tools";
import { toolHeading } from "@/lib/seo";

export const Footer = () => (
  <footer className="border-t px-4 py-10 text-sm text-muted-foreground lg:px-12">
    <div className="mx-auto grid max-w-5xl gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
      {TOOLS.filter((tool) => tool.featured).map((tool) => (
        <Link key={tool.slug} href={`/${tool.slug}`} className="hover:text-foreground">
          {toolHeading(tool)}
        </Link>
      ))}
    </div>
    <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
      <span>
        © {SITE.name}. Files are converted on your device and never uploaded.
      </span>
      <div className="flex gap-4">
        {[
          ["/blog", "Guides"],
          ["/about", "About"],
          ["/privacy", "Privacy"],
          ["/feed.xml", "RSS"],
          ["/llms.txt", "llms.txt"],
          [`mailto:${SITE.email}`, "Contact"],
        ].map(([href, label]) => (
          <a key={href} href={href} className="hover:text-foreground">
            {label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);
