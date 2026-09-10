"use client";

import Link from "next/link";
import { useId } from "react";

import { pricing } from "@/content/pricing";
import { cn } from "@/lib/utils";

import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  badgeIcons,
} from "./PricingIcons";
import type { EngineSelection } from "./useEngineSelection";

/**
 * PRICING — ENGINE CARD
 * ---------------------------------------------------------------------------
 * One engine in the catalogue: a monogram mark, its name and descriptor, an
 * availability badge where the source inventory confirms one, an
 * "Add to enquiry" toggle, a features accordion and a link to its own page.
 *
 * THE ACCORDION is a button with `aria-expanded` and `aria-controls` over a
 * panel that is genuinely `hidden` when closed — not merely collapsed to zero
 * height — so its contents stay out of the tab order and out of a screen
 * reader's path. Opening one engine never closes another; the parent owns the
 * open set.
 *
 * SELECTION IS NEVER COLOUR-ONLY. The button's visible label changes from
 * "Add to enquiry" (or "Register interest") to "Added", and `aria-pressed`
 * carries the same fact, so the state survives both a monochrome screen and a
 * screen reader.
 *
 * THE BADGES ARE THE SOURCE INVENTORY'S, not decoration. Four engines are
 * pilot, one is in development, one is register-interest — and the remaining
 * six carry NOTHING, because "available now" has not been confirmed for them.
 * Adding a badge to those needs sign-off, not a design decision.
 */

type Engine = (typeof pricing.catalogue.engines)[number];

interface EngineCardProps {
  engine: Engine;
  selection: EngineSelection;
  open: boolean;
  onToggleOpen: () => void;
}

export function EngineCard({
  engine,
  selection,
  open,
  onToggleOpen,
}: EngineCardProps) {
  const panelId = useId();
  const added = selection.has(engine.id);
  const BadgeIcon = engine.badge ? badgeIcons[engine.badge.tone] : null;

  return (
    <article
      id={`engine-${engine.id}`}
      className={cn(
        "rounded-2xl bg-white p-5 sm:p-6",
        "ring-1 transition-shadow",
        added
          ? "ring-2 ring-[#7F52BB]"
          : "ring-neutral-200 hover:shadow-[0_12px_32px_-18px_rgb(43_25_66/0.35)]",
      )}
    >
      <div className="flex items-start gap-4">
        {/* A two-letter monogram, not an icon: the package ships no
            per-engine icon set, and inventing one would be a design
            decision rather than a transcription. */}
        <span
          aria-hidden="true"
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-xl",
            "bg-[#F4EFFA] font-display text-[0.8125rem] font-bold",
            "tracking-[0.04em] text-[#6B41A3]",
          )}
        >
          {engine.mark}
        </span>

        <div className="min-w-0 flex-auto">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="font-display text-[1.0625rem] font-semibold text-neutral-900">
              {engine.name}
            </h3>

            {engine.badge && BadgeIcon && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full",
                  "px-2.5 py-1 text-[0.6875rem] font-semibold",
                  engine.badge.tone === "pilot" &&
                    "bg-[#EAF2FB] text-[#2F6699]",
                  engine.badge.tone === "dev" && "bg-[#FFF8EC] text-[#9A6516]",
                  engine.badge.tone === "concept" &&
                    "bg-[#F1F1F7] text-[#5E5C73]",
                )}
              >
                <BadgeIcon className="size-3" />
                {engine.badge.label}
              </span>
            )}
          </div>

          <p className="mt-1 text-[0.8125rem] font-medium text-[#7F52BB]">
            {engine.descriptor}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-pretty text-neutral-600">
            {engine.summary}
          </p>
        </div>
      </div>

      {/* ------------------------- Actions ------------------------- */}
      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={() => selection.toggle(engine.id)}
          aria-pressed={added}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-full",
            "px-4 py-2 text-[0.8125rem] font-semibold transition-colors",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-[#7F52BB]",
            added
              ? "bg-[#7F52BB] text-white hover:bg-[#6B41A3]"
              : "bg-[#F4EFFA] text-[#563285] hover:bg-[#E8DDF5]",
          )}
        >
          {added && <CheckIcon className="size-3.5" />}
          {added ? pricing.catalogue.addedLabel : engine.addLabel}
        </button>

        <button
          type="button"
          onClick={onToggleOpen}
          aria-expanded={open}
          aria-controls={panelId}
          className={cn(
            "inline-flex cursor-pointer items-center gap-1.5 rounded-full",
            "border border-neutral-300 px-4 py-2",
            "text-[0.8125rem] font-semibold text-neutral-700",
            "transition-colors hover:border-neutral-400 hover:text-neutral-900",
            "focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-[#7F52BB]",
          )}
        >
          {engine.toggleLabel}
          <ChevronDownIcon
            className={cn(
              "size-4 transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        {/*
          The package pointed these at placeholder `/products/*` paths that do
          not exist. Each engine with a real route links to it; the ones
          without (Flix, Fabric) carry no link at all rather than a dead one.
        */}
        {"href" in engine && engine.href && (
          <Link
            href={engine.href}
            className={cn(
              "group inline-flex items-center gap-1 text-[0.8125rem]",
              "font-semibold text-[#7F52BB] transition-colors",
              "hover:text-[#563285]",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[#7F52BB]",
            )}
          >
            {pricing.catalogue.detailLabel.replace("{0}", engine.name)}
            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      {/* -------------------------- Panel -------------------------- */}
      <div
        id={panelId}
        hidden={!open}
        className="mt-5 border-t border-neutral-200 pt-5"
      >
        {/* LurnyFlix alone carries a tool grid above its feature list. */}
        {"tools" in engine && engine.tools && (
          <>
            <h4 className="font-display text-[0.9375rem] font-semibold text-neutral-900">
              {engine.toolsHeading}
            </h4>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {engine.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="rounded-xl bg-[#F8F8FC] p-4 ring-1 ring-neutral-200/70"
                >
                  <p className="text-[0.875rem] font-semibold text-neutral-900">
                    {tool.name}
                    {/* The proposed website label for a tool whose app name
                        is still LurnyFlix. The package shows the mapping so
                        reviewers can see it; it renames nothing. */}
                    {"note" in tool && tool.note && (
                      <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[0.6875rem] font-medium text-neutral-500 ring-1 ring-neutral-200">
                        {tool.note}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-neutral-600">
                    {tool.description}
                  </p>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 font-display text-[0.9375rem] font-semibold text-neutral-900">
              {engine.featuresHeading}
            </h4>
            {/* Load-bearing: the package will not claim editing parity
                across tools, and neither does this. */}
            {"helper" in engine && engine.helper && (
              <p className="mt-1 text-[0.8125rem] text-neutral-500">
                {engine.helper}
              </p>
            )}
          </>
        )}

        <ul
          className={cn(
            "grid gap-x-8 gap-y-3 sm:grid-cols-2",
            "tools" in engine && engine.tools ? "mt-3" : "mt-0",
          )}
        >
          {engine.features.map((feature) => (
            <li key={feature.name}>
              <p className="text-[0.875rem] font-semibold text-neutral-900">
                {feature.name}
              </p>
              <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-neutral-600">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
