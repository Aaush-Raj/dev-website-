/**
 * SALES ENABLEMENT LOOP ASSETS
 * ---------------------------------------------------------------------------
 * Keys the seller out of her white plate. She is the ONLY raster this section
 * needs — everything else is built in markup.
 *
 * WHY NOT THE SUPPLIED bg.png
 * That file is nearly the whole finished section: the seller, the four loop
 * arrows, all four cards, the handwritten notes and the labels are already
 * painted into it. Laying coded cards over it would show two of everything.
 * The pack also ships the seller ALONE, reconstructed, which is the asset that
 * lets the rest be built as real markup — sharp, translatable, animatable, and
 * readable by a screen reader.
 *
 * KEYING
 * The plate's surround is a near-white #fdfdfd rather than pure white, and the
 * illustration's own highlights run almost as bright, so a plain luminance
 * threshold would punch holes in her shirt and the tablet's glare. Instead the
 * background is flood-filled from the border: only white CONNECTED to the edge
 * is removed, so enclosed highlights survive whatever their brightness.
 *
 * The cut edge is then softened, but ONLY along the boundary: an earlier pass
 * ramped alpha by luminance everywhere, which made her white shirt and the
 * tablet's highlights semi-transparent. Interior pixels are now fully opaque
 * whatever their brightness, and only pixels adjacent to the filled background
 * take a partial alpha.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/solutions sales enablement/Lurny_Sales_Enablement_Loop_Assets",
);
const OUT = path.join(ROOT, "public/images/solutions/sales-enablement");

/** Everything at or above this luminance is a background candidate. */
const WHITE = 246;

/**
 * How far below the white point a BOUNDARY pixel must sit to be fully opaque.
 * Only pixels touching the flood-filled background are ramped at all.
 */
const EDGE_RAMP = 10;

async function main() {
  const file = path.join(SRC, "illustrations/seller_clean_reconstructed.png");

  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  const lum = new Float32Array(w * h);

  for (let i = 0; i < w * h; i++) {
    const o = i * channels;
    lum[i] = (data[o] + data[o + 1] + data[o + 2]) / 3;
  }

  // Flood fill the background inward from every border pixel, so only white
  // CONNECTED to the edge is treated as background.
  const background = new Uint8Array(w * h);
  const stack = [];

  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (background[i] || lum[i] < WHITE) return;
    background[i] = 1;
    stack.push(i);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (stack.length) {
    const i = stack.pop();
    const x = i % w;
    const y = (i - x) / w;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  // Soften only the boundary. A pixel is on the boundary if it survived the
  // fill but touches a filled neighbour; everything further in stays opaque,
  // which is what keeps her shirt and the tablet's glare solid.
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const o = i * channels;

      if (background[i]) {
        data[o + 3] = 0;
        continue;
      }

      const onEdge =
        (x > 0 && background[i - 1]) ||
        (x < w - 1 && background[i + 1]) ||
        (y > 0 && background[i - w]) ||
        (y < h - 1 && background[i + w]);

      if (!onEdge) {
        data[o + 3] = 255;
        continue;
      }

      const t = (WHITE - lum[i]) / EDGE_RAMP;
      data[o + 3] = Math.round(Math.max(0, Math.min(1, t)) * 255);
    }
  }

  const out = path.join(OUT, "loop-seller.webp");

  await sharp(data, { raw: { width: w, height: h, channels } })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`loop-seller.webp  ${meta.width}x${meta.height}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
