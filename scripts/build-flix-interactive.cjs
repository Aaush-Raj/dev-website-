/**
 * LURNYFLIX INTERACTIVE-VIDEO ASSETS
 * ---------------------------------------------------------------------------
 * Converts the ONE rendered still this section needs to webp, plus its
 * background.
 *
 * WHAT SHIPS, AND WHY ONLY THIS
 * `02-video-panel.png` is a whole player: the LurnyFlix header, an "Interactive
 * video" pill, a quiz card overlaying the frame, a transport bar carrying a "?"
 * marker at the quiz's timestamp, and a three-stop progress rail. All of that
 * is interface, and all of it is rebuilt in markup — which keeps every string
 * selectable and translatable, keeps the strokes crisp at any density, and lets
 * the quiz and the rail animate as the section's own story.
 *
 * The one thing markup cannot draw is the generated still behind the quiz, so
 * that is cropped out here.
 *
 * The three 80x80 feature icons are line glyphs at the size the section renders
 * them; they are drawn inline rather than shipped, matching the other sections
 * on this page. See FlixInteractive.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/lurny platform lurnyflix all assets/5 LurnyFlix-Interactive-Video-Assets",
);
const OUT = path.join(ROOT, "public/images/platform/flix");

async function main() {
  /* The section's ground. A broad, dark wash, where a lower quality would
     band. */
  const backdrop = path.join(OUT, "interactive-backdrop.webp");
  await sharp(path.join(SRC, "01-gradient-background.png"))
    .webp({ quality: 92 })
    .toFile(backdrop);
  const bm = await sharp(backdrop).metadata();
  console.log(`interactive-backdrop.webp  ${bm.width}x${bm.height}`);

  /*
   * The frame behind the quiz.
   *
   * Cropped to the LEFT portion only — the part of the picture the quiz card
   * does not cover. The supplied panel has the quiz burnt over its right half,
   * and taking the full width would ship that card as pixels only to draw a
   * second one over it.
   *
   * So the still is the scene alone, and the markup card floats over it at the
   * design's own position. The picture is wide enough that its right edge
   * still sits under the card rather than beside it.
   *
   * The window is also SHORTER than the supplied frame: the player is 16:9 and
   * this slice is nearly square, so cropping to a landscape window lets it
   * cover the frame without `object-cover` having to throw most of the room
   * away to fill the height.
   */
  const still = path.join(OUT, "interactive-still.webp");
  await sharp(path.join(SRC, "02-video-panel.png"))
    .extract({ left: 24, top: 84, width: 576, height: 380 })
    .webp({ quality: 88 })
    .toFile(still);
  const sm = await sharp(still).metadata();
  console.log(`interactive-still.webp  ${sm.width}x${sm.height}`);
}

main();
