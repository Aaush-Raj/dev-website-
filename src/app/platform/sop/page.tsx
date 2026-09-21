import { SopHero } from "@/components/sections/sop/SopHero";
import { sop } from "@/content/sop";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYSOP PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnySOP. Header and footer come from the root layout, so
 * this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: sop.meta.title,
  description: sop.meta.description,
  path: sop.meta.path,
});

export default function SopPage() {
  return (
    <>
      <SopHero />

      {/* TODO(sections): sections 2-6 go here as they are built. The design
          pack already carries their assets and text under
          designs/lurnySOP assets/. */}
    </>
  );
}
