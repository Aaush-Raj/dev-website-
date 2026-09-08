"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { salesEnablement } from "@/content/sales-enablement";
import { cn } from "@/lib/utils";

/**
 * SALES ENABLEMENT — PREPARE WITH LURNYMAGIC
 * ---------------------------------------------------------------------------
 * The statement on the left, the seller's lavender scene on the right with the
 * four learning cards floating over it.
 *
 * THE CARDS SHIP AS IMAGES — THE OPPOSITE CALL TO EVERY OTHER SECTION HERE
 * The hero's engine cards and the reality section's moment cards are markup,
 * because those crops are ~250-400px with soft baked text. These four are not:
 * they are 1402x1122 and 1536x1024, cleanly alpha-cut, and each is drawn in 3D
 * PERSPECTIVE, tilted on two axes with matching shadows. Rebuilding that in
 * CSS would be a lossy imitation of artwork that already exists at the right
 * resolution, and the pack's README asks for exactly this split: "Card copy
 * stays embedded; main webpage headings, paragraphs and CTA text are excluded."
 *
 * Because the copy IS the pixels, each card carries a real `alt` — that is the
 * only route by which its content reaches a screen reader.
 *
 * NOTHING IS COMPOSITED
 * The supplied background already carries the seller, the handwritten notes and
 * the curved arrow, so the cards simply sit over it.
 *
 * The cards are positioned in percentages of the scene so the arrangement holds
 * at every width. Below lg they leave the scene and become a plain grid: at
 * phone width, four overlapping perspective cards are unreadable.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { magic } = salesEnablement;

/**
 * Where each card sits over the scene, as percentages of it. Measured from the
 * design, in the order the content file lists them.
 */
const CARD_SLOTS = [
  "left-[-3%] top-[-1%] w-[29%]",
  "left-[24%] top-[6%] w-[33%]",
  "left-[11%] top-[36%] w-[33%]",
  "left-[4%] top-[62%] w-[32%]",
] as const;

/** Accent per tone, sampled from the design. */
const TONES = {
  violet: "bg-[#ede4fb] text-[#6b0ec6]",
  teal: "bg-[#dcf1ec] text-[#1c8a76]",
  amber: "bg-[#fdeecf] text-[#c07f05]",
} as const;

/** The glyph beside each point. */
const pointIcons = {
  document: DocumentIcon,
  bubble: BubbleIcon,
  check: CheckIcon,
} as const;

export function SalesMagic() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      // The lavender the scene sits on, sampled from the design so the two
      // meet without a seam.
      className="relative isolate overflow-hidden bg-[#f5efff] py-section-lg lg:py-0"
    >
      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1fr)] lg:gap-8",
            "xl:gap-12",
          )}
        >
          {/* =========================== Statement ==================== */}
          <div className="lg:py-section-lg">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.2em] text-[#6b0ec6] sm:text-xs",
              )}
            >
              {magic.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                // Serif, as the design sets it.
                "mt-5 font-serif font-bold tracking-[-0.01em]",
                "leading-[1.1] text-[#0b061d]",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
              )}
            >
              {magic.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[28rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#423c57] sm:text-[1rem]",
              )}
            >
              {magic.description}
            </motion.p>

            {/* --------------------------- Points -------------------- */}
            <motion.ul {...rise(0.24)} className="mt-8 space-y-4">
              {magic.points.map((point) => {
                const Icon = pointIcons[point.icon];

                return (
                  <li key={point.label} className="flex items-center gap-4">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-full",
                        TONES[point.tone],
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[0.9375rem] leading-snug text-pretty text-[#1d1832] sm:text-base">
                      {point.label}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            {/* --------------------------- Action -------------------- */}
            <motion.div {...rise(0.32)} className="mt-9">
              <Link
                href={magic.action.href}
                className={cn(
                  "group/cta inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-6",
                  "bg-[#6c0fcd] text-[0.9375rem] font-semibold text-white",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#5c0bb0]",
                  "hover:shadow-[0_16px_36px_-12px_rgb(108_15_205/0.5)]",
                  "active:translate-y-0",
                )}
              >
                {magic.action.label}
                <ArrowIcon
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover/cta:translate-x-1",
                  )}
                />
              </Link>
            </motion.div>
          </div>

          {/* ============================ Scene ======================= */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
            className={cn(
              "relative",
              // Runs to the viewport's right edge, as the design frames it —
              // the scene's own right edge is part of the composition.
              "lg:-mr-[7vw] xl:-mr-[5vw]",
            )}
          >
            {/* Its own 1.5:1, uncropped: the seller sits at the plate's right
                edge and the handwriting at its left, so any tighter crop loses
                one or the other. The width, not a crop, is what makes it fill
                the column — see the full-bleed offset above. */}
            <div className="relative aspect-[1.5]">
              <Image
                src={magic.scene.src}
                alt={magic.scene.alt}
                width={magic.scene.width}
                height={magic.scene.height}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="size-full object-cover object-center"
              />

              {/* ---------------------- Cards ------------------- */}
              {/* Over the scene from lg up; below that they become the grid
                  further down, where four overlapping perspective cards would
                  be unreadable. */}
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                {magic.cards.map((card, index) => (
                  <motion.div
                    key={card.src}
                    initial={
                      reduce
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 14, scale: 0.97 }
                    }
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: "some" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.35 + index * 0.13,
                      ease: easeOut,
                    }}
                    className={cn("absolute", CARD_SLOTS[index])}
                  >
                    <Image
                      src={card.src}
                      alt={card.alt}
                      width={card.width}
                      height={card.height}
                      sizes="(min-width: 1024px) 26vw, 50vw"
                      className="h-auto w-full"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ------------------------ Cards, stacked ------------------- */}
        {/* The small-screen home for the same four cards. They keep their
            perspective — it is baked into the artwork — but no longer overlap,
            so each stays readable. */}
        <ul className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
          {magic.cards.map((card) => (
            <li key={card.src}>
              <Image
                src={card.src}
                alt={card.alt}
                width={card.width}
                height={card.height}
                sizes="45vw"
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/*  Icons                                                                     */
/* ========================================================================== */

/** Brief sellers on what matters. */
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 3h7l5 5v13H6V3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M12.8 3.3v5.2h5.2M9 12.6h6M9 16.2h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Build confidence with objections. */
function BubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4c4.6 0 8.3 2.9 8.3 6.5S16.6 17 12 17c-.9 0-1.8-.1-2.6-.3l-4.2 2 1.2-3.5C4.6 14 3.7 12.4 3.7 10.5 3.7 6.9 7.4 4 12 4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Check understanding before the conversation. */
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.8" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m8 12.2 2.8 2.8L16 9.6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The arrow on the action. */
function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden="true">
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
