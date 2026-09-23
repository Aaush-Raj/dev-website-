import { IndustriesBfsi } from "@/components/sections/industries-page/IndustriesBfsi";
import { IndustriesHealthcare } from "@/components/sections/industries-page/IndustriesHealthcare";
import { IndustriesHero } from "@/components/sections/industries-page/IndustriesHero";
import { IndustriesServe } from "@/components/sections/industries-page/IndustriesServe";
import { IndustriesTelecom } from "@/components/sections/industries-page/IndustriesTelecom";
import { IndustriesSpecialist } from "@/components/sections/industries-page/IndustriesSpecialist";
import { industriesPage } from "@/content/industries-page";
import { buildMetadata } from "@/lib/seo";

/**
 * INDUSTRIES PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: industriesPage.meta.title,
  description: industriesPage.meta.description,
  path: industriesPage.meta.path,
});

export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero />

      <IndustriesServe />

      <IndustriesBfsi />

      <IndustriesHealthcare />

      <IndustriesTelecom />

      <IndustriesSpecialist />
    </>
  );
}
