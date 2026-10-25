import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${SITE.name} is a free file converter that works inside your browser, so your photos are never uploaded. Here is how it works and why we built it.`,
  alternates: { canonical: `${SITE.url}/about` },
};

const About = () => (
  <AppShell title="About">
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <h1 className="text-4xl font-bold tracking-tight">About {SITE.name}</h1>
      <div className="prose-blog mt-6">
        <p>
          {SITE.name} is a free converter for the image files that cause the most trouble: iPhone HEIC photos, AVIF and
          WebP images saved from websites, JFIF downloads, and photos that are too big for an online form.
        </p>
        <h2>Why it runs in your browser</h2>
        <p>
          Most online converters upload your files to their server, convert them there and send them back. That is slow,
          and it means a stranger&apos;s computer holds a copy of your photos. {SITE.name} does the work on your own
          phone or computer instead. Nothing is uploaded, so it is faster, it works offline, and your files stay private.
        </p>
        <h2>What it costs</h2>
        <p>
          Nothing. There is no account, no daily limit and no watermark. If you find it useful, you can{" "}
          <Link href="/">install it as an app</Link> for one-click access.
        </p>
        <h2>Contact</h2>
        <p>
          Questions, bug reports or a file that will not convert? Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <h2>Where to start</h2>
        <ul>
          <li>
            <Link href="/heic-to-jpg">HEIC to JPG</Link> – open iPhone photos anywhere
          </li>
          <li>
            <Link href="/compress-image">Compress image</Link> – make photos smaller for email and uploads
          </li>
          <li>
            <Link href="/resize-image-to-50kb">Resize image to 50KB</Link> – for exam and job application forms
          </li>
          <li>
            <Link href="/blog">Guides</Link> – step-by-step help for Windows, Mac, iPhone and Android
          </li>
        </ul>
      </div>
    </div>
  </AppShell>
);

export default About;
