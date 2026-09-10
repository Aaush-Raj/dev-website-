import { ContentCreation } from "@/components/sections/insights/article/ContentCreation";
import { contentCreation } from "@/content/insights/content-creation";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHT — "Why content creation is no longer the bottleneck"
 * ---------------------------------------------------------------------------
 * The second of the six articles behind the Insights grid's cards. Header and
 * footer come from the root layout, so this file is only a composition.
 */

export const metadata = buildMetadata({
  title: contentCreation.meta.title,
  description: contentCreation.meta.description,
  path: contentCreation.meta.path,
});

export default function ContentCreationPage() {
  return <ContentCreation />;
}
