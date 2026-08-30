import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { notes } from "@/content/notes";

/**
 * NOTES PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnyNotes page: "the problem LurnyNotes solves".
 *
 * The layout is the shared ProblemSection, which the LurnyPitch, LurnyPulse,
 * LurnyChat, LurnyMagic and LurnySaathi pages use too — see that file. This
 * page's design differs only in its accents, both opt-in props there.
 */

export function NotesProblem() {
  return (
    <ProblemSection
      content={notes.problem}
      // This design accents in blue rather than the brand violet, and closes
      // the headline with an amber full stop.
      accent="text-[#2156f3]"
      headlineStop="text-[#f1b03c]"
    />
  );
}
