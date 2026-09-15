"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { comingSoonMenu } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * COMING SOON MENU
 * ---------------------------------------------------------------------------
 * The panel that drops from the header's "Coming Soon" button: two large cards
 * for the independent platforms.
 *
 * NOT `MegaMenu`. That component lays out columns of small link rows; this is
 * two photographic cards with badges and their own calls to action. Bending it
 * to serve both would mean a component that does neither well.
 *
 * It shares the header's open/close machinery, though — hover timers, Escape
 * to close with focus return, the route-change guard — because "coming-soon"
 * is a `MegaMenuKey`. Only the rendering differs.
 *
 * THE CARDS ANIMATE IN SEQUENCE. The panel itself drops, then each card rises
 * a beat behind it, so the eye lands on the panel before the contents arrive
 * rather than everything appearing at once.
 */

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Badge and link colours, sampled from the design: coral for Lurny.ai, green
 * for LurnyCampus — each matching the product's own palette.
 */
const TONES = {
  coral: {
    badge: "bg-[#fde3dd] text-[#c0392b]",
    link: "text-[#e8452a]",
  },
  green: {
    badge: "bg-[#d8f0dd] text-[#1f7a52]",
    link: "text-[#1f8a54]",
  },
} as const;

export function ComingSoonMenu({ id }: { id: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : -8 }}
      transition={{ duration: reduce ? 0 : 0.22, ease: easeOut }}
      className={cn(
        "overflow-hidden rounded-3xl bg-white",
        "shadow-[0_24px_60px_-20px_rgb(17_19_35/0.28)]",
        "ring-1 ring-neutral-200/70",
      )}
    >
      <div className="p-7 lg:p-8">
        <p className="text-[0.9375rem] text-neutral-500">
          {comingSoonMenu.title}
        </p>

        {/*
          Two columns from `md`, divided by a rule between them rather than a
          border on each — so the line falls only in the gap, never as a stray
          outer edge. Same approach as MegaMenu's columns.
        */}
        <ul className="mt-5 grid gap-7 md:grid-cols-2 md:gap-0">
          {comingSoonMenu.items.map((item, index) => {
            const tone = TONES[item.tone];
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.34,
                  delay: reduce ? 0 : 0.08 + index * 0.07,
                  ease: easeOut,
                }}
                className={cn(
                  index > 0 && "md:border-l md:border-neutral-200 md:pl-8",
                  index === 0 && "md:pr-8",
                )}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group/card block rounded-2xl",
                    "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600",
                  )}
                >
                  {/* ---------------------- Image --------------------- */}
                  <span className="relative block overflow-hidden rounded-2xl">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      width={1000}
                      height={520}
                      sizes="(min-width: 768px) 28vw, 80vw"
                      className={cn(
                        "h-auto w-full object-cover",
                        // A slow push-in on hover, matching the story cards
                        // elsewhere on the site.
                        "duration-slow transition-[scale] ease-out",
                        "will-change-[scale] group-hover/card:scale-[1.03]",
                      )}
                    />

                    {/* The badge, pinned over the image's top-left corner. */}
                    <span
                      className={cn(
                        "absolute top-3.5 left-3.5 rounded-full px-3.5 py-1.5",
                        "text-[0.8125rem] font-semibold",
                        tone.badge,
                      )}
                    >
                      {item.badge}
                    </span>
                  </span>

                  {/* ---------------------- Copy ---------------------- */}
                  <span className="mt-4 block font-display text-[1.5rem] leading-tight font-bold tracking-[-0.02em] text-neutral-900">
                    {item.name}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] leading-relaxed text-neutral-600">
                    {item.description}
                  </span>

                  {/*
                    The affordance, not the control — the whole card is already
                    the link. `aria-hidden` so the card is not announced twice.
                  */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-4 flex items-center gap-2.5",
                      "text-[0.9375rem] font-semibold",
                      tone.link,
                    )}
                  >
                    {item.cta}
                    <svg
                      viewBox="0 0 16 16"
                      className={cn(
                        "size-4 shrink-0",
                        "duration-normal transition-[translate] ease-out",
                        "group-hover/card:translate-x-1",
                      )}
                    >
                      <path
                        d="M2 8h12M9.5 3.5 14 8l-4.5 4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}
