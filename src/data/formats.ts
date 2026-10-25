export type FormatId =
  | "heic"
  | "heif"
  | "avif"
  | "jfif"
  | "webp"
  | "png"
  | "jpg"
  | "jpeg"
  | "gif"
  | "bmp"
  | "tiff"
  | "ico"
  | "svg"
  | "pdf";

export type Format = {
  id: FormatId;
  label: string;
  extensions: string[];
  mime: string;
  transparency: boolean;
  animation: boolean;
  compression: "lossy" | "lossless" | "both" | "vector" | "document";
};

export const FORMATS: Record<FormatId, Format> = {
  heic: {
    id: "heic",
    label: "HEIC",
    extensions: [".heic"],
    mime: "image/heic",
    transparency: true,
    animation: false,
    compression: "lossy",
  },
  heif: {
    id: "heif",
    label: "HEIF",
    extensions: [".heif", ".hif"],
    mime: "image/heif",
    transparency: true,
    animation: false,
    compression: "lossy",
  },
  avif: {
    id: "avif",
    label: "AVIF",
    extensions: [".avif"],
    mime: "image/avif",
    transparency: true,
    animation: true,
    compression: "both",
  },
  jfif: {
    id: "jfif",
    label: "JFIF",
    extensions: [".jfif"],
    mime: "image/jpeg",
    transparency: false,
    animation: false,
    compression: "lossy",
  },
  webp: {
    id: "webp",
    label: "WebP",
    extensions: [".webp"],
    mime: "image/webp",
    transparency: true,
    animation: true,
    compression: "both",
  },
  png: {
    id: "png",
    label: "PNG",
    extensions: [".png"],
    mime: "image/png",
    transparency: true,
    animation: false,
    compression: "lossless",
  },
  jpg: {
    id: "jpg",
    label: "JPG",
    extensions: [".jpg"],
    mime: "image/jpeg",
    transparency: false,
    animation: false,
    compression: "lossy",
  },
  jpeg: {
    id: "jpeg",
    label: "JPEG",
    extensions: [".jpeg", ".jpe"],
    mime: "image/jpeg",
    transparency: false,
    animation: false,
    compression: "lossy",
  },
  gif: {
    id: "gif",
    label: "GIF",
    extensions: [".gif"],
    mime: "image/gif",
    transparency: true,
    animation: true,
    compression: "lossless",
  },
  bmp: {
    id: "bmp",
    label: "BMP",
    extensions: [".bmp"],
    mime: "image/bmp",
    transparency: false,
    animation: false,
    compression: "lossless",
  },
  tiff: {
    id: "tiff",
    label: "TIFF",
    extensions: [".tiff", ".tif"],
    mime: "image/tiff",
    transparency: true,
    animation: false,
    compression: "lossless",
  },
  ico: {
    id: "ico",
    label: "ICO",
    extensions: [".ico"],
    mime: "image/x-icon",
    transparency: true,
    animation: false,
    compression: "lossless",
  },
  svg: {
    id: "svg",
    label: "SVG",
    extensions: [".svg"],
    mime: "image/svg+xml",
    transparency: true,
    animation: true,
    compression: "vector",
  },
  pdf: {
    id: "pdf",
    label: "PDF",
    extensions: [".pdf"],
    mime: "application/pdf",
    transparency: false,
    animation: false,
    compression: "document",
  },
};

export const formatAccept = (ids: FormatId[]) =>
  ids.flatMap((id) => [FORMATS[id].mime, ...FORMATS[id].extensions]).join(",");
