import Link from "next/link";

import {
  ArrowRightIcon,
  cornerGraphics,
  needIcons,
  type CornerGraphicName,
  type NeedIconName,
} from "@/components/sections/solutions-page/SolutionsNeedIcons";
import { cn } from "@/lib/utils";

/**
 * SOLUTION NEED CARD
 * ---------------------------------------------------------------------------
 * One business-need card: icon tile, number, corner ornament, title,
 * description, product tags and a trailing arrow.
 *
 * SHARED BY TWO SECTIONS. The solutions page's "by business need" grid and the
 * homepage's section 6 both render it, so the two are the same card by
 * construction rather than by two definitions kept in step by hand. It was
 * lifted out of SolutionsNeeds when the homepage was asked to match it; the
 * markup below is that section's, unchanged.
 *
 * THE WHOLE SURFACE IS THE LINK, not a box with a link inside it, so the arrow
 * in the corner is decoration rather than a second control. The corner
 * ornament is absolutely positioned and the card carries `overflow-hidden`,
 * which is what clips it to the card's own rounded rectangle and gives the
 * design its flush corner fills.
 *
 * `mt-auto` on the tag row pins it to the card's foot, so the arrows align
 * across a row however the titles wrap.
 */

export interface SolutionNeedCardData {
  number: string;
  icon: NeedIconName;
  corner: CornerGraphicName;
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
}

export function SolutionNeedCard({ item }: { item: SolutionNeedCardData }) {
  const Icon = needIcons[item.icon];
  const Corner = cornerGraphics[item.corner];

  return (
    <Link
      href={item.href}
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden",
        "rounded-2xl border border-[#eae7f2] bg-white p-5 lg:p-6",
        "duration-normal transition-[border-color,box-shadow,translate] ease-out",
        "will-change-[translate] hover:-translate-y-1",
        "hover:border-[#c9b8f5]",
        "hover:shadow-[0_24px_48px_-24px_rgb(75_32_200/0.3)]",
        // The focus ring must clear the card's own rounding.
        "focus-visible:ring-2 focus-visible:ring-[#4B20C8]/60",
        "focus-visible:ring-offset-2 focus-visible:outline-none",
      )}
    >
      {/* The corner ornament, clipped by the card's radius. */}
      <Corner
        className={cn(
          "pointer-events-none absolute -top-px -right-px",
          "size-28 lg:size-30",
        )}
      />

      {/* ---------------------- Tile and number --------------------- */}
      <span className="relative flex items-center gap-4">
        <Icon className="size-14 shrink-0" />
        <span className="font-mono text-[1rem] font-medium text-[#4B20C8]">
          {item.number}
        </span>
      </span>

      {/* ------------------------- The copy ------------------------- */}
      <span className="relative mt-6 block text-[1.25rem] leading-snug font-bold text-pretty text-[#0b0b16]">
        {item.title}
      </span>

      <span className="relative mt-2.5 block text-[0.9375rem] leading-relaxed text-pretty text-[#4b4d5b]">
        {item.description}
      </span>

      {/* ---------------------- Tags and arrow ---------------------- */}
      <span className="relative mt-auto flex items-end justify-between gap-4 pt-6">
        <span className="flex flex-wrap items-center gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "rounded-md border border-[#dcd2f7] px-2.5 py-1.5",
                "font-mono text-[0.6875rem] font-medium tracking-[0.08em] uppercase",
                "text-[#4B20C8]",
              )}
            >
              {tag}
            </span>
          ))}
        </span>

        <ArrowRightIcon
          className={cn(
            "size-5 shrink-0 text-[#4B20C8]",
            "duration-normal transition-[translate] ease-out",
            "will-change-[translate] group-hover/card:translate-x-1",
          )}
        />
      </span>
    </Link>
  );
}
