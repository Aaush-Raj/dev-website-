import { ComplianceHero } from "@/components/sections/compliance/ComplianceHero";
import { compliance } from "@/content/compliance";
import { buildMetadata } from "@/lib/seo";

/**
 * COMPLIANCE READINESS PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: compliance.meta.title,
  description: compliance.meta.description,
  path: compliance.meta.path,
});

export default function CompliancePage() {
  return (
    <>
      <ComplianceHero />
    </>
  );
}
