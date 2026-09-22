import { SopContext } from "@/components/sections/sop/SopContext";
import { SopDemo } from "@/components/sections/sop/SopDemo";
import { SopFlow } from "@/components/sections/sop/SopFlow";
import { SopHero } from "@/components/sections/sop/SopHero";
import { SopProblem } from "@/components/sections/sop/SopProblem";
import { SopShared } from "@/components/sections/sop/SopShared";
import { sop } from "@/content/sop";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYSOP PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnySOP. Header and footer come from the root layout, so
 * this file is only ever a composition of sections.
 *
 * All six sections of the design pack are built. Their sources are noted in
 * src/content/sop.ts — including the two places where the pack supplies no
 * text file and the copy is transcribed from the comp.
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

      <SopProblem />

      <SopContext />

      <SopFlow />

      <SopShared />

      <SopDemo />
    </>
  );
}
