/**
 * Turns the raw logo files in Imagens/ into dark-theme-ready assets in public/logos/.
 *
 * The source files are flattened rasters on a white canvas, which look like grey
 * boxes on a dark background. For colour logos we invert the "composited over
 * white" operation to recover per-pixel alpha; for wordmarks that are dark on
 * white we instead derive a white silhouette so they read on the dark surface.
 *
 * Run with: node scripts/process-logos.mjs
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "Imagens";
const OUT = path.join("public", "logos");
const HEIGHT = 120;
const WHITE_CUTOFF = 246;

/** Recovers alpha by undoing the composite of a transparent logo over a white canvas. */
async function keyOutWhite(input, output) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const min = Math.min(r, g, b);

    if (min >= WHITE_CUTOFF) {
      data[i + 3] = 0;
      continue;
    }

    const alpha = (WHITE_CUTOFF - min) / WHITE_CUTOFF;
    data[i + 3] = Math.round(alpha * 255);
    for (let c = 0; c < 3; c += 1) {
      const recovered = (data[i + c] - 255 * (1 - alpha)) / alpha;
      data[i + c] = Math.max(0, Math.min(255, Math.round(recovered)));
    }
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .trim({ threshold: 1 })
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .toFile(output);
}

/** Builds a white silhouette from a dark-on-white wordmark. */
async function whiteSilhouette(input, output) {
  const { data, info } = await sharp(input)
    .flatten({ background: "#ffffff" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const luminance =
      0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = Math.round(Math.max(0, 255 - luminance));
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .trim({ threshold: 1 })
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .toFile(output);
}

/** Keeps the artwork as-is; used for logos that already sit on their own coloured tile. */
async function passthrough(input, output) {
  return sharp(input)
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .png()
    .toFile(output);
}

const jobs = [
  ["Microsoft_logo.svg.webp", "microsoft.png", keyOutWhite],
  ["Microsoft_Azure.svg.webp", "azure.png", keyOutWhite],
  ["New_Power_BI_Logo.svg.webp", "power-bi.png", keyOutWhite],
  ["images (1).jpg", "fabric.png", keyOutWhite],
  ["Nuvemshop-logo (1).png", "nuvemshop.png", whiteSilhouette],
  ["images.jpg", "axia.png", passthrough],
];

await mkdir(OUT, { recursive: true });

for (const [file, out, handler] of jobs) {
  const target = path.join(OUT, out);
  const info = await handler(path.join(SRC, file), target);
  console.log(`${out.padEnd(16)} ${info.width}x${info.height}`);
}
