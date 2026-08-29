/**
 * BUILD: Resources "latest insights" artwork
 * ---------------------------------------------------------------------------
 * Converts the three supplied insight illustrations to WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-insight-art.cjs
 *
 * The sources need no keying or cropping — this only converts the format. Note
 * they differ in kind, which is why they are handled differently downstream:
 *
 *   - The radar is OPAQUE and carries its own near-black panel. That dark
 *     ground is part of the artwork, not a background to be removed: the
 *     design shows it filling the right half of the featured card.
 *   - The workflow and waveform are TRANSPARENT line art, sitting directly on
 *     each card's white.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/elurny website resources landing section/lurny_resources_section4_assets/";
const OUT_DIR = "public/assets/images/resources/";

/** Source file → output name. */
const ART = [
  ["capability_intelligence_radar.png", "insight-radar"],
  ["ai_native_learning_workflow.png", "insight-workflow"],
  ["conversation_intelligence_waveform.png", "insight-waveform"],
];

(async () => {
  for (const [src, name] of ART) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      // alphaQuality 100 keeps the transparent pieces' hairlines clean; it is
      // simply ignored for the opaque radar.
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
