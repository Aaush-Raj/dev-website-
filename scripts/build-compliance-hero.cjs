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

const FILES = [[SRC, "04_Hero_Background.png", "hero-scene.webp"]];

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
