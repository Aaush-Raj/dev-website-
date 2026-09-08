/**
 * SALES ENABLEMENT SECTION ASSETS
 * ---------------------------------------------------------------------------
 * Converts the two rasters the hero genuinely needs — the conversation photo
 * and the backdrop — to webp. Nothing is composited.
 *
 * WHY THE FOUR ENGINE CARDS ARE NOT CONVERTED
 * The pack ships them as PNG crops with transparent corners, so unlike the
 * LurnyKxP panels they COULD be layered without seaming. They still are not,
 * for a different reason: they are 252x196 or smaller with their copy baked in
 * as pixels. At the size the hero draws them that text is visibly soft, and it
 * could not be selected, translated or read by a screen reader. The pack's own
 * README asks for headline and CTA copy to be rendered in HTML; the same
 * argument applies to a card whose entire content is text.
 *
 * So the cards are built in markup — see SalesHero — and only the photograph
 * and the backdrop ship here, since neither can be drawn.
 *
 * The two small graphics inside the cards (the video still and the waveform)
 * are likewise pictorial, so they are converted too.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/solutions sales enablement/Sales_Enablement_Hero_Assets",
);
const OUT = path.join(ROOT, "public/images/solutions/sales-enablement");

const FILES = [
  ["01_Photo/sales_conversation_clean_reconstructed.png", "conversation.webp"],
  ["02_Background/hero_background_reconstructed.png", "hero-backdrop.webp"],
  ["05_Graphics/magic_video_thumbnail.png", "magic-still.webp"],
];

/**
 * The "reality" section's illustrated night-office scene.
 *
 * Same split as the hero: the scene is an illustration and ships as pixels,
 * while the three moment cards and the insight strip over it are UI carrying
 * readable text and are built in markup — see SalesReality. The supplied
 * background is already reconstructed free of both, which is what makes that
 * possible.
 */
const REALITY_SRC = path.join(
  ROOT,
  "designs/solutions sales enablement/2 Lurny_Sales_Enablement_Reality_Assets",
);

const REALITY_FILES = [
  [
    "01_clean_illustrated_background_reconstructed.png",
    "reality-scene.webp",
  ],
];

async function convert(base, files, quality) {
  for (const [from, to] of files) {
    const file = path.join(OUT, to);

    await sharp(path.join(base, from)).webp({ quality }).toFile(file);

    const meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }
}

/**
 * The "prepare with LurnyMagic" section's lavender scene and its four cards.
 *
 * DIFFERENT CALL FROM EVERY OTHER SECTION ON THIS SITE: these four cards SHIP
 * AS IMAGES rather than being rebuilt in markup. Three things make that right
 * here, where it was wrong for the hero and reality cards:
 *
 *   - they are 1402x1122 and 1536x1024, not ~250px crops, so their embedded
 *     copy is sharp at the size the section draws them;
 *   - they are cleanly alpha-cut, so they layer with no seam; and
 *   - each is drawn in 3D PERSPECTIVE, tilted on two axes with matching
 *     shadows. Reproducing that with CSS transforms would be a lossy
 *     approximation of artwork that already exists.
 *
 * The pack's README agrees: "Card copy stays embedded; main webpage headings,
 * paragraphs and CTA text are excluded." So the headline, body and CTA are
 * markup and the cards are not.
 *
 * The background already carries the seller, the handwritten notes and the
 * curved arrow, so nothing is composited — the cards simply sit over it.
 */
const MAGIC_SRC = path.join(
  ROOT,
  "designs/solutions sales enablement/Lurny_Sales_Enablement_Magic_Assets",
);

const MAGIC_FILES = [
  ["backgrounds/bg1.png", "magic-scene.webp"],
  ["cards/01_New_Product_Launch.png", "magic-card-launch.webp"],
  ["cards/02_Product_Briefing.png", "magic-card-briefing.webp"],
  ["cards/03_Objection_Handling.png", "magic-card-objection.webp"],
  ["cards/04_Readiness_Check.png", "magic-card-readiness.webp"],
];

async function main() {
  await convert(SRC, FILES, 88);
  // The scene is a large illustration with broad gradients; a touch more
  // quality avoids banding across the dark wall.
  await convert(REALITY_SRC, REALITY_FILES, 92);
  // The cards carry embedded copy that must stay crisp, and alpha edges that
  // banding would show, so they take the highest quality of the three sets.
  await convert(MAGIC_SRC, MAGIC_FILES, 94);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
