import { ContextAdvantage } from "@/components/sections/insights/article/ContextAdvantage";
import { contextAdvantage } from "@/content/insights/context-advantage";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHT — "Context is the enterprise AI advantage"
 * ---------------------------------------------------------------------------
 * The fifth of the six articles behind the Insights grid's cards. Header and
 * footer come from the root layout, so this file is only a composition.
 */

export const metadata = buildMetadata({
  title: contextAdvantage.meta.title,
  description: contextAdvantage.meta.description,
  path: contextAdvantage.meta.path,
});

export default function ContextAdvantagePage() {
  return <ContextAdvantage />;
}
