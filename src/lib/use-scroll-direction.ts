"use client";

import { useEffect, useRef, useState } from "react";

/**
 * USE SCROLL DIRECTION
 * ---------------------------------------------------------------------------
 * Tracks whether a sticky header should currently be shown, using the
 * "directional hide" pattern common across SaaS marketing sites: the header
 * retreats as you scroll down into content and returns the moment you scroll
 * back up.
 *
 * The rules below are what separate this from a naive
 * `lastY > y ? show : hide`, which flickers badly in practice:
 *
 *  - REVEAL ZONE. Above `revealAt` the header is always shown. Hiding a
 *    header in the first screenful reads as a rendering bug, and there is no
 *    content being obscured yet to justify it.
 *
 *  - SEPARATE THRESHOLDS. Scrolling up shows the header after a small
 *    movement; scrolling down hides it only after a larger one. Reaching for
 *    the nav should be rewarded immediately, while a glance down should not
 *    cost you the header. Symmetric thresholds feel twitchy.
 *
 *  - ACCUMULATED TRAVEL. Distance is summed across consecutive frames in the
 *    same direction rather than compared frame to frame, so trackpad inertia
 *    and sub-pixel jitter cannot trip a state change. The accumulator resets
 *    whenever direction reverses.
 *
 *  - BOUNCE GUARD. Overscroll at either end of the document (rubber-banding
 *    on macOS and iOS) reports scroll deltas that are not real navigation.
 *    Positions past either end are clamped out.
 *
 * Reads are batched into a rAF callback, so a burst of scroll events costs one
 * measurement per frame rather than one per event. The scroll listener itself
 * is passive, so it never blocks scrolling.
 *
 * @param revealAt Pixels from the top within which the header always shows.
 * @param hideAfter Downward travel required to hide.
 * @param showAfter Upward travel required to show.
 */
export function useScrollDirection({
  revealAt = 96,
  hideAfter = 12,
  showAfter = 8,
}: {
  revealAt?: number;
  hideAfter?: number;
  showAfter?: number;
} = {}) {
  const [isVisible, setIsVisible] = useState(true);
  /** True once past `revealAt` — callers use it to deepen the shadow. */
  const [isScrolled, setIsScrolled] = useState(false);

  const lastY = useRef(0);
  /** Signed travel since the last direction change. */
  const travel = useRef(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    // Initialise from the current position so a restored scroll offset (a
    // reload partway down the page) does not register as one huge jump.
    lastY.current = window.scrollY;

    const measure = () => {
      frame.current = null;

      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      // Clamp away rubber-band overscroll at both ends.
      const y = Math.max(0, Math.min(window.scrollY, Math.max(maxY, 0)));
      const delta = y - lastY.current;
      lastY.current = y;

      setIsScrolled(y > revealAt);

      // Always visible in the reveal zone, and the accumulator is reset so
      // leaving the zone starts from a clean slate.
      if (y <= revealAt) {
        travel.current = 0;
        setIsVisible(true);
        return;
      }

      // Direction reversed — start accumulating afresh.
      if (delta !== 0 && Math.sign(delta) !== Math.sign(travel.current)) {
        travel.current = 0;
      }
      travel.current += delta;

      if (travel.current > hideAfter) {
        setIsVisible(false);
        travel.current = 0;
      } else if (travel.current < -showAfter) {
        setIsVisible(true);
        travel.current = 0;
      }
    };

    const onScroll = () => {
      // Coalesce bursts of events into one read per frame.
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(measure);
      }
    };

    // Run once so a restored position renders the correct resting state.
    measure();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [revealAt, hideAfter, showAfter]);

  return { isVisible, isScrolled };
}
