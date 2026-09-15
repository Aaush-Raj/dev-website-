"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { platform } from "@/content/platform";
import { cn } from "@/lib/utils";

import { FabricIcon, engineIcons } from "./PlatformEngineIcons";
import { ArrowRightIcon } from "./PlatformIcons";

/**
 * PLATFORM ENGINES
 * ---------------------------------------------------------------------------
 * Section 4 of /platform: three tabs of four engines each, the copy on the
 * right, and the Fabric band across the foot.
 *
 * THE TABS ARE REAL TABS. They use the WAI-ARIA tab pattern rather than three
 * styled buttons: `role="tablist"` with `aria-selected` on each, arrow-key
 * navigation between them, and a panel tied back with `aria-labelledby`. That
 * matters because the four cards genuinely change — a screen-reader user needs
 * to know which set they are in and be able to move between sets the same way
 * a pointer user can.
 *
 * Only the selected panel is rendered. Keeping all twelve cards mounted and
 * hiding eight would put engines in the tab order that nobody can see.
 *
 * THE CARDS ARE REBUILT IN MARKUP, as every other product mockup on this site
 * is — the design ships them as ~190KB PNGs (~2.3MB together) with their copy
 * baked in. Rebuilt they cost a fraction of that, stay sharp, and each becomes
 * a REAL LINK to its own page rather than a picture of one. Eleven of the
 * twelve have a route; LurnySim does not, so its card renders as a plain
 * panel rather than a link to nowhere.
 *
 * THE FABRIC BAND is rebuilt for the same reason section 2's was: the design
 * ships it as a 1548x164 strip with its disc baked in, and a fixed-aspect
 * strip cannot stretch to another viewport without squashing what is inside.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

const { engines } = platform;

export function PlatformEngines() {
  const reduce = useReducedMotion();
  const tabsId = useId();

  /**
   * Widened to the union of every group id — the content's `as const` infers
   * the initial value's literal alone, which would reject the other two.
   */
  type GroupId = (typeof engines.groups)[number]["id"];
  const [active, setActive] = useState<GroupId>(engines.groups[0].id);
  const group =
    engines.groups.find((entry) => entry.id === active) ?? engines.groups[0];

  const rise = (delay: number) => ({
    initial: reduce ? "shown" : "hidden",
    whileInView: "shown",
    viewport: { once: true, amount: "some" } as const,
    variants: {
      hidden: { opacity: 0, y: 18 },
      shown: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: reduce ? 0 : delay,
          ease: easeOut,
        },
      },
    },
  });

  /**
   * Arrow keys move between tabs, as the tab pattern expects. Home and End
   * jump to the ends; focus follows selection, which is right here because
   * switching is instant and has no cost.
   */
  function onTabKeyDown(event: React.KeyboardEvent, index: number) {
    const last = engines.groups.length - 1;
    const next =
      event.key === "ArrowRight"
        ? index === last
          ? 0
          : index + 1
        : event.key === "ArrowLeft"
          ? index === 0
            ? last
            : index - 1
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;

    if (next === null) return;

    event.preventDefault();
    const target = engines.groups[next];
    setActive(target.id);
    document.getElementById(`${tabsId}-tab-${target.id}`)?.focus();
  }

  return (
    <section className="relative overflow-hidden bg-[#2f2744]">
      <div aria-hidden="true" className="absolute inset-0">
        <Image
          src={engines.backdrop.src}
          alt={engines.backdrop.alt}
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <Container width="hero" className="relative">
        <div
          className={cn(
            "grid items-start gap-12",
            "py-20 sm:py-24 lg:py-24 xl:py-28",
            "lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:gap-14",
          )}
        >
          {/* ======================= Tabs and cards ==================== */}
          <div>
            <motion.div
              {...rise(0)}
              role="tablist"
              aria-label="Engine groups"
              className="flex flex-wrap gap-2.5"
            >
              {engines.groups.map((entry, index) => {
                const selected = entry.id === active;

                return (
                  <button
                    key={entry.id}
                    id={`${tabsId}-tab-${entry.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${tabsId}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(entry.id)}
                    onKeyDown={(event) => onTabKeyDown(event, index)}
                    className={cn(
                      "relative cursor-pointer rounded-xl px-5 py-3.5",
                      "text-[0.9375rem] font-semibold",
                      "transition-[background-color,color] duration-300",
                      "ease-[cubic-bezier(0.16,1,0.3,1)]",
                      "focus-visible:outline-2 focus-visible:outline-offset-2",
                      "focus-visible:outline-[#a78bfa]",
                      selected
                        ? "bg-[#730fff] text-white"
                        : "bg-[#332849] text-[#c3b5de] hover:bg-[#3c3055] hover:text-white",
                      "motion-reduce:transition-none",
                    )}
                  >
                    {entry.label}
                    {/* The design underscores the selected tab. */}
                    {selected && (
                      <motion.span
                        aria-hidden="true"
                        layoutId={reduce ? undefined : `${tabsId}-underline`}
                        className="absolute inset-x-5 bottom-2 h-0.5 rounded-full bg-white/70"
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/*
              Only the selected panel is rendered, so the eight engines that
              are not on screen are not in the tab order either.
            */}
            <div
              id={`${tabsId}-panel`}
              role="tabpanel"
              aria-labelledby={`${tabsId}-tab-${active}`}
              className="mt-5"
            >
              <AnimatePresence mode="wait">
                <motion.ul
                  key={group.id}
                  className="grid gap-5 sm:grid-cols-2"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.12 }}
                >
                  {group.cards.map((card, index) => (
                    <motion.li
                      key={card.name}
                      initial={reduce ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.42,
                        delay: reduce ? 0 : index * 0.04,
                        ease: easeOut,
                      }}
                    >
                      <EngineCard card={card} />
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>

          {/* =========================== Statement ===================== */}
          <div className="lg:pt-6">
            <motion.p
              {...rise(0.06)}
              className={cn(
                "text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
                "text-[#c59bf8] sm:text-xs",
              )}
            >
              {engines.eyebrow}
            </motion.p>

            <h2
              className={cn(
                "mt-5 font-display font-bold tracking-[-0.03em]",
                "leading-[1.04] text-white",
                "text-[2rem] sm:text-[2.5rem] xl:text-[3.25rem]",
              )}
            >
              {engines.headline.map((line, index) => (
                <motion.span
                  key={line.text}
                  {...rise(0.12 + index * 0.06)}
                  className={cn(
                    "block",
                    "accent" in line && line.accent && "text-[#cca9fd]",
                  )}
                >
                  {line.text}
                </motion.span>
              ))}
            </h2>

            <motion.p
              {...rise(0.4)}
              className={cn(
                "mt-7 max-w-[32rem] leading-relaxed text-pretty",
                "text-[1rem] text-[#d1bdf9] sm:text-[1.0625rem]",
              )}
            >
              {engines.description}
            </motion.p>
          </div>
        </div>

        {/* ========================= Fabric band ===================== */}
        <motion.div {...rise(0.1)} className="pb-20 lg:pb-24">
          <Link
            href={engines.fabric.action.href}
            className={cn(
              "group/band flex flex-wrap items-center gap-5",
              "rounded-[1.5rem] px-6 py-6 sm:px-8",
              "bg-[#412e5c]/70 ring-1 ring-white/12 backdrop-blur-sm",
              "transition-[background-color,box-shadow,transform] duration-300",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:-translate-y-0.5 hover:bg-[#4a3568]/80",
              "hover:shadow-[0_24px_60px_-32px_rgb(10_0_30/0.9)]",
              "focus-visible:outline-2 focus-visible:outline-offset-4",
              "focus-visible:outline-[#a78bfa]",
              "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "grid size-14 shrink-0 place-items-center rounded-full",
                "bg-[#efe3fd] text-[#6d28d9]",
                "transition-transform duration-300",
                "ease-[cubic-bezier(0.16,1,0.3,1)]",
                "group-hover/band:scale-105",
                "motion-reduce:transition-none",
                "motion-reduce:group-hover/band:scale-100",
              )}
            >
              <FabricIcon className="size-7" />
            </span>

            <span className="min-w-0 flex-auto">
              <span className="block font-display text-[1.125rem] font-bold text-white sm:text-[1.3125rem]">
                {engines.fabric.title}
              </span>
              <span className="mt-1 block text-[0.9375rem] leading-relaxed text-pretty text-[#c9b8e8]">
                {engines.fabric.description}
              </span>
            </span>

            <span
              className={cn(
                "inline-flex shrink-0 items-center gap-2",
                "text-[0.9375rem] font-semibold text-[#c9a6fb]",
                "transition-colors duration-300",
                "group-hover/band:text-white",
              )}
            >
              {engines.fabric.action.label}
              <ArrowRightIcon
                className={cn(
                  "size-4 transition-transform duration-300",
                  "ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "group-hover/band:translate-x-1",
                  "motion-reduce:transition-none",
                  "motion-reduce:group-hover/band:translate-x-0",
                )}
              />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ====================================================================== */
/*  One engine card                                                       */
/* ====================================================================== */

type Card = (typeof engines.groups)[number]["cards"][number];

/**
 * A card. It renders as a link where the engine has a page and as a plain
 * panel where it does not — LurnySim has no route yet, and a card that looks
 * clickable but goes nowhere is worse than one that does not invite the click.
 */
function EngineCard({ card }: { card: Card }) {
  const Icon = engineIcons[card.icon];
  const href = "href" in card ? card.href : undefined;

  const body = (
    <>
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className={cn(
            "grid size-[3.25rem] shrink-0 place-items-center rounded-full",
            "bg-[#f0e7fd]",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            "group-hover/card:scale-105",
            "motion-reduce:transition-none motion-reduce:group-hover/card:scale-100",
          )}
        >
          <Icon className="size-8" />
        </span>

        <div className="min-w-0">
          <p className="font-display text-[1.0625rem] font-bold text-neutral-900">
            {card.name}
          </p>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-pretty text-neutral-600">
            {card.description}
          </p>
        </div>
      </div>

      {href && (
        <p
          className={cn(
            "mt-5 inline-flex items-center gap-2",
            "text-[0.875rem] font-semibold text-[#6d28d9]",
          )}
        >
          {engines.exploreLabel.replace("{0}", card.name)}
          <ArrowRightIcon
            className={cn(
              "size-4 transition-transform duration-300",
              "ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover/card:translate-x-1",
              "motion-reduce:transition-none",
              "motion-reduce:group-hover/card:translate-x-0",
            )}
          />
        </p>
      )}
    </>
  );

  const shell = cn(
    "group/card flex h-full flex-col rounded-[1.25rem] bg-[#f7f3ff] p-5",
    "transition-[transform,box-shadow] duration-300",
    "ease-[cubic-bezier(0.16,1,0.3,1)]",
    "motion-reduce:transition-none",
  );

  if (!href) {
    return <div className={shell}>{body}</div>;
  }

  return (
    <Link
      href={href}
      className={cn(
        shell,
        "hover:-translate-y-1",
        "hover:shadow-[0_26px_56px_-28px_rgb(10_0_40/0.6)]",
        "focus-visible:outline-2 focus-visible:outline-offset-4",
        "focus-visible:outline-[#a78bfa]",
        "motion-reduce:hover:translate-y-0",
      )}
    >
      {body}
    </Link>
  );
}
