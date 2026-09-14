/**
 * HERO CAROUSEL SLIDE ASSETS
 * ---------------------------------------------------------------------------
 * Converts the one raster slide 2 needs: the reconstructed office photograph.
 *
 * WHY ONLY THE BACKGROUND
 * The pack also ships the three UI panels (learn/apply/improve) as PNG crops,
 * and `graphics/employee_and_panels.png` as a flattened composite. All are
 * deliberately unused: their copy is baked in as pixels, which is soft at hero
 * size and invisible to a screen reader. The panels are rebuilt in markup — see
 * HeroSlideMoments — which is also what lets them animate in.
 *
 * The background is supplied reconstructed WITHOUT those panels or the purple
 * connector, which is precisely what makes rebuilding them possible.
 *
 * The two small graphics inside the panels (the lesson thumbnail and the growth
 * chart) are pictorial and could not be drawn, so they ship too.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "designs/Lurny_Hero_Slide_2_Assets");
const OUT = path.join(ROOT, "public/images/home/hero");

const FILES = [
  [
    "backgrounds/clean_photo_background_reconstructed.png",
    "slide-2-scene.webp",
    90,
  ],
  ["graphics/learning_thumbnail.png", "slide-2-lesson.webp", 92],
  ["graphics/growth_chart.png", "slide-2-chart.webp", 92],
];

/**
 * Slide 3 — the engine constellation.
 *
 * Same split as slide 2, and for the same reason: the pack ships all six panels
 * as PNG crops with their copy baked in, and they are deliberately unused. Only
 * the reconstructed office and the small pictorial thumbnails inside the panels
 * ship as rasters; the panels themselves are rebuilt in HeroEngines.
 */
const SLIDE_3_SRC = path.join(
  ROOT,
  "designs/Lurny_Hero_Slide_3_Assets (1)",
);

const SLIDE_3_FILES = [
  ["background/clean-office-background-reconstructed.png", "slide-3-scene.webp", 90],
  ["graphics/magic-learning-thumbnail.png", "slide-3-magic.webp", 92],
  ["graphics/customer-excellence-thumbnail.png", "slide-3-customer.webp", 92],
  ["graphics/product-enablement-thumbnail.png", "slide-3-product.webp", 92],
  ["graphics/leadership-thumbnail.png", "slide-3-leadership.webp", 92],
];

async function convert(base, files) {
  for (const [from, to, quality] of files) {
    const file = path.join(OUT, to);

    await sharp(path.join(base, from)).webp({ quality }).toFile(file);

    const meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }
}

async function main() {
  await convert(SRC, FILES);
  await convert(SLIDE_3_SRC, SLIDE_3_FILES);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
