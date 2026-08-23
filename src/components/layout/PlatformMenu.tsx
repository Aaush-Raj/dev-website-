"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { ArrowRightIcon } from "@/components/sections/hero/DashboardIcons";
import { platformMenu } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * PLATFORM MENU
 * ---------------------------------------------------------------------------
 * The mega-menu panel that drops from the "Platform" nav item: three columns
 * of engines divided by vertical rules, then a footer band.
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

export function PlatformMenu({ id }: { id: string }) {
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
      {/* =========================== Columns ======================== */}
      <div className="grid gap-x-8 gap-y-10 p-8 md:grid-cols-3 lg:gap-x-12 lg:p-10">
        {platformMenu.columns.map((column, columnIndex) => (
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

            <ul className="mt-6 flex flex-col gap-6">
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
                    {/* The lavender disc is part of the icon asset, so no
                        circle is drawn here. */}
                    <Image
                      src={`/assets/icons/engines/${item.icon}.png`}
                      alt=""
                      width={128}
                      height={128}
                      // Decorative: the engine name beside it is the label.
                      aria-hidden="true"
                      className={cn(
                        "size-14 shrink-0",
                        // `scale`, not `transform` — Tailwind v4 compiles the
                        // scale utilities to the standalone property.
                        "transition-[scale] duration-300 ease-out",
                        "group-hover:scale-105",
                      )}
                    />

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
                          "mt-1 block max-w-60 text-[0.8125rem]",
                          "leading-snug text-pretty text-neutral-500",
                        )}
                      >
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
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
            {platformMenu.footer.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <Link
            href={platformMenu.footer.action.href}
            className={cn(
              "group inline-flex shrink-0 items-center gap-2 rounded-md",
              "text-[0.9375rem] font-semibold text-brand-700",
              "duration-fast transition-colors hover:text-brand-600",
            )}
          >
            {platformMenu.footer.action.label}
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
