/**
 * BUILD: LurnyNotes hero backdrop
 * ---------------------------------------------------------------------------
 * Writes the hero's background photograph into
 * public/assets/images/notes.
 *
 *   node scripts/build-notes-assets.cjs
 *
 * PLACEHOLDER SOURCE. The design shows a man working at a laptop in a dark
 * office; no such photograph was supplied. This reuses the LurnySaathi context
 * shot — the closest match in the library: same near-black office, same person
 * -at-a-laptop composition, and already dark enough to carry white copy without
 * fighting the scrim.
 *
 * TODO(assets): swap the source below when the real photograph lands, then
 * update the `alt` in content/notes.ts to describe it.
 */
const sharp = require("sharp");

const SRC = "public/assets/images/saathi/saathi-context-bg.webp";
const OUT = "public/assets/images/notes/hero-backdrop.webp";

(async () => {
  await sharp(SRC).webp({ quality: 82, effort: 6 }).toFile(OUT);
  const m = await sharp(OUT).metadata();
  console.log(`wrote ${OUT} ${m.width}x${m.height}`);
})();
