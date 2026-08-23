"use client";

import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * MAGIC STARFIELD
 * ---------------------------------------------------------------------------
 * The drifting particle layer over the hero's wave background — the "galaxy
 * passing by" the design suggests.
 *
 * WHY NOT CANVAS
 * A canvas starfield means a requestAnimationFrame loop running for as long as
 * the section is on screen, burning battery to animate decoration. These are
 * plain elements moved by CSS keyframes instead, which the compositor handles
 * off the main thread and pauses when the tab is hidden.
 *
 * RESTRAINT
 * Three things keep this from reading as a screensaver:
 *   - Few particles, and small. The wave image already carries the drama; this
 *     only needs to make it feel alive.
 *   - Slow. Nothing completes a pass in under half a minute, so motion is felt
 *     at the edge of vision rather than watched.
 *   - Varied. Uniform speed and spacing is what makes a starfield look cheap,
 *     so each particle gets its own duration, delay, size and drift.
 *
 * The positions are a fixed table rather than Math.random(): random values
 * differ between the server render and the client, which React reports as a
 * hydration mismatch, and re-randomising on every mount would make the layout
 * unreproducible.
 *
 * Under `prefers-reduced-motion` the drift stops entirely and the particles
 * become a still field — this is ambient decoration, and continuous motion is
 * exactly what that setting is asking us not to do.
 */

interface Particle {
  /** Percentage across and down the layer. */
  left: number;
  top: number;
  /** Pixels. */
  size: number;
  /** Seconds. */
  duration: number;
  delay: number;
  /** How far it drifts, in percent of the layer. */
  drift: number;
  opacity: number;
  /** Amber particles pick up the wave's warm streak; the rest are violet. */
  warm?: boolean;
}

/**
 * Hand-placed so they cluster loosely along the wave's diagonal rather than
 * spreading evenly, which is what makes a field read as depth instead of
 * wallpaper.
 */
const particles: Particle[] = [
  { left: 8, top: 72, size: 2, duration: 44, delay: 0, drift: 6, opacity: 0.5 },
  {
    left: 14,
    top: 30,
    size: 1,
    duration: 58,
    delay: 6,
    drift: 4,
    opacity: 0.35,
  },
  {
    left: 22,
    top: 84,
    size: 2,
    duration: 39,
    delay: 3,
    drift: 7,
    opacity: 0.45,
    warm: true,
  },
  {
    left: 31,
    top: 58,
    size: 1,
    duration: 62,
    delay: 11,
    drift: 5,
    opacity: 0.3,
  },
  {
    left: 38,
    top: 22,
    size: 2,
    duration: 47,
    delay: 8,
    drift: 6,
    opacity: 0.4,
  },
  {
    left: 44,
    top: 76,
    size: 3,
    duration: 36,
    delay: 1,
    drift: 8,
    opacity: 0.55,
    warm: true,
  },
  {
    left: 52,
    top: 44,
    size: 1,
    duration: 66,
    delay: 14,
    drift: 4,
    opacity: 0.3,
  },
  {
    left: 58,
    top: 88,
    size: 2,
    duration: 41,
    delay: 5,
    drift: 7,
    opacity: 0.45,
  },
  {
    left: 64,
    top: 16,
    size: 1,
    duration: 55,
    delay: 9,
    drift: 5,
    opacity: 0.35,
  },
  {
    left: 71,
    top: 62,
    size: 2,
    duration: 49,
    delay: 2,
    drift: 6,
    opacity: 0.5,
    warm: true,
  },
  {
    left: 78,
    top: 34,
    size: 1,
    duration: 60,
    delay: 12,
    drift: 4,
    opacity: 0.3,
  },
  {
    left: 84,
    top: 70,
    size: 2,
    duration: 43,
    delay: 7,
    drift: 7,
    opacity: 0.45,
  },
  {
    left: 90,
    top: 24,
    size: 3,
    duration: 38,
    delay: 4,
    drift: 8,
    opacity: 0.5,
  },
  {
    left: 95,
    top: 52,
    size: 1,
    duration: 64,
    delay: 10,
    drift: 5,
    opacity: 0.35,
    warm: true,
  },
];

export function MagicStarfield({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {particles.map((particle, index) => (
        <span
          key={index}
          className={cn(
            "absolute rounded-full",
            particle.warm ? "bg-accent-300" : "bg-brand-200",
            !reduce && "animate-magic-drift",
          )}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px currentColor`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `-${particle.delay}s`,
            // Read by the keyframes, so each particle drifts its own distance.
            ["--magic-drift" as string]: `${particle.drift}%`,
          }}
        />
      ))}
    </div>
  );
}
