"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Uncopyable } from "@/components/ui/Uncopyable";
import { industriesPage } from "@/content/industries-page";
import { cn } from "@/lib/utils";

/**
 * INDUSTRIES TELECOM
 * ---------------------------------------------------------------------------
 * Section 5 of the Industries page: copy and three points on the left, an
 * isometric network scene on the right overlaid with six panels.
 *
 * THE SCENE SHIPS AS AN IMAGE — a rendered 3D illustration of towers, a hub
 * and their glowing links, which markup could not reproduce. The PANELS over
 * it are DRAWN from content, as everywhere else on this build: the design's
 * composite bakes their labels into pixels, and a picture of text cannot
 * re-flow, is invisible to search and turns soft when scaled.
 *
 * THE OVERLAY GEOMETRY
 * Panels and site labels are positioned as percentages of the scene's own
 * box, whose aspect matches the artwork's — so the whole arrangement scales
 * as one unit and a label always sits beside the site it names.
 *
 * Below xl the overlay is dropped and the panels stack beneath the scene.
 * At that width six floating panels over a small illustration would be
 * unreadable, and the scene is decoration rather than the point.
 *
 * THE BACKGROUND is a faint grid drawn in CSS — the design's own texture is a
 * regular lattice, which two repeating-linear-gradients reproduce for nothing
 * rather than shipping another image.
 */

const { telecom } = industriesPage;

/** Motion's string easings are not typed, so the cubic curve is spelled out. */
const easeOut = [0.16, 1, 0.3, 1] as const;

/** Shared chrome for a drawn panel. */
const panelChrome = cn(
  "rounded-xl bg-[#131a2e]/95 backdrop-blur-sm",
  "ring-1 ring-white/10",
  "shadow-[0_18px_44px_-20px_rgb(0_0_0/0.85)]",
);

/** A tick, for a completed step or milestone. */
function TickIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** A warning triangle, for the risk callout. */
function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3.9 21.4 20H2.6z" />
      <path d="M12 10.2v4.1M12 17.2h.01" strokeWidth="2" />
    </svg>
  );
}

/** A progress track that fills on scroll. */
function Progress({
  value,
  reduce,
  delay = 0.5,
}: {
  value: number;
  reduce: boolean | null;
  delay?: number;
}) {
  return (
    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-white/10">
      <motion.span
        className="block h-full rounded-full bg-[#28b7bd]"
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.9, delay: reduce ? 0 : delay, ease: easeOut }}
        style={{ width: `${value}%`, transformOrigin: "left" }}
      />
    </span>
  );
}

/** BOX 01 — the rollout phase tracker. */
function RolloutPanel({ reduce }: { reduce: boolean | null }) {
  const { rollout } = telecom;

  return (
    <div className={cn(panelChrome, "p-4")}>
      <p className="text-[0.9375rem] font-semibold text-white">
        {rollout.title}
      </p>

      {/* The step rail. The connecting line sits behind the nodes. */}
      <ol className="relative mt-4 flex justify-between">
        <span
          aria-hidden="true"
          className="absolute inset-x-3 top-2 h-px bg-white/15"
        />

        {rollout.steps.map((step) => (
          <li
            key={step.label}
            className="relative flex flex-1 flex-col items-center gap-2"
          >
            <span
              className={cn(
                "grid size-4 place-items-center rounded-full",
                step.state === "done" && "bg-[#28b7bd] text-[#08131c]",
                step.state === "active" && "bg-[#0d1420] ring-2 ring-[#3fd0d8]",
                step.state === "todo" && "bg-[#0d1420] ring-1 ring-white/25",
              )}
            >
              {step.state === "done" && <TickIcon className="size-2.5" />}
              {step.state === "active" && (
                <span className="size-1.5 rounded-full bg-[#3fd0d8]" />
              )}
            </span>

            <span
              className={cn(
                "text-center text-[0.625rem] leading-tight",
                step.state === "todo" ? "text-neutral-500" : "text-neutral-300",
              )}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>

      <p className="mt-4 text-[0.8125rem] text-neutral-300">
        {rollout.progress.label}
      </p>
      <Progress value={rollout.progress.value} reduce={reduce} delay={0.6} />
    </div>
  );
}

/** BOX 02 — the risk callout. */
function RiskPanel() {
  const { risk } = telecom;

  return (
    <div
      className={cn(
        "rounded-xl bg-[#131a2e]/95 p-4 backdrop-blur-sm",
        // The design outlines this one in its own orange rather than the
        // hairline the other panels take — it is the alert.
        "ring-1 ring-[#e37928]/70",
        "shadow-[0_18px_44px_-20px_rgb(0_0_0/0.85)]",
      )}
    >
      <p className="flex items-start gap-2.5">
        <AlertIcon className="mt-px size-4 shrink-0 text-[#e37928]" />
        <span className="text-[0.75rem] leading-snug font-semibold text-[#e37928]">
          {risk.title}
        </span>
      </p>

      <dl className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
        {risk.rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-3">
            <dt className="text-[0.75rem] text-neutral-400">{row.label}</dt>
            <dd className="text-[0.75rem] font-semibold text-[#e8a44f]">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-3 border-t border-white/10 pt-3">
        <p className="text-[0.75rem] text-neutral-400">
          {risk.mitigation.label}
        </p>
        <p className="mt-0.5 text-[0.75rem] text-neutral-200">
          {risk.mitigation.value}
        </p>
      </div>
    </div>
  );
}

/** BOX 03 — milestones and dependencies. */
function MilestonesPanel() {
  const { milestones } = telecom;

  return (
    <div className={cn(panelChrome, "p-4")}>
      <p className="border-b border-white/10 pb-3 text-[0.8125rem] font-semibold text-white">
        {milestones.title}
      </p>

      <ol className="mt-3 space-y-2.5">
        {milestones.items.map((item, index) => (
          <li key={item.label} className="relative flex items-center gap-2.5">
            {/* The dotted rail joining the markers, as the design draws it. */}
            {index < milestones.items.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-4 left-[7px] h-3.5 w-px",
                  item.state === "done" ? "bg-[#28b7bd]/50" : "bg-white/15",
                )}
              />
            )}

            <span
              className={cn(
                "grid size-3.5 shrink-0 place-items-center rounded-full",
                item.state === "done" && "bg-[#28b7bd] text-[#08131c]",
                item.state === "active" && "ring-2 ring-[#3fd0d8]",
                item.state === "todo" && "ring-1 ring-white/25",
              )}
            >
              {item.state === "done" && <TickIcon className="size-2" />}
            </span>

            <span
              className={cn(
                "flex-1 text-[0.6875rem] leading-tight",
                item.state === "active"
                  ? "text-[#3fd0d8]"
                  : item.state === "todo"
                    ? "text-neutral-500"
                    : "text-neutral-300",
              )}
            >
              {item.label}
            </span>

            <span
              className={cn(
                "text-[0.6875rem] tabular-nums",
                item.state === "active"
                  ? "text-[#3fd0d8]"
                  : item.state === "todo"
                    ? "text-neutral-600"
                    : "text-neutral-400",
              )}
            >
              {item.value}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** BOXES 04-06 — the three cards along the foot. */
function FootCards({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {telecom.cards.map((card, index) => (
        <div key={card.title} className={cn(panelChrome, "flex flex-col p-4")}>
          <div className="flex items-start gap-3">
            <Image
              src={card.icon}
              alt=""
              aria-hidden="true"
              width={128}
              height={128}
              className="size-8 shrink-0 object-contain"
            />

            <div className="min-w-0">
              <p className="text-[0.8125rem] leading-snug font-semibold text-[#3fd0d8]">
                {card.title}
                {"meta" in card && (
                  <span className="font-normal text-neutral-300">
                    {" · "}
                    {card.meta}
                  </span>
                )}
              </p>
            </div>
          </div>

          <p className="mt-2.5 flex-1 text-[0.75rem] leading-relaxed text-neutral-400">
            {card.description}
          </p>

          {card.kind === "progress" && (
            <div className="mt-3">
              <p className="text-[0.75rem] text-neutral-300">
                {card.progress.label}
              </p>
              <Progress
                value={card.progress.value}
                reduce={reduce}
                delay={0.7 + index * 0.1}
              />
            </div>
          )}

          {card.kind === "tag" && (
            <p className="mt-3">
              <span
                className={cn(
                  "inline-block rounded-md bg-[#28b7bd]/15 px-2.5 py-1",
                  "text-[0.6875rem] font-medium text-[#3fd0d8]",
                )}
              >
                {card.tag}
              </span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export function IndustriesTelecom() {
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

  /** Shared entrance for an overlaid panel. */
  const panel = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 12, scale: 0.98 },
      shown: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, delay, ease: easeOut },
      },
    },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[#090e20] py-section-lg text-white">
      {/* ===================== Background layers ====================== */}
      {/*
        The grid texture, drawn rather than shipped: the design's own is a
        regular lattice, which two repeating gradients reproduce for nothing.
      */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 opacity-[0.6]",
          "bg-[repeating-linear-gradient(0deg,rgb(90_150_190/0.05)_0px,rgb(90_150_190/0.05)_1px,transparent_1px,transparent_44px),repeating-linear-gradient(90deg,rgb(90_150_190/0.05)_0px,rgb(90_150_190/0.05)_1px,transparent_1px,transparent_44px)]",
        )}
      />

      {/* A cool bloom behind the scene, so the illustration sits in light. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -z-10",
          "top-1/2 right-[6%] h-[38rem] w-[46rem] -translate-y-1/2",
          "rounded-full bg-[#1a4a7a]/22 blur-3xl",
        )}
      />

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid gap-12",
            "lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-8",
            "lg:items-center xl:gap-12",
          )}
        >
          {/* ============================ Copy ======================== */}
          <div>
            <motion.p
              {...rise(0)}
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.2em] uppercase",
                "text-[#e08a2e] sm:text-xs",
              )}
            >
              {telecom.eyebrow}
            </motion.p>

            <motion.h2
              {...rise(0.08)}
              className={cn(
                "mt-6 font-display font-bold tracking-[-0.03em]",
                "leading-[1.1] text-balance",
                // Measured from the design at ~46px on a 1440 frame.
                "text-[1.875rem] sm:text-[2.25rem] xl:text-[2.625rem]",
              )}
            >
              {telecom.headline.map((line) => (
                <span key={line} className="inline lg:block">
                  {line}{" "}
                </span>
              ))}
            </motion.h2>

            <motion.p
              {...rise(0.16)}
              className={cn(
                "mt-6 max-w-[28rem] leading-relaxed text-pretty",
                "text-[0.9375rem] text-neutral-400",
              )}
            >
              {telecom.description}
            </motion.p>

            {/* -------------------------- Points --------------------- */}
            <ul className="mt-10 space-y-6">
              {telecom.points.map((point, index) => (
                <motion.li
                  key={point.title}
                  {...rise(0.24 + index * 0.08)}
                  className={cn(
                    "group flex items-start gap-5",
                    // A hairline above each point after the first, as the
                    // design separates them.
                    index > 0 && "border-t border-white/10 pt-6",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-14 shrink-0 place-items-center rounded-xl",
                      "bg-white/4 ring-1 ring-white/10",
                      // `scale`, not `transform`: Tailwind v4 compiles the
                      // scale utilities to the standalone property.
                      "duration-normal transition-[scale,background-color] ease-out",
                      "group-hover:scale-105 group-hover:bg-white/8",
                    )}
                  >
                    <Image
                      src={point.icon}
                      alt=""
                      aria-hidden="true"
                      width={128}
                      height={128}
                      className="size-7 object-contain"
                    />
                  </span>

                  <div className="min-w-0">
                    <h3 className="text-[1.0625rem] font-semibold">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-[0.875rem] leading-relaxed text-pretty text-neutral-400">
                      {point.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* ========================= Showcase ======================= */}
          <div>
            {/*
              The scene and its overlay. The box's aspect matches the
              artwork's, so a percentage lands on the same spot at any width.
            */}
            <motion.div
              initial={reduce ? "shown" : "hidden"}
              whileInView="shown"
              viewport={{ once: true, amount: "some" }}
              variants={{
                hidden: { opacity: 0, scale: 0.97 },
                shown: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.9, delay: 0.1, ease: easeOut },
                },
              }}
              className="relative aspect-[1200/620] w-full"
            >
              <Image
                src={telecom.scene.src}
                alt={telecom.scene.alt}
                fill
                sizes="(min-width: 1024px) 62vw, 92vw"
                className="object-contain"
              />

              {/* -------------------- Site labels ---------------- */}
              {/* xl only: below that the scene is too small for five pinned
                  labels to be legible. */}
              <Uncopyable className="hidden xl:block">
                {telecom.sites.map((site, index) => (
                  <motion.span
                    key={site.label}
                    {...panel(0.5 + index * 0.06)}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2",
                      "rounded-md bg-[#131a2e]/90 px-2.5 py-1 backdrop-blur-sm",
                      "text-[0.6875rem] whitespace-nowrap text-neutral-200",
                      "ring-1 ring-white/12",
                    )}
                    style={{ left: `${site.left}%`, top: `${site.top}%` }}
                  >
                    {site.label}
                  </motion.span>
                ))}
              </Uncopyable>

              {/* ---------------- Overlaid panels (xl) ----------- */}
              <Uncopyable className="hidden xl:block">
                <motion.div
                  {...panel(0.25)}
                  className="absolute top-[-4%] left-[18%] w-[48.5%]"
                >
                  <RolloutPanel reduce={reduce} />
                </motion.div>

                <motion.div
                  {...panel(0.35)}
                  className="absolute top-[8%] left-[70%] w-[28.8%]"
                >
                  <RiskPanel />
                </motion.div>

                <motion.div
                  {...panel(0.45)}
                  className="absolute bottom-[2%] left-0 w-[21.5%]"
                >
                  <MilestonesPanel />
                </motion.div>
              </Uncopyable>
            </motion.div>

            {/* ------------------- Foot cards (xl) ------------- */}
            <motion.div
              {...panel(0.6)}
              className="mt-6 hidden xl:mt-2 xl:block"
            >
              <Uncopyable>
                <FootCards reduce={reduce} />
              </Uncopyable>
            </motion.div>

            {/* --------------- Stacked panels (below xl) ------- */}
            {/*
              The overlay is dropped below xl and the panels stack here
              instead: six floating cards over a small illustration would be
              unreadable, and the scene is decoration rather than the point.
            */}
            <Uncopyable className="mt-8 space-y-3 xl:hidden">
              <RolloutPanel reduce={reduce} />
              <RiskPanel />
              <MilestonesPanel />
              <FootCards reduce={reduce} />
            </Uncopyable>
          </div>
        </div>
      </Container>
    </section>
  );
}
