import { FORMATS, type FormatId } from "@/data/formats";
import type { Tool } from "@/data/tools";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Dictionary, FormatVars, QA, TextSection } from "@/i18n/types";
import { toolHeading, toolVars } from "@/lib/seo";

export type Faq = QA;
export type Section = TextSection;
export type CompareRow = { label: string; from: string; to: string };

export type ToolContent = {
  steps: string[];
  sections: Section[];
  compare?: CompareRow[];
  faqs: Faq[];
};

export const formatVars = (id: FormatId, dict: Dictionary): FormatVars => ({
  id,
  label: FORMATS[id].label,
  ...dict.formats[id],
});

const aboutFormat = (format: FormatVars, dict: Dictionary): Section => ({
  heading: dict.content.convert.aboutHeading(format),
  body: dict.content.convert.aboutBody(format),
});

const compareRows = (from: FormatId, to: FormatId, dict: Dictionary): CompareRow[] => {
  const a = FORMATS[from];
  const b = FORMATS[to];
  const yesNo = (value: boolean) => (value ? dict.compare.yes : dict.compare.no);
  return [
    { label: dict.compare.transparent, from: yesNo(a.transparency), to: yesNo(b.transparency) },
    { label: dict.compare.animation, from: yesNo(a.animation), to: yesNo(b.animation) },
    { label: dict.compare.compression, from: dict.compare.types[a.compression], to: dict.compare.types[b.compression] },
    { label: dict.compare.bestFor, from: dict.formats[from].bestFor, to: dict.formats[to].bestFor },
  ];
};

const convertContent = (tool: Tool, locale: Locale, dict: Dictionary): ToolContent => {
  const v = toolVars(tool);
  const heading = toolHeading(tool, locale);
  const from = formatVars(v.fromId, dict);
  const to = formatVars(v.toId, dict);
  const text = dict.content.convert;
  return {
    steps: text.steps(v),
    sections: [
      text.why(v, from, to),
      ...text.devices(v),
      aboutFormat(from, dict),
      aboutFormat(to, dict),
      text.safe(v, heading),
    ],
    compare: compareRows(v.fromId, v.toId, dict),
    faqs: text.faqs(v, heading),
  };
};

const pdfContent = (tool: Tool, dict: Dictionary): ToolContent => {
  const v = toolVars(tool);
  const label = v.imageToPdf ? dict.content.pdf.imageWord : v.from;
  return {
    steps: dict.content.pdf.steps(label),
    sections: [dict.content.pdf.why(label), aboutFormat(formatVars(v.fromId, dict), dict)],
    faqs: dict.content.pdf.faqs(label),
  };
};

export const toolContent = (tool: Tool, locale: Locale): ToolContent => {
  const dict = getDictionary(locale);
  if (tool.kind === "resize-kb") {
    const kb = tool.targetKb ?? 100;
    return {
      steps: dict.content.resize.steps(kb),
      sections: dict.content.resize.sections(kb),
      faqs: dict.content.resize.faqs(kb),
    };
  }
  if (tool.kind === "compress")
    return { steps: dict.content.compress.steps, sections: dict.content.compress.sections, faqs: dict.content.compress.faqs };
  if (tool.kind === "to-pdf") return pdfContent(tool, dict);
  if (tool.kind === "remove-bg")
    return { steps: dict.removeBg.steps, sections: dict.removeBg.sections, faqs: dict.removeBg.faqs };
  return convertContent(tool, locale, dict);
};
