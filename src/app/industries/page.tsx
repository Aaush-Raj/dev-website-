import { IndustriesHero } from "@/components/sections/industries-page/IndustriesHero";
import { IndustriesServe } from "@/components/sections/industries-page/IndustriesServe";
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

      {/* TODO(sections): remaining Industries sections go here as designs
          land. */}
    </>
  );
}
