/**
 * EMPLOYEE ONBOARDING SECTION ASSETS
 * ---------------------------------------------------------------------------
 * Converts the ONE raster the hero needs — the office scene — to webp.
 *
 * WHY THE TWO CARDS ARE NOT CONVERTED
 * The pack ships them as alpha-cut PNGs, so unlike the LurnyKxP panels they
 * could be layered without seaming. They still are not: each is 362x260 with
 * its copy baked in as pixels, which is soft at the size the hero draws them
 * and cannot be selected, translated or read by a screen reader. They are
 * rebuilt in markup — see OnboardingHero.
 *
 * WHAT THE BACKGROUND ALREADY CARRIES
 * Everything except those two cards: the office, the two colleagues, the wall
 * text, the handwritten "New People Brighter Journeys" note, the desk props,
 * and the dashed connectors with the "Shared essentials / Individual learning
 * paths" annotation. So nothing is composited here — the cards simply sit over
 * it, and the lavender wash on its left is what the copy column sits on.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/Solutions Onboarding/1 Employee_Onboarding_Hero_Assets",
);
const OUT = path.join(ROOT, "public/images/solutions/onboarding");

/**
 * The connected-approach section's gradient.
 *
 * Same split as the hero: the supplied plate is a clean lavender gradient with
 * NO cards or arrows on it, so the five steps and the arrows threading them are
 * built in markup — sharp, translatable, animatable and readable by a screen
 * reader. The pack also ships them as one flattened 877x867 PNG; that file is
 * deliberately unused.
 */
const APPROACH_SRC = path.join(
  ROOT,
  "designs/Solutions Onboarding/3 Onboarding_Connected_Approach_Assets",
);

const FILES = [
  [SRC, "03_Office_Background.png", "hero-scene.webp"],
  [APPROACH_SRC, "02_Gradient_Background.png", "approach-backdrop.webp"],
];

async function main() {
  for (const [base, from, to] of FILES) {
    const file = path.join(OUT, to);

    // Both are broad, smooth gradients, where a lower quality would band.
    await sharp(path.join(base, from)).webp({ quality: 92 }).toFile(file);

    const meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
