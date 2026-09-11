/**
 * KNOWLEDGE MANAGEMENT SECTION ASSETS
 * ---------------------------------------------------------------------------
 * Converts the two rasters the hero genuinely needs: the room scene, and the
 * illustration inside the LurnyMagic card.
 *
 * WHY THE TWO CARDS ARE NOT SHIPPED WHOLE
 * The pack ships them alpha-cut, so they COULD be layered without seaming. They
 * are still rebuilt in markup because each is ~350px wide with its copy baked
 * in as pixels — soft at the size the hero draws them, and unselectable,
 * untranslatable and invisible to a screen reader. See KnowledgeHero.
 *
 * WHAT IS EXTRACTED INSTEAD
 * The LurnyMagic card's centre panel — a drawing of documents becoming a
 * lesson — is genuinely pictorial and cannot be rebuilt as markup, so it is
 * cropped out of that card and shipped on its own. Everything around it (the
 * engine header, the "Microlesson" chip, the caption) is text and is built.
 *
 * The LurnyChat card has no such panel: it is entirely text and ticks.
 *
 * WHAT THE BACKGROUND ALREADY CARRIES
 * The room, the man, the wall art, the desk props, the pastel blobs, and the
 * handwritten "The right answer. Right when you need it." note WITH its arrow
 * curving down to where the LurnyChat card sits. So nothing is composited —
 * the cards are positioned to land on the point that arrow indicates.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/solutions knowledge management assets/1 knowledge-management-hero-assets",
);
const OUT = path.join(ROOT, "public/images/solutions/knowledge-management");

/**
 * The LurnyMagic illustration's bounds inside its card, found by scanning for
 * the tinted panel between the header and the caption.
 */
const PANEL = { left: 12, top: 67, width: 319, height: 124 };

/**
 * The "explained" section's night office.
 *
 * Same split as the hero: the plate carries the room, the man and the
 * handwritten "Knowledge, put to work." note, but NOT the three RAG cards or
 * the strip beneath them — those are UI carrying readable text and are built
 * in markup. The pack also ships them as one flattened 691x415 PNG, which is
 * deliberately unused.
 */
const EXPLAINED_SRC = path.join(
  ROOT,
  "designs/solutions knowledge management assets/2 knowledge-management-explained-assets",
);

async function main() {
  const scene = path.join(OUT, "hero-scene.webp");

  await sharp(path.join(SRC, "03-man-room-background.png"))
    // A photographic scene with broad pastel washes, where a lower quality
    // would band across the flat areas.
    .webp({ quality: 92 })
    .toFile(scene);

  let meta = await sharp(scene).metadata();
  console.log(`hero-scene.webp  ${meta.width}x${meta.height}`);

  const explained = path.join(OUT, "explained-scene.webp");

  await sharp(path.join(EXPLAINED_SRC, "02-man-office-background.png"))
    // A dark scene with wide, smooth night gradients — the one place banding
    // would be most visible.
    .webp({ quality: 93 })
    .toFile(explained);

  meta = await sharp(explained).metadata();
  console.log(`explained-scene.webp  ${meta.width}x${meta.height}`);

  /**
   * The chat section's slate ground.
   *
   * It carries the abstract shapes AND the handwritten "An answer you can
   * follow." note with its arrow — but no panels. The pack ships those
   * separately (519x727 and 355x517) with their copy baked in as pixels; both
   * are deliberately unused and rebuilt in markup instead.
   */
  const chat = path.join(OUT, "chat-scene.webp");

  await sharp(
    path.join(
      ROOT,
      "designs/solutions knowledge management assets/3 knowledge-management-chat-assets",
      "03-slate-background-annotation.png",
    ),
  )
    // Flat slate with wide, soft shapes — the kind of image where banding
    // would be most visible.
    .webp({ quality: 93 })
    .toFile(chat);

  meta = await sharp(chat).metadata();
  console.log(`chat-scene.webp  ${meta.width}x${meta.height}`);

  /**
   * The chat+magic section's geometric ground, and its document stack.
   *
   * The stack is the one crop on this page shipped WHOLE rather than rebuilt:
   * it is a 3D-perspective drawing of three tilted documents with soft
   * shadows, a handwritten note, and the two connector arrows that run to the
   * cards — none of which is text, and none of which CSS would reproduce
   * faithfully. The two cards beside it are text and are built in markup.
   *
   * Its arrows terminate in a teal dot at 96.4%/4.2% and a coral dot at
   * 97.4%/83.2% of its own box. Those are where the two cards attach, so the
   * section positions them from those points rather than guessing.
   */
  const MAGIC_SRC = path.join(
    ROOT,
    "designs/solutions knowledge management assets/4 knowledge-management-chat-magic-assets",
  );

  for (const [from, to, quality] of [
    ["04-geometric-background.png", "chatmagic-scene.webp", 93],
    ["03-document-stack-and-arrows.png", "chatmagic-stack.webp", 95],
  ]) {
    const file = path.join(OUT, to);

    await sharp(path.join(MAGIC_SRC, from)).webp({ quality }).toFile(file);

    meta = await sharp(file).metadata();
    console.log(`${to}  ${meta.width}x${meta.height}`);
  }

  const panel = path.join(OUT, "magic-illustration.webp");

  await sharp(path.join(SRC, "02-lurnymagic-card.png"))
    .extract(PANEL)
    .webp({ quality: 94 })
    .toFile(panel);

  meta = await sharp(panel).metadata();
  console.log(`magic-illustration.webp  ${meta.width}x${meta.height}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
