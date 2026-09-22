"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { privacy } from "@/content/privacy";
import { cn } from "@/lib/utils";

/** The mark beside "On this page" — stacked lines, like a contents list. */
function ContentsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        d="M2.5 4h11M2.5 8h11M2.5 12h7"
      />
    </svg>
  );
}

/**
 * PRIVACY DOCUMENT
 * ---------------------------------------------------------------------------
 * The policy at /privacy: a document header, then a two-column body with the
 * contents in a sticky left sidebar and eighteen numbered sections beside it.
 *
 * THE LAYOUT FOLLOWS THE EXPORT, which sets
 * `grid-template-columns: 220px minmax(0,1fr)` with a 40px gap, the nav
 * `position: sticky; top: 96px; align-self: start`, and the reading column
 * `max-width: 760px`. The rail is WIDER than the export's 220px — see the
 * note on it below.
 *
 * NO DRAFT BANNER AND NO REVIEWER NOTES. Both were here while the supplied
 * wording was unconfirmed; the client has since confirmed the dates, the
 * correspondence address and the grievance contact, and asked for them to
 * come off. The content file holds the final prose, so this component simply
 * renders it.
 *
 * THE CONTENTS LIST IS REAL NAVIGATION — anchor links to each section's id,
 * which is the same id the content file carries. No scroll-spy: it is a long
 * legal document, and a list that reorders or highlights as you scroll adds
 * motion to a page whose job is to be read.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function PrivacyDocument() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 14 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative isolate bg-[#fdfdfe] pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-24">
      <Container width="content">
        {/* ======================= Document header ==================== */}
        <motion.h1
          {...rise(0.06)}
          className={cn(
            "mt-10 font-display font-bold tracking-[-0.035em]",
            "leading-[1.08] text-neutral-900",
            "text-[2rem] sm:text-[2.5rem] xl:text-[3rem]",
          )}
        >
          {privacy.document.title}
        </motion.h1>

        <motion.p
          {...rise(0.1)}
          className="mt-4 max-w-[38rem] text-[1.0625rem] leading-relaxed text-pretty text-neutral-600"
        >
          {privacy.document.summary}
        </motion.p>

        {/* The document's own metadata, as a description list so each label
            stays tied to its value. */}
        <motion.dl
          {...rise(0.14)}
          className={cn(
            "mt-8 grid grid-cols-1 gap-x-10 gap-y-3 border-y border-neutral-200 py-5",
            "sm:grid-cols-2 lg:grid-cols-4",
          )}
        >
          {(
            [
              ["Document type", privacy.document.docType],
              ["Version", privacy.document.version],
              ["Effective date", privacy.document.effective],
              ["Last updated", privacy.document.lastUpdated],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.75rem] font-medium tracking-[0.06em] text-neutral-500 uppercase">
                {label}
              </dt>
              <dd className="mt-1 text-[0.9375rem] text-neutral-900">
                {value}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* ===================== Body: nav + sections ================= */}
        {/*
          220px sidebar and a 760px reading column, both from the export.
          Below lg the two stack: at that width a 220px rail would leave the
          prose too narrow, and the contents simply lead the document.
        */}
        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-10",
            /* The export's rail is 220px; this one is wider so the longer
               headings sit on one or two lines instead of three. */
            "lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12",
            "xl:grid-cols-[19rem_minmax(0,1fr)]",
          )}
        >
          {/* --------------------------- Contents -------------------- */}
          {/*
            THE RAIL IS A CARD, not bare links on the page ground. At 18
            entries it is the tallest thing in the left column, and a panel
            gives it an edge to sit in so it reads as one object beside the
            prose rather than a loose list competing with it.

            max-h + overflow-y-auto keep the sticky rail usable on a short
            viewport: without them a laptop window cuts the last entries off
            with no way to reach them.
          */}
          <motion.nav
            {...rise(0.18)}
            aria-labelledby="privacy-toc"
            className={cn(
              "lg:sticky lg:top-24 lg:self-start",
              "rounded-2xl border border-neutral-200/80 bg-white",
              "p-5 shadow-[0_1px_2px_rgb(15_15_25/0.04)]",
              "lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto",
            )}
          >
            <h2
              id="privacy-toc"
              className={cn(
                "flex items-center gap-2.5 border-b border-neutral-200/80 pb-3",
                "font-display text-[0.9375rem] font-bold tracking-[-0.01em]",
                "text-neutral-900",
              )}
            >
              <ContentsIcon className="size-4 shrink-0 text-brand-600" />
              {privacy.tocLabel}
            </h2>

            <ol className="mt-3 flex flex-col gap-0.5">
              {privacy.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      "group/toc flex gap-2.5 rounded-lg px-2.5 py-2",
                      "text-[0.875rem] leading-snug text-neutral-600",
                      "transition-colors duration-150",
                      "hover:bg-brand-50 hover:text-brand-700",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-brand-600",
                    )}
                  >
                    {/* A fixed-width column for the numbers, so headings align
                        whether the number is one digit or two. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "w-5 shrink-0 text-right text-neutral-400 tabular-nums",
                        "transition-colors duration-150",
                        "group-hover/toc:text-brand-500",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="min-w-0">{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>

          {/* --------------------------- Sections -------------------- */}
          <div className="max-w-[47.5rem] space-y-12">
            {privacy.sections.map((section, index) => (
              <motion.section
                key={section.id}
                {...rise(0)}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                /* scroll-mt clears the floating nav pill when an anchor
                   lands; the export sets the same 96px. */
                className="scroll-mt-28"
              >
                <h2
                  id={`${section.id}-heading`}
                  className={cn(
                    "font-display font-bold tracking-[-0.02em] text-neutral-900",
                    "text-[1.25rem] sm:text-[1.4375rem]",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="mr-2.5 text-neutral-400 tabular-nums"
                  >
                    {index + 1}.
                  </span>
                  {section.heading}
                </h2>

                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[1rem] leading-[1.7] text-pretty text-neutral-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
