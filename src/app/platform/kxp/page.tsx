import { KxpConnected } from "@/components/sections/kxp/KxpConnected";
import { KxpDemo } from "@/components/sections/kxp/KxpDemo";
import { KxpHero } from "@/components/sections/kxp/KxpHero";
import { KxpLearner } from "@/components/sections/kxp/KxpLearner";
import { KxpMomentum } from "@/components/sections/kxp/KxpMomentum";
import { KxpProblem } from "@/components/sections/kxp/KxpProblem";
import { kxp } from "@/content/kxp";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYKXP PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyKxP. Header and footer come from the root layout, so
 * this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: kxp.meta.title,
  description: kxp.meta.description,
  path: kxp.meta.path,
});

export default function KxpPage() {
  return (
    <>
      <KxpHero />
      <KxpProblem />
      <KxpConnected />
      <KxpLearner />
      <KxpMomentum />
      <KxpDemo />
    </>
  );
}
