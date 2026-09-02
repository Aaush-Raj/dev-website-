/**
 * BUILD: LurnyNotes "conversation to action" assets
 * ---------------------------------------------------------------------------
 * Converts the section's workflow diagram and its three feature icons to WebP
 * into public/assets/images/notes.
 *
 *   node scripts/build-notes-action-assets.cjs
 *
 * All four already carry real alpha and are already cropped, so nothing is
 * keyed or trimmed here — this only converts the format.
 *
 * As with the context section, the diagram ships as ONE image rather than
 * being rebuilt in markup: it is a composed product mockup — a note view, an
 * actions panel and a follow-up card joined by dashed connectors — and the
 * supplied render is a single piece. Its internal type is far too small to
 * read at the rendered size, so it is decorative detail rather than content.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/lurnynotes-all assets/lurnynotes-conversation-to-action-assets/";
const OUT_DIR = "public/assets/images/notes/";

const ASSETS = [
  ["four-box-workflow-transparent.png", "action-flow"],
  ["01-understand-what-mattered.png", "action-understand"],
  ["02-turn-decisions-into-ownership.png", "action-ownership"],
  ["03-keep-the-conversation-moving.png", "action-moving"],
];

(async () => {
  for (const [src, name] of ASSETS) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      // alphaQuality 100 keeps the diagram's hairline borders and the icons'
      // thin navy strokes clean against the warm ground.
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
