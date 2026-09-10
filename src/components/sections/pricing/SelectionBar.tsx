"use client";

import { useState } from "react";

import { pricing } from "@/content/pricing";
import { cn } from "@/lib/utils";

import { CloseIcon } from "./PricingIcons";
import type { EngineSelection } from "./useEngineSelection";

/**
 * PRICING — SELECTION BAR
 * ---------------------------------------------------------------------------
 * Fixed to the foot of the viewport once at least one engine is selected.
 * "View selection" expands a removable chip list; "Continue to enquiry"
 * scrolls to the form and focuses its Name field.
 *
 * IT ANNOUNCES ITSELF. The count sits in an `aria-live="polite"` region, so a
 * screen-reader user hears the selection change after pressing "Add to
 * enquiry" three sections up the page — otherwise the bar would be a purely
 * visual confirmation of an action taken elsewhere.
 *
 * The bar pads for `env(safe-area-inset-bottom)` so it clears the iOS home
 * indicator rather than sitting under it, and it is hidden from print.
 */

const { selectionBar } = pricing;

interface SelectionBarProps {
  selection: EngineSelection;
  onContinue: () => void;
}

export function SelectionBar({ selection, onContinue }: SelectionBarProps) {
  const [expanded, setExpanded] = useState(false);

  // Nothing selected, nothing to show — and collapsing on the way out means
  // the list does not reappear expanded next time.
  if (selection.count === 0) {
    if (expanded) setExpanded(false);
    return null;
  }

  const summary =
    selection.count === 1
      ? selectionBar.summaryOne
      : selectionBar.summary.replace("{0}", String(selection.count));

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-70 print:hidden",
        "border-t border-neutral-200 bg-white/95 backdrop-blur",
        "shadow-[0_-8px_28px_-18px_rgb(43_25_66/0.35)]",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {expanded && (
        <div className="mx-auto w-full max-w-[1200px] px-gutter pt-4">
          <ul className="flex flex-wrap gap-2">
            {selection.chosen.map((engine) => (
              <li key={engine.id}>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full",
                    "bg-[#F4EFFA] py-1.5 pr-1.5 pl-3",
                    "text-[0.8125rem] font-medium text-[#563285]",
                  )}
                >
                  {engine.name}
                  <button
                    type="button"
                    onClick={() => selection.remove(engine.id)}
                    aria-label={selectionBar.remove.replace("{0}", engine.name)}
                    className={cn(
                      "grid size-5 cursor-pointer place-items-center rounded-full",
                      "text-[#6B41A3] transition-colors hover:bg-white",
                      "focus-visible:outline-2 focus-visible:outline-offset-1",
                      "focus-visible:outline-[#7F52BB]",
                    )}
                  >
                    <CloseIcon className="size-3" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={cn(
          "mx-auto flex w-full max-w-[1200px] flex-wrap items-center",
          "justify-between gap-3 px-gutter py-3.5",
        )}
      >
        {/* Polite rather than assertive: the count updating should not
            interrupt whatever is being read. */}
        <p
          aria-live="polite"
          className="text-[0.875rem] font-semibold text-neutral-800"
        >
          {summary}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className={cn(
              "cursor-pointer text-[0.8125rem] font-semibold text-[#7F52BB]",
              "transition-colors hover:text-[#563285]",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[#7F52BB]",
            )}
          >
            {expanded ? selectionBar.hide : selectionBar.view}
          </button>

          <button
            type="button"
            onClick={onContinue}
            className={cn(
              "cursor-pointer rounded-full bg-[#7F52BB] px-5 py-2.5",
              "text-[0.8125rem] font-semibold text-white",
              "transition-colors hover:bg-[#6B41A3]",
              "focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-[#7F52BB]",
            )}
          >
            {selectionBar.continue}
          </button>
        </div>
      </div>
    </div>
  );
}
