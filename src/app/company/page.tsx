import { CompanyContact } from "@/components/sections/company/CompanyContact";
import { CompanyHero } from "@/components/sections/company/CompanyHero";
import { CompanyStory } from "@/components/sections/company/CompanyStory";
import { company } from "@/content/company";
import { buildMetadata } from "@/lib/seo";

/**
 * COMPANY / ABOUT PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: company.meta.title,
  description: company.meta.description,
  path: company.meta.path,
});

export default function CompanyPage() {
  return (
    <>
      <CompanyHero />

      <CompanyStory />

      <CompanyContact />
    </>
  );
}
