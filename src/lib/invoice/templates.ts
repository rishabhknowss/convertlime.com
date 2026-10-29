import type { TemplateId } from "@/lib/invoice/types";

export type TemplateLayout = "classic" | "studio" | "bold";

export type TemplateTheme = {
  paper: string;
  ink: string;
  muted: string;
  faint: string;
  line: string;
  dark: boolean;
};

export type InvoiceTemplate = {
  id: TemplateId;
  layout: TemplateLayout;
  family: "sans" | "serif";
  theme: TemplateTheme;
  cover: "none" | "banner" | "fade";
  titleStyle: "accent" | "huge" | "caps";
};

const LIGHT: TemplateTheme = {
  paper: "#ffffff",
  ink: "#171717",
  muted: "#6b6b6b",
  faint: "#a3a3a3",
  line: "#e7e7e7",
  dark: false,
};

const DARK: TemplateTheme = {
  paper: "#16161a",
  ink: "#f4f4f5",
  muted: "#a1a1aa",
  faint: "#71717a",
  line: "#2c2c33",
  dark: true,
};

export const TEMPLATES: Record<TemplateId, InvoiceTemplate> = {
  classic: { id: "classic", layout: "classic", family: "sans", theme: LIGHT, cover: "none", titleStyle: "accent" },
  studio: { id: "studio", layout: "studio", family: "sans", theme: LIGHT, cover: "banner", titleStyle: "huge" },
  midnight: { id: "midnight", layout: "studio", family: "sans", theme: DARK, cover: "banner", titleStyle: "huge" },
  editorial: { id: "editorial", layout: "studio", family: "serif", theme: LIGHT, cover: "fade", titleStyle: "caps" },
  bold: { id: "bold", layout: "bold", family: "sans", theme: LIGHT, cover: "none", titleStyle: "huge" },
};

export const TEMPLATE_ORDER: TemplateId[] = ["classic", "studio", "midnight", "editorial", "bold"];

export const getTemplate = (id: TemplateId | undefined) => TEMPLATES[id ?? "classic"] ?? TEMPLATES.classic;

export const readableOn = (hex: string) => {
  const value = Number.parseInt(hex.replace("#", "").slice(0, 6), 16);
  const r = ((value >> 16) & 255) / 255;
  const g = ((value >> 8) & 255) / 255;
  const b = (value & 255) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.5 ? "#ffffff" : "#111111";
};

const relativeLuminance = (hex: string) => {
  const value = Number.parseInt(hex.replace("#", "").slice(0, 6), 16);
  const channel = (shift: number) => {
    const c = ((value >> shift) & 255) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(16) + 0.7152 * channel(8) + 0.0722 * channel(0);
};

export const contrastRatio = (a: string, b: string) => {
  const [light, dark] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
};

export const visibleAccent = (accent: string, theme: TemplateTheme) =>
  contrastRatio(accent, theme.paper) >= 3 ? accent : theme.ink;
