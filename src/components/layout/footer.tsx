import Link from "next/link";
import { SITE } from "@/config/site";
import { TOOLS, toolPath } from "@/data/tools";
import { toolHeading } from "@/lib/seo";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { FeaturedBadges } from "@/components/layout/featured-badges";

export const Footer = ({ locale }: { locale: Locale }) => {
  const { ui } = getDictionary(locale);
  const links = [
    [localePath(locale, "/blog"), ui.nav.guides],
    [localePath(locale, "/about"), ui.nav.about],
    [localePath(locale, "/privacy"), ui.nav.privacy],
    ["/feed.xml", "RSS"],
    ["/llms.txt", "llms.txt"],
    [SITE.github, "GitHub"],
    [`mailto:${SITE.email}`, ui.nav.contact],
  ];
  return (
    <footer className="border-t px-4 py-10 text-sm text-muted-foreground lg:px-12">
      <div className="mx-auto grid max-w-5xl gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-4">
        {TOOLS.filter((tool) => tool.featured).map((tool) => (
          <Link key={tool.slug} href={toolPath(tool, locale)} className="hover:text-foreground">
            {toolHeading(tool, locale)}
          </Link>
        ))}
      </div>
      <FeaturedBadges />
      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-between gap-3 border-t pt-6 text-xs">
        <span>
          © {SITE.name}. {ui.nav.footerNote}
        </span>
        <div className="flex flex-wrap gap-4">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-foreground">
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
