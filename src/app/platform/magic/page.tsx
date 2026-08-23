import { MagicHero } from "@/components/sections/magic/MagicHero";
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

      {/* TODO(sections): remaining LurnyMagic sections go here as designs
          land. */}
    </>
  );
}
