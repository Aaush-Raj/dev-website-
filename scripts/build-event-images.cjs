/**
 * BUILD: Webinars & Events page imagery
 * ---------------------------------------------------------------------------
 * Converts the supplied event renders to WebP into
 * public/assets/images/events.
 *
 *   node scripts/build-event-images.cjs
 *
 * WHY THIS EXISTS
 * Unlike the Resources covers, these renders are OPAQUE photographic scenes,
 * not cutouts — so there is no alpha to preserve and nothing to trim: the
 * whole frame is the artwork, and trimming would crop the set dressing the
 * composition depends on. They are only converted and resized.
 *
 * Width is capped at 1600: the featured image occupies at most half a
 * 1440-wide panel, so ~720 CSS px, and 1600 covers that at 2x with room to
 * spare. The source is larger than it can ever be displayed.
 *
 * Re-run this if the design team ships new artwork.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/Resources_Webinars and events/Webinars_Events_Landing_Page_Images/Cleaned_High_Resolution/";
const OUT_DIR = "public/assets/images/events/";

/** The section-1 hero artwork. Kept at its own proportions. */
const FEATURED = [
  ["01_featured_from_roles_to_readiness.png", "featured-roles-to-readiness"],
];

/**
 * The section-2 card thumbnails.
 *
 * Cropped to a common 4:3, which is the ratio the design draws them at and
 * the ratio six of the seven sources already are. card7 arrives 16:9, so
 * without this it would be the one short thumbnail in an otherwise even grid.
 * `cover` + `attention` crops toward the busiest region rather than the
 * geometric centre, which on these renders is the subject.
 *
 * 800 wide is twice the ~244 CSS px a card gets in a 3-up grid at our widest
 * container, so they stay sharp on a 2x display without shipping more.
 */
const CARDS = Array.from({ length: 7 }, (_, i) => [
  `card${i + 1}.png`,
  `card-${i + 1}`,
]);

(async () => {
  for (const [src, name] of FEATURED) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height} alpha:${m.hasAlpha}`);
  }

  for (const [src, name] of CARDS) {
    const out = `${OUT_DIR}${name}.webp`;

    await sharp(SRC_DIR + src)
      .resize({
        width: 800,
        height: 600,
        fit: "cover",
        position: sharp.strategy.attention,
      })
      .webp({ quality: 82, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height}`);
  }
})();
