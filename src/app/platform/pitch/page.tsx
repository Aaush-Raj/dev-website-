import { PitchCoaching } from "@/components/sections/pitch/PitchCoaching";
import { PitchDemo } from "@/components/sections/pitch/PitchDemo";
import { PitchEvidence } from "@/components/sections/pitch/PitchEvidence";
import { PitchHero } from "@/components/sections/pitch/PitchHero";
import { PitchMissed } from "@/components/sections/pitch/PitchMissed";
import { PitchProblem } from "@/components/sections/pitch/PitchProblem";
import { pitch } from "@/content/pitch";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYPITCH PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyPitch. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: pitch.meta.title,
  description: pitch.meta.description,
  path: pitch.meta.path,
});

export default function PitchPage() {
  return (
    <>
      <PitchHero />

      <PitchProblem />

      <PitchMissed />

      <PitchCoaching />

      <PitchEvidence />

      <PitchDemo />

      {/* TODO(sections): remaining LurnyPitch sections go here as designs
          land. */}
    </>
  );
}
