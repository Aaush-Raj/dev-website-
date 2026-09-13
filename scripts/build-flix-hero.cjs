/**
 * LURNYFLIX HERO ASSETS
 * ---------------------------------------------------------------------------
 * Converts the TWO rasters the hero needs to webp.
 *
 * WHAT SHIPS AS A RASTER, AND WHY
 * `01-background-player.png` carries the Studio window whole — and inside it a
 * PHOTOGRAPH of the presenter plus four photographic scene thumbnails. A photo
 * cannot be rebuilt in markup, and rebuilding the chrome around it while
 * leaving the photo behind would mean matching a composite by hand for no
 * gain. So the plate ships, and the copy overlays it.
 *
 * `04-comic-style-video-card.png` is likewise a generated illustration — two
 * characters in a rendered office. It is cropped out of its dark ground here
 * so it can sit as a card over the scene.
 *
 * WHAT DOES NOT SHIP
 * The source-formats bar (`03`) and the knowledge-check card (`05`) are flat
 * interface — a row of format tiles and a question with two options. Both are
 * supplied as OPAQUE PNGs on the hero's near-black ground, so layering either
 * over the scene would seam a dark rectangle onto it. Rebuilt in markup: no
 * seam, crisp at any density, and the text stays selectable and translatable.
 * See FlixHero.
 *
 * The footer ribbon (`02`) is three labels on a rule — markup for the same
 * reasons.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/lurny platform lurnyflix all assets/1 LurnyFlix-Hero-Assets",
);
const OUT = path.join(ROOT, "public/images/platform/flix");

/**
 * The problem section's gradient.
 *
 * A clean cream field with soft lilac and pink blooms at the corners — no
 * copy, no rules, no workflow curve on it. Everything that sits over it is
 * markup, including the PDF → PPT → URL → YouTube → AI curve, which the pack
 * also ships as a 2172x724 raster (`03-workflow-graphic.png`). That file is
 * deliberately unused: it is pure line art, so drawing it keeps the labels
 * selectable and lets the curve draw itself on scroll.
 */
async function main() {
  /* The scene. A broad, dark gradient, where a lower quality would band. */
  const scene = path.join(OUT, "hero-scene.webp");
  await sharp(path.join(SRC, "01-background-player.png"))
    .webp({ quality: 92 })
    .toFile(scene);
  console.log(`hero-scene.webp  ${(await sharp(scene).metadata()).width}x${(await sharp(scene).metadata()).height}`);

  /*
   * The comic illustration, cropped to the PICTURE ONLY.
   *
   * The supplied 1536x1024 sits a whole card — white frame, "Comic-style
   * video" caption, and the picture inside it — TILTED on a near-black field.
   * Because it is rotated, no rectangular crop gets the card without also
   * taking dark wedges at its corners.
   *
   * So only the rendered picture is taken here, and the frame, the caption and
   * the tilt are rebuilt in markup around it. That loses nothing (the caption
   * becomes selectable text) and gains an untilted source that can be laid out
   * and animated freely. The window below is the picture's own bounds inside
   * the card, measured off the file.
   */
  /* The problem section's ground. A broad, smooth wash, where a lower
     quality would band. */
  const problem = path.join(OUT, "problem-backdrop.webp");
  await sharp(
    path.join(
      ROOT,
      "designs/lurny platform lurnyflix all assets/2 LurnyFlix-Problem-Solution-Assets/02-gradient-background.png",
    ),
  )
    .webp({ quality: 92 })
    .toFile(problem);
  const pm = await sharp(problem).metadata();
  console.log(`problem-backdrop.webp  ${pm.width}x${pm.height}`);

  const comic = path.join(OUT, "comic-still.webp");
  await sharp(path.join(SRC, "04-comic-style-video-card.png"))
    .extract({ left: 336, top: 306, width: 858, height: 500 })
    .webp({ quality: 90 })
    .toFile(comic);
  const cm = await sharp(comic).metadata();
  console.log(`comic-still.webp  ${cm.width}x${cm.height}`);
}

main();
