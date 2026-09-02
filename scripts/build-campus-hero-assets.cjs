/**
 * BUILD: LurnyCampus hero assets
 * ---------------------------------------------------------------------------
 * Converts the hero photograph to WebP into public/assets/images/campus.
 *
 *   node scripts/build-campus-hero-assets.cjs
 *
 * Only the backdrop is converted. The design's three floating panels and the
 * four rail icons are NOT shipped as images: they are drawn in markup so they
 * stay sharp at every density and their type stays selectable — see
 * CampusPanels.tsx and CampusIcons.tsx.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC =
  "designs/lurnycampus/1 lurnycampus-hero-assets/lurnycampus-hero-background-with-student.png";
const OUT = "public/assets/images/campus/hero-backdrop.webp";

(async () => {
  await sharp(SRC)
    // A photograph with no alpha — quality 82 is indistinguishable from the
    // source at render size and roughly a tenth of the PNG's weight.
    .webp({ quality: 82, effort: 6 })
    .toFile(OUT);

  const m = await sharp(OUT).metadata();
  console.log(`wrote ${OUT} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
})();
