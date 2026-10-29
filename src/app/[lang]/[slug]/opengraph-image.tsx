import { ImageResponse } from "next/og";
import { OgCard } from "@/components/brand/og-card";
import { TOOLS, findTool, toolSlug } from "@/data/tools";
import { toolHeading, toolPromises } from "@/lib/seo";
import { LOCALES, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ogFontFamily, ogFonts } from "@/lib/og/fonts";

export const alt = "ConvertLime";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () =>
  LOCALES.flatMap((lang) => TOOLS.map((tool) => ({ lang, slug: toolSlug(tool, lang) })));

const Image = async ({ params }: { params: Promise<{ lang: string; slug: string }> }) => {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const tool = findTool(slug, locale);
  const dict = getDictionary(locale);
  const heading = tool ? toolHeading(tool, locale) : dict.home.h1;
  const promises = tool ? toolPromises(tool, locale) : dict.tool.promises;
  const subheading = promises === dict.tool.promises ? promises[2] : promises[0];
  const footer = dict.ui.nav.filesNeverLeave;
  return new ImageResponse(
    <OgCard heading={heading} subheading={subheading} footer={footer} fontFamily={ogFontFamily(locale)} />,
    { ...size, fonts: await ogFonts(locale, `ConvertLime convertlime.com ${heading}${subheading}${footer}`) },
  );
};

export default Image;
