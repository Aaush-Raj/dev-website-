import { FlowOfWork } from "@/components/sections/insights/article/FlowOfWork";
import { flowOfWork } from "@/content/insights/flow-of-work";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHT — "Learning in the flow of work needs more than recommendations"
 * ---------------------------------------------------------------------------
 * The last of the six articles behind the Insights grid's cards. Header and
 * footer come from the root layout, so this file is only a composition.
 */

export const metadata = buildMetadata({
  title: flowOfWork.meta.title,
  description: flowOfWork.meta.description,
  path: flowOfWork.meta.path,
});

export default function FlowOfWorkPage() {
  return <FlowOfWork />;
}
