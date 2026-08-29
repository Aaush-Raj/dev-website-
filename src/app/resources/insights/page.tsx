import { InsightsField } from "@/components/sections/insights/InsightsField";
import { InsightsHero } from "@/components/sections/insights/InsightsHero";
import { InsightsThinking } from "@/components/sections/insights/InsightsThinking";
import { InsightsSubscribe } from "@/components/sections/insights/InsightsSubscribe";
import { insights } from "@/content/insights";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHTS PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: insights.meta.title,
  description: insights.meta.description,
  path: insights.meta.path,
});

export default function InsightsPage() {
  return (
    <>
      <InsightsHero />

      <InsightsThinking />

      <InsightsField />

      <InsightsSubscribe />
    </>
  );
}
