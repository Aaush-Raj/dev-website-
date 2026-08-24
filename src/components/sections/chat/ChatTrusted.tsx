"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

import { ChatTrustedDesk } from "./ChatTrustedDesk";

/**
 * CHAT TRUSTED
 * ---------------------------------------------------------------------------
 * Section 4 of the LurnyChat page: "trusted answers, not generic AI". A light
 * section — the statement on the left (serif headline + three feature notes),
 * a drawn light LurnyDesk answer card on the right, on the warm off-white
 * ground with faint decorative arcs.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { trusted } = chat;

/** Feature-note icons, keyed by the name in the content file. */
const featureIcons = {
  cited: CitedIcon,
  boundary: BoundaryIcon,
  coach: CoachIcon,
} as const;

/** A document with a check — "cited, source-grounded". */
function CitedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 2.5h6l4 4v11H5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M11 2.5V6.5h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m7.5 12 1.6 1.6 3-3.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A person inside a shield — "role-specific boundaries". */
function BoundaryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2.4 4 4.7v4.6c0 3.4 2.5 6 6 7.3 3.5-1.3 6-3.9 6-7.3V4.7L10 2.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle
        cx="10"
        cy="8.4"
        r="1.7"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M7 13a3 3 0 0 1 6 0"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** A chat bubble with dots — "clear follow-up coaching". */
function CoachIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 5.5A2.5 2.5 0 0 1 5.5 3h9A2.5 2.5 0 0 1 17 5.5v5A2.5 2.5 0 0 1 14.5 13H8l-3.5 3v-3H5.5A2.5 2.5 0 0 1 3 10.5v-5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="8" r="0.9" fill="currentColor" />
      <circle cx="10" cy="8" r="0.9" fill="currentColor" />
      <circle cx="13" cy="8" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function ChatTrusted() {
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
    <section className="relative isolate overflow-hidden bg-[#f7f5f2] py-section-lg">
      {/* Faint decorative arcs in the corners, as the design has them. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 -z-10 hidden size-[34rem] rounded-full border border-brand-300/20 lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 hidden size-[36rem] rounded-full border border-brand-300/15 lg:block"
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-14",
            "lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-600 sm:text-xs",
              )}
            >
              {trusted.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-serif font-normal tracking-[-0.01em]",
                "leading-[1.05] text-neutral-900",
                "text-[2.5rem] sm:text-[3.25rem] xl:text-[3.75rem]",
              )}
            >
              {trusted.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-108 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-600 sm:text-lg",
              )}
            >
              {trusted.description}
            </motion.p>

            {/* ------------------------- Feature notes ---------------- */}
            <motion.ul {...rise(0.24)} className="mt-10 max-w-108">
              {trusted.features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <li
                    key={feature.label}
                    className={cn(
                      "flex items-center gap-4 py-4",
                      // A hairline divider under all but the last, as the design.
                      index < trusted.features.length - 1 &&
                        "border-b border-neutral-300/60",
                    )}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[1.0625rem] font-medium text-neutral-800">
                      {feature.label}
                    </span>
                  </li>
                );
              })}
            </motion.ul>

            {/* --------------------------- Action --------------------- */}
            <motion.div {...rise(0.32)} className="mt-9">
              <Link
                href={trusted.action.href}
                className={cn(
                  "group inline-flex h-13 items-center justify-center gap-3 rounded-lg px-7",
                  "border border-accent-500/70 text-[0.9375rem] font-semibold text-accent-700",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-accent-500 hover:bg-accent-500/8",
                  "active:translate-y-0",
                )}
              >
                {trusted.action.label}
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={cn(
                    "size-4",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                >
                  <path
                    d="M2.5 8h11m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* ============================ Desk ========================= */}
          {/* Extra right room on xl for the floating badge that overhangs it. */}
          <ChatTrustedDesk className="lg:mr-8 xl:mr-14" />
        </div>
      </Container>
    </section>
  );
}
