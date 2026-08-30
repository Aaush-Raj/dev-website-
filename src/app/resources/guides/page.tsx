import { GuidesHero } from "@/components/sections/guides/GuidesHero";
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

      {/* TODO(sections): sections 3-4 (the full library, from page to practice)
          are specified in the supplied copy and go here as their designs are
          built. */}
    </>
  );
}
