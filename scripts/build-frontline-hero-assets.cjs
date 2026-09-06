/**
 * FRONTLINE HERO ASSETS
 * ---------------------------------------------------------------------------
 * Builds the ONE raster the frontline hero needs: Ananya's portrait.
 *
 * WHY ONLY THE PORTRAIT
 * The supplied overlay (ChatGPT Image … (2).png) is a flat composite — cards,
 * arrows and handwritten labels painted into a single 1402x1122 bitmap over a
 * PAINTED checkerboard (the file has no alpha channel at all; the "transparent"
 * squares are opaque grey pixels). Shipping it whole would mean:
 *   - a grey checkerboard behind the hero, and
 *   - text baked into a raster: unselectable, unsearchable, blurry on scaling,
 *     and impossible to translate or animate.
 * So the cards, arrows and labels are rebuilt in markup, and only the portrait
 * — the one genuinely pictorial element — is extracted here.
 *
 * The backdrop (image (1)) is used as-is: it is a soft, near-white wash with no
 * text, which is exactly what a background raster should be.
 *
 * THE CIRCLE
 * Measured off the source by scanning for the first non-checkerboard pixel on
 * clean rows (ones that miss the surrounding cards) and solving the circle from
 * two chords: centre (674, 537.5), radius ~198.
 *
 * The mask is cut a hair INSIDE that radius and feathered, so no ring of grey
 * checkerboard survives on the edge — the failure mode that a plain crop gives.
 */

const path = require("node:path");
const sharp = require("sharp");

const SRC = path.join(
  __dirname,
  "..",
  "designs/FrontlinePerformancePage/1 Solutions - Frontline - Hero Section",
  "ChatGPT Image Sep 6, 2026, 01_36_09 AM (2).png",
);
const OUT = path.join(__dirname, "..", "public/images/solutions/frontline");

/** Circle solved from the source, in source pixels. */
const CX = 674;
const CY = 537.5;
const R = 198;

/** Cut just inside the traced edge: the last pixel or two is antialiased
 *  against the checkerboard, so keeping it would tint the rim grey. */
const INSET = 2;

/** Feather width, in pixels, so the edge reads as smooth rather than stepped. */
const FEATHER = 1.5;

async function main() {
  const size = Math.round(R * 2);
  const left = Math.round(CX - R);
  const top = Math.round(CY - R);

  const { data, info } = await sharp(SRC)
    .extract({ left, top, width: size, height: size })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  const cx = w / 2;
  const cy = h / 2;
  const cut = R - INSET;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Sample the pixel CENTRE, not its corner.
      const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);

      // 1 inside, 0 outside, ramped across FEATHER at the boundary.
      const t = (cut - d) / FEATHER;
      const a = t <= 0 ? 0 : t >= 1 ? 1 : t;

      data[(y * w + x) * channels + 3] = Math.round(a * 255);
    }
  }

  const file = path.join(OUT, "ananya.webp");

  await sharp(data, { raw: { width: w, height: h, channels } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(file);

  const meta = await sharp(file).metadata();
  console.log(`ananya.webp  ${meta.width}x${meta.height}  ${meta.size} bytes`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
