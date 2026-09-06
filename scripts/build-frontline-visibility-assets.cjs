/**
 * BUILD: Frontline "managers and leaders" section assets (section 7)
 * ---------------------------------------------------------------------------
 *   node scripts/build-frontline-visibility-assets.cjs
 *
 * Four rasters ship out of the folder's fifteen.
 *
 *   01-dark-grid-background     -> visibility-bg   the dark ground + grid
 *   07-coaching-priorities      -> three avatars   the illustrated portraits
 *
 * WHY THE REST IS LEFT BEHIND
 * 02 through 08 are flat crops of the SAME leadership dashboard — the KPI
 * strip, the location heatmap, the capability bars, the trend chart, the
 * coaching panel, the missed-opportunity panel. Every one bakes its numbers
 * and labels into pixels: unselectable, unsearchable, blurry when scaled,
 * impossible to translate and unable to animate. They are rebuilt in markup
 * (see FrontlineVisibility.tsx), which is what lets the heatmap, the bars and
 * the trend line be driven by the figures in content/frontline.ts. 09-12 are
 * the four list icons, redrawn as SVG in FrontlineIcons for the same reason.
 *
 * THE AVATARS ARE NOT TAKEN FROM 13/14/15-*-avatar.png
 * Those three files LOOK like the intended cut-outs but are effectively empty:
 * each one's alpha channel averages 2/255, so re-encoding them yields blank
 * squares and the coaching panel renders with three holes. (The same defect
 * affects 08-ananya-profile.png in the section-4 folder — see
 * build-frontline-pulse-assets.cjs.) The portraits are therefore lifted out of
 * 07-coaching-priorities-panel, where they are intact.
 *
 * They are upscaled 3x on the way out: the source discs are 52px and they
 * render at ~34px, which a 1x asset would leave soft on a retina display.
 * Lanczos keeps the illustrated edges clean rather than smearing them.
 *
 * THE BACKGROUND
 * A near-black ground with a faint grid and a soft violet bloom — a large
 * smooth gradient with very low-contrast structure, which is precisely what
 * WebP bands worst. Hence quality 90 rather than the usual 80: banding across
 * a dark flat field is the most visible failure this page could ship.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/FrontlinePerformancePage/managers-leaders-visibility-assets/";
const OUT_DIR = "public/images/solutions/frontline/";

/** The coaching panel is 300x305; each disc is 52px at this x, on these rows. */
const PANEL = "07-coaching-priorities-panel.png";
const DISC = { left: 26, size: 52 };
const AVATARS = [
  ["ananya", 88],
  ["rahul", 145],
  ["maya", 203],
];

(async () => {
  const bg = `${OUT_DIR}visibility-bg.webp`;
  const bgInfo = await sharp(SRC_DIR + "01-dark-grid-background.png")
    .webp({ effort: 6, quality: 90 })
    .toFile(bg);
  console.log(
    `${bg}  ${bgInfo.width}x${bgInfo.height}  ${(bgInfo.size / 1024) | 0} kB`,
  );

  for (const [name, cy] of AVATARS) {
    const out = `${OUT_DIR}coach-${name}.webp`;
    const info = await sharp(SRC_DIR + PANEL)
      .extract({
        left: DISC.left,
        top: cy - DISC.size / 2,
        width: DISC.size,
        height: DISC.size,
      })
      .resize({ width: DISC.size * 3, kernel: "lanczos3" })
      .webp({ effort: 6, quality: 90 })
      .toFile(out);
    console.log(
      `${out}  ${info.width}x${info.height}  ${(info.size / 1024) | 0} kB`,
    );
  }
})();
