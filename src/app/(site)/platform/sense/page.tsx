import { SenseDemo } from "@/components/sections/sense/SenseDemo";
import { SenseFlow } from "@/components/sections/sense/SenseFlow";
import { SenseGap } from "@/components/sections/sense/SenseGap";
import { SenseHero } from "@/components/sections/sense/SenseHero";
import { sense } from "@/content/sense";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYSENSE PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnySense. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: sense.meta.title,
  description: sense.meta.description,
  path: sense.meta.path,
});

export default function SensePage() {
  return (
    <>
      <SenseHero />

      <SenseGap />

      <SenseFlow />

      <SenseDemo />

      {/* TODO(sections): remaining LurnySense sections go here as designs
          land. */}
    </>
  );
}
