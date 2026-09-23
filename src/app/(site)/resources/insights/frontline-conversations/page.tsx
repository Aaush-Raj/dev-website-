import { FrontlineConversations } from "@/components/sections/insights/article/FrontlineConversations";
import { frontlineConversations } from "@/content/insights/frontline-conversations";
import { buildMetadata } from "@/lib/seo";

/**
 * INSIGHT — "What 9,328 frontline conversations revealed"
 * ---------------------------------------------------------------------------
 * The third of the six articles behind the Insights grid's cards. Header and
 * footer come from the root layout, so this file is only a composition.
 */

export const metadata = buildMetadata({
  title: frontlineConversations.meta.title,
  description: frontlineConversations.meta.description,
  path: frontlineConversations.meta.path,
});

export default function FrontlineConversationsPage() {
  return <FrontlineConversations />;
}
