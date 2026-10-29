const HB_SUBSET_WASM = "https://cdn.jsdelivr.net/npm/harfbuzzjs@1.6.4/dist/harfbuzz-subset.wasm";

type HbExports = {
  memory: WebAssembly.Memory;
  malloc: (size: number) => number;
  free: (pointer: number) => void;
  hb_blob_create: (data: number, length: number, mode: number, userData: number, destroy: number) => number;
  hb_blob_destroy: (blob: number) => void;
  hb_blob_get_data: (blob: number, length: number) => number;
  hb_blob_get_length: (blob: number) => number;
  hb_face_create: (blob: number, index: number) => number;
  hb_face_destroy: (face: number) => void;
  hb_face_reference_blob: (face: number) => number;
  hb_set_add: (set: number, codepoint: number) => void;
  hb_subset_input_create_or_fail: () => number;
  hb_subset_input_destroy: (input: number) => void;
  hb_subset_input_unicode_set: (input: number) => number;
  hb_subset_or_fail: (face: number, input: number) => number;
};

let loading: Promise<HbExports> | null = null;

const loadHarfBuzz = () => {
  loading ??= fetch(HB_SUBSET_WASM)
    .then((response) => {
      if (!response.ok) throw new Error(`harfbuzz ${response.status}`);
      return response.arrayBuffer();
    })
    .then((bytes) => WebAssembly.instantiate(bytes))
    .then(({ instance }) => instance.exports as unknown as HbExports)
    .catch((error) => {
      loading = null;
      throw error;
    });
  return loading;
};

export const subsetFont = async (font: ArrayBuffer, text: string) => {
  const hb = await loadHarfBuzz();
  const heap = () => new Uint8Array(hb.memory.buffer);
  const pointer = hb.malloc(font.byteLength);
  heap().set(new Uint8Array(font), pointer);
  const blob = hb.hb_blob_create(pointer, font.byteLength, 2, 0, 0);
  const face = hb.hb_face_create(blob, 0);
  hb.hb_blob_destroy(blob);
  const input = hb.hb_subset_input_create_or_fail();
  const unicodes = hb.hb_subset_input_unicode_set(input);
  for (const char of new Set(text)) hb.hb_set_add(unicodes, char.codePointAt(0) ?? 32);
  const subset = hb.hb_subset_or_fail(face, input);
  hb.hb_subset_input_destroy(input);
  if (!subset) {
    hb.hb_face_destroy(face);
    hb.free(pointer);
    throw new Error("subset failed");
  }
  const result = hb.hb_face_reference_blob(subset);
  const data = hb.hb_blob_get_data(result, 0);
  const bytes = heap().slice(data, data + hb.hb_blob_get_length(result));
  hb.hb_blob_destroy(result);
  hb.hb_face_destroy(subset);
  hb.hb_face_destroy(face);
  hb.free(pointer);
  return bytes;
};
