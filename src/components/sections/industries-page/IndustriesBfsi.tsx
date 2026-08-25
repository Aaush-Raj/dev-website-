"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { industriesPage } from "@/content/industries-page";
import { cn } from "@/lib/utils";

import { bfsiOverlayIcons, bfsiPointIcons } from "./BfsiIcons";

/**
 * INDUSTRIES BFSI
 * ---------------------------------------------------------------------------
 * Section 3 of the Industries page: copy and three points on the left, a
 * photograph with a LurnyPitch overlay on the right.
 *
 * THE OVERLAY IS DRAWN, not the flat PNG supplied with the design. That
 * export bakes every label into pixels — a picture of text, which cannot
 * re-flow, is invisible to search, and turns soft the moment it is scaled
 * into a narrower column. The same choice the LurnyMagic page makes for its
 * product panels, and for the same reasons.
 *
 * It is wrapped in <Uncopyable> and aria-hidden: it imitates a product
 * screenshot, and its text is not real page copy. The section's own heading
 * and points are, and sit outside the wrapper.
 *
 * THE BACKGROUND
 * A blueprint drawing of a bank facade, shipped as an image — it is a dense
 * hand-drawn wireframe, which would be hundreds of paths in markup for a
 * decorative layer. Anchored left, behind the copy, as the design places it.
 *
 * SIZING
 * The overlay is sized in `cqw` against a container query on the photo
 * frame, not in rem. The frame's width does not track the viewport's — it is
 * roughly half the page on xl and full-width stacked on a phone — so type in
 * rem would be too small in one and too large in the other. Sized against
 * its own frame the whole panel scales like a screenshot would.
 */

const { bfsi } = industriesPage;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Value and label colours inside the overlay. */
const toneStyles = {
  blue: "text-[#6cc0f5]",
  amber: "text-[#f0b74e]",
} as const;

/** The leading rule on a signal card. */
const signalRule = {
  blue: "bg-[#4aa8ea]",
  amber: "bg-[#e8a63c]",
} as const;

export function IndustriesBfsi() {
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

  /** Shared entrance for a piece of the overlay, arriving from the right. */
  const slide = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, x: 24 },
      shown: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.65, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#071a35] py-section-lg text-white">
      {/* ===================== Background layers ====================== */}
      {/* The blueprint facade, anchored behind the copy as the design has
          it. Hidden below lg, where the columns stack and it would sit
          under the text rather than beside it. */}
      <Image
        src="/assets/images/industries/bfsi-blueprint.webp"
        alt=""
        aria-hidden="true"
        width={1400}
        height={876}
        sizes="(min-width: 1024px) 60vw, 0px"
        className={cn(
          "pointer-events-none absolute -z-10 select-none",
          "top-1/2 left-[6%] h-auto w-[54rem] -translate-y-1/2",
          "hidden opacity-100 lg:block",
        )}
      />

      {/* Deepens the ground so the copy always has contrast beneath it,
          whatever the blueprint is doing behind. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          /*
            Clears before the photo. An earlier version held ~35% ink across
            the whole width, which flattened the blueprint facade out of
            existence — it is the section's ground texture and needs to read.
          */
          "bg-[linear-gradient(105deg,rgb(7_26_53/0.92)_8%,rgb(7_26_53/0.55)_38%,rgb(7_26_53/0.15)_62%)]",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-center gap-12",
            "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14",
            "xl:gap-16",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.16em] uppercase",
                "text-[#6cc0f5] sm:text-xs",
              )}
            >
              {bfsi.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-balance",
                // Measured from the design at ~52px on a 1440 frame.
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.125rem]",
              )}
            >
              {bfsi.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[32rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-[#a9c2dd] sm:text-base",
              )}
            >
              {bfsi.description}
            </motion.p>

            {/* -------------------------- Points --------------------- */}
            <ul className="mt-10 space-y-7">
              {bfsi.points.map((point, index) => {
                const Icon = bfsiPointIcons[point.icon];

                return (
                  <motion.li
                    key={point.title}
                    {...rise(0.24 + index * 0.08)}
                    className="group flex items-start gap-5"
                  >
                    <span
                      className={cn(
                        "grid size-14 shrink-0 place-items-center rounded-xl",
                        "bg-white/4 text-[#8fd0f7] ring-1 ring-white/12",
                        // `scale`, not `transform`: Tailwind v4 compiles the
                        // scale utilities to the standalone property.
                        "duration-normal transition-[scale,background-color] ease-out",
                        "group-hover:scale-105 group-hover:bg-white/8",
                      )}
                    >
                      <Icon className="size-7" />
                    </span>

                    {/* The vertical rule the design sets between the icon
                        and the copy. */}
                    <span
                      aria-hidden="true"
                      className="mt-1 w-px self-stretch bg-[#4aa8ea]/45"
                    />

                    <div className="min-w-0">
                      <h3 className="text-[1.0625rem] font-semibold sm:text-[1.125rem]">
                        {point.title}
                      </h3>
                      <p
                        className={cn(
                          "mt-1.5 leading-relaxed text-pretty",
                          "text-[0.875rem] text-[#9db6d2] sm:text-[0.9375rem]",
                        )}
                      >
                        {point.description}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* ========================== Showcase ====================== */}
          <motion.div
            {...rise(0.2)}
            className={cn(
              "@container relative",
              // The overlay hangs off the photo's right edge on xl, as the
              // design lays it out; below that it tucks back inside.
              "xl:pr-8",
            )}
          >
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/12">
              <Image
                src={bfsi.photo.src}
                alt={bfsi.photo.alt}
                width={bfsi.photo.width}
                height={bfsi.photo.height}
                sizes="(min-width: 1024px) 52vw, 92vw"
                className="aspect-[7/6] w-full object-cover"
              />

              {/* Darkens the right of the photo so the overlay's text has
                  ground beneath it whatever the scene is doing. */}
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0",
                  "bg-[linear-gradient(260deg,rgb(4_14_30/0.86)_6%,rgb(4_14_30/0.35)_44%,transparent_68%)]",
                )}
              />
            </div>

            {/* ------------------------ Overlay ---------------------- */}
            <Uncopyable
              className={cn(
                "absolute inset-y-0 right-0 flex flex-col justify-center",
                /*
                  Kept to the right ~46%: wider than this and the panel
                  covers the person the photo is of, which is the whole
                  point of the scene.
                */
                "w-[47%] gap-[1.8cqw] p-[2cqw]",
              )}
            >
              {/* The live-conversation panel. */}
              <motion.div
                {...slide(0.3)}
                className={cn(
                  "rounded-[1.6cqw] bg-[#0a1a2e]/92 backdrop-blur-sm",
                  "ring-1 ring-white/12",
                  "shadow-[0_2cqw_5cqw_-2cqw_rgb(0_0_0/0.75)]",
                )}
              >
                {/* Header. */}
                <div
                  className={cn(
                    "flex items-center gap-[1cqw] border-b border-white/10",
                    "px-[2.2cqw] py-[1.8cqw]",
                  )}
                >
                  <span className="text-[1.55cqw] font-bold tracking-[0.1em] text-[#6cc0f5] uppercase">
                    {bfsi.panel.product}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[1.55cqw] text-white/35"
                  >
                    ·
                  </span>
                  <span className="text-[1.55cqw] font-semibold tracking-[0.1em] text-white uppercase">
                    {bfsi.panel.state}
                  </span>

                  {/* The live dot. It pulses, because the panel says the
                      conversation is live — dropped for reduced motion. */}
                  <span
                    className={cn(
                      "ml-auto size-[1cqw] rounded-full bg-[#4aa8ea]",
                      !reduce && "animate-pulse",
                      "motion-reduce:animate-none",
                    )}
                  />
                </div>

                {/* Rows. */}
                <ul>
                  {bfsi.panel.rows.map((row, index) => {
                    const Icon =
                      bfsiOverlayIcons[
                        row.icon as keyof typeof bfsiOverlayIcons
                      ];
                    const isAlert = !("value" in row);

                    return (
                      <li
                        key={row.label}
                        className={cn(
                          "flex items-center gap-[1.6cqw] px-[2.2cqw] py-[1.5cqw]",
                          index > 0 && "border-t border-white/8",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-[2.2cqw] shrink-0",
                            isAlert ? toneStyles.amber : "text-white/55",
                          )}
                        />

                        <span
                          className={cn(
                            /*
                              Not truncated: at narrow widths the longest
                              label ("Follow-up commitment") clipped to
                              "Follow-up commitm…", which reads as a bug
                              rather than as a dense panel. Shrinking the
                              label instead keeps every row whole.
                            */
                            "min-w-0 flex-1 text-[1.6cqw] leading-tight",
                            // A row with no value is a full-width alert, set
                            // entirely in amber as the design does.
                            isAlert
                              ? cn("font-semibold", toneStyles.amber)
                              : "text-white/80",
                          )}
                        >
                          {row.label}
                        </span>

                        {"value" in row && (
                          <span
                            className={cn(
                              "shrink-0 text-[1.75cqw] font-semibold",
                              toneStyles[row.tone],
                            )}
                          >
                            {row.value}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </motion.div>

              {/* The three signal cards. */}
              {bfsi.signals.map((signal, index) => {
                const Icon =
                  bfsiOverlayIcons[
                    signal.icon as keyof typeof bfsiOverlayIcons
                  ];

                return (
                  <motion.div
                    key={signal.label}
                    {...slide(0.42 + index * 0.1)}
                    className={cn(
                      "relative flex items-start gap-[1.8cqw] overflow-hidden",
                      "rounded-[1.2cqw] bg-[#0a1a2e]/92 backdrop-blur-sm",
                      "px-[2.2cqw] py-[1.8cqw] ring-1 ring-white/12",
                      "shadow-[0_1.6cqw_4cqw_-2cqw_rgb(0_0_0/0.7)]",
                    )}
                  >
                    {/* The leading rule, which is what the design uses to
                        separate a coaching note from a commercial one. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 w-[0.5cqw]",
                        signalRule[signal.tone],
                      )}
                    />

                    <Icon
                      className={cn(
                        "mt-[0.2cqw] size-[2.6cqw] shrink-0",
                        toneStyles[signal.tone],
                      )}
                    />

                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-[1.5cqw] font-bold tracking-[0.09em] uppercase",
                          toneStyles[signal.tone],
                        )}
                      >
                        {signal.label}
                      </p>
                      <p className="mt-[0.5cqw] text-[1.75cqw] leading-snug text-white">
                        {signal.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </Uncopyable>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
