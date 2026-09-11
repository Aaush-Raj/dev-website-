import { KnowledgeExplained } from "@/components/sections/knowledge-management/KnowledgeExplained";
import { KnowledgeChat } from "@/components/sections/knowledge-management/KnowledgeChat";
import { KnowledgeTwoWays } from "@/components/sections/knowledge-management/KnowledgeTwoWays";
import { KnowledgeHero } from "@/components/sections/knowledge-management/KnowledgeHero";
import { knowledgeManagement } from "@/content/knowledge-management";
import { buildMetadata } from "@/lib/seo";

/**
 * KNOWLEDGE MANAGEMENT PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: knowledgeManagement.meta.title,
  description: knowledgeManagement.meta.description,
  path: knowledgeManagement.meta.path,
});

export default function KnowledgeManagementPage() {
  return (
    <>
      <KnowledgeHero />

      <KnowledgeExplained />

      <KnowledgeChat />

      <KnowledgeTwoWays />
    </>
  );
}
