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
  fullName: string;
  extensions: string[];
  mime: string;
  transparency: boolean;
  animation: boolean;
  compression: "lossy" | "lossless" | "both" | "vector" | "document";
  origin: string;
  bestFor: string;
  weakSpot: string;
};

export const FORMATS: Record<FormatId, Format> = {
  heic: {
    id: "heic",
    label: "HEIC",
    fullName: "High Efficiency Image Container",
    extensions: [".heic"],
    mime: "image/heic",
    transparency: true,
    animation: false,
    compression: "lossy",
    origin: "the default photo format on iPhones and iPads since iOS 11",
    bestFor: "storing phone photos at about half the size of a JPG",
    weakSpot: "Windows, many websites and older apps cannot open it",
  },
  heif: {
    id: "heif",
    label: "HEIF",
    fullName: "High Efficiency Image File Format",
    extensions: [".heif", ".hif"],
    mime: "image/heif",
    transparency: true,
    animation: false,
    compression: "lossy",
    origin: "the container standard behind HEIC, used by some Android phones and cameras",
    bestFor: "high quality photos in small files",
    weakSpot: "browsers and most editors still do not support it",
  },
  avif: {
    id: "avif",
    label: "AVIF",
    fullName: "AV1 Image File Format",
    extensions: [".avif"],
    mime: "image/avif",
    transparency: true,
    animation: true,
    compression: "both",
    origin: "a modern web image format built on the AV1 video codec",
    bestFor: "the smallest web images at a given quality",
    weakSpot: "older editors, Office apps and many upload forms reject it",
  },
  jfif: {
    id: "jfif",
    label: "JFIF",
    fullName: "JPEG File Interchange Format",
    extensions: [".jfif"],
    mime: "image/jpeg",
    transparency: false,
    animation: false,
    compression: "lossy",
    origin: "a JPEG variant that Windows and some browsers save images as",
    bestFor: "the same photos a JPG is good for",
    weakSpot: "upload forms often refuse the .jfif extension even though the data is JPEG",
  },
  webp: {
    id: "webp",
    label: "WebP",
    fullName: "WebP Image",
    extensions: [".webp"],
    mime: "image/webp",
    transparency: true,
    animation: true,
    compression: "both",
    origin: "Google's web image format, now used by most large websites",
    bestFor: "fast loading web images with transparency",
    weakSpot: "many desktop apps, printers and older software cannot open it",
  },
  png: {
    id: "png",
    label: "PNG",
    fullName: "Portable Network Graphics",
    extensions: [".png"],
    mime: "image/png",
    transparency: true,
    animation: false,
    compression: "lossless",
    origin: "the standard lossless image format of the web",
    bestFor: "screenshots, logos and graphics that need sharp edges or transparency",
    weakSpot: "photos as PNG are several times larger than the same photo as JPG",
  },
  jpg: {
    id: "jpg",
    label: "JPG",
    fullName: "JPEG Image",
    extensions: [".jpg"],
    mime: "image/jpeg",
    transparency: false,
    animation: false,
    compression: "lossy",
    origin: "the most widely supported photo format, readable almost everywhere",
    bestFor: "photos you need to share, upload or print",
    weakSpot: "no transparency, and every re-save loses a little quality",
  },
  jpeg: {
    id: "jpeg",
    label: "JPEG",
    fullName: "JPEG Image",
    extensions: [".jpeg", ".jpe"],
    mime: "image/jpeg",
    transparency: false,
    animation: false,
    compression: "lossy",
    origin: "the same format as JPG, just with the longer file extension",
    bestFor: "photos you need to share, upload or print",
    weakSpot: "some upload forms only accept the .jpg spelling",
  },
  gif: {
    id: "gif",
    label: "GIF",
    fullName: "Graphics Interchange Format",
    extensions: [".gif"],
    mime: "image/gif",
    transparency: true,
    animation: true,
    compression: "lossless",
    origin: "a 1987 format still used everywhere for short animations",
    bestFor: "simple animations and stickers that play anywhere",
    weakSpot: "only 256 colours, so photos look grainy",
  },
  bmp: {
    id: "bmp",
    label: "BMP",
    fullName: "Bitmap Image",
    extensions: [".bmp"],
    mime: "image/bmp",
    transparency: false,
    animation: false,
    compression: "lossless",
    origin: "an uncompressed Windows image format",
    bestFor: "old software and hardware that expects raw pixels",
    weakSpot: "files are very large because nothing is compressed",
  },
  tiff: {
    id: "tiff",
    label: "TIFF",
    fullName: "Tagged Image File Format",
    extensions: [".tiff", ".tif"],
    mime: "image/tiff",
    transparency: true,
    animation: false,
    compression: "lossless",
    origin: "the format scanners, printers and photo archives use",
    bestFor: "scans and print work where no detail can be lost",
    weakSpot: "browsers cannot show it and files are large",
  },
  ico: {
    id: "ico",
    label: "ICO",
    fullName: "Windows Icon",
    extensions: [".ico"],
    mime: "image/x-icon",
    transparency: true,
    animation: false,
    compression: "lossless",
    origin: "the icon format for Windows apps and website favicons",
    bestFor: "favicons and desktop shortcut icons",
    weakSpot: "only useful for small square icons",
  },
  svg: {
    id: "svg",
    label: "SVG",
    fullName: "Scalable Vector Graphics",
    extensions: [".svg"],
    mime: "image/svg+xml",
    transparency: true,
    animation: true,
    compression: "vector",
    origin: "a vector format made of shapes instead of pixels",
    bestFor: "logos and icons that must stay sharp at any size",
    weakSpot: "social sites, documents and many apps will not accept it",
  },
  pdf: {
    id: "pdf",
    label: "PDF",
    fullName: "Portable Document Format",
    extensions: [".pdf"],
    mime: "application/pdf",
    transparency: false,
    animation: false,
    compression: "document",
    origin: "the universal document format",
    bestFor: "sending, printing and submitting images as one document",
    weakSpot: "images inside are harder to edit",
  },
};

export const formatAccept = (ids: FormatId[]) =>
  ids.flatMap((id) => [FORMATS[id].mime, ...FORMATS[id].extensions]).join(",");
