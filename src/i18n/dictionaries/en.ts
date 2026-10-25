import type { Dictionary, FormatVars, ToolVars } from "@/i18n/types";

const AN = new Set(["avif", "ico", "svg"]);
const article = (f: FormatVars) => (AN.has(f.id) ? "an" : "a");

const heading = (v: ToolVars) =>
  v.kind === "convert" || v.kind === "to-pdf"
    ? /converter$/i.test(v.englishKeyword)
      ? v.englishKeyword
      : `${v.englishKeyword} Converter`
    : v.englishKeyword;

export const en: Dictionary = {
  site: {
    tagline: "Free file converter that runs in your browser",
    description:
      "Convert HEIC, AVIF, WebP, JFIF, PNG and JPG files free in your browser. No sign-up, no upload, no watermark – your files never leave your device.",
    homeTitle: "Free File Converter – HEIC, AVIF, WebP to JPG & PNG, No Upload",
  },
  ui: {
    nav: {
      allTools: "All tools",
      tools: "Tools",
      resources: "Resources",
      guides: "Guides",
      about: "About",
      privacy: "Privacy",
      menu: "Menu",
      toggleTheme: "Toggle light and dark mode",
      language: "Language",
      filesNeverLeave: "Your files never leave your device",
      contact: "Contact",
      footerNote: "Files are converted on your device and never uploaded.",
    },
    search: {
      trigger: "Search tools",
      title: "Search tools",
      placeholder: "Search tools… e.g. heic to jpg",
      empty: "No tool found.",
    },
    askAi: {
      label: "Ask AI about this page",
      prompt:
        "Read {url} and explain in simple steps what it helps me do. Is ConvertLime a safe, private way to convert my files without uploading them?",
    },
    install: {
      button: "Install app",
      title: "Install app",
      description: "Convert files in their own window – it opens instantly and works even when you are offline.",
      appName: "ConvertLime – Free File Converter",
      cancel: "Cancel",
      close: "Close",
      install: "Install",
      iosStep1: "1. Tap",
      iosShare: "Share",
      iosStep2: "2. Choose",
      iosAdd: "Add to Home Screen",
      manual: "Open this site in Chrome or Edge, then click the install icon at the right of the address bar.",
    },
    converter: {
      choose: "Choose {files}",
      addMore: "Add more {files}",
      dragDrop: "or drag and drop them here",
      local: "Converted on your device – nothing is uploaded",
      images: "images",
      files: "{format} files",
      quality: "Quality",
      maxSize: "Max size",
      pageSize: "Page size",
      sameAsImage: "Same as image",
      a4: "A4",
      download: "Download",
      downloadAll: "Download all ({count}) as ZIP",
      downloadPdf: "Download PDF ({count} {pages})",
      page: "page",
      pages: "pages",
      clear: "Clear",
      smaller: "{percent}% smaller",
      remove: "Remove file",
      readError: "This file could not be read as an image.",
      webpError: "This browser cannot create WebP files. Try Chrome, Edge or Firefox.",
      avifError: "This AVIF file could not be read. Try opening and re-saving it first.",
    },
  },
  categories: {
    iphone: "iPhone photos",
    web: "Web images",
    everyday: "Everyday formats",
    compress: "Compress & resize",
    pdf: "Images to PDF",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "the default photo format on iPhones and iPads since iOS 11",
      bestFor: "storing phone photos at about half the size of a JPG",
      weakSpot: "Windows, many websites and older apps cannot open it",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "the container standard behind HEIC, used by some Android phones and cameras",
      bestFor: "high quality photos in small files",
      weakSpot: "browsers and most editors still do not support it",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "a modern web image format built on the AV1 video codec",
      bestFor: "the smallest web images at a given quality",
      weakSpot: "older editors, Office apps and many upload forms reject it",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "a JPEG variant that Windows and some browsers save images as",
      bestFor: "the same photos a JPG is good for",
      weakSpot: "upload forms often refuse the .jfif extension even though the data is JPEG",
    },
    webp: {
      fullName: "WebP Image",
      origin: "Google's web image format, now used by most large websites",
      bestFor: "fast loading web images with transparency",
      weakSpot: "many desktop apps, printers and older software cannot open it",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "the standard lossless image format of the web",
      bestFor: "screenshots, logos and graphics that need sharp edges or transparency",
      weakSpot: "photos as PNG are several times larger than the same photo as JPG",
    },
    jpg: {
      fullName: "JPEG Image",
      origin: "the most widely supported photo format, readable almost everywhere",
      bestFor: "photos you need to share, upload or print",
      weakSpot: "no transparency, and every re-save loses a little quality",
    },
    jpeg: {
      fullName: "JPEG Image",
      origin: "the same format as JPG, just with the longer file extension",
      bestFor: "photos you need to share, upload or print",
      weakSpot: "some upload forms only accept the .jpg spelling",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "a 1987 format still used everywhere for short animations",
      bestFor: "simple animations and stickers that play anywhere",
      weakSpot: "only 256 colours, so photos look grainy",
    },
    bmp: {
      fullName: "Bitmap Image",
      origin: "an uncompressed Windows image format",
      bestFor: "old software and hardware that expects raw pixels",
      weakSpot: "files are very large because nothing is compressed",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "the format scanners, printers and photo archives use",
      bestFor: "scans and print work where no detail can be lost",
      weakSpot: "browsers cannot show it and files are large",
    },
    ico: {
      fullName: "Windows Icon",
      origin: "the icon format for Windows apps and website favicons",
      bestFor: "favicons and desktop shortcut icons",
      weakSpot: "only useful for small square icons",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "a vector format made of shapes instead of pixels",
      bestFor: "logos and icons that must stay sharp at any size",
      weakSpot: "social sites, documents and many apps will not accept it",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "the universal document format",
      bestFor: "sending, printing and submitting images as one document",
      weakSpot: "images inside are harder to edit",
    },
  },
  compare: {
    transparent: "Transparent background",
    animation: "Animation",
    compression: "Compression",
    bestFor: "Best for",
    yes: "Yes",
    no: "No",
    types: {
      lossy: "Lossy",
      lossless: "Lossless",
      both: "Lossy or lossless",
      vector: "Vector (no pixels)",
      document: "Document",
    },
  },
  tool: {
    heading,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} Online – Free, Exact Size`;
      if (v.kind === "compress") return `${heading(v)} Online – Free, No Upload`;
      return `${heading(v)} – Free, Private, No Upload`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `${v.englishKeyword} in seconds. Get a photo under ${v.kb}KB for forms and uploads, free, no sign-up, and your photo never leaves your device.`;
      if (v.kind === "compress")
        return "Compress images online for free. Shrink JPG, PNG, WebP and iPhone photos in your browser – no sign-up, no upload, no watermark.";
      return `Convert ${v.from} to ${v.to} free in your browser. Batch convert in one click – no sign-up, no upload, no watermark. Your files never leave your device.`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb") return `Drop a photo and get a JPG under ${v.kb}KB, ready for online forms and uploads.`;
      if (v.kind === "compress") return "Make images smaller without making them look worse.";
      return `Turn ${v.from} files into ${v.to} in seconds. Batch convert as many as you like.`;
    },
    keywords: (v) => {
      const keyword = v.englishKeyword.toLowerCase();
      return [keyword, heading(v).toLowerCase(), `${keyword} free`, `${keyword} online`];
    },
    promises: ["No upload – stays on your device", "Instant batch conversion", "Free, no sign-up, no watermark"],
    howToUse: (h) => `How to use the ${h}`,
    versus: (from, to) => `${from} vs ${to}`,
    faqHeading: (h) => `${h} – FAQ`,
    helpfulGuides: "Helpful guides",
    moreConverters: "More free converters",
    breadcrumbHome: "Home",
  },
  content: {
    convert: {
      steps: (v) => [
        `Drop your ${v.from} files into the box above, or tap to choose them.`,
        `Each file converts to ${v.to} right away in your browser.`,
        "Download files one by one, or all at once as a ZIP.",
      ],
      why: (v, from, to) => ({
        heading: `Why convert ${v.from} to ${v.to}?`,
        body: [
          `${v.from} is great for ${from.bestFor}, but ${from.weakSpot}. ${v.to} is ${to.origin}, so the file will open where you need it.`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `How to convert ${v.from} to ${v.to} on Windows`,
                body: [
                  `Windows 10 and 11 cannot open ${v.from} photos without an extra paid codec. Open this page in Edge or Chrome, drop your photos in, and download the ${v.to} files – nothing to install.`,
                ],
              },
              {
                heading: `How to convert ${v.from} to ${v.to} on Mac`,
                body: [
                  "Preview can export one photo at a time. To convert a whole folder at once, drag the photos onto this page and download them together as a ZIP.",
                ],
              },
              {
                heading: `How to convert ${v.from} to ${v.to} on iPhone`,
                body: [
                  `Open this page in Safari, tap the drop area, choose your photos and tap Download. To stop new photos saving as ${v.from}, go to Settings → Camera → Formats → Most Compatible.`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `What is ${article(f)} ${f.label} file?`,
      aboutBody: (f) => [
        `${f.label} (${f.fullName}) is ${f.origin}. It is best for ${f.bestFor}.`,
        `The catch: ${f.weakSpot}.`,
      ],
      safe: (_v, h) => ({
        heading: `Is this ${h} safe?`,
        body: [
          "Yes. Conversion happens on your own device inside your browser. Your files are never uploaded to a server, so nobody else can see them – it even works offline once the page has loaded.",
        ],
      }),
      faqs: (v, h) => [
        {
          question: `Is the ${h} free?`,
          answer: `Yes. Convert as many ${v.from} files to ${v.to} as you like – no sign-up, no limits and no watermark.`,
        },
        {
          question: `Are my ${v.from} files uploaded anywhere?`,
          answer: "No. Every file is converted on your device, in your browser. Nothing is sent to a server.",
        },
        {
          question: `Can I convert many ${v.from} files to ${v.to} at once?`,
          answer: "Yes. Drop in a whole batch and download them all together as one ZIP file.",
        },
        {
          question: `Will I lose quality converting ${v.from} to ${v.to}?`,
          answer: v.toLossless
            ? `No. ${v.to} keeps every pixel, though the file may be larger than the original.`
            : "Very little. Use the quality slider – 90% looks the same as the original for almost every photo.",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "Drop your photo or signature into the box above.",
        `We find the best quality that still fits under ${kb}KB.`,
        "Download the JPG and upload it to your form.",
      ],
      sections: (kb) => [
        {
          heading: `When do you need a photo under ${kb}KB?`,
          body: [
            `Exam, job and government forms often reject photos and signatures above a size limit – ${kb}KB is one of the most common. This tool lowers the file size step by step and only shrinks the dimensions if it has to, so your photo stays as sharp as possible.`,
          ],
        },
        {
          heading: "Does my photo get uploaded?",
          body: ["No. The resizing happens in your browser, so your ID photo or signature never leaves your phone or computer."],
        },
      ],
      faqs: (kb) => [
        { question: `How do I resize an image to ${kb}KB?`, answer: `Drop it in the box above. You get a JPG under ${kb}KB in a second or two.` },
        {
          question: "Will the photo still look clear?",
          answer: "Yes. We pick the highest quality that fits the limit, and only make the photo smaller in size if that alone is not enough.",
        },
        { question: "Can I resize HEIC iPhone photos?", answer: "Yes. HEIC, PNG, WebP and AVIF photos are all turned into a JPG under the limit." },
      ],
    },
    compress: {
      steps: [
        "Drop your images into the box above.",
        "Pick a quality level, or set a maximum size in KB.",
        "Download the smaller images one by one or as a ZIP.",
      ],
      sections: [
        {
          heading: "How does image compression work?",
          body: [
            "Photos store far more detail than your eye can see. Compression removes detail you will not notice, which can cut file size by 60–80% with no visible difference.",
          ],
        },
        { heading: "Is it private?", body: ["Yes. Images are compressed in your browser and never uploaded anywhere."] },
      ],
      faqs: [
        { question: "How much smaller will my images get?", answer: "Most photos shrink by 50–80%. Screenshots and graphics saved as PNG often shrink even more." },
        { question: "Can I compress an image to a specific size?", answer: "Yes. Turn on the maximum size option and type a size in KB." },
        { question: "Is compressing images free?", answer: "Yes – no sign-up, no limits and no watermark." },
      ],
    },
    pdf: {
      imageWord: "image",
      steps: (label) => [
        `Drop one or more ${label} files into the box above.`,
        "Choose original size or A4 pages.",
        "Download one PDF with every image as its own page.",
      ],
      why: (label) => ({
        heading: `Why turn ${label} files into a PDF?`,
        body: [
          "A PDF opens the same way on every phone and computer, prints cleanly and keeps many photos together in one file – ideal for forms, receipts and sending documents by email.",
        ],
      }),
      faqs: (label) => [
        {
          question: `How do I convert ${label} to PDF?`,
          answer: `Drop your ${label} files above and press Download PDF. Each image becomes a page, in the order you added them.`,
        },
        { question: "Is there a watermark?", answer: "No. The PDF is clean, free and made on your device." },
        { question: "Can I add many images to one PDF?", answer: "Yes. Add as many as you like – they all go into a single PDF." },
      ],
    },
  },
  home: {
    h1: "Free File Converter",
    h1Accent: "Without Uploading",
    intro: "Convert HEIC, AVIF, WebP, JFIF, PNG and JPG files instantly in your browser.",
    introStrong: "100% free, no sign-up, no watermark",
    introEnd: "– your files never leave your device.",
    promises: [
      { title: "Private", text: "Files never leave your device" },
      { title: "Instant", text: "Batch convert in one click" },
      { title: "Works offline", text: "No upload, no waiting" },
    ],
    startWith: "Start with",
    guides: "Guides",
    allGuides: "All guides →",
    questions: "Questions",
    faqs: [
      { question: "Is ConvertLime really free?", answer: "Yes. Every converter is free with no sign-up, no daily limit and no watermark on your files." },
      {
        question: "Are my files uploaded to a server?",
        answer:
          "No. Conversion runs inside your web browser on your own phone or computer. Your photos never leave your device, which also makes it fast and lets it work offline.",
      },
      {
        question: "Which file types can I convert?",
        answer:
          "iPhone HEIC and HEIF photos, AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO and SVG. You can also compress images, resize them to an exact size in KB and turn images into a PDF.",
      },
      {
        question: "Does it work on iPhone and Android?",
        answer:
          "Yes. Open the site in Safari or Chrome, tap the drop area to pick photos and download the converted files. You can also add it to your home screen like an app.",
      },
    ],
    toolListName: "Free file converters",
  },
  blog: {
    title: "Guides",
    metaTitle: "Guides – Open, Convert & Compress Image Files",
    description:
      "Step-by-step guides to open HEIC, AVIF, WebP and JFIF files, convert them to JPG or PNG, and shrink photos for forms – free, with no uploads.",
    h1: "Image file guides",
    intro: "Clear, step-by-step answers for opening, converting and shrinking image files on Windows, Mac, iPhone and Android.",
    updated: "Updated",
    minRead: "min read",
    onThisPage: "On this page",
    faqTitle: "Frequently asked questions",
    relatedTools: "Related free tools",
    moreGuides: "More guides",
    ctaTitle: (h) => `Use the free ${h}`,
    ctaButton: "Convert now",
    ctaNote: "No sign-up, no upload – runs in your browser",
    rssTitle: "ConvertLime Guides",
    rssDescription: "Step-by-step guides to open, convert and compress image files.",
  },
  about: {
    metaDescription:
      "ConvertLime is a free file converter that works inside your browser, so your photos are never uploaded. Here is how it works and why we built it.",
    h1: "About ConvertLime",
    intro:
      "ConvertLime is a free converter for the image files that cause the most trouble: iPhone HEIC photos, AVIF and WebP images saved from websites, JFIF downloads, and photos that are too big for an online form.",
    whyHeading: "Why it runs in your browser",
    whyBody:
      "Most online converters upload your files to their server, convert them there and send them back. That is slow, and it means a stranger's computer holds a copy of your photos. ConvertLime does the work on your own phone or computer instead. Nothing is uploaded, so it is faster, it works offline, and your files stay private.",
    costHeading: "What it costs",
    costBody: "Nothing. There is no account, no daily limit and no watermark. If you find it useful, you can",
    installLink: "install it as an app",
    costEnd: "for one-click access.",
    contactHeading: "Contact",
    contactBody: "Questions, bug reports or a file that will not convert? Email",
    startHeading: "Where to start",
    start: [
      { slug: "heic-to-jpg", text: "open iPhone photos anywhere" },
      { slug: "compress-image", text: "make photos smaller for email and uploads" },
      { slug: "resize-image-to-50kb", text: "for exam and job application forms" },
    ],
  },
  privacy: {
    h1: "Privacy",
    metaDescription: "ConvertLime converts your files on your own device. Nothing is uploaded or stored.",
    points: [
      {
        heading: "Your files stay on your device",
        body: "Every conversion runs inside your browser using your own computer or phone. Files are never sent to our servers, so we cannot see, keep or share them.",
      },
      { heading: "No account needed", body: "There is no sign-up and no login. We do not ask for your name or email to use any tool." },
      {
        heading: "What we do collect",
        body: "Like most websites, we may count anonymous page visits to understand which tools are popular. This never includes your files or their contents.",
      },
      { heading: "Contact", body: "Questions about privacy? Email {email}." },
    ],
  },
  notFound: {
    title: "Page not found",
    h1: "This page doesn't exist",
    body: "The link may be old. Try one of the most used converters below, or go to",
    allTools: "all tools",
  },
};
