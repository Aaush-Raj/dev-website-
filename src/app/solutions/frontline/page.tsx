import { FrontlineHero } from "@/components/sections/frontline/FrontlineHero";
import { FrontlinePath } from "@/components/sections/frontline/FrontlinePath";
import { FrontlineProblem } from "@/components/sections/frontline/FrontlineProblem";
import { FrontlinePulse } from "@/components/sections/frontline/FrontlinePulse";
import { FrontlineVisibility } from "@/components/sections/frontline/FrontlineVisibility";
import { frontline } from "@/content/frontline";
import { buildMetadata } from "@/lib/seo";

/**
 * FRONTLINE PERFORMANCE PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: frontline.meta.title,
  description: frontline.meta.description,
  path: frontline.meta.path,
});

export default function FrontlinePage() {
  return (
    <>
      <FrontlineHero />

      <FrontlineProblem />

      <FrontlinePath />

      <FrontlinePulse />

      <FrontlineVisibility />
    </>
  );
}
