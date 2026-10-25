import type { MetadataRoute } from "next";
import { SITE } from "@/config/site";

const manifest = (): MetadataRoute.Manifest => ({
  id: "/",
  name: `${SITE.name} – Free File Converter`,
  short_name: SITE.name,
  description: SITE.description,
  start_url: "/?source=pwa",
  scope: "/",
  display: "standalone",
  display_override: ["window-controls-overlay", "standalone"],
  background_color: "#0b0b0b",
  theme_color: "#182018",
  categories: ["utilities", "photo", "productivity"],
  icons: [
    { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/brand/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
    { src: "/brand/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
  ],
  shortcuts: [
    { name: "HEIC to JPG", url: "/heic-to-jpg", icons: [{ src: "/brand/icon-192.png", sizes: "192x192" }] },
    { name: "Compress image", url: "/compress-image", icons: [{ src: "/brand/icon-192.png", sizes: "192x192" }] },
    { name: "Image to PDF", url: "/image-to-pdf", icons: [{ src: "/brand/icon-192.png", sizes: "192x192" }] },
  ],
});

export default manifest;
