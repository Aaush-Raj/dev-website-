/**
 * BUILD: Resources closing-CTA sculpture
 * ---------------------------------------------------------------------------
 * Trims and converts the ecosystem sculpture to WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-ecosystem-sculpture.cjs
 *
 * The source already carries real alpha — no keying is needed. It does need
 * TRIMMING: it arrives on a 1254x1254 square with the sculpture occupying only
 * the middle (18% empty on the left, 10% on top), and the section overlays four
 * labels positioned as percentages of the artwork. Against the untrimmed
 * square those percentages would be measured off empty space and every label
 * would sit in the wrong place.
 *
 * Note the file lives in the section 8 asset folder despite belonging to
 * section 9 — that is how it was supplied.
 *
 * Re-run this if the design team ships new sculpture art.
 */
const sharp = require("sharp");

const SRC =
  "designs/elurny website resources landing section/lurny_resources_section8_assets/connected_lurny_ecosystem_sculpture.png";
const OUT = "public/assets/images/resources/ecosystem-sculpture.webp";

(async () => {
  await sharp(SRC)
    // threshold 1 rather than 0: the render has a few near-transparent stray
    // pixels in the margins that a zero threshold would preserve.
    .trim({ threshold: 1 })
    // alphaQuality 100 keeps the sculpture's soft contact shadow clean against
    // the section's cream ground.
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(OUT);

  const m = await sharp(OUT).metadata();
  console.log(`wrote ${OUT} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
})();
