/**
 * BUILD: Resources "guides & playbooks" card artwork
 * ---------------------------------------------------------------------------
 * Converts the four supplied card illustrations to WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-guide-cards.cjs
 *
 * The sources are opaque, already cropped, and all share a ~1.26 aspect that
 * matches the band the design gives them at the top of each card — so nothing
 * is keyed or re-cropped here, only converted.
 *
 * They are photographic-looking vintage textures rather than flat line art, so
 * they are ordinary raster images rather than candidates for redrawing as SVG.
 *
 * Re-run this if the design team ships new card art.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/elurny website resources landing section/lurny_resources_section5_assets/";
const OUT_DIR = "public/assets/images/resources/";

/** Source file → output name, in the order the section lists them. */
const CARDS = [
  ["card1.png", "guide-quality-test"],
  ["card2.png", "guide-readiness-checklist"],
  ["card3.png", "guide-pilot"],
  ["card4.png", "guide-action-plan"],
];

(async () => {
  for (const [src, name] of CARDS) {
    const out = `${OUT_DIR}${name}.webp`;

    // No alphaQuality: these carry no transparency, so it would be ignored.
    // 88 holds the paper grain without the banding a lower setting introduces
    // in the large flat gradients.
    await sharp(SRC_DIR + src)
      .webp({ quality: 88, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height}`);
  }
})();
