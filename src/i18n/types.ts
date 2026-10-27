import type { FormatId } from "@/data/formats";
import type { CategoryId, ToolKind } from "@/data/tools";

export type QA = { question: string; answer: string };
export type TextSection = { heading: string; body: string[] };

export type ToolVars = {
  kind: ToolKind;
  from: string;
  to: string;
  fromId: FormatId;
  toId: FormatId;
  kb: number;
  imageToPdf: boolean;
  toLossless: boolean;
  englishKeyword: string;
};

export type FormatVars = {
  label: string;
  fullName: string;
  origin: string;
  bestFor: string;
  weakSpot: string;
  id: FormatId;
};

export type UiStrings = {
  nav: {
    allTools: string;
    tools: string;
    resources: string;
    guides: string;
    about: string;
    privacy: string;
    menu: string;
    toggleTheme: string;
    language: string;
    filesNeverLeave: string;
    contact: string;
    footerNote: string;
  };
  search: { trigger: string; title: string; placeholder: string; empty: string };
  askAi: { label: string; prompt: string };
  install: {
    button: string;
    title: string;
    description: string;
    appName: string;
    cancel: string;
    close: string;
    install: string;
    iosStep1: string;
    iosShare: string;
    iosStep2: string;
    iosAdd: string;
    manual: string;
  };
  errors: {
    generic: string;
    copy: string;
  };
  converter: {
    paste: string;
    dropAnywhere: string;
    choose: string;
    addMore: string;
    dragDrop: string;
    local: string;
    images: string;
    files: string;
    quality: string;
    maxSize: string;
    pageSize: string;
    sameAsImage: string;
    a4: string;
    download: string;
    downloadAll: string;
    downloadPdf: string;
    page: string;
    pages: string;
    clear: string;
    smaller: string;
    remove: string;
    readError: string;
    webpError: string;
    avifError: string;
  };
  removeBg: {
    preparing: string;
    preparingNote: string;
    removeButton: string;
    removeMany: string;
    format: string;
    downloadAs: string;
    copy: string;
    copied: string;
    addMore: string;
    jpgNote: string;
    working: string;
    failed: string;
    background: string;
    transparent: string;
    white: string;
    black: string;
    pickColor: string;
    original: string;
    result: string;
    compare: string;
  };
};

export type Dictionary = {
  site: { tagline: string; description: string; homeTitle: string };
  ui: UiStrings;
  categories: Record<CategoryId, string>;
  formats: Record<FormatId, { fullName: string; origin: string; bestFor: string; weakSpot: string }>;
  compare: {
    transparent: string;
    animation: string;
    compression: string;
    bestFor: string;
    yes: string;
    no: string;
    types: { lossy: string; lossless: string; both: string; vector: string; document: string };
  };
  tool: {
    heading: (v: ToolVars) => string;
    title: (v: ToolVars) => string;
    description: (v: ToolVars) => string;
    lead: (v: ToolVars) => string;
    keywords: (v: ToolVars) => string[];
    promises: [string, string, string];
    howToUse: (heading: string) => string;
    versus: (from: string, to: string) => string;
    faqHeading: (heading: string) => string;
    helpfulGuides: string;
    moreConverters: string;
    breadcrumbHome: string;
  };
  content: {
    convert: {
      steps: (v: ToolVars) => string[];
      why: (v: ToolVars, from: FormatVars, to: FormatVars) => TextSection;
      devices: (v: ToolVars) => TextSection[];
      aboutHeading: (f: FormatVars) => string;
      aboutBody: (f: FormatVars) => string[];
      safe: (v: ToolVars, heading: string) => TextSection;
      faqs: (v: ToolVars, heading: string) => QA[];
    };
    resize: { steps: (kb: number) => string[]; sections: (kb: number) => TextSection[]; faqs: (kb: number) => QA[] };
    compress: { steps: string[]; sections: TextSection[]; faqs: QA[] };
    pdf: {
      imageWord: string;
      steps: (label: string) => string[];
      why: (label: string) => TextSection;
      faqs: (label: string) => QA[];
    };
  };
  home: {
    h1: string;
    h1Accent: string;
    intro: string;
    introStrong: string;
    introEnd: string;
    promises: { title: string; text: string }[];
    startWith: string;
    guides: string;
    allGuides: string;
    questions: string;
    faqs: QA[];
    toolListName: string;
  };
  blog: {
    title: string;
    metaTitle: string;
    description: string;
    h1: string;
    intro: string;
    updated: string;
    minRead: string;
    onThisPage: string;
    faqTitle: string;
    relatedTools: string;
    moreGuides: string;
    ctaTitle: (heading: string) => string;
    ctaButton: string;
    ctaNote: string;
    rssTitle: string;
    rssDescription: string;
  };
  about: {
    metaDescription: string;
    h1: string;
    intro: string;
    whyHeading: string;
    whyBody: string;
    costHeading: string;
    costBody: string;
    installLink: string;
    costEnd: string;
    contactHeading: string;
    contactBody: string;
    startHeading: string;
    start: { slug: string; text: string }[];
  };
  privacy: { h1: string; metaDescription: string; points: { heading: string; body: string }[] };
  notFound: { title: string; h1: string; body: string; allTools: string };
  removeBg: {
    heading: string;
    title: string;
    description: string;
    lead: string;
    keywords: string[];
    promises: [string, string, string];
    steps: string[];
    sections: TextSection[];
    faqs: QA[];
  };
};
