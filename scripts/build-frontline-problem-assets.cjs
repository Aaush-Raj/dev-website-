/**
 * BUILD: Frontline "performance problem" section assets (section 2)
 * ---------------------------------------------------------------------------
 *   node scripts/build-frontline-problem-assets.cjs
 *
 * Two rasters, and only two. The supplied folder also carries a composite of
 * the three signal cards and PNG icons for each of them — none of that ships.
 * Those cards are UI carrying readable text, so they are rebuilt in markup
 * (see FrontlineProblem.tsx): sharp at any density, translatable, animatable.
 *
 *   01-dark-section-background -> problem-bg     the section's dark wash
 *   02-customer-interaction    -> problem-scene  the branch-counter illustration
 *
 * Both are dark, low-frequency gradients — the case WebP bands worst — so the
 * quality stays high rather than at the usual 80.
 *
 * THE SCENE IS NOT CROPPED
 * Its left ~40% is near-black empty room, which is deliberate: the section
 * places it full-bleed against the right edge and lets that empty side fade
 * into the section ground. Trimming it would leave a hard vertical seam.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/FrontlinePerformancePage/frontline-performance-problem-assets/";
const OUT_DIR = "public/images/solutions/frontline/";

const ASSETS = [
  ["01-dark-section-background.png", "problem-bg", { quality: 88 }],
  ["02-customer-interaction-illustration.png", "problem-scene", { quality: 88 }],
];

(async () => {
  for (const [src, name, opts] of ASSETS) {
    const out = `${OUT_DIR}${name}.webp`;
    const info = await sharp(SRC_DIR + src)
      .webp({ effort: 6, ...opts })
      .toFile(out);
    console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024) | 0} kB`);
  }
})();
