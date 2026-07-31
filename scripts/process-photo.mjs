/**
 * Prepares the personal portrait for the site and for the social preview card.
 * Run with: node scripts/process-photo.mjs
 */
import path from "node:path";
import sharp from "sharp";

const SRC = path.join("Imagens", "Foto pessoal.jpg");
const meta = await sharp(SRC).metadata();
console.log(`source ${meta.width}x${meta.height}`);

// The subject sits slightly left of centre with a lot of sky overhead, so the
// crop is anchored manually rather than left to the attention heuristic.
const targetRatio = 4 / 5;
const cropHeight = Math.round(meta.height * 0.82);
const cropWidth = Math.min(meta.width, Math.round(cropHeight * targetRatio));
const left = Math.max(0, Math.round((meta.width - cropWidth) / 2));
const top = Math.max(0, Math.round(meta.height * 0.14));

const base = sharp(SRC).extract({
  left,
  top,
  width: cropWidth,
  height: Math.min(cropHeight, meta.height - top),
});

await base
  .clone()
  .resize({ width: 1000 })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(path.join("public", "vitor-portrait.jpg"));

await base
  .clone()
  .resize({ width: 520 })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join("public", "vitor-og.jpg"));

for (const file of ["vitor-portrait.jpg", "vitor-og.jpg"]) {
  const out = await sharp(path.join("public", file)).metadata();
  console.log(`${file.padEnd(22)} ${out.width}x${out.height}`);
}
