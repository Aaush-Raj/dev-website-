"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { chat } from "@/content/chat";
import { cn } from "@/lib/utils";

import { ChatDashboard } from "./ChatDashboard";

/**
 * CHAT HERO
 * ---------------------------------------------------------------------------
 * Section 1 of the LurnyChat page: the statement on the left, the drawn
 * LurnyDesk product illustration on the right, on a near-black ground.
 *
 * THE BACKGROUND
 * The design ships this as a large PNG whose only content is a violet radial
 * glow off the right edge and faint concentric rings around it. Both are
 * cheaper and sharper as CSS — nothing is downloaded and the glow scales with
 * the viewport. The rings are one `repeating-radial-gradient`, masked so they
 * fade before reaching the copy; the glow is a plain radial gradient over it.
 * (Same approach as the LurnyPulse hero.)
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { hero } = chat;

/** Feature-note icons, keyed by the name in the content file. */
const featureIcons = {
  shield: ShieldIcon,
  globe: GlobeIcon,
  sparkle: SparkleIcon,
} as const;

/** A shield for "Trusted knowledge". */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2.2 3.6 4.7v4.9c0 3.6 2.6 6.4 6.4 8.2 3.8-1.8 6.4-4.6 6.4-8.2V4.7L10 2.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="m7.4 10 1.8 1.8 3.4-3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A globe for "Multilingual support". */
function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="7.4" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2.6 10h14.8M10 2.6c2 2.1 3 4.7 3 7.4s-1 5.3-3 7.4c-2-2.1-3-4.7-3-7.4s1-5.3 3-7.4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A four-point spark for "Guided practice". */
function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M10 2.4c.5 3.6 1.6 6.7 5.6 7.6-4 .9-5.1 4-5.6 7.6-.5-3.6-1.6-6.7-5.6-7.6 4-.9 5.1-4 5.6-7.6Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatHero() {
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
        "relative isolate overflow-hidden bg-[#050308] text-white",
        // Extra top padding: this is the first section under the floating nav
        // pill, so it needs clearance the mid-page sections do not.
        "pt-28 pb-section-lg sm:pt-32 lg:pt-36",
      )}
    >
      {/* ===================== Background effects ===================== */}
      {/* Concentric rings, centred on the glow off the right edge, masked to
          fade toward the left so they never compete with the headline. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "hidden opacity-60 lg:block",
        )}
        style={{
          background:
            "repeating-radial-gradient(circle at 88% 46%, transparent 0 62px, rgb(167 139 250 / 0.10) 62px 63px)",
          maskImage:
            "radial-gradient(circle at 88% 46%, black 0%, black 42%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at 88% 46%, black 0%, black 42%, transparent 78%)",
        }}
      />

      {/* The violet core glow — two stacked gradients for a shaped falloff. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(58rem 48rem at 92% 42%, rgb(88 40 180 / 0.55), transparent 62%)",
            "radial-gradient(22rem 20rem at 96% 43%, rgb(139 92 246 / 0.52), transparent 66%)",
          ].join(","),
        }}
      />

      {/* A soft floor of light under the whole section. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64",
          "bg-linear-to-t from-brand-950/40 to-transparent",
        )}
      />

      <Container width="wide" className="relative">
        <div
          className={cn(
            "grid items-center gap-16",
            // The dashboard carries the wider share of the row: it holds the
            // chat window plus three cards floating over its lower edge, so the
            // statement column is kept deliberately narrow to give it room.
            "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:gap-10",
            "xl:gap-14",
          )}
        >
          {/* =========================== Statement ===================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.14em] text-brand-300 sm:text-xs",
              )}
            >
              {hero.eyebrow.product}
              {/* Decorative separator — a screen reader would otherwise
                  announce "bullet" between the two halves. */}
              <span aria-hidden="true" className="mx-2 text-brand-500">
                ·
              </span>
              {hero.eyebrow.label}
            </motion.p>

            <motion.h1
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.08] text-white",
                // Measured from the design at ~54px on a 1440 frame.
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.375rem]",
              )}
            >
              {hero.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-7 max-w-108 leading-relaxed text-pretty",
                "text-[1.0625rem] text-neutral-300 sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* --------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.24)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex h-14 items-center justify-center gap-3 rounded-lg px-7",
                  "bg-accent-300 text-[0.9375rem] font-semibold text-neutral-900",
                  // `translate`, not `transform`: Tailwind v4 compiles the
                  // translate utilities to the standalone property.
                  "duration-normal transition-[background-color,box-shadow,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-accent-200",
                  "hover:shadow-[0_16px_36px_-12px_rgb(252_203_70/0.45)]",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.primary.label}
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

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex h-14 items-center justify-center rounded-lg px-7",
                  "border border-brand-400/60 text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[background-color,border-color,translate] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-500/12",
                  "active:translate-y-0",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            {/* -------------------------- Features -------------------- */}
            <motion.ul
              {...rise(0.32)}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              {hero.features.map((feature, index) => {
                const Icon = featureIcons[feature.icon];

                return (
                  <li key={feature.label} className="flex items-center gap-4">
                    <span className="flex items-center gap-2.5">
                      <Icon className="size-4 shrink-0 text-brand-300" />
                      <span className="text-[0.875rem] text-neutral-300">
                        {feature.label}
                      </span>
                    </span>

                    {/* The separator trails its item, so a wrapped row never
                        starts with a stray bullet. */}
                    {index < hero.features.length - 1 && (
                      <span aria-hidden="true" className="text-neutral-700">
                        ·
                      </span>
                    )}
                  </li>
                );
              })}
            </motion.ul>
          </div>

          {/* ========================= Dashboard ======================= */}
          {/*
            A small negative right margin lets the window and its floating cards
            push toward the viewport edge on the widest breakpoints, so the
            product shot reads large — the point of widening this side.
          */}
          <ChatDashboard className="lg:-mr-2 xl:-mr-6" />
        </div>
      </Container>
    </section>
  );
}
