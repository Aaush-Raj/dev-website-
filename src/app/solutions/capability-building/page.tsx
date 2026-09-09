import { CapabilityRole } from "@/components/sections/capability-building/CapabilityRole";
import { CapabilityPulse } from "@/components/sections/capability-building/CapabilityPulse";
import { CapabilityReality } from "@/components/sections/capability-building/CapabilityReality";
import { CapabilityJourney } from "@/components/sections/capability-building/CapabilityJourney";
import { CapabilityHero } from "@/components/sections/capability-building/CapabilityHero";
import { capabilityBuilding } from "@/content/capability-building";
import { buildMetadata } from "@/lib/seo";

/**
 * CAPABILITY BUILDING PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: capabilityBuilding.meta.title,
  description: capabilityBuilding.meta.description,
  path: capabilityBuilding.meta.path,
});

export default function CapabilityBuildingPage() {
  return (
    <>
      <CapabilityHero />

      <CapabilityReality />

      <CapabilityJourney />

      <CapabilityRole />

      <CapabilityPulse />

      {/* TODO(sections): remaining sections go here as designs land. */}
    </>
  );
}
