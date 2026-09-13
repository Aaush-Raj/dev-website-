/**
 * LURNYFLIX BANKING USE-CASE ASSETS
 * ---------------------------------------------------------------------------
 * Converts the FOUR rendered stills this section needs to webp, plus its
 * background.
 *
 * WHAT SHIPS, AND WHY ONLY THIS
 * `02-video-panel.png` is a whole player: chrome (the LurnyFlix header, the
 * "AI-generated video" pill, the scene-title chip, the subtitle, the transport
 * bar, three "Scene n" captions) wrapped around FOUR generated illustrations —
 * the main frame and three scene thumbnails. Those four are rendered artwork
 * that markup cannot draw, so they are cropped out here and everything around
 * them is rebuilt. That keeps every string selectable and translatable, keeps
 * the chrome crisp at any density, and lets the pieces animate independently.
 *
 * WHAT DOES NOT SHIP
 * `03-scenario-script-card-with-arrow.png` is pure interface — a titled card
 * holding two lines of dialogue, a pill, and a curved arrow between them. All
 * of it is drawn in markup. Unlike section 3's assets these two DO carry alpha,
 * so they could have been layered without seaming; they are still rebuilt,
 * because their copy is baked in as pixels at a size the section renders small.
 *
 * See FlixBanking.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/lurny platform lurnyflix all assets/4 LurnyFlix-Banking-Use-Case-Assets (1)",
);
const OUT = path.join(ROOT, "public/images/platform/flix");

/**
 * Each crop is a rendered still's own bounds inside the supplied panel,
 * measured off the file. Taking the padded box would bring the panel's
 * lavender frame and the chrome's text with it.
 */
const CROPS = [
  /*
   * The main frame.
   *
   * The full picture is taken, chip and subtitle INCLUDED, because both are
   * burnt into the render — there is no clean plate underneath them. So they
   * are NOT redrawn in markup here: doing that would print a second chip over
   * the first. The trade is accepted only for these two strings; every other
   * string in the panel is markup.
   */
  [
    { left: 222, top: 160, width: 1092, height: 522 },
    "banking-scene-main.webp",
  ],
  /* The three scene thumbnails along the panel's foot. */
  [{ left: 236, top: 763, width: 338, height: 148 }, "banking-scene-1.webp"],
  [{ left: 597, top: 763, width: 338, height: 148 }, "banking-scene-2.webp"],
  [{ left: 958, top: 763, width: 338, height: 148 }, "banking-scene-3.webp"],
];

async function main() {
  /* The section's ground: a lavender field with a plant at its foot. A broad,
     smooth wash, where a lower quality would band. */
  const backdrop = path.join(OUT, "banking-backdrop.webp");
  await sharp(path.join(SRC, "01-lavender-background-with-plant.png"))
    .webp({ quality: 92 })
    .toFile(backdrop);
  const bm = await sharp(backdrop).metadata();
  console.log(`banking-backdrop.webp  ${bm.width}x${bm.height}`);

  for (const [window, to] of CROPS) {
    const file = path.join(OUT, to);
    await sharp(path.join(SRC, "02-video-panel.png"))
      .extract(window)
      .webp({ quality: 88 })
      .toFile(file);
    const m = await sharp(file).metadata();
    console.log(`${to}  ${m.width}x${m.height}`);
  }
}

main();
