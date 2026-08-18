"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * REVEAL
 * ---------------------------------------------------------------------------
 * Scroll-triggered entrance animation. Wrap any block that should fade/slide
 * into view as the user scrolls.
 *
 * Two details worth keeping:
 *
 *  - `once: true` — the animation plays a single time. Re-animating on every
 *    scroll-past is distracting and makes a page feel unfinished.
 *
 *  - useReducedMotion() — when the OS requests reduced motion we render the
 *    content statically rather than animating it. The CSS media query in
 *    globals.css cannot reach JS-driven animation, so this check is required.
 *
 * This is the only "use client" component in the UI layer; everything else
 * stays a Server Component and ships zero JavaScript.
 */

const directionOffsets = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
} as const;

interface RevealProps {
  children: ReactNode;
  /** Direction the content travels FROM. Defaults to "up". */
  direction?: keyof typeof directionOffsets;
  /** Seconds to wait before starting — stagger siblings with this. */
  delay?: number;
  /** Seconds the animation runs for. */
  duration?: number;
  className?: string;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const offset = directionOffsets[direction];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        // Matches --ease-out in tokens/effects.css.
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
