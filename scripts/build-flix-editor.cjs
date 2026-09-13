/**
 * LURNYFLIX VIDEO-EDITOR ASSETS
 * ---------------------------------------------------------------------------
 * Converts the background and the TWO photograph-dense panels to webp.
 *
 * WHAT SHIPS, AND WHY — A DIFFERENT CALL FROM THE OTHER SECTIONS
 * Elsewhere on this page the rule has been: crop the photographs, rebuild the
 * chrome. Here the editor panel is rebuilt NOWHERE, because it is not chrome
 * wrapped around a picture — it is ELEVEN photographs (the preview, six media
 * thumbnails, four scene thumbnails) woven through a dense two-column layout.
 * Cropping eleven stills and reassembling that grid by hand would risk the
 * pieces drifting out of the arrangement they were rendered in, and every
 * string in it renders below 11px at the size the section draws it — too small
 * for the selectability a rebuild would buy.
 *
 * So the editor ships whole, and the portrait card with it for the same reason
 * (it is one photograph under a caption, and it overlaps the editor's own
 * corner in the design).
 *
 * WHAT DOES NOT SHIP
 * `04-voice-and-music-card.png` is pure interface — two labelled rows with
 * selects and a waveform, no photograph anywhere. It is rebuilt in markup, so
 * its strings stay selectable and its waveform stays crisp. See FlixEditor.
 *
 * All three supplied cards carry alpha, so the two that ship layer over the
 * gradient without seaming.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/lurny platform lurnyflix all assets/6 LurnyFlix-Video-Editor-Assets",
);
const OUT = path.join(ROOT, "public/images/platform/flix");

const FILES = [
  /* The gradient ground. Opaque, and a broad smooth wash where a lower
     quality would band. */
  ["01-gradient-background.png", "editor-backdrop.webp", 92, false],
  /* The editor and the portrait card. Both keep their alpha so they sit over
     the gradient without a seam — hence webp with `alpha_quality`. */
  ["02-video-editing-interface.png", "editor-panel.webp", 90, true],
  ["03-mobile-view-card.png", "editor-portrait.webp", 90, true],
];

async function main() {
  for (const [from, to, quality, alpha] of FILES) {
    const file = path.join(OUT, to);
    await sharp(path.join(SRC, from))
      .webp(alpha ? { quality, alphaQuality: 100 } : { quality })
      .toFile(file);

    const m = await sharp(file).metadata();
    console.log(`${to}  ${m.width}x${m.height}  ${m.hasAlpha ? "alpha" : "opaque"}`);
  }
}

main();
