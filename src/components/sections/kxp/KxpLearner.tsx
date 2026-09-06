"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { kxp } from "@/content/kxp";
import { cn } from "@/lib/utils";

/**
 * KXP — BUILT AROUND THE LEARNER
 * ---------------------------------------------------------------------------
 * Section 4: the argument on the left, Rahul at his desk on the right with his
 * personalised home laid over the scene.
 *
 * WHY THE DASHBOARD IS MARKUP AND NOT A RASTER
 * The supplied pack ships the scene deliberately reconstructed WITHOUT the
 * dashboard, and its README asks for "webpage headings, copy, buttons and
 * simple interface elements as HTML/CSS where possible". That is the right
 * split and the one taken here: the dashboard is UI carrying readable text, so
 * it is built — selectable, translatable, sharp at any density, and it animates
 * in — while the scene and the four photographic thumbnails inside the cards
 * ship as pixels, since neither can be drawn.
 *
 * This is the opposite call to section 3, where the panels arrived with the
 * room baked into their edges and had to be composited. Here nothing is baked,
 * so nothing needs compositing.
 *
 * THE THUMBNAILS ARE TINY AT SOURCE
 * As small as 99x79. They are rendered no larger than native — see
 * scripts/build-kxp-learner.cjs — so they stay sharp rather than being
 * upscaled into mush.
 *
 * THE DASHBOARD SCALES WITH ITS COLUMN
 * Every size inside it is in `em`, off a font-size set in `cqw`, so the whole
 * card shrinks as one object with the scene behind it instead of reflowing
 * card-by-card at arbitrary widths.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { learner } = kxp;
const { dashboard } = learner;

export function KxpLearner() {
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
      // The warm off-white, sampled from the design. The scene's own left edge
      // is near-white, so the two meet without a seam.
      className={cn(
        "relative isolate overflow-hidden bg-[#fffbf7]",
        "flex flex-col py-section-lg lg:block lg:py-0",
      )}
    >
      {/* ============================== Scene ======================== */}
      {/* From lg up it occupies the right half of the section, bleeding to the
          right edge as the design frames it. Below lg the copy owns the full
          width and the scene follows it in flow. */}
      <div
        className={cn(
          "order-2 lg:order-none",
          "lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:w-[62%]",
        )}
      >
        <Image
          src={learner.scene.src}
          alt={learner.scene.alt}
          width={learner.scene.width}
          height={learner.scene.height}
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="h-auto w-full lg:size-full lg:object-cover lg:object-[62%_center]"
        />

        {/* Fade the scene's left edge into the section ground, so it bleeds in
            rather than butting against the copy column. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, #fffbf7 0%, rgb(255 251 247 / 0.7) 12%, transparent 34%)",
          }}
        />
      </div>

      <Container width="hero" className="relative order-1 lg:order-none lg:py-section-lg">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-10">
          {/* =========================== Statement ==================== */}
          <div className="lg:py-10">
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold uppercase",
                "tracking-[0.1em] text-[#570bba] sm:text-xs",
              )}
            >
              {learner.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.035em]",
                "leading-[1.06] text-[#010003]",
                "text-[2.25rem] sm:text-[2.875rem] xl:text-[3.5rem]",
              )}
            >
              {learner.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[30rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#352e42]/90 sm:text-[1.0625rem]",
              )}
            >
              {learner.description}
            </motion.p>

            {/* --------------------------- Points -------------------- */}
            {/* An ordered list: the design numbers the points, so the ordinal
                comes from the list position rather than the copy. */}
            {/* `display:flex` on the items would stop the browser
                incrementing the built-in `list-item` counter — every marker
                would read 00 — so an explicit counter is used instead. */}
            <ol className="mt-10 space-y-7 [counter-reset:point]">
              {learner.points.map((point, index) => (
                <motion.li
                  key={point.title}
                  {...rise(0.24 + index * 0.07)}
                  className={cn(
                    "flex items-start gap-5 [counter-increment:point]",
                    // The pill carries the ordinal, drawn from the list
                    // position rather than being typed into the copy.
                    "before:flex before:size-11 before:shrink-0",
                    "before:items-center before:justify-center before:rounded-full",
                    "before:bg-[#570bba]/8 before:text-[0.8125rem] before:font-bold",
                    "before:text-[#570bba]",
                    "before:content-[counter(point,decimal-leading-zero)]",
                  )}
                >
                  <span>
                    <span
                      className={cn(
                        "block font-display font-bold tracking-[-0.01em]",
                        "text-[1.0625rem] text-[#040206] sm:text-[1.125rem]",
                      )}
                    >
                      {point.title}
                    </span>
                    <span
                      className={cn(
                        "mt-1.5 block leading-relaxed",
                        "text-[0.9375rem] text-[#352e42]/80 sm:text-base",
                      )}
                    >
                      {point.body}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* ========================== Dashboard ===================== */}
          {/* Overlaps the scene from lg up, as the design sets it: the card
              sits over the desk, running past the column to the right. */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: "some" }}
            transition={{ duration: 0.75, delay: 0.3, ease: easeOut }}
            className={cn(
              "mt-12 @container lg:mt-0",
              "lg:absolute lg:right-0 lg:bottom-[6%] lg:w-[54%]",
              "lg:-mr-[5vw] xl:-mr-[2vw]",
            )}
          >
            <Dashboard />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Rahul's personalised home.
 *
 * Sized in `em` off a `cqw` root, so the whole card scales with its column as
 * one object rather than reflowing card-by-card — see the note at the top.
 */
function Dashboard() {
  return (
    <div
      className={cn(
        "rounded-[1.4em] border border-[#7a3ce0]/16 bg-[#fdfcfa]/96",
        "p-[1.4em] shadow-[0_30px_70px_-30px_rgb(40_16_80/0.35)] backdrop-blur-sm",
      )}
      // Scales with the column; floored so it stays legible in the stacked
      // layout, where the container is the full page width.
      style={{ fontSize: "max(11px, 2.4cqw)" }}
    >
      {/* ----------------------------- Header --------------------- */}
      <div className="flex items-start justify-between gap-[1em]">
        <span className="text-[1.05em] font-bold tracking-[-0.01em] text-[#5b12c4]">
          {dashboard.brand}
        </span>

        <span className="flex items-center gap-[0.6em]">
          <span className="flex size-[1.9em] items-center justify-center rounded-full bg-[#570bba]/8">
            <SearchIcon className="size-[1em] text-[#4b4553]" />
          </span>
          <span
            className={cn(
              "flex size-[1.9em] items-center justify-center rounded-full",
              "bg-[#a855f7] text-[0.8em] font-semibold text-white",
            )}
          >
            {dashboard.initial}
          </span>
        </span>
      </div>

      <p className="mt-[0.7em] text-[1.5em] font-bold tracking-[-0.02em] text-[#0d0a12]">
        {dashboard.greeting}
      </p>
      <p className="mt-[0.15em] text-[0.95em] text-[#4b4553]">
        {dashboard.subtitle}
      </p>

      {/* ------------------------------ Cards --------------------- */}
      <div className="mt-[1.1em] grid gap-[0.8em] @sm:grid-cols-2">
        {/* 01 — priorities */}
        <Card index="01" title={dashboard.priorities.title}>
          <ul className="mt-[0.9em] space-y-[0.7em]">
            {dashboard.priorities.items.map((item, index) => (
              <li key={item.label} className="flex items-center gap-[0.7em]">
                <span
                  className={cn(
                    "flex size-[1.9em] shrink-0 items-center justify-center rounded-[0.5em]",
                    // The two markers differ in the design — the first is
                    // amber (due today), the second violet (scheduled).
                    index === 0
                      ? "bg-[#fde68a]/45 text-[#a16207]"
                      : "bg-[#ddd6fe]/60 text-[#6d28d9]",
                  )}
                >
                  <CalendarIcon className="size-[1em]" />
                </span>

                <span className="flex min-w-0 flex-1 items-center gap-[0.5em]">
                  <span className="truncate text-[0.9em] text-[#2c2635]">
                    {item.label}
                  </span>

                  {"badge" in item && item.badge && (
                    <span
                      className={cn(
                        "shrink-0 rounded-full bg-[#fef3c7] px-[0.6em] py-[0.15em]",
                        "text-[0.75em] font-medium text-[#92400e]",
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                  {"meta" in item && item.meta && (
                    <span className="shrink-0 text-[0.85em] text-[#6b6577]">
                      {item.meta}
                    </span>
                  )}
                </span>

                <ChevronIcon className="size-[0.9em] shrink-0 text-[#9a94a6]" />
              </li>
            ))}
          </ul>
        </Card>

        {/* 02 — continue learning */}
        <Card index="02" title={dashboard.continue.title}>
          <div className="mt-[0.9em] flex items-start gap-[0.8em]">
            <Image
              src={dashboard.continue.thumb.src}
              alt={dashboard.continue.thumb.alt}
              width={dashboard.continue.thumb.width}
              height={dashboard.continue.thumb.height}
              sizes="120px"
              className="w-[4.4em] shrink-0 rounded-[0.5em] object-cover"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-[0.9em] font-semibold text-[#181322]">
                {dashboard.continue.lesson}
              </span>

              {/* The progress bar. `role="img"` with a label, so the reading
                  is announced rather than the bar being silent decoration. */}
              <span
                role="img"
                aria-label={`${dashboard.continue.progress}% complete`}
                className="mt-[0.7em] flex items-center gap-[0.6em]"
              >
                <span
                  aria-hidden="true"
                  className="h-[0.4em] flex-1 overflow-hidden rounded-full bg-[#ede9fe]"
                >
                  <span
                    className="block h-full rounded-full bg-[#6d28d9]"
                    style={{ width: `${dashboard.continue.progress}%` }}
                  />
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-[0.78em] text-[#6b6577]"
                >
                  {dashboard.continue.progress}% complete
                </span>
              </span>

              <span
                className={cn(
                  "mt-[0.7em] flex h-[2.1em] w-full items-center justify-center",
                  "rounded-[0.5em] bg-[#7c22ce] text-[0.85em] font-semibold text-white",
                )}
              >
                {dashboard.continue.action}
              </span>
            </span>
          </div>
        </Card>

        {/* 03 — recommended next step */}
        <Card index="03" title={dashboard.recommended.title}>
          <div className="mt-[0.9em] flex items-center gap-[0.8em]">
            <Image
              src={dashboard.recommended.thumb.src}
              alt={dashboard.recommended.thumb.alt}
              width={dashboard.recommended.thumb.width}
              height={dashboard.recommended.thumb.height}
              sizes="120px"
              className="w-[4.4em] shrink-0 rounded-[0.5em] object-cover"
            />

            <span className="min-w-0 flex-1">
              <span className="block text-[0.9em] font-semibold text-[#181322]">
                {dashboard.recommended.lesson}
              </span>
              <span className="mt-[0.2em] block text-[0.82em] text-[#6b6577]">
                {dashboard.recommended.meta}
              </span>
            </span>

            <ChevronIcon className="size-[0.9em] shrink-0 text-[#9a94a6]" />
          </div>
        </Card>

        {/* 04 — explore for you */}
        <Card index="04" title={dashboard.explore.title}>
          <div className="mt-[0.9em] grid grid-cols-2 gap-[0.7em]">
            {dashboard.explore.items.map((item) => (
              <span key={item.label} className="block">
                <Image
                  src={item.thumb.src}
                  alt={item.thumb.alt}
                  width={item.thumb.width}
                  height={item.thumb.height}
                  sizes="200px"
                  className="h-[3.2em] w-full rounded-[0.5em] object-cover"
                />
                <span className="mt-[0.5em] flex items-center gap-[0.4em]">
                  <span className="min-w-0 flex-1 truncate text-[0.82em] text-[#2c2635]">
                    {item.label}
                  </span>
                  <ChevronIcon className="size-[0.85em] shrink-0 text-[#9a94a6]" />
                </span>
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/** One card inside the dashboard, with its numbered marker. */
function Card({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[0.9em] border border-[#e9e3f2] bg-white p-[0.9em]">
      <div className="flex items-center gap-[0.7em]">
        <span
          className={cn(
            "flex size-[1.9em] shrink-0 items-center justify-center rounded-full",
            "bg-[#f3ecfd] text-[0.75em] font-bold text-[#6d28d9]",
          )}
        >
          {index}
        </span>
        <span className="text-[0.92em] font-semibold text-[#181322]">
          {title}
        </span>
      </div>

      {children}
    </div>
  );
}

/** The search affordance in the dashboard header. */
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m10.4 10.4 2.6 2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The marker beside each priority. */
function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="2.4"
        y="3.2"
        width="11.2"
        height="10.4"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M2.4 6.6h11.2M5.6 2v2.4M10.4 2v2.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The disclosure arrow on the dashboard's rows. */
function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="m6 3.5 5 4.5-5 4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
