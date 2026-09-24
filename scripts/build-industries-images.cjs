/**
 * INDUSTRY PHOTOGRAPHY
 * ---------------------------------------------------------------------------
 * Converts the six sector photographs to webp for the TWO places they appear:
 * the /industries hero mosaic and the homepage's "Solutions by industry"
 * accordion. One script, because they are the same six pictures — but they
 * are shipped DIFFERENTLY, and the difference is the point.
 *
 * THE HERO CROPS HERE; THE HOMEPAGE DOES NOT
 * The hero's cards are a fixed 4:5 box with `object-cover`. The supplied
 * photographs are 2:3, so the browser would centre-crop a sixth off each,
 * blind to where the people are. Cropping here with sharp's "attention"
 * strategy (which weights skin tones and detail) keeps every subject in
 * frame, and shipping exactly 4:5 makes the browser's crop a no-op.
 *
 * The homepage accordion CANNOT be pre-cropped: its panels change shape as
 * they expand — an inactive panel is roughly 9:16, the active one roughly
 * 4:5, and below lg they are 3:4 — so no single crop fits. Those ship as the
 * full 2:3 frame and the browser crops per state; every subject sits in the
 * middle third, which is what survives all three shapes.
 *
 * SIZES
 * Hero: 640x800 — the card is at most 15rem wide, so 640 covers 2x. Homepage:
 * 800x1200 — the active panel is ~28vw (about 450px at 1600), so 800 covers
 * 2x without shipping the 1024x1536 originals.
 */

const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/industries all assets/indistry solutions images",
);
const HERO_OUT = path.join(ROOT, "public/assets/images/industries");
const HOME_OUT = path.join(ROOT, "public/assets/images/industries/home");

/** Supplied filename -> the basename the content files point at. */
const FILES = {
  "BFSI.png": "bfsi",
  "Telecom.png": "telecom",
  "Healthcare.png": "healthcare",
  "manufacturing.png": "manufacturing",
  "professional services.png": "professional-services",
  "retail.png": "retail",
};

async function write(pipeline, file) {
  await pipeline.webp({ quality: 82 }).toFile(file);
  const m = await sharp(file).metadata();
  /* `metadata().size` is only set for buffers, not files — stat the file. */
  const kb = (fs.statSync(file).size / 1024).toFixed(0);
  console.log(`${path.relative(ROOT, file)}  ${m.width}x${m.height}  ${kb}KB`);
}

async function main() {
  fs.mkdirSync(HOME_OUT, { recursive: true });

  for (const [from, to] of Object.entries(FILES)) {
    const source = path.join(SRC, from);

    await write(
      sharp(source).resize(640, 800, {
        fit: "cover",
        position: sharp.strategy.attention,
      }),
      path.join(HERO_OUT, `${to}.webp`),
    );

    await write(
      sharp(source).resize(800, 1200, { fit: "inside" }),
      path.join(HOME_OUT, `${to}.webp`),
    );
  }
}

main();
