"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { ResourceIcon } from "@/components/layout/ResourcesMenuIcons";
import { megaMenus, type MegaMenuKey } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * MEGA MENU
 * ---------------------------------------------------------------------------
 * The panel that drops from a nav item marked `mega`: columns of entries
 * divided by vertical rules, then a footer band. One component serves every
 * such menu — pass the key naming which one to render.
 *
 * The panels differ only in their icons, and the data says which treatment to
 * use: a menu with an `iconPath` ships painted PNGs with the lavender disc
 * baked into the asset (Platform and Solutions), while one without draws
 * stroked glyphs inside a disc of its own (Resources). See the note in
 * ResourcesMenuIcons for why the second set is drawn.
 *
 * This component renders the PANEL only. Open/close state, hover intent and
 * keyboard handling live in Header, because they involve the trigger too.
 *
 * ACCESSIBILITY
 * Header UNMOUNTS this panel when closed rather than hiding it with opacity,
 * so its links leave the tab order entirely — a panel that is invisible but
 * still focusable strands keyboard users on targets they cannot see.
 *
 * The dividers are left borders on columns 2 and 3 rather than a wrapper per
 * column, so rules fall only BETWEEN columns and never as a stray outer edge.
 */

const easeOut = [0.16, 1, 0.3, 1] as const;

export function MegaMenu({ id, menu }: { id: string; menu: MegaMenuKey }) {
  const reduce = useReducedMotion();
  const { columns, footer, iconPath } = megaMenus[menu];

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
      {/* =========================== Columns ======================== */}
      {/* The column count follows the data: Platform has three, Solutions and
          Resources two. Hard-coding three would leave the narrower panels with
          an empty trailing column. */}
      <div
        className={cn(
          "grid gap-x-8 gap-y-10 p-8 lg:gap-x-12 lg:p-10",
          columns.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={column.title}
            className={cn(
              columnIndex > 0 &&
                "md:border-l md:border-neutral-200/80 md:pl-8 lg:pl-12",
            )}
          >
            <p
              className={cn(
                "text-[0.6875rem] font-bold tracking-[0.1em] uppercase",
                "text-brand-600",
              )}
            >
              {column.title}
            </p>

            {/* Paired columns lay their items two per row — see `paired` in
                the navigation data for why the Solutions panel needs it. */}
            <ul
              className={cn(
                "mt-6",
                column.paired
                  ? "grid gap-x-6 gap-y-6 sm:grid-cols-2"
                  : "flex flex-col gap-6",
              )}
            >
              {column.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group -m-2 flex items-start gap-4 rounded-xl p-2",
                      "duration-fast transition-colors",
                      "hover:bg-neutral-50",
                      "focus-visible:bg-neutral-50 focus-visible:outline-none",
                    )}
                  >
                    {/* A menu with an `iconPath` ships painted PNGs whose
                        lavender disc is already in the asset, so nothing is
                        drawn around them. One without draws its own — see
                        ResourceIcon. */}
                    {iconPath ? (
                      <Image
                        src={`${iconPath}/${item.icon}.png`}
                        alt=""
                        width={128}
                        height={128}
                        // Decorative: the engine name beside it is the label.
                        aria-hidden="true"
                        className={cn(
                          "size-14 shrink-0",
                          // `scale`, not `transform` — Tailwind v4 compiles
                          // the scale utilities to the standalone property.
                          "transition-[scale] duration-300 ease-out",
                          "group-hover:scale-105",
                        )}
                      />
                    ) : (
                      <ResourceIcon name={item.icon} />
                    )}

                    <span className="min-w-0">
                      <span
                        className={cn(
                          "block font-semibold tracking-[-0.01em]",
                          "text-[0.9375rem] text-neutral-900",
                        )}
                      >
                        {item.name}
                      </span>
                      {/* Constrained so descriptions wrap to two lines as in
                          the design, rather than running as one long line. */}
                      <span
                        className={cn(
                          "mt-1 block text-[0.8125rem]",
                          "leading-snug text-pretty text-neutral-500",
                          // The cap keeps single-file descriptions to two
                          // lines; a paired column is already half-width, so
                          // capping it again would wrap to three.
                          !column.paired && "max-w-60",
                        )}
                      >
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* The link closing a column, where the data supplies one. */}
            {column.action && (
              <Link
                href={column.action.href}
                className={cn(
                  "group mt-6 inline-flex items-center gap-2 rounded-md",
                  "text-[0.9375rem] font-semibold text-brand-700",
                  "duration-fast transition-colors hover:text-brand-600",
                  "focus-visible:outline-none focus-visible:underline",
                )}
              >
                {column.action.label}
                <ArrowRightIcon
                  className={cn(
                    "duration-normal size-4 transition-transform ease-out",
                    "group-hover:translate-x-1",
                  )}
                />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* ============================ Footer ======================== */}
      <div className="px-8 pb-8 lg:px-10 lg:pb-10">
        <div
          className={cn(
            "flex flex-col gap-5 rounded-2xl bg-brand-50/70 p-6",
            "sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:p-7",
          )}
        >
          <p
            className={cn(
              "font-display text-lg font-semibold tracking-[-0.015em]",
              "leading-snug text-neutral-900 sm:text-xl",
            )}
          >
            {footer.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <Link
            href={footer.action.href}
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 rounded-md",
              "text-[0.9375rem] font-semibold text-brand-700",
              "duration-fast transition-colors hover:text-brand-600",
            )}
          >
            {footer.action.label}
            <ArrowRightIcon
              className={cn(
                "duration-normal size-4 transition-transform ease-out",
                "group-hover:translate-x-1",
              )}
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
