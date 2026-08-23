import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { pitch } from "@/content/pitch";

/**
 * PITCH PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyPitch page.
 *
 * The layout is the shared ProblemSection, which the LurnyPulse page uses too
 * — the two designs are identical apart from the copy. Everything specific to
 * this page lives in content/pitch.ts.
 */

export function PitchProblem() {
  return (
    // This page's headline has a long line ("conversations stay invisible,")
    // that wraps at xl and turns the design's four lines into five, so it opts
    // into holding each authored line together at that size.
    <ProblemSection content={pitch.problem} nowrapHeadline />
  );
}
