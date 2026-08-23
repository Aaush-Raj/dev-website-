import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { magic } from "@/content/magic";

/**
 * MAGIC PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyMagic page.
 *
 * The layout is the shared ProblemSection, which the LurnyPitch and LurnyPulse
 * pages use too — all three designs are identical apart from the copy.
 * Everything specific to this page lives in content/magic.ts.
 *
 * `nowrapHeadline` because this headline's second line ("trapped in files,
 * learning") is long enough to wrap at xl, which would turn the design's four
 * lines into five.
 */

export function MagicProblem() {
  return <ProblemSection content={magic.problem} nowrapHeadline />;
}
