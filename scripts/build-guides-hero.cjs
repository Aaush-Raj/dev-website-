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
 * Only THREE renders were supplied for the four tasks, so one task ends up
 * without artwork — task 04, since the clipboard whose sheet reads "30-Day
 * Action Plan" is used as task 01's (see below). GuidesNavigator drops the
 * artwork column for a task with no image rather than holding an empty box.
 */
const TASKS = [
  /*
   * section2img.png is the clipboard the design shows in the middle of this
   * section, so it is task 01's — the state the section loads with.
   *
   * Its printed sheet reads "30-Day Capability Framework Action Plan" while
   * task 01's panel is the Competency Framework Quality Test, so the artwork
   * and the copy disagree. That is how the asset was supplied and where it was
   * asked to go; a Quality Test clipboard would replace it here.
   */
  ["2/section2img.png", "clipboard-action-plan"],
  ["2/ChatGPT Image Aug 28, 2026, 12_28_54 AM (1).png", "task-checklist"],
  ["2/ChatGPT Image Aug 28, 2026, 12_28_54 AM (2).png", "task-pilot-guide"],
];

/**
 * Section 3's library thumbnails — one per resource.
 *
 * These need no keying: unlike the section 1-2 renders, they arrive already on
 * the section's near-black ground with their own rounded border drawn in, and
 * there is no checkerboard to remove. They are only converted to WebP.
 *
 * They are also SMALL (204px wide) and shipped at their native size, because
 * that is roughly the size the design draws them at. Upscaling would only blur
 * them; the CSS box is capped to match.
 */
const LIBRARY = [
  ["3/01-from-roles-to-readiness.png", "library-playbook"],
  ["3/02-competency-framework-quality-test.png", "library-diagnostic"],
  ["3/03-ai-era-learning-readiness-checklist.png", "library-checklist"],
  ["3/04-conversation-intelligence-pilot-guide.png", "library-pilot-guide"],
  ["3/05-30-day-capability-framework-action-plan.png", "library-action-plan"],
];

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

  // -------------------------------------------------------- section 3
  for (const [src, name] of LIBRARY) {
    const out = `${OUT}${name}.webp`;

    await sharp(SRC + src)
      .webp({ quality: 90, effort: 6 })
      .toFile(out);

    m = await sharp(out).metadata();
    console.log(`wrote ${name}.webp ${m.width}x${m.height}`);
  }
})();
