/**
 * KXP LEARNER-FOCUS ASSETS
 * ---------------------------------------------------------------------------
 * Converts the rasters section 4 genuinely needs — the scene and the four
 * learning thumbnails — to webp. Nothing is composited here.
 *
 * WHY NO COMPOSITE, UNLIKE SECTION 3
 * The supplied background is already text-free and dashboard-free: the pack's
 * README says it was reconstructed precisely so the dashboard could be built
 * over it rather than baked into it, and asks for "webpage headings, copy,
 * buttons and simple interface elements as HTML/CSS where possible".
 *
 * So the dashboard is markup — it is UI carrying readable text, which must stay
 * selectable, translatable and sharp at any density — and only the photographic
 * parts ship as pixels: the scene itself and the four thumbnails inside the
 * cards, which are photographs and cannot be drawn.
 *
 * The thumbnails are tiny in the source (as small as 99x79). They are NOT
 * upscaled here: enlarging them would only invent detail. They are emitted at
 * native size and the markup renders them no larger.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "designs/KxpPage/LurnyKxP_Learner_Focus_Assets");
const OUT = path.join(ROOT, "public/images/platform/kxp");

const FILES = [
  ["background/learner_scene_no_text_reconstructed.png", "learner-scene.webp"],
  ["thumbnails/customer_needs.png", "thumb-customer-needs.webp"],
  ["thumbnails/handling_objections.png", "thumb-handling-objections.webp"],
  ["thumbnails/build_customer_trust.png", "thumb-customer-trust.webp"],
  ["thumbnails/know_your_products.png", "thumb-know-products.webp"],
];

async function main() {
  for (const [from, to] of FILES) {
    const file = path.join(OUT, to);

    await sharp(path.join(SRC, from)).webp({ quality: 88 }).toFile(file);

    const meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
