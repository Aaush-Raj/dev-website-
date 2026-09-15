import { PlatformChallenge } from "@/components/sections/platform/PlatformChallenge";
import { PlatformCycle } from "@/components/sections/platform/PlatformCycle";
import { PlatformEngines } from "@/components/sections/platform/PlatformEngines";
import { PlatformStarting } from "@/components/sections/platform/PlatformStarting";
import { PlatformHero } from "@/components/sections/platform/PlatformHero";
import { platform } from "@/content/platform";
import { buildMetadata } from "@/lib/seo";

/**
 * PLATFORM HOMEPAGE
 * ---------------------------------------------------------------------------
 * The overview above the twelve engine pages at /platform/*. Header and footer
 * come from the root layout, so this file is only ever a composition of
 * sections.
 */

export const metadata = buildMetadata({
  title: platform.meta.title,
  description: platform.meta.description,
  path: platform.meta.path,
});

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />

      <PlatformChallenge />

      <PlatformCycle />

      <PlatformEngines />

      <PlatformStarting />
    </>
  );
}
