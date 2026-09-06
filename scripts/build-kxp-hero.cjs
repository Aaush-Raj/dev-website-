/**
 * BUILD: LurnyKxP hero imagery
 * ---------------------------------------------------------------------------
 * Writes the hero's product composition as WebP into
 * public/assets/images/kxp.
 *
 *   node scripts/build-kxp-hero.cjs
 *
 * WHY THE CROP
 * 09_unified_learner_experience_composition.png is the whole card cluster in
 * one image, which is what this hero needs — the six cards are laid out with
 * connector lines drawn BETWEEN them, so reassembling them from the individual
 * card exports would mean redrawing every connector in CSS for no gain.
 *
 * It ships with two fragments of the neighbouring copy column bleeding in at
 * the far left ("...ey" near the top of the Achievement card, and "One learner
 * record" near the bottom), left over from how it was sliced. Its alpha channel
 * is fully opaque, so they cannot be keyed out.
 *
 * They are NOT cropped here. Cropping far enough to clear them also cuts into
 * the Achievement card, which sits in the same left band and is real content.
 * The hero instead lets the composition bleed off the section's left edge —
 * which is what the design does anyway — so the section's own overflow clip
 * removes them. See KxpHero.
 *
 * Re-run this if the design team ships new art.
 */
const sharp = require("sharp");

const SRC = "designs/KxpPage/LurnyKxP_Hero_Assets/";
const OUT = "public/assets/images/kxp/";

/**
 * The "One learner record" fragment's box, measured in the source image.
 *
 * It sits BELOW the Achievement card (whose content stops at y=590) and left of
 * the main cluster, so painting this rectangle out with the surrounding
 * near-black touches nothing real. The other fragment, "...ey", overlaps the
 * card's own rows and cannot be removed this way — the hero's left-edge mask
 * covers that one. See KxpHero.
 */
const STRAY_BOX = { left: 0, top: 620, width: 130, height: 94 };

(async () => {
  const src = SRC + "09_unified_learner_experience_composition.png";

  // The composition's own ground, so the patch is invisible.
  const patch = await sharp({
    create: {
      width: STRAY_BOX.width,
      height: STRAY_BOX.height,
      channels: 4,
      background: { r: 7, g: 5, b: 12, alpha: 1 },
    },
  })
    .png()
    .toBuffer();

  await sharp(src)
    .composite([{ input: patch, left: STRAY_BOX.left, top: STRAY_BOX.top }])
    .webp({ quality: 88, effort: 6 })
    .toFile(OUT + "hero-composition.webp");

  const m = await sharp(OUT + "hero-composition.webp").metadata();
  console.log(`wrote hero-composition.webp ${m.width}x${m.height}`);
})();
