import { LurnyAiStudio } from "@/components/sections/lurny-ai/LurnyAiStudio";
import { LurnyAiCompanies } from "@/components/sections/lurny-ai/LurnyAiCompanies";
import { LurnyAiCredentials } from "@/components/sections/lurny-ai/LurnyAiCredentials";
import { LurnyAiBeta } from "@/components/sections/lurny-ai/LurnyAiBeta";
import { LurnyAiCommunity } from "@/components/sections/lurny-ai/LurnyAiCommunity";
import { LurnyAiHero } from "@/components/sections/lurny-ai/LurnyAiHero";
import { lurnyAi } from "@/content/lurny-ai";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNY.AI PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: lurnyAi.meta.title,
  description: lurnyAi.meta.description,
  path: lurnyAi.meta.path,
});

export default function LurnyAiPage() {
  return (
    <>
      <LurnyAiHero />

      <LurnyAiStudio />

      <LurnyAiCompanies />

      <LurnyAiCredentials />

      <LurnyAiCommunity />

      <LurnyAiBeta />
    </>
  );
}
