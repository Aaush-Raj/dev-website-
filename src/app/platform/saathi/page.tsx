import { SaathiHero } from "@/components/sections/saathi/SaathiHero";
import { SaathiLoop } from "@/components/sections/saathi/SaathiLoop";
import { SaathiProblem } from "@/components/sections/saathi/SaathiProblem";
import { SaathiStory } from "@/components/sections/saathi/SaathiStory";
import { saathi } from "@/content/saathi";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYSAATHI PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnySaathi. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: saathi.meta.title,
  description: saathi.meta.description,
  path: saathi.meta.path,
});

export default function SaathiPage() {
  return (
    <>
      <SaathiHero />

      <SaathiProblem />

      <SaathiLoop />

      <SaathiStory />

      {/* TODO(sections): remaining LurnySaathi sections go here as designs
          land. */}
    </>
  );
}
