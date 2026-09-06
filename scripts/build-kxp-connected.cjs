/**
 * KXP CONNECTED-EXPERIENCE ASSETS
 * ---------------------------------------------------------------------------
 * Builds the ONE raster section 3 needs: the violet room with the engine panel
 * and the learner workspace composited onto it.
 *
 * WHY ONE COMPOSITE RATHER THAN THREE POSITIONED LAYERS
 * The three supplied files are all OPAQUE RGB — no alpha anywhere. The two
 * panels are pre-rendered WITH their share of the violet room baked into their
 * edges: the engine panel is translucent glass that fades into the wall, and
 * the workspace carries the desk, the plant and the "Need an answer?" pill
 * bleeding past the card's own corners.
 *
 * Layering them in CSS would therefore show two hard rectangular seams where
 * each panel's baked background met the real one — the panels cannot simply be
 * positioned over the room, because they do not have transparent surrounds to
 * position. Compositing here, once, at build time, is what removes the seams:
 * each panel is feathered into the room over a few pixels so the baked edge
 * dissolves rather than butting against it.
 *
 * WHAT IS NOT IN THE COMPOSITE
 * The header (eyebrow, headline, description) and the closing line are markup,
 * not pixels — they must stay selectable, translatable and responsive. Only
 * the room and its two panels are raster here.
 *
 * POSITIONS
 * Measured off designs/KxpPage/section3.png by scanning for each panel's edges,
 * then expressed as fractions of the frame so they survive the resize to the
 * background's own 1672x941.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/KxpPage/LurnyKxP_Connected_Experience_Assets",
);
const OUT = path.join(ROOT, "public/images/platform/kxp");

/** The output frame — the background's own pixel size. */
const W = 1672;
const H = 941;

/**
 * Panel placement, as fractions of the frame, measured off the design.
 * `feather` is the fade applied to the panel's own edge, in output pixels, so
 * its baked-in background dissolves into the room instead of seaming.
 */
const PANELS = [
  {
    file: "panels/engine_panel.png",
    left: 0.0278,
    top: 0.2418,
    width: 0.1638,
    feather: 10,
  },
  {
    file: "panels/learner_workspace_with_assistant.png",
    left: 0.3333,
    top: 0.2293,
    width: 0.5281,
    feather: 8,
  },
];

/**
 * Feather a panel's edges to transparent so it dissolves into the room.
 * The panels have no alpha channel of their own, so one is added here.
 */
async function feather(file, width, inset) {
  const buf = await sharp(path.join(SRC, file))
    .resize({ width })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = buf;
  const { width: w, height: h, channels } = info;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Distance to the nearest edge, ramped across `inset`.
      const d = Math.min(x, y, w - 1 - x, h - 1 - y);
      const t = d / inset;
      const a = t >= 1 ? 1 : t;

      const i = (y * w + x) * channels + 3;
      data[i] = Math.round(data[i] * a);
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels } })
    .png()
    .toBuffer();
}

async function main() {
  const background = await sharp(path.join(SRC, "background/clean_background_reconstructed.png"))
    .resize(W, H, { fit: "cover" })
    .toBuffer();

  const layers = [];

  for (const panel of PANELS) {
    const width = Math.round(panel.width * W);
    const buffer = await feather(panel.file, width, panel.feather);

    layers.push({
      input: buffer,
      left: Math.round(panel.left * W),
      top: Math.round(panel.top * H),
    });
  }

  const file = path.join(OUT, "connected.webp");

  await sharp(background)
    .composite(layers)
    .webp({ quality: 88 })
    .toFile(file);

  const meta = await sharp(file).metadata();
  console.log(`connected.webp  ${meta.width}x${meta.height}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
