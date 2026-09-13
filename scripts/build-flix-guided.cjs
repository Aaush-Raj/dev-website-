/**
 * LURNYFLIX GUIDED-CREATION ASSETS
 * ---------------------------------------------------------------------------
 * Converts the background and the SIX visual-style thumbnails to webp.
 *
 * WHAT SHIPS, AND WHY ONLY THIS
 * Of the four supplied cards, exactly one carries photographs: the Visual
 * style card, whose six tiles are rendered portraits (live action, 3D, anime,
 * comic, watercolour, clay). Those six are cropped out here.
 *
 * WHAT DOES NOT SHIP
 * Everything else in the section is pure interface and is rebuilt in markup:
 *   - the "Create a video" form — its stepper, three fields, aspect-ratio
 *     choices, upload zone with an attached file, and submit button;
 *   - the Colour palette card's three swatch rows;
 *   - the Audio & subtitles card's two selects and its toggle;
 *   - the three connector arrows that run from the form to each card.
 *
 * That keeps every string selectable and translatable, keeps the strokes crisp
 * at any density, and lets the arrows draw themselves on scroll. See
 * FlixGuided.
 *
 * Unlike section 6's editor, this form is NOT eleven photographs in a dense
 * grid — it is a form. Rebuilding it costs nothing and buys real text.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/lurny platform lurnyflix all assets/7 LurnyFlix-Guided-Creation-Assets",
);
const OUT = path.join(ROOT, "public/images/platform/flix");

/**
 * The six style tiles, measured off `06-visual-style-card.png`.
 *
 * The card lays them out 3x2 inside its own padding; each window is the tile's
 * picture, stopping short of the caption below it — the captions are markup.
 *
 * NOTE ON THE SELECTED TILE: the supplied card burns a violet ring AND a tick
 * badge into the "3D animation" tile. The ring is croppable — the windows below
 * sit inside it, so the selection ring is drawn in markup — but the tick sits
 * over the portrait itself, with no clean plate under it.
 *
 * So that one badge stays pixels. `selected` in the content file names the same
 * tile, and FlixGuided draws the ring but NOT a second tick, which would print
 * one badge over another.
 */
const TILE = { w: 110, h: 104 };
const COLS = [35, 167, 299];
const ROWS = [76, 228];
const STYLES = [
  "live-action",
  "3d-animation",
  "anime",
  "comic-book",
  "watercolour",
  "clay",
];

async function main() {
  /* The section's ground. A broad, dark wash, where a lower quality would
     band. */
  const backdrop = path.join(OUT, "guided-backdrop.webp");
  await sharp(path.join(SRC, "01-blue-gradient-background.png"))
    .webp({ quality: 92 })
    .toFile(backdrop);
  const bm = await sharp(backdrop).metadata();
  console.log(`guided-backdrop.webp  ${bm.width}x${bm.height}`);

  for (const [index, name] of STYLES.entries()) {
    const file = path.join(OUT, `guided-style-${name}.webp`);
    await sharp(path.join(SRC, "06-visual-style-card.png"))
      .extract({
        left: COLS[index % 3],
        top: ROWS[Math.floor(index / 3)],
        width: TILE.w,
        height: TILE.h,
      })
      .webp({ quality: 88 })
      .toFile(file);
    const m = await sharp(file).metadata();
    console.log(`guided-style-${name}.webp  ${m.width}x${m.height}`);
  }
}

main();
