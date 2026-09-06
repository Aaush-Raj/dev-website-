/**
 * BUILD: Frontline "Pulse — capability intelligence" section assets (section 4)
 * ---------------------------------------------------------------------------
 *   node scripts/build-frontline-pulse-assets.cjs
 *
 * Two rasters ship. The supplied folder carries eleven.
 *
 *   01-pulse-section-background -> pulse-bg       the blush wash + line work
 *   08-ananya-profile           -> ananya-avatar  the one real photograph
 *
 * WHY THE REST IS LEFT BEHIND
 * 02/03/04/05/06/07 are flat crops of the SAME composite — the Pulse console,
 * the radar, the priority card, the evidence list, the challenge dialog. Every
 * one is imitation product UI with its labels baked into pixels: unselectable,
 * unsearchable, blurry when scaled and impossible to translate. They are
 * rebuilt in markup instead (see FrontlinePulse.tsx), which is also what lets
 * them animate and reflow. 09/10/11 are the three list icons, redrawn as SVG
 * in FrontlineIcons for the same reason.
 *
 * 12-decorative-foliage is NOT a clean cutout: it is a rectangular crop of the
 * composite that carries a slice of the evidence card and both handwritten
 * notes baked in, on an opaque background. Dropping it in would duplicate UI
 * that markup already draws, so the handwritten notes are set as text instead.
 *
 * THE BACKGROUND
 * A near-white ground with a wide blush field and hairline contours over it —
 * a big smooth gradient with fine low-contrast detail, which is the case WebP
 * bands worst. Hence quality 90 rather than the usual 80: the contour lines
 * are the only structure in the asset, and banding across the blush is exactly
 * what would be noticed on a section this empty.
 *
 * THE AVATAR IS NOT TAKEN FROM 08-ananya-profile.png
 * That file LOOKS like the intended cut-out but is fully transparent: its
 * alpha channel averages 1/255, so re-encoding it produces a 282-byte empty
 * square and the console renders with a blank disc. The portrait is therefore
 * lifted out of 03-role-readiness-dashboard, where it is intact, and masked
 * into a circle here.
 *
 * The mask is cut a hair INSIDE the traced disc and feathered, so none of the
 * card's grey ring survives on the edge — the failure mode a plain square
 * crop gives once the markup rounds it.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/FrontlinePerformancePage/pulse-diagnose-readiness-assets/";
const OUT_DIR = "public/images/solutions/frontline/";

/** The avatar disc inside 03-role-readiness-dashboard, in source pixels. */
const AVATAR = { cx: 243, cy: 187, r: 40 };

/** Cut just inside the traced edge, and feather it, so no grey rim survives. */
const INSET = 1.5;
const FEATHER = 1.5;

async function buildAvatar() {
  const { cx, cy, r } = AVATAR;
  const size = r * 2;

  const { data, info } = await sharp(SRC_DIR + "03-role-readiness-dashboard.png")
    .extract({ left: cx - r, top: cy - r, width: size, height: size })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Paint the circular alpha directly, so the edge is antialiased rather than
  // stepped the way a hard SVG-clip composite would leave it.
  const { channels } = info;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const d = Math.hypot(x + 0.5 - r, y + 0.5 - r);
      const edge = r - INSET;
      const a =
        d <= edge - FEATHER
          ? 1
          : d >= edge
            ? 0
            : (edge - d) / FEATHER;
      data[(y * info.width + x) * channels + 3] = Math.round(a * 255);
    }
  }

  const out = `${OUT_DIR}ananya-avatar.webp`;
  const res = await sharp(data, { raw: info })
    .webp({ effort: 6, quality: 92, alphaQuality: 100 })
    .toFile(out);
  console.log(`${out}  ${res.width}x${res.height}  ${(res.size / 1024) | 0} kB`);
}

(async () => {
  const out = `${OUT_DIR}pulse-bg.webp`;
  const info = await sharp(SRC_DIR + "01-pulse-section-background.png")
    .webp({ effort: 6, quality: 90 })
    .toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024) | 0} kB`);

  await buildAvatar();
})();
