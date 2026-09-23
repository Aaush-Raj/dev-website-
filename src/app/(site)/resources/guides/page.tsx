import { GuidesHero } from "@/components/sections/guides/GuidesHero";
import { GuidesLibrary } from "@/components/sections/guides/GuidesLibrary";
import { GuidesNavigator } from "@/components/sections/guides/GuidesNavigator";
import { guides } from "@/content/guides";
import { buildMetadata } from "@/lib/seo";

/**
 * GUIDES & PLAYBOOKS PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: guides.meta.title,
  description: guides.meta.description,
  path: guides.meta.path,
});

export default function GuidesPage() {
  return (
    <>
      <GuidesHero />

      <GuidesNavigator />

      <GuidesLibrary />

      {/* TODO(sections): section 4 (from page to practice) is specified in the
          supplied copy and goes here as its design is built. */}
    </>
  );
}
