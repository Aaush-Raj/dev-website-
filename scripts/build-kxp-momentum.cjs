/**
 * KXP LEARNING / GROWTH / REWARDS ASSETS
 * ---------------------------------------------------------------------------
 * Converts the rasters section 5 genuinely needs — the scene, the three
 * learning thumbnails and the gold badge — to webp. Nothing is composited.
 *
 * WHY SO LITTLE SHIPS AS PIXELS
 * The pack's README asks for "page headings, descriptions and basic
 * buttons/controls as HTML/CSS where practical", and supplies the background
 * already reconstructed free of the panel that sits over it. So the three-column
 * panel is markup — it is UI carrying readable text — and only what is
 * genuinely pictorial ships here:
 *
 *   - the scene, which is a photograph;
 *   - the three card thumbnails, likewise; and
 *   - the gold "Consistent Learner" badge, which is a rendered medal with
 *     gradients and a laurel, not a flat glyph that could be drawn as an SVG.
 *
 * Everything else the pack offers as a crop — the play button, the step dots,
 * the target, the leaf, the chips, the waveform — is a simple mark, drawn in
 * the component instead. They are a few dozen pixels each at source and the
 * README warns against upscaling them; as SVG they stay sharp at any size.
 *
 * NOTHING IS UPSCALED
 * Every file is emitted at its native size and the markup renders it no larger.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/KxpPage/LurnyKxP_Learning_Growth_Rewards_Assets",
);
const OUT = path.join(ROOT, "public/images/platform/kxp");

const FILES = [
  ["background/clean_learner_scene_reconstructed.png", "momentum-scene.webp"],
  ["thumbnails/customer_conversations.png", "thumb-customer-conversations.webp"],
  ["thumbnails/art_of_listening_cover.png", "thumb-art-of-listening.webp"],
  ["thumbnails/make_the_right_call.png", "thumb-right-call.webp"],
  ["icons/gold_consistent_learner_badge.png", "badge-consistent-learner.webp"],
];

async function main() {
  for (const [from, to] of FILES) {
    const file = path.join(OUT, to);

    await sharp(path.join(SRC, from)).webp({ quality: 90 }).toFile(file);

    const meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
