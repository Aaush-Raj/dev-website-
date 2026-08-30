/**
 * BUILD: LurnyNotes "context-aware email" assets
 * ---------------------------------------------------------------------------
 * Converts the section's flow diagram and its three feature icons to WebP into
 * public/assets/images/notes.
 *
 *   node scripts/build-notes-context-assets.cjs
 *
 * All four already carry real alpha and are already cropped, so nothing is
 * keyed or trimmed here — this only converts the format.
 *
 * The diagram ships as ONE image rather than three. It is a dense product
 * mockup — a Teams window with a formatting toolbar, a drafted reply, chips
 * and buttons — and the supplied render is a single composed piece. Rebuilding
 * it in markup would mean reproducing a third-party UI at a size where none of
 * it is readable anyway.
 *
 * The wave background in the same folder is NOT converted: the section draws
 * its glow in CSS instead, which reflows with the viewport where a fixed
 * 1717x916 raster would letterbox.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC_DIR = "designs/lurnynotes-all assets/lurnynotes-email-teams-assets/";
const OUT_DIR = "public/assets/images/notes/";

const ASSETS = [
  ["lurnynotes-three-boxes-transparent.png", "context-flow"],
  ["01-understands-conversation-icon.png", "context-understands"],
  ["02-approved-knowledge-icon.png", "context-knowledge"],
  ["03-reply-for-review-icon.png", "context-review"],
];

(async () => {
  for (const [src, name] of ASSETS) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      // alphaQuality 100 keeps the diagram's hairline borders and the icons'
      // thin cyan strokes clean against the navy ground.
      .webp({ quality: 90, alphaQuality: 100, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
