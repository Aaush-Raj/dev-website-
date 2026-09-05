/**
 * BUILD: Solutions "inclusive learning" case-study assets
 * ---------------------------------------------------------------------------
 * Converts the section's photograph and its six icons to WebP into
 * public/assets/images/solutions.
 *
 *   node scripts/build-solutions-inclusive-assets.cjs
 *
 * ONLY THE PHOTOGRAPH IS CONVERTED.
 *
 * The folder also ships eight 512px icons, but they are NOT built here. They
 * render at roughly 20-24px on the page, and section 4 already set the
 * precedent of redrawing its icons inline (see SolutionsCaseIcons.tsx) rather
 * than issuing a request each for artwork that is one stroked glyph. This
 * section follows that — see SolutionsInclusiveIcons.tsx.
 *
 * The five `tv-*` files are not needed at all: the supplied photograph already
 * has the television and its hand-washing lesson composed into it, so those
 * are the source components of that composite rather than page assets.
 *
 * The design folder ships TWO byte-identical copies of this asset set
 * ("… bg and graphics" and "… bg and graphics 2"); this reads the first.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/Solutions Page assets/Lurny Solutions Page - Section 6 - bg and graphics/";
const OUT_DIR = "public/assets/images/solutions/";

/** The photograph: opaque, so alphaQuality would be ignored. */
const PHOTO = [
  "lunry Solutions Page - Section 6 - BG Image.png",
  "inclusive-kitchen",
];

(async () => {
  const [photoSrc, photoName] = PHOTO;
  const photoOut = `${OUT_DIR}${photoName}.webp`;
  await sharp(SRC_DIR + photoSrc)
    .webp({ quality: 84, effort: 6 })
    .toFile(photoOut);
  const m = await sharp(photoOut).metadata();
  console.log(`wrote ${photoOut} ${m.width}x${m.height}`);
})();
