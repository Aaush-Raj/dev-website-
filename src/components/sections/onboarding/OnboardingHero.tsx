"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { onboarding } from "@/content/onboarding";
import { cn } from "@/lib/utils";

/**
 * ONBOARDING HERO
 * ---------------------------------------------------------------------------
 * Section 1: the statement on the left over the scene's lavender wash, the two
 * starting points on cards over the office to the right.
 *
 * THE SCENE IS THE SECTION'S GROUND, NOT AN INSET PICTURE
 * The supplied plate is the full-bleed background: its left third is a lavender
 * wash the copy sits on, and its right two-thirds are the office. So it fills
 * the section rather than occupying a column, and the copy overlays it.
 *
 * WHY THE CARDS ARE MARKUP
 * The pack ships them alpha-cut, so they COULD be layered without seaming —
 * but each is 362x260 with its copy baked in as pixels, soft at this size and
 * unreadable to a screen reader. Only the scene ships as a raster; see
 * scripts/build-onboarding-hero.cjs.
 *
 * The scene already carries the handwritten note and the dashed connectors
 * that run up to the two cards, so nothing else is drawn here.
 *
 * THE ENTRANCE
 * The copy cascades line by line, resolving out of a slight blur, and the two
 * cards then rise in turn — left, then right — so the pair reads as two
 * answers arriving rather than one block appearing. All of it is gated on
 * `useReducedMotion`.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = onboarding;

/** The glyph in each card's header. */
const cardIcons = {
  person: PersonIcon,
  people: PeopleIcon,
} as const;

/**
 * Where each card sits over the scene, as percentages of it, and when it
 * arrives. Measured from the design.
 */
const CARD_SLOTS = [
  { slot: "left-[46.5%] top-[41.5%] w-[25%]", delay: 0.75 },
  { slot: "left-[74%] top-[41.5%] w-[25%]", delay: 0.95 },
] as const;

export function OnboardingHero() {
  const reduce = useReducedMotion();

  /**
   * The statement's lines, each a little after the last. Blur is part of it —
   * a few pixels resolving as the line arrives is what makes the entrance read
   * as smooth rather than merely delayed.
   */
  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
      shown: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.85, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // The wash at the plate's left edge, so the section continues it
        // wherever the scene does not reach.
        "bg-[#f2eefd]",
        // Below lg the copy leads and the scene follows it; from lg up the
        // copy overlays the scene instead.
        "flex flex-col lg:block",
      )}
    >
      {/* ============================== Scene ======================== */}
      {/* In flow, at its own aspect: it IS the section's ground, and the copy
          sits in the lavender wash on its left. */}
      <Image
        src={hero.scene.src}
        alt={hero.scene.alt}
        width={hero.scene.width}
        height={hero.scene.height}
        // Above the fold and the visual subject, so it must not lazy-load —
        // this is the LCP candidate on the page.
        priority
        sizes="100vw"
        className="order-2 h-auto w-full lg:order-none"
      />

      {/* ------------------------- The two cards ------------------- */}
      {/* Positioned over the scene from lg up. Below that they leave it and
          stack under the copy — at phone width they would cover the faces and
          each other.

          They sit inside the SAME Container as the copy, not against the
          viewport. Positioned against the viewport they drifted left as the
          screen grew — the copy is held by the container's max width while the
          cards were not — until the headline ran under the first card at wide
          sizes. Sharing the container keeps the gap between them constant. */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <Container width="hero" className="@container relative h-full">
          <div
            className="relative h-full"
            // Scales the cards with the container, so they hold their designed
            // proportion at every width.
            style={{ fontSize: "max(10px, 1.28cqw)" }}
          >
            {hero.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={
                  reduce
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : { opacity: 0, y: 26, scale: 0.94, filter: "blur(8px)" }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                viewport={{ once: true, amount: "some" }}
                transition={{
                  duration: 0.9,
                  delay: CARD_SLOTS[index].delay,
                  ease: easeOut,
                }}
                className={cn("absolute", CARD_SLOTS[index].slot)}
              >
                <StartingPoint card={card} />
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* =============================== Copy ======================== */}
      {/* Overlays the scene from lg up, where the plate's left third is the
          empty wash the design puts it on. Below that it is in flow above the
          scene — see the wrapper's ordering. */}
      <div className="order-1 lg:absolute lg:inset-0 lg:order-none">
        <Container width="hero" className="flex h-full flex-col justify-center">
          <div
            className={cn(
              // Held to the wash's own width, so the copy never runs onto the
              // office behind it.
              "max-w-[34rem] pt-28 pb-14 sm:pt-32 sm:pb-16 lg:max-w-[42%] lg:py-0",
            )}
          >
            <motion.p
              {...rise(0.05)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-[#5919ca] sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.16)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.04] text-[#05050b]",
                "text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.5rem]",
              )}
            >
              {hero.headline.lead.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}

              {/* The design switches to violet for the second sentence. */}
              {hero.headline.accent.map((line) => (
                <span key={line} className="inline text-[#5919ca] lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.3)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#101030]/80 sm:text-[1rem]",
                "xl:text-[1.0625rem]",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions ------------------- */}
            <motion.div
              {...rise(0.42)}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group/cta inline-flex h-13 items-center justify-center gap-2.5 rounded-xl px-7",
                  "bg-[#5919ca] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#4a12ab]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(89_25_202/0.5)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>

              {/* A plain link, as the design draws it — not a second button
                  competing with the primary. */}
              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "group/link inline-flex items-center gap-2.5",
                  "text-[0.9375rem] font-semibold text-[#440cba]",
                  "duration-normal transition-colors ease-out",
                  "hover:text-[#5919ca]",
                )}
              >
                {hero.actions.secondary.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/link:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>

            {/* ------------------------ Powered by ------------------ */}
            <motion.div {...rise(0.54)} className="mt-10 lg:mt-14">
              <p className="text-[0.8125rem] text-[#615e84]">
                {hero.poweredBy.label}
              </p>

              {/* One wrapping line rather than a flex row of items: with the
                  separators as flex children, a wrap left a stray dot stranded
                  at the start or end of a line. Inline, a break simply falls
                  between two names. */}
              <p className="mt-2 text-[0.9375rem] font-semibold text-[#05051e]">
                {hero.poweredBy.engines.map((engine, index) => (
                  <span key={engine}>
                    {index > 0 && (
                      <span aria-hidden="true" className="text-[#a29fbb]">
                        {" \u00b7 "}
                      </span>
                    )}
                    {engine}
                  </span>
                ))}
              </p>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* --------------------- The cards, stacked ------------------ */}
      {/* The small-screen home for the same two cards. They cannot overlay the
          scene at this width without covering the faces. */}
      <Container width="hero" className="order-3 pb-14 lg:hidden">
        <ul className="grid gap-4 text-[13px] sm:grid-cols-2">
          {hero.cards.map((card) => (
            <li key={card.title}>
              <StartingPoint card={card} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/**
 * One starting point. Shared by the overlaid and the stacked layouts, so the
 * two cannot drift apart.
 *
 * Sized in `em` so it scales with whichever context sets the font size.
 */
function StartingPoint({ card }: { card: (typeof hero.cards)[number] }) {
  const Icon = cardIcons[card.icon];

  return (
    <div
      className={cn(
        "rounded-[1.1em] bg-white p-[1.3em]",
        "shadow-[0_20px_46px_-18px_rgb(30_15_60/0.3)]",
        "ring-1 ring-[#ece8f7]",
      )}
    >
      <div className="flex items-center gap-[0.85em]">
        <span
          className={cn(
            "flex size-[2.6em] shrink-0 items-center justify-center",
            "rounded-[0.7em] bg-[#efe9fd]",
          )}
        >
          <Icon className="size-[1.4em] text-[#3c0fb9]" />
        </span>

        <span className="min-w-0">
          <span className="block text-[1.15em] font-bold tracking-[-0.01em] text-[#02020e]">
            {card.title}
          </span>
          <span className="mt-[0.1em] block text-[0.95em] text-[#5c5d82]">
            {card.role}
          </span>
        </span>
      </div>

      <ul className="mt-[1.1em] space-y-[0.75em]">
        {card.items.map((item) => (
          <li key={item} className="flex items-center gap-[0.8em]">
            <CheckIcon className="size-[1.35em] shrink-0 text-[#5a1ed1]" />
            <span className="text-[0.98em] text-[#272858]">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** New to the role — one person. */
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="7.6"
        r="3.6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.8 20c0-3.8 3.3-6 7.2-6s7.2 2.2 7.2 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Bringing prior experience — a person joining others. */
function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9.4" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.4 19.6c0-3.4 2.8-5.4 6-5.4s6 2 6 5.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16.6 5.6a3.2 3.2 0 0 1 0 6.1M17.8 14.6c1.9.6 3.2 2 3.2 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The tick beside each item. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path
        d="m7 12.3 3.3 3.3L17 8.8"
        stroke="#fff"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on both actions. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 8h9m0 0-3.4-3.4M12 8l-3.4 3.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
