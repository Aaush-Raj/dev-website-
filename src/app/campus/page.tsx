import { CampusDoing } from "@/components/sections/campus/CampusDoing";
import { CampusGap } from "@/components/sections/campus/CampusGap";
import { CampusGuidance } from "@/components/sections/campus/CampusGuidance";
import { CampusHero } from "@/components/sections/campus/CampusHero";
import { CampusPassport } from "@/components/sections/campus/CampusPassport";
import { CampusPersonalised } from "@/components/sections/campus/CampusPersonalised";
import { campus } from "@/content/campus";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYCAMPUS PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: campus.meta.title,
  description: campus.meta.description,
  path: campus.meta.path,
});

export default function CampusPage() {
  return (
    <>
      <CampusHero />

      <CampusGap />

      <CampusPersonalised />

      <CampusDoing />

      <CampusGuidance />

      <CampusPassport />
    </>
  );
}
