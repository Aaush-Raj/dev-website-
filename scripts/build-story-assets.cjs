/**
 * BUILD: Resources "customer stories" assets
 * ---------------------------------------------------------------------------
 * Converts the two story photographs and four stat icons to WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-story-assets.cjs
 *
 * Nothing is keyed or cropped — this only converts the format. The photographs
 * arrive at a 2.571 aspect, which matches the band the design gives them at the
 * top of each card (measured 2.545), so they need no re-cropping. The icons are
 * transparent line glyphs in each story's own accent colour.
 *
 * Re-run this if the design team ships new story art.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/elurny website resources landing section/lurny_resources_section6_assets/";
const OUT_DIR = "public/assets/images/resources/";

/** Photographs: opaque, so alphaQuality would be ignored. */
const PHOTOS = [
  ["nbfc_conversation_intelligence.png", "story-conversations"],
  ["kitchen_learning_kiosk.png", "story-kitchen"],
];

/** Stat icons: transparent, so the edges need the lossless alpha. */
const ICONS = [
  ["icon_branches.png", "stat-branches"],
  ["icon_conversations.png", "stat-conversations"],
  ["icon_kitchen_learning.png", "stat-kitchen"],
  ["icon_no_smartphone.png", "stat-no-smartphone"],
];

(async () => {
  for (const [src, name] of PHOTOS) {
    const out = `${OUT_DIR}${name}.webp`;
    await sharp(SRC_DIR + src)
      .webp({ quality: 86, effort: 6 })
      .toFile(out);
    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height}`);
  }

  for (const [src, name] of ICONS) {
    const out = `${OUT_DIR}${name}.webp`;
    await sharp(SRC_DIR + src)
      .webp({ quality: 92, alphaQuality: 100, effort: 6 })
      .toFile(out);
    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
