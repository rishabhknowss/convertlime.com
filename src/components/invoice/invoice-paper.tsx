"use client";

import { LookProvider } from "@/components/invoice/invoice-look";
import { PaperBold } from "@/components/invoice/paper-bold";
import { PaperClassic } from "@/components/invoice/paper-classic";
import { PaperStudio } from "@/components/invoice/paper-studio";
import type { PaperProps } from "@/components/invoice/paper-props";
import { getTemplate } from "@/lib/invoice/templates";

const LAYOUTS = { classic: PaperClassic, studio: PaperStudio, bold: PaperBold };

export const InvoicePaper = (props: PaperProps) => {
  const template = getTemplate(props.invoice.template);
  const Layout = LAYOUTS[template.layout];
  return (
    <LookProvider template={template}>
      <Layout {...props} />
    </LookProvider>
  );
};
