/**
 * BUILD: LurnyCampus section 3 + 4 assets
 * ---------------------------------------------------------------------------
 * Converts the artwork worth shipping as images to WebP into
 * public/assets/images/campus.
 *
 *   node scripts/build-campus-journey-assets.cjs
 *
 * ONLY the backdrop is converted. The section's other supplied assets are
 * rebuilt in markup instead:
 *
 *   - the product interface (960x718) is a whole UI flattened into one image;
 *     shipping it would freeze ~40 labels into pixels at a single width,
 *   - the three course thumbnails (174x118) carry baked-in titles that would
 *     blur at render size,
 *   - the five icons (65-83px) are too small to scale.
 *
 * Section 4 is the same story: its project, mentor and evidence panels are
 * flattened UI, and its three feature icons are ~87px.
 *
 * Two assets ARE worth shipping. The contour texture is a photographic
 * topographic wash with no type in it, and redrawing those curves by hand
 * would cost far more markup than the image costs bytes. The mentor portrait
 * is an illustration of a person — not something to approximate in SVG.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const ASSETS = [
  // Section 3's contour wash.
  [
    "3 lurnycampus-personalised-journey-assets/lurnycampus-dark-contour-background.png",
    "journey-contours",
    // A flat dark wash with very low-contrast line work — it compresses hard,
    // and quality 72 holds the contours without banding at render size.
    { quality: 72 },
  ],
  // Section 4's mentor portrait. An illustrated avatar with real alpha, so it
  // keeps its transparency and a higher alphaQuality to hold the clean edge.
  [
    "4 lurnycampus-learn-by-doing-assets/kavita-menon-mentor-avatar.png",
    "mentor-kavita-menon",
    { quality: 90, alphaQuality: 100 },
  ],
  // Section 5 ships its OWN portrait of the same mentor: a cleaner vector
  // drawing on a cream disc, rendered larger there than section 4's is. Two
  // files rather than one reused, because they are genuinely two artworks.
  [
    "5 lurnycampus-guidance-at-every-step-assets/kavita-menon-vector-avatar.png",
    "mentor-kavita-menon-vector",
    { quality: 90, alphaQuality: 100 },
  ],
];

(async () => {
  for (const [src, name, opts] of ASSETS) {
    const out = `public/assets/images/campus/${name}.webp`;

    await sharp(`designs/lurnycampus/${src}`)
      .webp({ effort: 6, ...opts })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }
})();
