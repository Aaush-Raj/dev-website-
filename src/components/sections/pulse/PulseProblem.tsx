import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { pulse } from "@/content/pulse";

/**
 * PULSE PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyPulse page.
 *
 * The layout is the shared ProblemSection, which the LurnyPitch page uses too
 * — the two designs are identical apart from the copy. Everything specific to
 * this page lives in content/pulse.ts.
 *
 * No `nowrapHeadline` here: this headline's lines are short enough to hold at
 * xl on their own, and forcing them would only risk overflow.
 */

export function PulseProblem() {
  return <ProblemSection content={pulse.problem} />;
}
