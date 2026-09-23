import { SimHero } from "@/components/sections/sim/SimHero";
import { SimProblem } from "@/components/sections/sim/SimProblem";
import { SimCoaching } from "@/components/sections/sim/SimCoaching";
import { SimDemo } from "@/components/sections/sim/SimDemo";
import { SimService } from "@/components/sections/sim/SimService";
import { sim } from "@/content/sim";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYSIM PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: sim.meta.title,
  description: sim.meta.description,
  path: sim.meta.path,
});

export default function SimPage() {
  return (
    <>
      <SimHero />

      <SimProblem />

      <SimService />

      <SimCoaching />

      <SimDemo />
    </>
  );
}
