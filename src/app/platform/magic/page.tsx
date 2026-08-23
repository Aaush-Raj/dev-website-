import { MagicExperiences } from "@/components/sections/magic/MagicExperiences";
import { MagicFormats } from "@/components/sections/magic/MagicFormats";
import { MagicHero } from "@/components/sections/magic/MagicHero";
import { MagicJourneys } from "@/components/sections/magic/MagicJourneys";
import { MagicProblem } from "@/components/sections/magic/MagicProblem";
import { magic } from "@/content/magic";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYMAGIC PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyMagic. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: magic.meta.title,
  description: magic.meta.description,
  path: magic.meta.path,
});

export default function MagicPage() {
  return (
    <>
      <MagicHero />

      <MagicProblem />

      <MagicFormats />

      <MagicExperiences />

      <MagicJourneys />

      {/* TODO(sections): remaining LurnyMagic sections go here as designs
          land. */}
    </>
  );
}
