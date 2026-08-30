/**
 * BUILD: Guides & Playbooks imagery
 * ---------------------------------------------------------------------------
 * Writes the hero layers and the section-2 task artwork as WebP into
 * public/assets/images/guides.
 *
 *   node scripts/build-guides-hero.cjs
 *
 * The renders that arrive on a baked-in transparency checkerboard are keyed by
 * scripts/lib/key-checkerboard.cjs — see that file for why this is more than a
 * brightness threshold.
 *
 * Re-run this if the design team ships new art.
 */
const sharp = require("sharp");

const { keyCheckerboard } = require("./lib/key-checkerboard.cjs");

const SRC = "designs/resources_guides and playbooks/";
const OUT = "public/assets/images/guides/";

/**
 * Section 2's task artwork: a clipboard render per task in the navigator.
 *
 * MISSING: task 01 (Competency Framework Quality Test). No standalone render
 * was supplied — it appears only inside the section-1 hero cluster, where the
 * playbook in front occludes its right half, and in the section-3 thumbnail
 * strip at 204px wide. Neither can stand in at this size, so the section falls
 * back to a typeset panel for that task. See GuidesNavigator.
 */
const TASKS = [
  ["2/ChatGPT Image Aug 28, 2026, 12_28_54 AM (1).png", "task-checklist"],
  ["2/ChatGPT Image Aug 28, 2026, 12_28_54 AM (2).png", "task-pilot-guide"],
  ["2/section2img.png", "task-action-plan"],
];

/**
 * Task 01's cover, recovered from the section-1 hero cluster.
 *
 * No standalone render was supplied for the Competency Framework Quality Test.
 * It does appear in the hero cluster though, and everything the panel needs is
 * visible there — title, readiness gauge, needle, indicator dots and the ruled
 * block. Only the cover's right MARGIN is hidden behind the playbook in front,
 * and that margin carries nothing.
 *
 * So it is cropped out of the keyed cluster rather than redrawn. The cluster
 * is first rotated 11 degrees, which stands this particular cover upright —
 * it leans in the render, and cropping it as-is leaves the title reading at an
 * angle while the other three tasks' artwork is square to the frame. The
 * window then stops at the cover's own right edge, just short of the playbook
 * lying over it.
 */
const TASK_ONE_ROTATE = 11;
const TASK_ONE_CROP = { left: 95, top: 140, width: 240, height: 670 };

(async () => {
  // ------------------------------------------------------------ hero bg1
  // The backdrop: dark ground, cream disc, faint line art. Opaque by nature,
  // so it is only resized and converted.
  await sharp(SRC + "1/bg1.png")
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(OUT + "hero-backdrop.webp");

  let m = await sharp(OUT + "hero-backdrop.webp").metadata();
  console.log(`wrote hero-backdrop.webp ${m.width}x${m.height}`);

  // ------------------------------------------------------------ hero bg2
  const cluster = await keyCheckerboard(SRC + "1/bg2.png", {
    log: console.log,
  });
  await cluster
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(OUT + "hero-cluster.webp");

  m = await sharp(OUT + "hero-cluster.webp").metadata();
  console.log(
    `wrote hero-cluster.webp ${m.width}x${m.height} alpha:${m.hasAlpha}`,
  );

  // -------------------------------------------------------- section 2
  // 900 wide is roughly twice the ~430 CSS px the panel gets at our widest
  // container, so these stay sharp on a 2x display without shipping more.
  // Task 01, cropped from the hero cluster — see TASK_ONE_CROP.
  const heroKeyed = await keyCheckerboard(SRC + "1/bg2.png", { log: () => {} });
  const straightened = await heroKeyed
    .rotate(TASK_ONE_ROTATE, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  await sharp(straightened)
    .extract(TASK_ONE_CROP)
    .trim({ threshold: 1 })
    .resize({ width: 640, withoutEnlargement: true })
    .webp({ quality: 88, alphaQuality: 100, effort: 6 })
    .toFile(OUT + "task-quality-test.webp");

  m = await sharp(OUT + "task-quality-test.webp").metadata();
  console.log(
    `wrote task-quality-test.webp ${m.width}x${m.height} alpha:${m.hasAlpha}`,
  );

  for (const [src, name] of TASKS) {
    const keyed = await keyCheckerboard(SRC + src, { log: () => {} });
    await keyed
      .resize({ width: 900, withoutEnlargement: true })
      .webp({ quality: 86, alphaQuality: 100, effort: 6 })
      .toFile(`${OUT}${name}.webp`);

    m = await sharp(`${OUT}${name}.webp`).metadata();
    console.log(
      `wrote ${name}.webp ${m.width}x${m.height} alpha:${m.hasAlpha}`,
    );
  }
})();
