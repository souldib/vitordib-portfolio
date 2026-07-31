/**
 * Turns the raw logo files in Imagens/ into dark-theme-ready assets in public/logos/.
 *
 * Treatments:
 * - keyOutWhite: recovers per-pixel alpha from artwork flattened on a white canvas,
 *   keeping the original colours (for logos that read well on dark).
 * - keyOutBlack: same idea for artwork flattened on a black canvas.
 * - whiteStamp:  turns any artwork into a white silhouette, alpha driven by distance
 *   from white (for dark wordmarks that would vanish on the dark background).
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
const BLACK_CUTOFF = 14;

async function rawPixels(input, { flattenOn } = {}) {
  let pipeline = sharp(input);
  if (flattenOn) pipeline = pipeline.flatten({ background: flattenOn });
  return pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

function toFile(data, info, output) {
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .trim({ threshold: 1 })
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .toFile(output);
}

async function keyOutWhite(input, output) {
  const { data, info } = await rawPixels(input);

  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
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

  return toFile(data, info, output);
}

async function keyOutBlack(input, output) {
  const { data, info } = await rawPixels(input);

  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    if (max <= BLACK_CUTOFF) {
      data[i + 3] = 0;
      continue;
    }
    const alpha = max / 255;
    data[i + 3] = Math.round(alpha * 255);
    for (let c = 0; c < 3; c += 1) {
      data[i + c] = Math.max(0, Math.min(255, Math.round(data[i + c] / alpha)));
    }
  }

  return toFile(data, info, output);
}

async function whiteStamp(input, output) {
  const { data, info } = await rawPixels(input, { flattenOn: "#ffffff" });

  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    const alpha = min >= WHITE_CUTOFF ? 0 : (WHITE_CUTOFF - min) / WHITE_CUTOFF;
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = Math.round(alpha * 255);
  }

  return toFile(data, info, output);
}

async function passthrough(input, output) {
  return sharp(input)
    .resize({ height: HEIGHT, fit: "inside", withoutEnlargement: false })
    .png()
    .toFile(output);
}

const jobs = [
  // Colour marks for the work cards and platform band
  ["Microsoft_logo.svg.webp", "microsoft.png", keyOutWhite],
  ["Microsoft_Azure.svg.webp", "azure.png", keyOutWhite],
  ["New_Power_BI_Logo.svg.webp", "power-bi.png", keyOutWhite],
  ["images (1).jpg", "fabric.png", keyOutWhite],
  ["Agrogalaxy Logo.jpg", "agrogalaxy.png", passthrough],
  // Trusted-by wall
  ["6892682-microsoft-logo-icon-editorial-vector-gratis-vetor.jpg", "microsoft-lockup.png", keyOutBlack],
  ["Nuvemshop-logo (1).png", "nuvemshop.png", whiteStamp],
  ["Axia Agro Logo.png", "axia-white.png", whiteStamp],
  ["Agrogalaxy Logo.jpg", "agrogalaxy-white.png", whiteStamp],
  ["LOGO_ARAGUAIA.webp", "araguaia-white.png", whiteStamp],
];

await mkdir(OUT, { recursive: true });

for (const [file, out, handler] of jobs) {
  const info = await handler(path.join(SRC, file), path.join(OUT, out));
  console.log(`${out.padEnd(22)} ${info.width}x${info.height}`);
}
