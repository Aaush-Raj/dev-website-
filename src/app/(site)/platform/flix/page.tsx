import { FlixHero } from "@/components/sections/flix/FlixHero";
import { FlixBanking } from "@/components/sections/flix/FlixBanking";
import { FlixDemo } from "@/components/sections/flix/FlixDemo";
import { FlixEditor } from "@/components/sections/flix/FlixEditor";
import { FlixGuided } from "@/components/sections/flix/FlixGuided";
import { FlixInteractive } from "@/components/sections/flix/FlixInteractive";
import { FlixMedical } from "@/components/sections/flix/FlixMedical";
import { FlixProblem } from "@/components/sections/flix/FlixProblem";
import { flix } from "@/content/flix";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYFLIX PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: flix.meta.title,
  description: flix.meta.description,
  path: flix.meta.path,
});

export default function FlixPage() {
  return (
    <>
      <FlixHero />

      <FlixProblem />

      <FlixMedical />

      <FlixBanking />

      <FlixInteractive />

      <FlixEditor />

      <FlixGuided />

      <FlixDemo />
    </>
  );
}
