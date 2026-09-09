"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { capabilityBuilding } from "@/content/capability-building";
import { cn } from "@/lib/utils";

import {
  ArrowGlyph,
  CheckGlyph,
  GrowthGlyph,
  PulseGlyph,
} from "./CapabilityIcons";

/**
 * CAPABILITY BUILDING HERO
 * ---------------------------------------------------------------------------
 * Section 1: copy on the left, and on the right a photograph with three
 * product panels floating over it.
 *
 * THE PANELS ARE DRAWN FROM CONTENT, not shipped as the three flat PNGs the
 * design pack supplies. They are pure interface — labels, ticks, progress bars
 * and numbered steps — so as images they would add three more files, blur on
 * high-density screens, stay untranslatable and invisible to screen readers,
 * and pin their type at whatever size the export happened to use.
 *
 * THE PHOTOGRAPH KEEPS ITS LEADER LINES. Those three curves and the
 * handwritten note are struck onto the image in the design, each starting at a
 * panel edge and landing at a specific point in the scene. Redrawing them in
 * markup would mean re-deriving three curves against a photograph that crops
 * differently at every width, so the plate ships whole and the panels are
 * positioned to meet the line ends. The plate's own surround is rgb(254,254,254)
 * and the section ground is set to match, so no edge reads.
 *
 * BELOW `xl` THE PANELS COME OFF THE PHOTO and stack beneath it. Three floating
 * cards over a small image is unreadable, and the leader lines they answer to
 * are far too small to follow at that size.
 */

const { hero } = capabilityBuilding;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/**
 * Per-engine colour, sampled from the design.
 *
 * Pulse is the coral/red family and KxP the teal — the same pairing the
 * panels' leader lines use in the photograph, which is what ties each panel to
 * its line.
 */
const BRAND_STYLES = {
  Pulse: {
    disc: "bg-[#fbd4cd] text-[#e8503a]",
    label: "text-[#ec4b2c]",
    tick: "bg-[#f4705c]",
  },
  KxP: {
    disc: "bg-[#b9e8dc] text-[#129d84]",
    label: "text-[#14b09a]",
    tick: "bg-[#14b09a]",
  },
} as const;

/** The shared panel shell: white card, soft ring, generous shadow. */
const panelShell = cn(
  "rounded-2xl bg-white p-5",
  "ring-1 ring-[#0b0a14]/6",
  "shadow-[0_1.5rem_2.5rem_-1rem_rgb(20_18_60/0.18)]",
);

export function CapabilityHero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    /*
      The bottom margin is POSITIVE. It extends the observer's box past the
      fold so copy that starts just below it still resolves; a negative value
      would shrink that box, which is the opposite of what off-screen content
      needs.
    */
    viewport: {
      once: true,
      amount: "some",
      margin: "0px 0px 15% 0px",
    } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  /** Each panel drifts in from its own side, so they do not arrive in a row. */
  const settle = (delay: number, fromX: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, x: fromX, y: 10 },
      shown: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.7, delay, ease: easeOut },
      },
    },
  });

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        // Matched to the photo plate's own surround, rgb(254,254,254), so the
        // image composites without an edge.
        "bg-[#fefefe] text-[#0b0a14]",
        // Clearance for the floating nav pill, which overlays the page.
        "pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20",
      )}
    >
      {/* ======================== Background wash ======================== */}
      {/*
        The design's ground is not flat: it carries a cool violet cast toward
        the top right and a pair of very faint arcs behind the photograph. Both
        are drawn — a gradient and two ellipses cost nothing next to the 810KB
        plate the design pack ships them on.
      */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10",
          "bg-[radial-gradient(ellipse_120%_90%_at_78%_0%,rgb(133_0_255/0.05),transparent_62%),radial-gradient(ellipse_90%_70%_at_8%_100%,rgb(133_0_255/0.03),transparent_60%)]",
        )}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[62%]"
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          {/* The two arcs sweeping behind the scene, as the design has them. */}
          <ellipse
            cx="46"
            cy="52"
            rx="52"
            ry="46"
            fill="none"
            stroke="rgb(133 0 255 / 0.12)"
            strokeWidth={0.22}
            vectorEffect="non-scaling-stroke"
          />
          <ellipse
            cx="58"
            cy="46"
            rx="44"
            ry="52"
            fill="none"
            stroke="rgb(133 0 255 / 0.08)"
            strokeWidth={0.22}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <Container width="hero">
        <div
          className={cn(
            "grid items-center gap-12",
            /*
              Measured from the design: the copy runs to ~50% of the frame.
              The split has to actually give it that — at 0.92fr the third
              headline line wrapped to two, making the headline four lines deep
              where the design has three.
            */
            "xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:gap-10",
          )}
        >
          {/* ============================ Copy ========================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "font-mono text-[0.75rem] font-medium tracking-[0.16em] uppercase",
                "text-[#8500ff]",
              )}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              {...rise(0.06)}
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.035em]",
                "leading-[1.02] text-balance",
                /*
                  The design sets ~68px on a 1440 frame, but that size needs a
                  ~629px column for "your business needs." to hold one line —
                  and widening the copy column that far crushes the scene, whose
                  panels then wrap and collide. 60px keeps the three-line shape
                  the design has while leaving the scene its measured width,
                  which is the trade worth making.
                */
                "text-[2.5rem] sm:text-[3.25rem] xl:text-[3.75rem]",
              )}
            >
              {/*
                The headline is three content lines, one of them accented. They
                are rendered as blocks so the violet word owns its own line as
                the design has it, rather than depending on where the text
                happens to wrap.
              */}
              {hero.headline.map((line) => (
                <span
                  key={line.text}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-[#8500ff]",
                  )}
                >
                  {line.text}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...rise(0.12)}
              className={cn(
                "mt-7 max-w-[34rem] leading-relaxed text-pretty",
                "text-[1.0625rem] text-[#42486a] sm:text-lg",
              )}
            >
              {hero.description}
            </motion.p>

            {/* -------------------------- Actions -------------------- */}
            <motion.div
              {...rise(0.18)}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={hero.actions.primary.href}
                className={cn(
                  "group inline-flex items-center gap-3 rounded-xl",
                  "bg-[#8500ff] px-7 py-4",
                  "text-[0.9375rem] font-semibold text-white",
                  "duration-normal transition-[background-color,translate,box-shadow] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#7400e0]",
                  "hover:shadow-[0_1rem_2rem_-0.75rem_rgb(133_0_255/0.6)]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8500ff]",
                )}
              >
                {hero.actions.primary.label}
                <ArrowGlyph
                  className={cn(
                    "h-4 w-4 shrink-0",
                    "duration-normal transition-[translate] ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>

              <Link
                href={hero.actions.secondary.href}
                className={cn(
                  "inline-flex items-center rounded-xl px-7 py-4",
                  "bg-white text-[0.9375rem] font-semibold text-[#0b0a14]",
                  "ring-1 ring-[#8500ff]/45",
                  "duration-normal transition-[background-color,translate,--tw-ring-color] ease-out",
                  "will-change-[translate]",
                  "hover:-translate-y-0.5 hover:bg-[#f8f3ff] hover:ring-[#8500ff]",
                  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8500ff]",
                )}
              >
                {hero.actions.secondary.label}
              </Link>
            </motion.div>

            <motion.p
              {...rise(0.24)}
              className="mt-7 text-[0.875rem] text-[#6b7192]"
            >
              {hero.footnote}
            </motion.p>
          </div>

          {/* =========================== Scene ========================== */}
          <motion.div
            initial={reduce ? "shown" : "hidden"}
            whileInView="shown"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, scale: 0.97 },
              shown: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.8, ease: easeOut },
              },
            }}
            className="relative"
          >
            {/*
              The photograph sizes the box; the panels are positioned against
              it. Its aspect is fixed so the panel offsets, which are given as
              percentages of this box, stay true as it scales.
            */}
            <div className="relative">
              <Image
                src={hero.scene.src}
                alt={hero.scene.alt}
                width={1060}
                height={863}
                // The page's LCP image, so it must not lazy-load.
                priority
                sizes="(min-width: 1280px) 54vw, 100vw"
                className="h-auto w-full"
              />

              {/*
                The handwritten note is part of the photograph, so its words are
                repeated here for assistive technology and hidden visually —
                otherwise the aside is simply missing for anyone not looking at
                the image.
              */}
              <p className="sr-only">{hero.annotation}</p>

              {/* ------------------- Panels, pinned ------------------- */}
              {/*
                Only from `xl`. Below that the panels come off the photo and
                stack beneath it, where there is room to read them.
              */}
              <Uncopyable className="pointer-events-none absolute inset-0 hidden xl:block">
                {hero.panels.map((panel, index) => (
                  <motion.div
                    key={panel.id}
                    {...settle(0.3 + index * 0.12, index === 0 ? -22 : 22)}
                    className={cn("absolute", panel.position)}
                  >
                    <PanelCard panel={panel} />
                  </motion.div>
                ))}
              </Uncopyable>
            </div>

            {/* ------------------ Panels, stacked ------------------- */}
            {/*
              NOT scroll-animated, unlike every other block on this page. Each
              stacked panel is ~220px tall, so on a phone the second and third
              start well below the fold; under `whileInView` they stayed at
              opacity 0 and the section rendered with an empty band where they
              should be. Chasing that with a larger viewport margin only moves
              which panel fails. They are the layout's fallback for narrow
              screens rather than a reveal, so they simply render.
            */}
            <Uncopyable className="mt-8 grid gap-5 sm:grid-cols-2 xl:hidden">
              {hero.panels.map((panel, index) => (
                <div
                  key={panel.id}
                  // The GrowthPath panel is the tallest of the three, so on a
                  // two-column stack it takes the full width rather than
                  // leaving a ragged gap beside it.
                  className={index === 2 ? "sm:col-span-2" : undefined}
                >
                  <PanelCard panel={panel} />
                </div>
              ))}
            </Uncopyable>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ========================================================================== */
/* PANEL                                                                      */
/* ========================================================================== */

type Panel = (typeof hero.panels)[number];

/**
 * One product panel. `kind` selects the body — a checklist, a pair of
 * comparison bars, or a numbered path — while the header is common to all
 * three.
 */
function PanelCard({ panel }: { panel: Panel }) {
  const brand = BRAND_STYLES[panel.brand];
  const Glyph = panel.brand === "Pulse" ? PulseGlyph : GrowthGlyph;

  return (
    <div className={panelShell}>
      {/* =========================== Header ========================== */}
      <div className="flex items-start gap-3.5">
        <span
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full",
            brand.disc,
          )}
        >
          <Glyph className="size-5.5" />
        </span>

        <div className="min-w-0">
          {/*
            "KxP" is NOT uppercased. `uppercase` renders it "KXP", and the
            lower-case x is part of the product's name — the design sets it
            that way and so does the rest of the site. PULSE genuinely is a
            caps label, so only that one gets the transform.
          */}
          <p
            className={cn(
              "text-[0.6875rem] font-bold tracking-[0.12em]",
              panel.brand === "Pulse" && "uppercase",
              brand.label,
            )}
          >
            {panel.brand}
          </p>
          <p className="mt-1 text-[1.0625rem] leading-tight font-bold text-[#111536]">
            {panel.title}
          </p>
          {"subtitle" in panel && panel.subtitle ? (
            <p className="mt-0.5 text-[0.9375rem] text-[#5b6288]">
              {panel.subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {/* ============================ Body =========================== */}
      {panel.kind === "checks" ? (
        <ul className="mt-4 space-y-3 border-t border-[#0b0a14]/8 pt-4">
          {panel.items.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full",
                  brand.tick,
                )}
              >
                <CheckGlyph className="size-3.5 text-white" />
              </span>
              <span className="text-[0.9375rem] text-[#2b3157]">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {panel.kind === "bars" ? (
        <div className="mt-4">
          {/* The legend, naming the two series the bars compare. */}
          <ul className="flex items-center gap-5">
            {panel.legend.map((entry) => (
              <li
                key={entry.label}
                className="flex items-center gap-2 text-[0.8125rem] text-[#5b6288]"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    entry.tone === "current" ? "bg-[#2ec4a6]" : "bg-[#c7b3f7]",
                  )}
                />
                {entry.label}
              </li>
            ))}
          </ul>

          <ul className="mt-3.5 space-y-2.5">
            {panel.rows.map((row) => (
              <li key={row.label} className="flex items-center gap-3">
                <span className="w-[7.5rem] shrink-0 truncate text-[0.8125rem] text-[#5b6288]">
                  {row.label}
                </span>

                {/*
                  One track carrying both series. Expected is drawn first and
                  current sits on top of it, so the two read as a single bar
                  with the gap to expected showing past the end of current —
                  which is what the panel is about.
                */}
                <span className="relative h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-[#e9eaf3]">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-[#c7b3f7]"
                    style={{ width: `${row.expected}%` }}
                  />
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-[#2ec4a6]"
                    style={{ width: `${row.current}%` }}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {panel.kind === "steps" ? (
        <ol className="relative mt-4 space-y-4">
          {panel.steps.map((step, index) => {
            const done = "done" in step && step.done;
            return (
              <li key={step.verb} className="relative flex items-center gap-3">
                {/*
                  The rule joining one step to the next. It hangs off each item
                  except the last, so the path reads as continuous without a
                  separate absolutely-positioned line to keep in sync.
                */}
                {index < panel.steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-7 left-[0.6875rem] h-[calc(100%-0.5rem)] w-px",
                      done ? "bg-[#14b09a]/45" : "bg-[#d6d9e8]",
                    )}
                  />
                ) : null}

                <span
                  className={cn(
                    "z-1 grid size-6 shrink-0 place-items-center rounded-full",
                    "text-[0.75rem] font-bold",
                    done
                      ? "bg-[#14b09a] text-white"
                      : "bg-[#e9eaf3] text-[#5b6288]",
                  )}
                >
                  {done ? (
                    <CheckGlyph className="size-3.5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>

                <span className="text-[0.9375rem] text-[#2b3157]">
                  <span className="font-semibold text-[#111536]">
                    {step.verb}:
                  </span>{" "}
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
