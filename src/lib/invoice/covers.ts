export const COVER_PRESETS = ["meadow", "dusk", "aurora", "tint"] as const;
export type CoverPreset = (typeof COVER_PRESETS)[number];

const PRESET_PREFIX = "preset:";

export const presetCover = (id: CoverPreset) => `${PRESET_PREFIX}${id}`;

export const coverPresetId = (cover: string | null): CoverPreset | null => {
  if (!cover?.startsWith(PRESET_PREFIX)) return null;
  const id = cover.slice(PRESET_PREFIX.length);
  return (COVER_PRESETS as readonly string[]).includes(id) ? (id as CoverPreset) : null;
};

const W = 2400;
const H = 640;

const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const grain = (ctx: CanvasRenderingContext2D, amount: number) => {
  const image = ctx.getImageData(0, 0, W, H);
  const random = seeded(7);
  for (let i = 0; i < image.data.length; i += 4) {
    const n = (random() - 0.5) * amount;
    image.data[i] += n;
    image.data[i + 1] += n;
    image.data[i + 2] += n;
  }
  ctx.putImageData(image, 0, 0);
};

const blob = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) => {
  const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, W, H);
};

const hill = (
  ctx: CanvasRenderingContext2D,
  base: number,
  amplitude: number,
  frequency: number,
  phase: number,
  top: string,
  bottom: string,
) => {
  ctx.beginPath();
  ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 8) {
    const y =
      base -
      amplitude * Math.sin((x / W) * Math.PI * frequency + phase) -
      amplitude * 0.35 * Math.sin((x / W) * Math.PI * frequency * 2.7 + phase * 1.7);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, H);
  ctx.closePath();
  const gradient = ctx.createLinearGradient(0, base - amplitude * 1.4, 0, H);
  gradient.addColorStop(0, top);
  gradient.addColorStop(1, bottom);
  ctx.fillStyle = gradient;
  ctx.fill();
};

const meadow = (ctx: CanvasRenderingContext2D) => {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#bfd6ee");
  sky.addColorStop(0.45, "#e6e3f0");
  sky.addColorStop(0.7, "#f6e2e4");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);
  blob(ctx, W * 0.62, H * 0.42, 520, "rgba(255,226,214,0.9)");
  blob(ctx, W * 0.25, H * 0.2, 420, "rgba(255,255,255,0.55)");
  hill(ctx, H * 0.6, 60, 1.6, 0.4, "#a9b8cf", "#c6cfdc");
  hill(ctx, H * 0.7, 70, 2.2, 1.9, "#9cba8c", "#7ea36f");
  hill(ctx, H * 0.8, 55, 1.3, 3.1, "#6f9a5e", "#4f7a45");
  hill(ctx, H * 0.92, 40, 2.8, 0.7, "#5a8a4c", "#3d6537");
  grain(ctx, 10);
};

const silk = (ctx: CanvasRenderingContext2D, offset: number, width: number, color: string, glow: string) => {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.shadowColor = glow;
  ctx.shadowBlur = 60;
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(-200, H * 0.75 + offset);
  ctx.bezierCurveTo(W * 0.3, H * 0.1 + offset, W * 0.55, H * 1.1 + offset, W + 200, H * 0.2 + offset);
  ctx.stroke();
  ctx.restore();
};

const dusk = (ctx: CanvasRenderingContext2D) => {
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0b0b0f");
  bg.addColorStop(1, "#15151c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  silk(ctx, -60, 90, "rgba(70,90,130,0.35)", "rgba(110,140,200,0.6)");
  silk(ctx, 0, 26, "rgba(246,163,92,0.55)", "rgba(246,163,92,0.9)");
  silk(ctx, 40, 10, "rgba(255,236,214,0.7)", "rgba(255,255,255,0.8)");
  silk(ctx, 110, 60, "rgba(122,162,216,0.25)", "rgba(122,162,216,0.6)");
  silk(ctx, 170, 6, "rgba(255,255,255,0.35)", "rgba(255,255,255,0.6)");
  grain(ctx, 14);
};

const aurora = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#f6f3fb";
  ctx.fillRect(0, 0, W, H);
  blob(ctx, W * 0.12, H * 0.3, 620, "rgba(255,182,193,0.75)");
  blob(ctx, W * 0.42, H * 0.85, 700, "rgba(196,181,253,0.75)");
  blob(ctx, W * 0.7, H * 0.15, 640, "rgba(253,214,170,0.8)");
  blob(ctx, W * 0.92, H * 0.8, 560, "rgba(167,243,208,0.7)");
  grain(ctx, 8);
};

const tint = (ctx: CanvasRenderingContext2D, accent: string) => {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 0.85;
  blob(ctx, W * 0.15, H * 0.2, 760, accent);
  ctx.globalAlpha = 0.55;
  blob(ctx, W * 0.75, H * 0.9, 820, accent);
  ctx.globalAlpha = 0.35;
  blob(ctx, W * 0.5, H * 0.1, 600, "#ffffff");
  ctx.globalAlpha = 1;
  grain(ctx, 8);
};

const cache = new Map<string, string>();

export const renderPresetCover = (id: CoverPreset, accent: string) => {
  const key = `${id}:${accent}`;
  const cached = cache.get(key);
  if (cached) return cached;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  if (id === "meadow") meadow(ctx);
  if (id === "dusk") dusk(ctx);
  if (id === "aurora") aurora(ctx);
  if (id === "tint") tint(ctx, accent);
  const url = canvas.toDataURL("image/jpeg", 0.92);
  cache.set(key, url);
  return url;
};

export const coverSource = (cover: string | null, accent: string) => {
  if (!cover) return null;
  const preset = coverPresetId(cover);
  return preset ? renderPresetCover(preset, accent) : cover;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

export type CoverFrame = {
  width: number;
  height: number;
  radius: number;
  fade: boolean;
  paper: string;
};

export const renderCoverForPdf = async (src: string, frame: CoverFrame) => {
  const image = await loadImage(src);
  const scale = 4;
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(frame.width * scale);
  canvas.height = Math.round(frame.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = frame.paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  if (frame.radius) {
    ctx.beginPath();
    ctx.roundRect(0, 0, canvas.width, canvas.height, frame.radius * scale);
    ctx.clip();
  }
  const ratio = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
  const drawWidth = image.naturalWidth * ratio;
  const drawHeight = image.naturalHeight * ratio;
  ctx.drawImage(image, (canvas.width - drawWidth) / 2, (canvas.height - drawHeight) / 2, drawWidth, drawHeight);
  ctx.restore();
  if (frame.fade) {
    const gradient = ctx.createLinearGradient(0, canvas.height * 0.45, 0, canvas.height);
    gradient.addColorStop(0, `${frame.paper}00`);
    gradient.addColorStop(1, frame.paper);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  return canvas.toDataURL("image/jpeg", 0.92);
};
