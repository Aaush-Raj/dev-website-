/**
 * BUILD: Resources "webinars & demonstrations" artwork
 * ---------------------------------------------------------------------------
 * Converts the three supplied session images to WebP into
 * public/assets/images/resources.
 *
 *   node scripts/build-webinar-assets.cjs
 *
 * All three are opaque and need no keying or cropping — this only converts the
 * format. They arrive at different aspects (1.60 for the live-session still,
 * 1.78 for the two recordings), which is why the section sizes them by their
 * own box rather than forcing a shared ratio.
 *
 * Re-run this if the design team ships new session art.
 */
const sharp = require("sharp");

const SRC_DIR =
  "designs/elurny website resources landing section/lurny_resources_section7_assets/";
const OUT_DIR = "public/assets/images/resources/";

/** Source file → output name. */
const ART = [
  ["live_webinar_book_microphone.png", "session-live"],
  ["ai_native_learning_devices.png", "session-ai-native"],
  ["conversation_intelligence_scene.png", "session-conversation"],
];

(async () => {
  for (const [src, name] of ART) {
    const out = `${OUT_DIR}${name}.webp`;

    // No alphaQuality: these carry no transparency, so it would be ignored.
    // 84 holds the dark gradients without the banding a lower setting brings
    // out in the large near-black areas.
    await sharp(SRC_DIR + src)
      .webp({ quality: 84, effort: 6 })
      .toFile(out);

    const m = await sharp(out).metadata();
    console.log(`wrote ${out} ${m.width}x${m.height}`);
  }
})();
