/**
 * BUILD: LurnySaathi hero cut-out
 * ---------------------------------------------------------------------------
 * Turns designs/.../womeninbg.png into a real transparent WebP at
 * public/assets/images/saathi/saathi-woman.webp.
 *
 *   node scripts/build-saathi-woman.cjs
 *
 * WHY THIS EXISTS
 * The supplied source has NO alpha channel — despite its name, its
 * "transparent" background is an opaque light checkerboard painted into the
 * pixels (two cells, luma 240-255). Dropping it into the hero as-is would put
 * a white checkerboard box on the near-black section, so the background is
 * keyed out here and the result committed as a real transparent asset.
 *
 * The subject tops out around luma 230 and the background starts at 240, so a
 * hard threshold at 236 separates them with no overlap.
 *
 * Re-run this if the design team ships a new source photo. If they ever ship a
 * genuinely transparent export, delete this script and use it directly.
 */
const sharp = require("sharp");

const SRC = "designs/lurnysaathi - page assets/womeninbg.png";
const OUT = "public/assets/images/saathi/saathi-woman.webp";

const CUT = 236; // luma at or above this, if neutral, is background
const SAT = 16; // max channel spread still counted as neutral grey

(async () => {
  const { data, info } = await sharp(SRC)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // 1. Hard binary mask: 255 = subject, 0 = background.
  const mask = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const p = i * 4;
    const r = data[p],
      g = data[p + 1],
      b = data[p + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    mask[i] = spread <= SAT && luma >= CUT ? 0 : 255;
  }

  // 2. Flood-fill from the border, so only background CONNECTED to the edge is
  //    cleared. Without this, a bright neutral highlight inside the subject —
  //    a shirt fold, the phone's screen glint — would be punched out too.
  const outside = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const i = y * w + x;
    if (outside[i] || mask[i] === 255) return;
    outside[i] = 1;
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
    const x = i % w,
      y = (i / w) | 0;
    push(x - 1, y);
    push(x + 1, y);
    push(x, y - 1);
    push(x, y + 1);
  }

  const hard = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) hard[i] = outside[i] ? 0 : 255;

  // 3. Feather the silhouette with a 3x3 box average applied ONLY to boundary
  //    pixels, so flat interior and flat background keep their binary value.
  //
  //    Deliberately NOT sharp's .blur() on the raw 1-channel buffer: that
  //    round-trip corrupted alternate rows into opaque stripes across the
  //    background.
  const alpha = new Uint8Array(hard);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      let sum = 0,
        edge = false;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const v = hard[i + dy * w + dx];
          sum += v;
          if (v !== hard[i]) edge = true;
        }
      }
      if (edge) alpha[i] = Math.round(sum / 9);
    }
  }

  // 4. Un-fringe: a partially transparent edge pixel still carries the white
  //    checkerboard blended into it, which reads as a pale halo against the
  //    near-black hero. Unpremultiply against white to recover the subject's
  //    own colour, then bias the thinnest edge pixels darker — stray flyaway
  //    hairs are mostly background by area and unpremultiplying alone leaves
  //    them too light.
  const out = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    const p = i * 4,
      a = alpha[i];
    let r = data[p],
      g = data[p + 1],
      b = data[p + 2];
    if (a > 0 && a < 255) {
      const f = a / 255;
      const un = (v) =>
        Math.max(0, Math.min(255, Math.round((v - 255 * (1 - f)) / f)));
      // `f` doubles as the darkening bias: fully-opaque edges are untouched,
      // the faintest ones are pulled well down.
      r = Math.round(un(r) * f);
      g = Math.round(un(g) * f);
      b = Math.round(un(b) * f);
    }
    out[p] = r;
    out[p + 1] = g;
    out[p + 2] = b;
    out[p + 3] = a;
  }

  const counts = { opaque: 0, clear: 0, partial: 0 };
  for (let i = 3; i < out.length; i += 4) {
    const a = out[i];
    if (a === 255) counts.opaque++;
    else if (a === 0) counts.clear++;
    else counts.partial++;
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 }) // drop the now-empty margins
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(OUT);

  const m = await sharp(OUT).metadata();
  console.log(
    `wrote ${OUT} ${m.width}x${m.height} alpha:${m.hasAlpha}`,
    counts,
  );
})();
