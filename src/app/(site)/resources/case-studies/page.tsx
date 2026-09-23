import { CaseStudyArticle } from "@/components/sections/case-study/CaseStudyArticle";
import { CaseStudyCta } from "@/components/sections/case-study/CaseStudyCta";
import { CaseStudyHero } from "@/components/sections/case-study/CaseStudyHero";
import { caseStudy } from "@/content/case-study";
import { buildMetadata } from "@/lib/seo";

/**
 * BFSI CASE STUDY PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: caseStudy.meta.title,
  description: caseStudy.meta.description,
  path: caseStudy.meta.path,
});

export default function CaseStudiesPage() {
  return (
    <>
      <CaseStudyHero />

      <CaseStudyArticle />

      <CaseStudyCta />
    </>
  );
}
