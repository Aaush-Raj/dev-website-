/**
 * BUILD: Solutions page assets
 * ---------------------------------------------------------------------------
 * Converts the supplied artwork to WebP into public/assets/images/solutions.
 *
 *   node scripts/build-solutions-assets.cjs
 *
 * The hero graphic is a rendered particle burst — fine filaments and thousands
 * of specks over a dark violet ground. It ships as an image rather than being
 * reproduced in canvas: the render is the design, and redrawing it would only
 * approximate it.
 *
 * Quality is kept high for that reason. Dark gradients with fine bright detail
 * are exactly what WebP bands worst, and the filaments are the whole point of
 * the asset, so this trades a larger file for clean lines.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC_DIR = "designs/Solutions Page assets/";
const OUT_DIR = "public/assets/images/solutions/";

const ASSETS = [
  [
    "Lurny Solutions Page - Section 1 - Hero Section - graphic.png",
    "hero-burst",
    { quality: 88 },
  ],
  // Section 4's case-study photograph — the background the design specifies
  // for the card.
  [
    "Lurny Solutions Page -section 4 - graphics images and icons/Lurny Solutions -Section 4 - bg image.png",
    "case-study-branch",
    { quality: 82 },
  ],
  // The conversation waveform. It carries real alpha and is a soft glow rather
  // than line work, so it keeps a high alphaQuality and ships as an image
  // instead of being redrawn — a CSS approximation would lose the bloom.
  //
  // `trim` first: the source is 2172x724 but the wave occupies only the middle
  // band, so most of that height is fully transparent pixels being encoded for
  // nothing. Trimming the empty alpha roughly halves the file.
  [
    "Lurny Solutions Page -section 4 - graphics images and icons/02-conversation-sound-wave.png",
    "conversation-wave",
    { quality: 86, alphaQuality: 100 },
    { trim: true },
  ],
];

(async () => {
  for (const [src, name, opts, extra = {}] of ASSETS) {
    const out = `${OUT_DIR}${name}.webp`;

    let pipeline = sharp(SRC_DIR + src);
    if (extra.trim) pipeline = pipeline.trim({ threshold: 1 });

    await pipeline.webp({ effort: 6, ...opts }).toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height}`);
  }
})();
