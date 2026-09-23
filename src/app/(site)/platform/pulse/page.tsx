import { PulseHero } from "@/components/sections/pulse/PulseHero";
import { PulseProblem } from "@/components/sections/pulse/PulseProblem";
import { PulseBlueprints } from "@/components/sections/pulse/PulseBlueprints";
import { PulseWorks } from "@/components/sections/pulse/PulseWorks";
import { pulse } from "@/content/pulse";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYPULSE PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyPulse. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: pulse.meta.title,
  description: pulse.meta.description,
  path: pulse.meta.path,
});

export default function PulsePage() {
  return (
    <>
      <PulseHero />

      <PulseProblem />

      <PulseWorks />

      <PulseBlueprints />

      {/* TODO(sections): remaining LurnyPulse sections go here as designs
          land. */}
    </>
  );
}
