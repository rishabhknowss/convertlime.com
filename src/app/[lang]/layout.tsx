import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { SITE, SOCIAL_IMAGE } from "@/config/site";
import { LOCALES, LOCALE_META, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeContext } from "@/i18n/locale-context";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const dynamicParams = false;

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export const generateMetadata = async ({ params }: LayoutProps<"/[lang]">): Promise<Metadata> => {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  const title = `${SITE.name} – ${dict.site.tagline}`;
  return {
    metadataBase: new URL(SITE.url),
    title: { default: title, template: `%s | ${SITE.name}` },
    description: dict.site.description,
    applicationName: SITE.name,
    appleWebApp: { capable: true, title: SITE.name, statusBarStyle: "black-translucent" },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : undefined,
    },
    openGraph: {
      title,
      description: dict.site.description,
      siteName: SITE.name,
      type: "website",
      locale: LOCALE_META[lang].ogLocale,
      images: [SOCIAL_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description: dict.site.description, images: [SOCIAL_IMAGE] },
  };
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
    { media: "(prefers-color-scheme: light)", color: "#fcfcfc" },
  ],
};

const RootLayout = async ({ children, params }: LayoutProps<"/[lang]">) => {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={LOCALE_META[lang].hreflang}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background">
        <Providers locale={localeContext(lang)}>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
