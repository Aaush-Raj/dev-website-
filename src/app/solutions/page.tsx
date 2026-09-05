import { SolutionsCaseStudy } from "@/components/sections/solutions-page/SolutionsCaseStudy";
import { SolutionsEngines } from "@/components/sections/solutions-page/SolutionsEngines";
import { SolutionsHero } from "@/components/sections/solutions-page/SolutionsHero";
import { SolutionsNeeds } from "@/components/sections/solutions-page/SolutionsNeeds";
import { SolutionsRealities } from "@/components/sections/solutions-page/SolutionsRealities";
import { solutionsPage } from "@/content/solutions-page";
import { buildMetadata } from "@/lib/seo";

/**
 * SOLUTIONS PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: solutionsPage.meta.title,
  description: solutionsPage.meta.description,
  path: solutionsPage.meta.path,
});

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />

      <SolutionsNeeds />

      <SolutionsEngines />

      <SolutionsCaseStudy />

      <SolutionsRealities />

      {/* TODO(sections): remaining solutions sections go here as designs
          land. */}
    </>
  );
}
