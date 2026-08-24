import { ProblemSection } from "@/components/sections/shared/ProblemSection";
import { saathi } from "@/content/saathi";

import { SaathiJourney } from "./SaathiJourney";

/**
 * SAATHI PROBLEM
 * ---------------------------------------------------------------------------
 * Section 2 of the LurnySaathi page: "the problem LurnySaathi solves".
 *
 * The layout is the shared ProblemSection, which the LurnyPitch, LurnyPulse,
 * LurnyChat and LurnyMagic pages use too — see that file. This page's design
 * adds the pastel ground and the journey diagram, both opt-in there.
 */

export function SaathiProblem() {
  return (
    <ProblemSection
      content={saathi.problem}
      tinted
      aside={<SaathiJourney />}
      // A wider statement column than the default. This page's first headline
      // line — "When every step lives separately," — is long enough to wrap at
      // the shared 1.12fr split and turn the design's three lines into four.
      // `nowrapHeadline` is the wrong tool here: forcing it onto one line
      // overflows into the list instead of giving it room.
      columns="lg:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)]"
      // 45px rather than the shared ~52px. This page's longest line —
      // "When every step lives separately," — measures 751px at 52 and 664px
      // at 46, against a 660px column, so it wrapped and turned the design's
      // three lines into four. At 45 it measures ~650px and fits. The design
      // likewise sets this headline smaller relative to its column than the
      // other four pages do.
      headlineSize="xl:text-[2.8125rem]"
    />
  );
}
