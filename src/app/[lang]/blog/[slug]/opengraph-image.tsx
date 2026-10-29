import { ImageResponse } from "next/og";
import { OgCard } from "@/components/brand/og-card";
import { getPost } from "@/lib/blog";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ogFontFamily, ogFonts } from "@/lib/og/fonts";

export const alt = "ConvertLime";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rendered on first request and cached, so the build stays within the host's memory limit.
export const generateStaticParams = () => [];

const Image = async ({ params }: { params: Promise<{ lang: string; slug: string }> }) => {
  const { lang, slug } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  const heading = getPost(locale, slug)?.title ?? dict.blog.title;
  const subheading = dict.blog.title;
  const footer = dict.blog.ctaNote;
  return new ImageResponse(
    <OgCard heading={heading} subheading={subheading} footer={footer} fontFamily={ogFontFamily(locale)} />,
    { ...size, fonts: await ogFonts(locale, `ConvertLime convertlime.com ${heading}${subheading}${footer}`) },
  );
};

export default Image;
