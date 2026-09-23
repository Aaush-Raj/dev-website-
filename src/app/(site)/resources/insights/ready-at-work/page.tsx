import { ReadyAtWork } from "@/components/sections/insights/article/ReadyAtWork";
import { readyAtWork } from "@/content/insights/ready-at-work";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHT — "What does 'ready' actually mean at work?"
 * ---------------------------------------------------------------------------
 * The first of the six articles behind the Insights grid's cards. Header and
 * footer come from the root layout, so this file is only a composition.
 *
 * The article is one component rather than a stack of sections: its rail, its
 * progress bar and its audio player all read the same scroll and playback
 * state, and splitting it would mean lifting that state into a provider for
 * no gain.
 */

export const metadata = buildMetadata({
  title: readyAtWork.meta.title,
  description: readyAtWork.meta.description,
  path: readyAtWork.meta.path,
});

export default function ReadyAtWorkPage() {
  return <ReadyAtWork />;
}
