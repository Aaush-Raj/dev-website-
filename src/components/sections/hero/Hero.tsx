"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { HeroSlide } from "@/components/sections/hero/HeroSlide";
import { Container } from "@/components/ui/Container";
import { heroSlides } from "@/content/hero";
import { cn } from "@/lib/utils";

/**
 * HERO
 * ---------------------------------------------------------------------------
 * The homepage's opening section, as an auto-advancing carousel.
 *
 * Each slide is a two-column composition — copy on the left, a scene on the
 * right — rendered by HeroSlide. This component owns only the rotation: which
 * slide is showing, when to advance, and the controls.
 *
 * WHY SLIDES ARE STACKED RATHER THAN SWAPPED
 * All three are in the DOM, one per grid cell, so the container is always as
 * tall as the tallest — see the height note below. Only the active one is
 * visible; the rest are `inert`, so they are out of the tab order and hidden
 * from assistive technology, and their entrances do not run.
 *
 * `active` is passed down so a slide animates its contents only while showing.
 * That keeps each entrance REPLAYING as it becomes active, which is what makes
 * the rotation feel authored rather than a crossfade of stills.
 *
 * THE HEIGHT IS THE TALLEST SLIDE'S, HELD BY THE GRID
 * Slides differ in height — slides 2 and 3 run four headline lines and carry
 * panels, and by how much varies with the viewport (measured: the tallest is
 * ~47rem at 1024px but ~40rem at 1440px and up). Left to flow, the section
 * jumps on every advance and shoves the page below it.
 *
 * A fixed min-height cannot solve that: any single value is too small at some
 * widths and wastes space at others. Instead EVERY slide occupies the same
 * single-cell grid area, so the container is always as tall as the tallest one
 * at the current width, and the inactive slides are simply invisible.
 *
 * The inactive ones are `aria-hidden` with `pointer-events-none` and are taken
 * out of the tab order, so stacking them costs nothing in accessibility — see
 * the note on focus below.
 *
 * PAUSING
 * The timer stops on hover, on focus within, and whenever the tab is hidden —
 * a carousel advancing in a background tab is wasted work, and one advancing
 * under the reader's cursor is hostile. Under `prefers-reduced-motion` it does
 * not auto-advance at all; the controls still work, so nothing is unreachable.
 *
 * ACCESSIBILITY
 * The region is a labelled group with `aria-roledescription="carousel"`, and
 * the live region announces the slide only when the user drives it — an
 * auto-advance that announces itself would interrupt a screen reader mid-
 * sentence every few seconds.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

/** How long each slide holds, in ms. */
const INTERVAL = 6000;

export function Hero() {
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /** True when the last change came from a control rather than the timer. */
  const [userDriven, setUserDriven] = useState(false);

  const count = heroSlides.length;

  const goTo = useCallback((next: number, fromUser = true) => {
    setIndex(((next % count) + count) % count);
    setUserDriven(fromUser);
  }, [count]);

  /* --------------------------- Auto-advance ----------------------- */
  /* The interval advances via the functional setter, so it never needs the
     current index and the effect restarts only when the timer itself should
     stop or start. */
  useEffect(() => {
    // No rotation for a single slide, while paused, or under reduced motion.
    if (reduce || paused || count < 2) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
      setUserDriven(false);
    }, INTERVAL);

    return () => window.clearInterval(id);
  }, [reduce, paused, count]);

  /* ------------------- Pause in a hidden tab ---------------------- */
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const slide = heroSlides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Lurny highlights"
      className={cn(
        "relative overflow-hidden",
        /*
          Padding clear of the floating nav pill, which overlays the page rather
          than sitting above it — the header cancels its own flow space (see
          Header.tsx), so this section starts at y=0 and this padding is the
          only thing keeping content out from under the pill.
        */
        "pt-[8.5rem] lg:pt-[10rem]",
        "pb-section",
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        // Only resume once focus has actually left the section — moving
        // between two controls inside it fires blur too.
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
    >
      {/* ============================ Backdrop ======================= */}
      {/*
        The slide's photograph, filling the WHOLE section — in both designs the
        room runs edge to edge with the copy over it, rather than sitting in a
        card in the right column.

        It crossfades with the slide rather than cutting, so the rooms dissolve
        into one another instead of flashing. A scrim over the left keeps the
        copy legible against whatever the photograph does behind it.
      */}
      <AnimatePresence mode="sync">
        {slide.backdrop && (
          <motion.div
            key={`${slide.id}-backdrop`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-20"
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: easeOut }}
          >
            <Image
              src={slide.backdrop.src}
              alt={slide.backdrop.alt}
              width={slide.backdrop.width}
              height={slide.backdrop.height}
              priority
              sizes="100vw"
              className="size-full object-cover"
              style={{ objectPosition: slide.backdrop.focus }}
            />

            {/* From lg up the copy sits on the LEFT, so the scrim is a
                diagonal wash strongest there, clearing before the panels. */}
            <span
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(100deg, rgb(253 248 238 / 0.97) 0%, rgb(253 248 238 / 0.92) 26%, rgb(253 248 238 / 0.55) 44%, rgb(253 248 238 / 0.1) 60%, transparent 72%)",
              }}
            />

            {/* Below lg the copy spans the full width and stacks ABOVE the
                panels, so a diagonal wash leaves the description over the
                subject's face. A vertical scrim covers the copy's band and
                releases lower down, where the photograph can show. */}
            <span
              className="absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(180deg, rgb(253 248 238 / 0.97) 0%, rgb(253 248 238 / 0.95) 38%, rgb(253 248 238 / 0.8) 55%, rgb(253 248 238 / 0.55) 70%, rgb(253 248 238 / 0.4) 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Warm amber glow, bottom-left. Sampled from the design, where the page
          background lifts to a soft peach in that corner. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-1/4 -left-[15%] -z-10",
          "size-[52rem] rounded-full opacity-90 blur-[100px]",
          "bg-[radial-gradient(circle,var(--accent-200)_0%,var(--accent-100)_38%,transparent_72%)]",
        )}
      />

      {/* Faint violet wash on the right, behind the composition. */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 -right-[10%] -z-10",
          "size-[40rem] rounded-full opacity-45 blur-[120px]",
          "bg-[radial-gradient(circle,var(--brand-200)_0%,transparent_70%)]",
        )}
      />

      {/* ============================= Slides ======================== */}
      {/* One grid cell shared by every slide, so the container holds the
          tallest at the current width — see the note at the top. */}
      <div className="grid grid-cols-1 grid-rows-1">
        {heroSlides.map((item, slideIndex) => {
          const active = slideIndex === index;

          return (
            <motion.div
              key={item.id}
              // Every slide occupies the same cell.
              className={cn(
                "col-start-1 row-start-1",
                !active && "pointer-events-none",
              )}
              animate={{ opacity: active ? 1 : 0 }}
              initial={false}
              transition={{ duration: reduce ? 0 : 0.5, ease: easeOut }}
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} of ${count}`}
              // An invisible slide must not be reachable: `inert` removes it
              // from the tab order AND from assistive technology, so a keyboard
              // user is never stranded on a control they cannot see.
              //
              // Applied via a ref rather than as a prop: passing it through
              // motion's props did not reach the DOM, which left the hidden
              // slides focusable. Setting the property directly always works.
              ref={(node) => {
                if (node) node.inert = !active;
              }}
            >
              <HeroSlide slide={item} active={active} />
            </motion.div>
          );
        })}
      </div>

      {/* ============================ Controls ======================= */}
      {count > 1 && (
        <Container width="hero" className="relative mt-10 lg:mt-4">
          <div className="flex items-center gap-3">
            {heroSlides.map((item, slideIndex) => {
              const active = slideIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(slideIndex)}
                  aria-label={`Show slide ${slideIndex + 1}: ${item.headline.join(" ")}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group relative h-11 cursor-pointer",
                    // A generous hit area around a thin visual bar: the bar is
                    // 3px tall, which is far below a comfortable target.
                    active ? "w-16" : "w-8",
                    "duration-normal transition-[width] ease-out",
                    "focus-visible:outline-none",
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2",
                      "overflow-hidden rounded-full",
                      active ? "bg-brand-200" : "bg-neutral-300",
                      "duration-normal transition-colors",
                      "group-hover:bg-brand-300",
                      "group-focus-visible:ring-2 group-focus-visible:ring-brand-500/50",
                      "group-focus-visible:ring-offset-2",
                    )}
                  >
                    {/* The active bar fills over the slide's own duration, so
                        the control doubles as the progress indicator. It is
                        keyed on the index so it restarts on every advance. */}
                    {active && !reduce && (
                      <motion.span
                        key={index}
                        className="block h-full origin-left rounded-full bg-brand-600"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{
                          duration: paused ? 0 : INTERVAL / 1000,
                          ease: "linear",
                        }}
                      />
                    )}

                    {/* With reduced motion or while paused there is no timer to
                        show, so the active bar is simply filled. */}
                    {active && (reduce || paused) && (
                      <span className="block h-full rounded-full bg-brand-600" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Announces the slide ONLY when the user drove the change — see the
              note at the top of this file. */}
          <p aria-live="polite" className="sr-only">
            {userDriven ? `Slide ${index + 1} of ${count}` : ""}
          </p>
        </Container>
      )}
    </section>
  );
}
