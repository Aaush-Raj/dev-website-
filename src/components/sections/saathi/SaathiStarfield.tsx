import { cn } from "@/lib/utils";

/**
 * SAATHI STARFIELD
 * ---------------------------------------------------------------------------
 * The field of stars behind the LurnySaathi hero.
 *
 * It replaces five soft 2-3px radial gradients that stood in for the original
 * photo's bokeh. Those read as blurry circles rather than stars: too large, too
 * few, and evenly spread across the whole section.
 *
 * WHAT MAKES A POINT READ AS A STAR
 *   - Small and HARD. A star is a point of light, so the core is a 1-2px dot at
 *     full opacity with a crisp edge. The glow is a separate box-shadow around
 *     it. A single soft gradient gives you a smudge; a hard core inside a soft
 *     halo gives you a star.
 *   - Mostly faint. Real fields are dominated by dim stars with a handful of
 *     bright ones. A field of uniformly bright points looks like confetti.
 *   - Clustered, not spread. These sit denser toward the hero's violet bloom
 *     and thin out toward the copy, which is what reads as depth — and it keeps
 *     them off the headline where they would only be noise.
 *   - Twinkling out of step. Each sets its own duration and delay, so no two
 *     brighten together.
 *
 * The four brightest also carry a cross-flare — two hairline strokes through
 * the core, the diffraction spike a camera gives a bright point. Used sparingly
 * it is what sells the rest of the field as stars.
 *
 * WHY NOT CANVAS
 * A canvas field means a requestAnimationFrame loop burning battery to animate
 * decoration. These are plain elements driven by CSS keyframes, which the
 * compositor handles off the main thread and pauses when the tab is hidden.
 * Same reasoning as MagicStarfield — see that file.
 *
 * Positions are a fixed table rather than Math.random(): random values differ
 * between the server and client renders, which React reports as a hydration
 * mismatch.
 *
 * Under `prefers-reduced-motion` the twinkle stops and the field becomes still.
 * That is enforced in CSS rather than through useReducedMotion, so this file
 * needs no "use client" — see the note in MagicStarfield for why the hook does
 * not work for a component with no other state.
 */

interface Star {
  /** Percentage across and down the layer. */
  left: number;
  top: number;
  /** Core diameter in pixels. Most are 1; a few are 2. */
  size: number;
  /** Peak opacity — what the twinkle brightens to. */
  peak: number;
  /** Seconds. */
  duration: number;
  delay: number;
  /** Draws the diffraction spikes. Reserved for the brightest few. */
  flare?: boolean;
  /** Warm stars pick up the section's coral; the rest are violet-white. */
  warm?: boolean;
}

/**
 * Hand-placed. Denser on the right, around and behind the phone where the
 * violet bloom sits, thinning toward the left so the headline stays clean.
 */
const stars: Star[] = [
  // --- The bright few, with flares -------------------------------------
  {
    left: 63,
    top: 18,
    size: 2,
    peak: 0.95,
    duration: 4.4,
    delay: 0,
    flare: true,
  },
  {
    left: 88,
    top: 31,
    size: 2,
    peak: 0.9,
    duration: 5.2,
    delay: 1.6,
    flare: true,
  },
  {
    left: 74,
    top: 72,
    size: 2,
    peak: 0.85,
    duration: 4.8,
    delay: 3.1,
    flare: true,
  },
  {
    left: 55,
    top: 52,
    size: 2,
    peak: 0.8,
    duration: 6.1,
    delay: 2.2,
    flare: true,
    warm: true,
  },

  // --- Mid-brightness ---------------------------------------------------
  { left: 69, top: 8, size: 2, peak: 0.7, duration: 5.5, delay: 0.8 },
  { left: 81, top: 14, size: 1, peak: 0.75, duration: 4.2, delay: 2.6 },
  { left: 92, top: 47, size: 2, peak: 0.65, duration: 6.4, delay: 1.1 },
  { left: 58, top: 34, size: 1, peak: 0.7, duration: 5.1, delay: 3.6 },
  { left: 84, top: 62, size: 1, peak: 0.68, duration: 4.6, delay: 0.4 },
  {
    left: 66,
    top: 88,
    size: 2,
    peak: 0.6,
    duration: 5.8,
    delay: 2.9,
    warm: true,
  },
  { left: 95, top: 22, size: 1, peak: 0.72, duration: 4.9, delay: 1.9 },
  { left: 51, top: 12, size: 1, peak: 0.6, duration: 6.7, delay: 0.2 },
  { left: 78, top: 41, size: 1, peak: 0.66, duration: 5.3, delay: 4.2 },
  { left: 89, top: 78, size: 1, peak: 0.58, duration: 4.4, delay: 2.4 },

  // --- The faint majority ----------------------------------------------
  { left: 47, top: 26, size: 1, peak: 0.4, duration: 6.2, delay: 1.3 },
  { left: 61, top: 44, size: 1, peak: 0.45, duration: 5.6, delay: 3.3 },
  { left: 72, top: 28, size: 1, peak: 0.42, duration: 7.1, delay: 0.6 },
  { left: 86, top: 8, size: 1, peak: 0.38, duration: 5.9, delay: 2.1 },
  { left: 97, top: 63, size: 1, peak: 0.44, duration: 4.7, delay: 3.8 },
  { left: 54, top: 68, size: 1, peak: 0.36, duration: 6.6, delay: 1.5 },
  { left: 76, top: 56, size: 1, peak: 0.48, duration: 5.4, delay: 4.6 },
  { left: 91, top: 38, size: 1, peak: 0.4, duration: 6.9, delay: 0.9 },
  { left: 64, top: 62, size: 1, peak: 0.34, duration: 5.2, delay: 2.7 },
  { left: 83, top: 88, size: 1, peak: 0.42, duration: 4.5, delay: 1.2 },
  { left: 44, top: 48, size: 1, peak: 0.3, duration: 7.4, delay: 3.5 },
  { left: 70, top: 96, size: 1, peak: 0.32, duration: 6.1, delay: 0.3 },
  { left: 99, top: 84, size: 1, peak: 0.38, duration: 5.7, delay: 2.8 },
  { left: 57, top: 82, size: 1, peak: 0.3, duration: 6.8, delay: 4.1 },
  { left: 80, top: 20, size: 1, peak: 0.46, duration: 4.3, delay: 3.0 },
  { left: 94, top: 54, size: 1, peak: 0.35, duration: 7.2, delay: 1.7 },
  { left: 49, top: 88, size: 1, peak: 0.28, duration: 5.5, delay: 2.3 },
  { left: 67, top: 36, size: 1, peak: 0.4, duration: 6.3, delay: 4.4 },
  { left: 87, top: 70, size: 1, peak: 0.33, duration: 5.0, delay: 0.7 },
  { left: 60, top: 24, size: 1, peak: 0.36, duration: 6.5, delay: 3.9 },
  { left: 41, top: 66, size: 1, peak: 0.26, duration: 7.6, delay: 1.4 },
  { left: 75, top: 12, size: 1, peak: 0.44, duration: 4.8, delay: 2.5 },
];

/** Violet-white, or the section's coral for the warm few. */
const coreColor = (warm?: boolean) => (warm ? "#ffd9d2" : "#f3ecff");
const glowColor = (warm?: boolean) =>
  warm ? "rgb(247 140 120 / 0.55)" : "rgb(196 181 253 / 0.55)";

export function SaathiStarfield({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {stars.map((star, index) => (
        <span
          key={index}
          className={cn(
            "absolute rounded-full",
            // The twinkle. Dropped outright under reduced motion, leaving a
            // still field at each star's own peak opacity.
            "animate-saathi-twinkle motion-reduce:animate-none",
          )}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: coreColor(star.warm),
            // The halo. Two shadows — a tight one for the bloom right at the
            // core, a wide faint one for the air around it.
            boxShadow: `0 0 ${star.size * 2}px ${star.size * 0.5}px ${glowColor(star.warm)}, 0 0 ${star.size * 6}px ${star.size * 1.5}px ${glowColor(star.warm).replace("0.55", "0.25")}`,
            opacity: star.peak,
            // Read by the keyframe — see globals.css.
            ["--twinkle-peak" as string]: star.peak,
            ["--twinkle-duration" as string]: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        >
          {/* The diffraction spikes on the brightest few. Two hairline
              gradients crossing at the core, fading to nothing at the tips so
              they read as flare rather than as drawn lines. */}
          {star.flare && (
            <>
              <span
                className="absolute top-1/2 left-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: `linear-gradient(90deg, transparent, ${glowColor(star.warm)}, transparent)`,
                }}
              />
              <span
                className="absolute top-1/2 left-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: `linear-gradient(180deg, transparent, ${glowColor(star.warm)}, transparent)`,
                }}
              />
            </>
          )}
        </span>
      ))}
    </div>
  );
}
