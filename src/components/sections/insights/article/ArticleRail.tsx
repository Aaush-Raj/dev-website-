"use client";

import { cn } from "@/lib/utils";

import { BookmarkIcon, LinkIcon, PrintIcon, ShareIcon } from "./ArticleIcons";
import { accent, ink } from "./tokens";

/**
 * INSIGHT ARTICLE — THE RAIL
 * ---------------------------------------------------------------------------
 * The sticky contents list beside the prose, and the four tools beneath it.
 *
 * The rail is a `<nav>` with a real heading, so it is reachable as a landmark
 * rather than being a decorated list of links. The active item is marked with
 * `aria-current="location"` as well as with colour, because "which section am
 * I in" is exactly what that attribute is for and colour alone cannot say it.
 *
 * Below lg the whole rail is dropped and the tools reappear as a pill row
 * above the article — the export does the same, and at that width a 190px
 * column would leave the prose too narrow to read.
 *
 * The scroll-spy that sets `active` lives in the article, not here, because
 * the same observer also decides when the mini-player appears.
 */

export interface ArticleTools {
  share: () => void;
  copy: () => void;
  toggleSave: () => void;
  print: () => void;
  copied: boolean;
  saved: boolean;
}

interface ArticleRailProps {
  content: {
    title: string;
    items: readonly { id: string; label: string }[];
    tools: {
      share: string;
      copy: { idle: string; done: string };
      save: { idle: string; done: string };
      print: string;
    };
  };
  /** The id of the section currently in view. */
  active: string;
  tools: ArticleTools;
}

export function ArticleRail({ content, active, tools }: ArticleRailProps) {
  const toolButton = cn(
    "flex w-full cursor-pointer items-center gap-2.5 py-[7px]",
    "text-left text-[0.78125rem] font-medium text-[#4B4458]",
    "transition-colors hover:text-[#5B2A9D]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[#5B2A9D]",
  );

  return (
    <aside className="sticky top-[7.375rem] hidden shrink-0 basis-[190px] pt-1.5 lg:block">
      <nav aria-labelledby="raw-rail-title">
        <h2
          id="raw-rail-title"
          className="mb-4 text-[0.65625rem] font-bold tracking-[0.16em] uppercase"
          style={{ color: accent.brass }}
        >
          {content.title}
        </h2>

        <ul
          className="flex flex-col gap-0.5 border-l"
          style={{ borderColor: ink.line }}
        >
          {content.items.map((item) => {
            const current = item.id === active;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  className={cn(
                    "-ml-px block border-l-2 py-[7px] pl-3.5",
                    "text-[0.78125rem] leading-[1.35]",
                    "transition-[color,border-color] duration-150",
                    "hover:text-[#191522]",
                    current
                      ? "border-l-[#5B2A9D] font-semibold text-[#191522]"
                      : "border-l-transparent font-medium text-[#8C8299]",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="my-6 h-px" style={{ background: ink.line }} />

      <div className="flex flex-col gap-1">
        <button type="button" onClick={tools.share} className={toolButton}>
          <ShareIcon className="size-[15px] shrink-0" />
          {content.tools.share}
        </button>

        <button type="button" onClick={tools.copy} className={toolButton}>
          <LinkIcon className="size-[15px] shrink-0" />
          {tools.copied ? content.tools.copy.done : content.tools.copy.idle}
        </button>

        <button
          type="button"
          onClick={tools.toggleSave}
          aria-pressed={tools.saved}
          className={toolButton}
        >
          <BookmarkIcon
            className="size-[15px] shrink-0"
            /* The saved state fills the same shape rather than swapping the
               icon, which is how the export marks it. */
            fill={tools.saved ? accent.violet : "none"}
          />
          {tools.saved ? content.tools.save.done : content.tools.save.idle}
        </button>

        <button type="button" onClick={tools.print} className={toolButton}>
          <PrintIcon className="size-[15px] shrink-0" />
          {content.tools.print}
        </button>
      </div>
    </aside>
  );
}

/**
 * The same four tools as a pill row, shown in place of the rail below lg.
 */
export function ArticleToolbar({
  content,
  tools,
}: {
  content: ArticleRailProps["content"]["tools"];
  tools: ArticleTools;
}) {
  const pill = cn(
    "inline-flex cursor-pointer items-center gap-2 rounded-full",
    "border border-[#DDD2C2] bg-white px-[15px] py-[9px]",
    "text-[0.78125rem] font-semibold text-[#3E3850]",
    "transition-colors hover:border-[#5B2A9D] hover:text-[#5B2A9D]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[#5B2A9D]",
  );

  return (
    <div
      className="mb-[30px] flex flex-wrap items-center gap-[18px] border-b pb-[22px] lg:hidden"
      style={{ borderColor: ink.line }}
    >
      <button type="button" onClick={tools.share} className={pill}>
        <ShareIcon className="size-[15px]" />
        {content.share}
      </button>
      <button type="button" onClick={tools.copy} className={pill}>
        <LinkIcon className="size-[15px]" />
        {tools.copied ? content.copy.done : content.copy.idle}
      </button>
      <button
        type="button"
        onClick={tools.toggleSave}
        aria-pressed={tools.saved}
        className={pill}
      >
        <BookmarkIcon
          className="size-[15px]"
          fill={tools.saved ? accent.violet : "none"}
        />
        {tools.saved ? content.save.done : content.save.idle}
      </button>
      <button type="button" onClick={tools.print} className={pill}>
        <PrintIcon className="size-[15px]" />
        {content.print}
      </button>
    </div>
  );
}
