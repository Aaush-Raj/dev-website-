/**
 * BUILD: Resources hero book covers
 * ---------------------------------------------------------------------------
 * Trims the three supplied cover renders and writes them as WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-resource-books.cjs
 *
 * WHY THIS EXISTS
 * Unlike the LurnySaathi hero photo, these PNGs already carry REAL alpha — no
 * keying is needed, and none is done here. The renders simply arrive on large
 * transparent canvases (book 2 is 1672x941 for a cover occupying well under
 * half of it), so they are trimmed to their content before conversion. Left
 * untrimmed, the empty margins become part of the layout box and no amount of
 * CSS positioning lines the covers up predictably.
 *
 * Re-run this if the design team ships new cover art.
 */
const sharp = require("sharp");

const SRC_DIR = "designs/elurny website resources landing section/";
const OUT_DIR = "public/assets/images/resources/";

/** Source file → output name. */
const COVERS = [
  ["book1.png", "book-readiness"],
  ["book2.png", "book-quality-test"],
  ["book3.png", "book-playbook"],
];

(async () => {
  for (const [src, name] of COVERS) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      // threshold 1 rather than 0: the renders have a few near-transparent
      // stray pixels in the margins that a zero threshold would preserve.
      .trim({ threshold: 1 })
      // alphaQuality 100 keeps the covers' edges and drop shadows clean; the
      // colour channels compress fine at 88.
      .webp({ quality: 88, alphaQuality: 100, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
