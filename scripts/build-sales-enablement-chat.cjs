/**
 * SALES ENABLEMENT — "APPLY WITH LURNYCHAT" ASSETS (section 4)
 * ---------------------------------------------------------------------------
 *   node scripts/build-sales-enablement-chat.cjs
 *
 * Two rasters ship out of the pack's twenty-six.
 *
 *   backgrounds/slate_background_reconstructed -> chat-backdrop
 *   images/seller_avatar                       -> seller-avatar
 *
 * WHY SO LITTLE OF THE PACK IS USED
 * The pack's own README settles it: "The complete chat panel and component
 * graphics include embedded interface text. Main section copy and CTA text are
 * excluded. Icons are not transparent."
 *
 * So every graphics/*.png — the whole panel, the customer message, the
 * assistant response, the chips, the input — carries its copy baked in as
 * pixels. Shipping them would make the panel's text unselectable,
 * untranslatable, invisible to a screen reader and soft at any scale it is not
 * drawn at natively. The panel is rebuilt in markup instead (see
 * SalesChat.tsx), which is also what lets it animate and reflow.
 *
 * The icons/ set is ruled out by the same README line: they are opaque, so
 * each would land as a small slate rectangle on top of the panel rather than a
 * glyph. They are redrawn as inline SVG in SalesChatIcons.
 *
 * images/plant_and_books_reconstructed is NOT converted either: it is already
 * part of the reconstructed background, in the same position. Layering it
 * again would only double an image that is not missing.
 *
 * THE BACKDROP
 * A large, slow slate gradient with faint contour work and a soft desk edge —
 * exactly what WebP bands worst. Hence quality 90 rather than the usual 80:
 * banding across a flat dark field is the most visible failure this section
 * could ship, and the contours are the only structure in the asset.
 *
 * THE AVATAR
 * An 84x83 opaque square with rounded corners painted in. The panel draws it
 * as a circle, so it is masked to one here with a feathered edge — cropping to
 * a circle in CSS alone would leave the painted corners' grey inside the ring.
 */

const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(
  ROOT,
  "designs/solutions sales enablement/Lurny_Sales_Enablement_Chat_Assets",
);
const OUT = path.join(ROOT, "public/images/solutions/sales-enablement");

/** Cut just inside the traced edge, and feather it, so no painted corner
 *  survives on the rim. */
const INSET = 1.5;
const FEATHER = 1.5;

async function buildAvatar() {
  const src = path.join(SRC, "images/seller_avatar.png");
  const { width, height } = await sharp(src).metadata();

  // Square it off the shorter side, so the circle is centred on the face.
  const size = Math.min(width, height);
  const { data, info } = await sharp(src)
    .extract({
      left: Math.round((width - size) / 2),
      top: Math.round((height - size) / 2),
      width: size,
      height: size,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Paint the circular alpha directly, so the edge is antialiased rather than
  // stepped the way a hard SVG clip would leave it.
  const r = size / 2;
  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const d = Math.hypot(x + 0.5 - r, y + 0.5 - r);
      const edge = r - INSET;
      const a = d <= edge - FEATHER ? 1 : d >= edge ? 0 : (edge - d) / FEATHER;
      data[(y * info.width + x) * info.channels + 3] = Math.round(a * 255);
    }
  }

  const out = path.join(OUT, "seller-avatar.webp");
  const res = await sharp(data, { raw: info })
    // 2x the ~42px it draws at, so it stays sharp on a retina display.
    .resize({ width: size * 2, kernel: "lanczos3" })
    .webp({ effort: 6, quality: 92, alphaQuality: 100 })
    .toFile(out);
  console.log(`seller-avatar.webp  ${res.width}x${res.height}  ${(res.size / 1024) | 0} kB`);
}

(async () => {
  const out = path.join(OUT, "chat-backdrop.webp");
  const info = await sharp(
    path.join(SRC, "backgrounds/slate_background_reconstructed.png"),
  )
    .webp({ effort: 6, quality: 90 })
    .toFile(out);
  console.log(`chat-backdrop.webp  ${info.width}x${info.height}  ${(info.size / 1024) | 0} kB`);

  await buildAvatar();
})();
