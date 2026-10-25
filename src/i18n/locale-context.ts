import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { CATEGORIES, TOOLS } from "@/data/tools";
import { toolHeading } from "@/lib/seo";

export const localeContext = (locale: Locale) => {
  const dict = getDictionary(locale);
  return {
    locale,
    ui: dict.ui,
    categories: CATEGORIES.map((category) => ({ id: category.id, label: dict.categories[category.id] })),
    tools: TOOLS.map((tool) => ({
      slug: tool.slug,
      heading: toolHeading(tool, locale),
      category: tool.category,
      keyword: tool.keyword,
    })),
  };
};
