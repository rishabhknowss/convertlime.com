import type { Metadata } from "next";
import { AppShell } from "@/components/layout/app-shell";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `${SITE.name} converts your files on your own device. Nothing is uploaded or stored.`,
  alternates: { canonical: `${SITE.url}/privacy` },
};

const POINTS = [
  {
    heading: "Your files stay on your device",
    body: "Every conversion runs inside your browser using your own computer or phone. Files are never sent to our servers, so we cannot see, keep or share them.",
  },
  {
    heading: "No account needed",
    body: "There is no sign-up and no login. We do not ask for your name or email to use any tool.",
  },
  {
    heading: "What we do collect",
    body: "Like most websites, we may count anonymous page visits to understand which tools are popular. This never includes your files or their contents.",
  },
  {
    heading: "Contact",
    body: `Questions about privacy? Email ${SITE.email}.`,
  },
];

const Privacy = () => (
  <AppShell title="Privacy">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-4xl font-bold tracking-tight">Privacy</h1>
      <div className="mt-8 flex flex-col gap-8 leading-7 text-muted-foreground">
        {POINTS.map((point) => (
          <section key={point.heading}>
            <h2 className="mb-2 text-xl font-semibold text-foreground">{point.heading}</h2>
            <p>{point.body}</p>
          </section>
        ))}
      </div>
    </div>
  </AppShell>
);

export default Privacy;
