/**
 * BUILD: favicon and app icons
 * ---------------------------------------------------------------------------
 * Renders the brand mark — the same stacked lockup the footer shows — into the
 * icon set Next.js serves from src/app.
 *
 *   node scripts/build-favicon.cjs
 *
 * WHY PAD RATHER THAN CROP
 * The source is 280x475: a tall portrait mark that fills its canvas edge to
 * edge. Icons are square, so something has to give. Cropping would cut the
 * amber bars off the top or the L off the bottom, and stretching would distort
 * a logo. Instead the mark is scaled to fit inside the square and centred, with
 * a small margin so it does not touch the edges — browsers round favicons in
 * some contexts and a mark flush to the border loses its corners.
 *
 * WHY A TRANSPARENT GROUND
 * The mark's violet reads on light and dark browser chrome alike, and a
 * transparent PNG lets the tab strip's own colour show through rather than
 * boxing the icon in white.
 *
 * Next.js picks these up by filename convention from src/app — icon.png for
 * the favicon, apple-icon.png for iOS home screens. No <link> tags needed.
 *
 * Re-run this if the brand mark changes.
 */
const sharp = require("sharp");

const SRC = "public/assets/images/logo-mark.webp";
const OUT_DIR = "src/app/";

/**
 * Each icon: its pixel size, and how much of that box the mark occupies.
 *
 * The favicon sits at 0.82 — a little tighter than the touch icon, because at
 * 32px every pixel of the mark counts. The Apple icon is looser at 0.68, since
 * iOS rounds the corners and crops a few pixels of its own.
 */
const ICONS = [
  ["icon.png", 512, 0.82],
  ["apple-icon.png", 180, 0.68],
];

(async () => {
  for (const [name, size, fill] of ICONS) {
    const out = OUT_DIR + name;

    // Scale by HEIGHT: the mark is taller than it is wide, so height is the
    // constraining dimension inside a square.
    const inner = await sharp(SRC)
      .resize({ height: Math.round(size * fill) })
      .toBuffer();

    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: inner, gravity: "centre" }])
      .png()
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
