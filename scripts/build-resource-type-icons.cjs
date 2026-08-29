/**
 * BUILD: Resources "browse by type" icons
 * ---------------------------------------------------------------------------
 * Converts the five supplied 160x160 line icons to WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-resource-type-icons.cjs
 *
 * The source PNGs already carry real alpha and are already square and trimmed,
 * so nothing is keyed or cropped here — this only converts the format. They
 * are white line-work with violet accents, drawn for the dark section they sit
 * in, so they are used as-is rather than recoloured.
 *
 * Re-run this if the design team ships new icon art.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/elurny website resources landing section/lurny_resources_section3_assets/";
const OUT_DIR = "public/assets/images/resources/";

/** Source file → output name, in the order the section lists them. */
const ICONS = [
  ["icon_insights.png", "type-insights"],
  ["icon_guides_playbooks.png", "type-guides"],
  ["icon_case_studies.png", "type-case-studies"],
  ["icon_webinars_events.png", "type-events"],
  ["icon_videos.png", "type-videos"],
];

(async () => {
  for (const [src, name] of ICONS) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      // alphaQuality 100 keeps the hairline strokes clean; at anything lower
      // the thin white lines fray against the dark ground.
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
