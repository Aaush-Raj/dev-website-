"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

/**
 * PROBLEM SECTION
 * ---------------------------------------------------------------------------
 * The "the problem <product> solves" section: a statement on the left, four
 * numbered problems on the right, on the warm off-white ground.
 *
 * Shared by the LurnyPitch, LurnyPulse, LurnyChat, LurnyMagic and LurnySaathi
 * pages, whose designs for this section are identical apart from the copy. Pass
 * a `ProblemContent` object; every product page that needs this layout gets the
 * same structure, rules and entrance without a second copy of the markup.
 *
 * LurnySaathi's design adds two things the others do not have — a pastel
 * gradient ground and a journey diagram under the statement. Both are opt-in
 * (`tinted`, `aside`), so the four existing pages render exactly as before.
 *
 * LAYOUT
 * On lg the statement is sticky. Its column is much shorter than the list
 * beside it, so without that it would scroll away and leave the numbered items
 * without their framing — the statement is what they are all answering. The
 * offset clears the floating nav pill, which can reappear at any scroll
 * position now that the header hides directionally.
 *
 * The list is an <ol>: the numerals are content rather than decoration, and
 * the order is meaningful. They come from the data rather than a CSS counter
 * so they are real text for a screen reader and for copy-paste.
 *
 * The rules are top borders on each item plus one closing border on the list,
 * which is what the design shows — a rule above every item and below the last.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export interface ProblemContent {
  eyebrow: string;
  /** One entry per line, as the design breaks them on lg+. */
  headline: readonly string[];
  description: string;
  /**
   * An optional closing line under the description, whose tail is set in the
   * brand violet — LurnySaathi's "The employee is left to connect the dots."
   * Split so only the emphasised half is coloured.
   */
  kicker?: { readonly lead: string; readonly emphasis: string };
  items: readonly { readonly title: string; readonly description: string }[];
}

interface ProblemSectionProps {
  content: ProblemContent;
  /**
   * Hold each authored headline line on one line at xl.
   *
   * Only needed where a line is long enough to wrap at that size and turn the
   * design's line count into one more — LurnyPitch's "conversations stay
   * invisible," does; LurnyPulse's shorter lines do not, and forcing it there
   * would only risk overflow. Off by default, so a page opts in when its own
   * copy needs it.
   */
  nowrapHeadline?: boolean;
  /**
   * Rendered under the statement, below the kicker — LurnySaathi puts its
   * Know → Learn → Practise → Perform → Improve journey diagram there. Left
   * out, the statement column ends at the copy as on the other four pages.
   */
  aside?: ReactNode;
  /**
   * Swap the flat off-white ground for the pastel wash LurnySaathi's design
   * uses: violet, pink and peach bleeding in from the corners. Off by default,
   * so the pages already using this section are untouched.
   */
  tinted?: boolean;
  /**
   * Override the statement/list column split on lg+.
   *
   * Defaults to the 1.12fr the first four designs measure. LurnySaathi's
   * headline has a longer first line and needs more room, or it wraps to four
   * lines where the design shows three.
   */
  columns?: string;
  /**
   * Override the xl headline size. Defaults to the ~52px the first four
   * designs measure. LurnySaathi's longest line is wider than that size fits
   * in its column, so its design sets the type smaller relative to the column
   * — passing a smaller size here is what keeps its three authored lines as
   * three lines.
   */
  headlineSize?: string;
  className?: string;
}

export function ProblemSection({
  content,
  nowrapHeadline = false,
  aside,
  tinted = false,
  columns = "lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)]",
  headlineSize,
  className,
}: ProblemSectionProps) {
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
      className={cn(
        "relative isolate py-section-lg",
        tinted ? "bg-[#fbf6f5]" : "bg-[#f7f5f2]",
        className,
      )}
    >
      {/* The pastel wash: violet from the top-left and bottom-right, pink from
          the top-right, peach from the bottom-left, over the warm off-white
          ground. Four soft radials rather than a shipped image — it costs
          nothing and reflows with the section at any height. */}
      {tinted && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: [
              "radial-gradient(46rem 34rem at 0% 0%, rgb(216 195 250 / 0.52), transparent 66%)",
              "radial-gradient(42rem 32rem at 100% 0%, rgb(252 208 218 / 0.50), transparent 66%)",
              "radial-gradient(42rem 34rem at 0% 100%, rgb(253 210 194 / 0.45), transparent 66%)",
              "radial-gradient(48rem 36rem at 100% 100%, rgb(206 184 250 / 0.55), transparent 68%)",
            ].join(","),
          }}
        />
      )}

      <Container width="hero">
        <div
          className={cn(
            "grid gap-12 lg:gap-14 xl:gap-20",
            // The statement column takes more than the list so the headline
            // keeps the design's line breaks — at an even split the longest
            // line wraps and adds one. See the `columns` prop.
            columns,
          )}
        >
          {/* =========================== Statement ===================== */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.6875rem] font-medium uppercase",
                "tracking-[0.14em] text-brand-600 sm:text-xs",
              )}
            >
              {content.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-8 font-display font-bold tracking-[-0.03em]",
                "leading-[1.14] text-neutral-900",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.375rem]",
                headlineSize ?? "xl:text-[3.25rem]",
              )}
            >
              {/*
                Below xl the lines wrap naturally, which is what a narrow
                column needs. See `nowrapHeadline` for why xl can differ.
              */}
              {content.headline.map((line) => (
                <span
                  key={line}
                  className={cn(
                    "inline lg:block",
                    nowrapHeadline && "xl:whitespace-nowrap",
                  )}
                >
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-8 max-w-120 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {content.description}
            </motion.p>

            {content.kicker && (
              <motion.p
                {...rise(0.22)}
                className={cn(
                  "mt-6 max-w-120 leading-relaxed text-pretty",
                  "text-[1.0625rem] text-neutral-600 sm:text-lg",
                )}
              >
                {content.kicker.lead}{" "}
                <strong className="font-semibold text-brand-600">
                  {content.kicker.emphasis}
                </strong>
              </motion.p>
            )}

            {aside && (
              <motion.div {...rise(0.3)} className="mt-12">
                {aside}
              </motion.div>
            )}
          </div>

          {/* ============================= List ======================== */}
          {/* The closing rule under the final item. Each item carries its own
              top border, so this completes the set. */}
          <ol className="border-b border-neutral-300/70">
            {content.items.map((item, index) => (
              <motion.li
                key={item.title}
                initial={reduce ? "shown" : "hidden"}
                whileInView="shown"
                viewport={{ once: true, amount: "some" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  shown: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: 0.1 + index * 0.09,
                      ease: easeOut,
                    },
                  },
                }}
                className="border-t border-neutral-300/70 py-8 sm:py-10"
              >
                {/* The numeral. Rendered from the index rather than a CSS
                    counter so it is selectable text and reaches assistive
                    technology as content. */}
                <p
                  className={cn(
                    "font-mono text-[0.8125rem] font-medium",
                    "tracking-[0.06em] text-brand-600 tabular-nums",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3
                  className={cn(
                    "mt-4 font-semibold tracking-[-0.015em] text-neutral-900",
                    "text-xl leading-snug text-pretty sm:text-[1.375rem]",
                  )}
                >
                  {item.title}
                </h3>

                <p
                  className={cn(
                    "mt-3 max-w-136 leading-relaxed text-pretty",
                    "text-[0.9375rem] text-neutral-600 sm:text-base",
                  )}
                >
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
