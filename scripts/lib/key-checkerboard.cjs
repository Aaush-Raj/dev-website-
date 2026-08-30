/**
 * SHARED: key a baked-in transparency checkerboard
 * ---------------------------------------------------------------------------
 * Several of the supplied guides renders arrive showing their subject over the
 * conventional "transparent here" checkerboard — but rendered as flat pixels,
 * with no alpha channel at all. Composited as delivered they paint grey checks
 * rather than letting the page through, so the pattern has to be removed and a
 * real alpha channel built.
 *
 * The key is deliberately conservative. The checker is two near-whites and the
 * artwork's own paper runs nearly as light, so a plain "drop everything bright"
 * threshold eats the pages themselves. A pixel is cut only where it is BOTH
 * very light AND almost perfectly neutral, which the warm paper stock never is.
 *
 * The result is flood-filled from the edges, so a near-neutral highlight
 * enclosed by artwork stays opaque: only background connected to the frame is
 * removed. A per-pixel test alone punches holes through white covers.
 *
 * Finally the edge is eroded. The checker was composited UNDER an anti-aliased
 * render whose drop shadow was baked in too, so boundary pixels are blends —
 * greyer and darker than the checker, passing neither test, and surviving as a
 * sawtooth halo that is glaring on a dark ground.
 */
const sharp = require("sharp");

/** Cut only pixels this light AND this close to neutral grey. */
const LIGHT = 232;
const NEUTRAL_SPREAD = 6;

/** Edge erosion: looser, since these pixels are known-adjacent to background. */
const FRINGE_LIGHT = 150;
const FRINGE_SPREAD = 30;
const FRINGE_PASSES = 4;

/**
 * Returns a sharp instance for `file` with the checkerboard keyed to
 * transparent and the empty margin trimmed away.
 */
async function keyCheckerboard(file, { log = () => {} } = {}) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;

  // Mark every pixel that COULD be background: light and near-neutral.
  const candidate = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) {
    const i = p * C;
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (min >= LIGHT && max - min <= NEUTRAL_SPREAD) candidate[p] = 1;
  }

  // Keep only candidates reachable from the frame edge. Iterative stack rather
  // than recursion: at this size a recursive fill overflows.
  const bg = new Uint8Array(W * H);
  const stack = [];
  for (let x = 0; x < W; x++) stack.push(x, x + (H - 1) * W);
  for (let y = 0; y < H; y++) stack.push(y * W, W - 1 + y * W);
  while (stack.length) {
    const p = stack.pop();
    if (bg[p] || !candidate[p]) continue;
    bg[p] = 1;
    const x = p % W;
    const y = (p / W) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < W - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - W);
    if (y < H - 1) stack.push(p + W);
  }
  for (let p = 0; p < W * H; p++) if (bg[p]) data[p * C + 3] = 0;

  // Erode the anti-aliased edge and the baked drop shadow.
  for (let pass = 0; pass < FRINGE_PASSES; pass++) {
    const clear = [];
    for (let p = 0; p < W * H; p++) {
      if (data[p * C + 3] === 0) continue;
      const x = p % W;
      const y = (p / W) | 0;
      const touches =
        (x > 0 && data[(p - 1) * C + 3] === 0) ||
        (x < W - 1 && data[(p + 1) * C + 3] === 0) ||
        (y > 0 && data[(p - W) * C + 3] === 0) ||
        (y < H - 1 && data[(p + W) * C + 3] === 0);
      if (!touches) continue;
      const i = p * C;
      const max = Math.max(data[i], data[i + 1], data[i + 2]);
      const min = Math.min(data[i], data[i + 1], data[i + 2]);
      if (min >= FRINGE_LIGHT && max - min <= FRINGE_SPREAD) clear.push(p);
    }
    for (const p of clear) data[p * C + 3] = 0;
    log(`  fringe pass ${pass + 1}: cleared ${clear.length} px`);
  }

  const cut = bg.reduce((a, v) => a + v, 0);
  log(`  keyed ${((cut / (W * H)) * 100).toFixed(1)}% to transparent`);

  // Trim the margin the key leaves, so the subject's box is the subject itself
  // and CSS can position it predictably.
  return sharp(data, { raw: { width: W, height: H, channels: C } }).trim({
    threshold: 1,
  });
}

module.exports = { keyCheckerboard };
