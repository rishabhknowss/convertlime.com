import { FORMATS, type Format } from "@/data/formats";
import type { Tool } from "@/data/tools";
import { toolHeading } from "@/lib/seo";

export type Faq = { question: string; answer: string };
export type Section = { heading: string; body: string[] };
export type CompareRow = { label: string; from: string; to: string };

export type ToolContent = {
  steps: string[];
  sections: Section[];
  compare?: CompareRow[];
  faqs: Faq[];
};

const yesNo = (value: boolean) => (value ? "Yes" : "No");

const compressionText = (format: Format) =>
  ({
    lossy: "Lossy",
    lossless: "Lossless",
    both: "Lossy or lossless",
    vector: "Vector (no pixels)",
    document: "Document",
  })[format.compression];

const compareRows = (from: Format, to: Format): CompareRow[] => [
  { label: "Transparent background", from: yesNo(from.transparency), to: yesNo(to.transparency) },
  { label: "Animation", from: yesNo(from.animation), to: yesNo(to.animation) },
  { label: "Compression", from: compressionText(from), to: compressionText(to) },
  { label: "Best for", from: from.bestFor, to: to.bestFor },
];

const AN_FORMATS = new Set(["avif", "ico", "svg"]);

const article = (format: Format) => (AN_FORMATS.has(format.id) ? "an" : "a");

const aboutFormat = (format: Format): Section => ({
  heading: `What is ${article(format)} ${format.label} file?`,
  body: [
    `${format.label} (${format.fullName}) is ${format.origin}. It is best for ${format.bestFor}.`,
    `The catch: ${format.weakSpot}.`,
  ],
});

const deviceSections = (tool: Tool): Section[] => {
  const from = FORMATS[tool.from[0]];
  const to = FORMATS[tool.to];
  if (from.id !== "heic" && from.id !== "heif") return [];
  return [
    {
      heading: `How to convert ${from.label} to ${to.label} on Windows`,
      body: [
        `Windows 10 and 11 cannot open ${from.label} photos without an extra paid codec. Open this page in Edge or Chrome, drop your photos in, and download the ${to.label} files – nothing to install.`,
      ],
    },
    {
      heading: `How to convert ${from.label} to ${to.label} on Mac`,
      body: [
        `Preview can export one photo at a time. To convert a whole folder at once, drag the photos onto this page and download them together as a ZIP.`,
      ],
    },
    {
      heading: `How to convert ${from.label} to ${to.label} on iPhone`,
      body: [
        `Open this page in Safari, tap the drop area, choose your photos and tap Download. To stop new photos saving as ${from.label}, go to Settings → Camera → Formats → Most Compatible.`,
      ],
    },
  ];
};

const convertContent = (tool: Tool): ToolContent => {
  const from = FORMATS[tool.from[0]];
  const to = FORMATS[tool.to];
  const heading = toolHeading(tool);
  return {
    steps: [
      `Drop your ${from.label} files into the box above, or tap to choose them.`,
      `Each file converts to ${to.label} right away in your browser.`,
      `Download files one by one, or all at once as a ZIP.`,
    ],
    sections: [
      {
        heading: `Why convert ${from.label} to ${to.label}?`,
        body: [
          `${from.label} is great for ${from.bestFor}, but ${from.weakSpot}. ${to.label} is ${to.origin}, so the file will open where you need it.`,
        ],
      },
      ...deviceSections(tool),
      aboutFormat(from),
      aboutFormat(to),
      {
        heading: `Is this ${heading} safe?`,
        body: [
          `Yes. Conversion happens on your own device inside your browser. Your files are never uploaded to a server, so nobody else can see them – it even works offline once the page has loaded.`,
        ],
      },
    ],
    compare: compareRows(from, to),
    faqs: [
      {
        question: `Is the ${heading} free?`,
        answer: `Yes. Convert as many ${from.label} files to ${to.label} as you like – no sign-up, no limits and no watermark.`,
      },
      {
        question: `Are my ${from.label} files uploaded anywhere?`,
        answer: `No. Every file is converted on your device, in your browser. Nothing is sent to a server.`,
      },
      {
        question: `Can I convert many ${from.label} files to ${to.label} at once?`,
        answer: `Yes. Drop in a whole batch and download them all together as one ZIP file.`,
      },
      {
        question: `Will I lose quality converting ${from.label} to ${to.label}?`,
        answer:
          to.compression === "lossless"
            ? `No. ${to.label} keeps every pixel, though the file may be larger than the original.`
            : `Very little. Use the quality slider – 90% looks the same as the original for almost every photo.`,
      },
    ],
  };
};

const resizeContent = (tool: Tool): ToolContent => ({
  steps: [
    "Drop your photo or signature into the box above.",
    `We find the best quality that still fits under ${tool.targetKb}KB.`,
    "Download the JPG and upload it to your form.",
  ],
  sections: [
    {
      heading: `When do you need a photo under ${tool.targetKb}KB?`,
      body: [
        `Exam, job and government forms often reject photos and signatures above a size limit – ${tool.targetKb}KB is one of the most common. This tool lowers the file size step by step and only shrinks the dimensions if it has to, so your photo stays as sharp as possible.`,
      ],
    },
    {
      heading: "Does my photo get uploaded?",
      body: ["No. The resizing happens in your browser, so your ID photo or signature never leaves your phone or computer."],
    },
  ],
  faqs: [
    { question: `How do I resize an image to ${tool.targetKb}KB?`, answer: `Drop it in the box above. You get a JPG under ${tool.targetKb}KB in a second or two.` },
    { question: "Will the photo still look clear?", answer: "Yes. We pick the highest quality that fits the limit, and only make the photo smaller in size if that alone is not enough." },
    { question: "Can I resize HEIC iPhone photos?", answer: "Yes. HEIC, PNG, WebP and AVIF photos are all turned into a JPG under the limit." },
  ],
});

const compressContent = (): ToolContent => ({
  steps: [
    "Drop your images into the box above.",
    "Pick a quality level, or set a maximum size in KB.",
    "Download the smaller images one by one or as a ZIP.",
  ],
  sections: [
    {
      heading: "How does image compression work?",
      body: ["Photos store far more detail than your eye can see. Compression removes detail you will not notice, which can cut file size by 60–80% with no visible difference."],
    },
    {
      heading: "Is it private?",
      body: ["Yes. Images are compressed in your browser and never uploaded anywhere."],
    },
  ],
  faqs: [
    { question: "How much smaller will my images get?", answer: "Most photos shrink by 50–80%. Screenshots and graphics saved as PNG often shrink even more." },
    { question: "Can I compress an image to a specific size?", answer: "Yes. Turn on the maximum size option and type a size in KB." },
    { question: "Is compressing images free?", answer: "Yes – no sign-up, no limits and no watermark." },
  ],
});

const pdfContent = (tool: Tool): ToolContent => {
  const from = FORMATS[tool.from[0]];
  const label = tool.slug === "image-to-pdf" ? "image" : from.label;
  return {
    steps: [
      `Drop one or more ${label} files into the box above.`,
      "Choose original size or A4 pages.",
      "Download one PDF with every image as its own page.",
    ],
    sections: [
      {
        heading: `Why turn ${label} files into a PDF?`,
        body: ["A PDF opens the same way on every phone and computer, prints cleanly and keeps many photos together in one file – ideal for forms, receipts and sending documents by email."],
      },
      aboutFormat(from),
    ],
    faqs: [
      { question: `How do I convert ${label} to PDF?`, answer: `Drop your ${label} files above and press Download PDF. Each image becomes a page, in the order you added them.` },
      { question: "Is there a watermark?", answer: "No. The PDF is clean, free and made on your device." },
      { question: "Can I add many images to one PDF?", answer: "Yes. Add as many as you like – they all go into a single PDF." },
    ],
  };
};

export const toolContent = (tool: Tool): ToolContent => {
  if (tool.kind === "resize-kb") return resizeContent(tool);
  if (tool.kind === "compress") return compressContent();
  if (tool.kind === "to-pdf") return pdfContent(tool);
  return convertContent(tool);
};
