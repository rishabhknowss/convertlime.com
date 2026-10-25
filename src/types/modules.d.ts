declare module "gifenc" {
  type Palette = number[][];
  type Encoder = {
    writeFrame: (
      index: Uint8Array,
      width: number,
      height: number,
      options?: { palette?: Palette; transparent?: boolean; transparentIndex?: number },
    ) => void;
    finish: () => void;
    bytes: () => Uint8Array;
  };
  export const GIFEncoder: () => Encoder;
  export const quantize: (
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    options?: { format?: "rgb565" | "rgb444" | "rgba4444"; oneBitAlpha?: boolean | number },
  ) => Palette;
  export const applyPalette: (
    rgba: Uint8Array | Uint8ClampedArray,
    palette: Palette,
    format?: "rgb565" | "rgb444" | "rgba4444",
  ) => Uint8Array;
}

declare module "utif" {
  type Ifd = { width: number; height: number; [key: string]: unknown };
  const UTIF: {
    decode: (buffer: ArrayBuffer) => Ifd[];
    decodeImage: (buffer: ArrayBuffer, ifd: Ifd) => void;
    toRGBA8: (ifd: Ifd) => Uint8Array;
    encodeImage: (rgba: ArrayBuffer, width: number, height: number) => ArrayBuffer;
  };
  export default UTIF;
}
