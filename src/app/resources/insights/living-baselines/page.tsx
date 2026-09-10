import { LivingBaselines } from "@/components/sections/insights/article/LivingBaselines";
import { livingBaselines } from "@/content/insights/living-baselines";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHT — "From competency documents to living baselines"
 * ---------------------------------------------------------------------------
 * The fourth of the six articles behind the Insights grid's cards. Header and
 * footer come from the root layout, so this file is only a composition.
 */

export const metadata = buildMetadata({
  title: livingBaselines.meta.title,
  description: livingBaselines.meta.description,
  path: livingBaselines.meta.path,
});

export default function LivingBaselinesPage() {
  return <LivingBaselines />;
}
