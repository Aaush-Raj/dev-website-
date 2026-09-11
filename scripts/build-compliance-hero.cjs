/**
 * COMPLIANCE READINESS SECTION ASSETS
 * ---------------------------------------------------------------------------
 * Converts the ONE raster the hero needs — the glass-wall scene — to webp.
 *
 * WHY THE THREE CARDS ARE NOT CONVERTED
 * The pack ships them as alpha-cut PNGs, so they could be layered without
 * seaming. They still are not: each is ~330x230 with its copy baked in as
 * pixels, soft at the size the hero draws them and unreadable to a screen
 * reader. They are rebuilt in markup — see ComplianceHero.
 *
 * WHAT THE BACKGROUND ALREADY CARRIES
 * Everything except those three cards: the office, the woman at the glass, all
 * six sticky notes, the handwritten "Understand it. Apply it." note with its
 * arrows, the "Safer teams / Stronger culture / Greater impact" list, and the
 * lavender wash on the left the copy column sits on. So nothing is composited
 * here — the cards simply sit over it.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/Solutions Complaince/1 Compliance_Readiness_Hero_Assets",
);
const OUT = path.join(ROOT, "public/images/solutions/compliance");

/**
 * The LurnyMagic section's gradient.
 *
 * Same split as the hero, and more so: the supplied plate is a clean gradient
 * with NO document, workspace, cards, arrows or handwriting on it. All of that
 * is built in markup — sharp, translatable, animatable and readable by a
 * screen reader. The pack also ships each piece as its own crop with copy
 * baked in as pixels; those files are deliberately unused.
 */
const MAGIC_SRC = path.join(
  ROOT,
  "designs/Solutions Complaince/3 Compliance_Magic_Assets",
);

/**
 * The compliance-reality section's photograph.
 *
 * Supplied loose as "bgsec2.png" rather than inside the section's own folder.
 * That folder's other two files — the cards with their dotted arrows, and the
 * foot ribbon — are pure interface with their copy baked in as pixels, so they
 * are drawn in markup and deliberately unused. See ComplianceReality.
 */
const REALITY_SRC = path.join(ROOT, "designs/Solutions Complaince");

/**
 * The LurnyPulse section's gradient.
 *
 * Same split again: the supplied plate is a clean blue gradient with NO panel,
 * radar, cards or arrows on it. The pack's "01_Three_Boxes_And_Arrows.png"
 * (542KB) flattens all of that into one raster with its copy baked in as
 * pixels, and its three icon crops are 24-32px marks — all deliberately
 * unused, since the radar in particular has to stay crisp and animatable.
 */
const PULSE_SRC = path.join(
  ROOT,
  "designs/Solutions Complaince/4 Compliance_Pulse_Assets",
);

const FILES = [
  [SRC, "04_Hero_Background.png", "hero-scene.webp"],
  [MAGIC_SRC, "07_Gradient_Background.png", "magic-backdrop.webp"],
  [REALITY_SRC, "bgsec2.png", "reality-scene.webp"],
  [PULSE_SRC, "02_Gradient_Background.png", "pulse-backdrop.webp"],
];

async function main() {
  for (const [base, from, to] of FILES) {
    const file = path.join(OUT, to);

    // A photograph carrying a broad, smooth wash on its left, where a lower
    // quality would band.
    await sharp(path.join(base, from)).webp({ quality: 92 }).toFile(file);

    const meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }
}

main();
