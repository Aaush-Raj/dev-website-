import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { lurnyEvents } from "@/content/lurny-events";

/**
 * LURNYEVENTS PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyEvents page.
 *
 * The layout is the shared ProblemSection, which the LurnyPitch, LurnyPulse,
 * LurnyChat, LurnyMagic and LurnySaathi pages use too — this design is
 * identical to theirs apart from the copy. Everything specific to this page
 * lives in content/lurny-events.ts.
 *
 * No `nowrapHeadline`. It was set here at first, on the assumption that
 * "When events are disconnected," would otherwise wrap and turn the design's
 * three lines into four. It does not fit: at 1280px and above that line
 * overflows its column by 17-37px and runs under the numbered list beside it.
 * The flag suppresses wrapping, it does not make room, so the correct
 * behaviour is to let the line wrap when the column is genuinely too narrow
 * for it — which is what it now does.
 */

export function LurnyEventsProblem() {
  return (
    <ProblemSection
      content={lurnyEvents.problem}
      /* A wider statement column than the 1.12fr default. This headline's
         first line, "When events are disconnected,", is the longest of any
         page using this section; at the default split it does not fit and
         wraps into four lines where the design draws three. The extra share
         lets all three lines hold without forcing them. */
      columns="lg:grid-cols-[minmax(0,1.34fr)_minmax(0,1fr)]"
      /* 48px rather than the shared 52px. Measured off this design, whose
         headline is set smaller than the other pages' — and at 52px the first
         line cannot hold even in the widened column, so the three authored
         lines render as four. */
      headlineSize="xl:text-[3rem]"
    />
  );
}
