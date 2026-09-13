/**
 * LURNYFLIX MEDICAL USE-CASE ASSETS
 * ---------------------------------------------------------------------------
 * Converts the THREE photographs this section needs to webp.
 *
 * WHAT SHIPS, AND WHY ONLY THIS
 * The pack supplies each of the section's three cards as a whole flattened
 * PNG — the PPT card, the player card, the Vimeo chip — plus two full-frame
 * arrows. Every one is OPAQUE on the section's near-black ground, so layering
 * any of them would seam a dark rectangle onto the gradient.
 *
 * But two of those cards are not pure interface either: both carry a
 * PHOTOGRAPH of a doctor consulting a patient, and the player card adds a
 * second photograph of the presenter. Photographs cannot be rebuilt in markup.
 *
 * So the split is: the three photographs are cropped out here, and everything
 * around them — the card frames, the PowerPoint header, the teal slide band,
 * the three bullet rows, the player transport, the Voiceover/Background music
 * chips, the "Video ready" pill and the whole Vimeo card — is drawn in markup.
 * That keeps every string selectable and translatable, keeps the chrome crisp
 * at any density, and lets the pieces animate independently.
 *
 * The two arrows are likewise drawn: they are single curved strokes, which
 * SVG renders exactly and can draw on scroll. See FlixMedical.
 *
 * The gradient ships as the section's ground.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/lurny platform lurnyflix all assets/3 LurnyFlix-Medical-Use-Case-Assets",
);
const OUT = path.join(ROOT, "public/images/platform/flix");

/**
 * Each crop is the photograph's own bounds inside the supplied card, measured
 * off the file. Taking a whole card would paste its dark ground over the
 * gradient, and taking a padded box would bring the card's white frame with
 * it.
 */
const CROPS = [
  /* The consultation photo on the original slide. The two cards show the same
     picture at different sizes, so the larger source is used for both. */
  [
    "04-original-ppt-card.png",
    { left: 178, top: 418, width: 610, height: 436 },
    "medical-slide-photo.webp",
  ],
  /* The presenter beside the slide in the finished video. */
  [
    "05-video-player-card.png",
    { left: 979, top: 208, width: 411, height: 462 },
    "medical-avatar.webp",
  ],
];

async function main() {
  /* The section's ground. A broad, dark wash, where a lower quality would
     band. */
  const backdrop = path.join(OUT, "medical-backdrop.webp");
  await sharp(path.join(SRC, "01-gradient-background.png"))
    .webp({ quality: 92 })
    .toFile(backdrop);
  const bm = await sharp(backdrop).metadata();
  console.log(`medical-backdrop.webp  ${bm.width}x${bm.height}`);

  for (const [from, window, to] of CROPS) {
    const file = path.join(OUT, to);
    await sharp(path.join(SRC, from))
      .extract(window)
      .webp({ quality: 88 })
      .toFile(file);
    const m = await sharp(file).metadata();
    console.log(`${to}  ${m.width}x${m.height}`);
  }
}

main();
