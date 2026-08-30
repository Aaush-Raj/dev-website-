import { ResourcesClosing } from "@/components/sections/resources/ResourcesClosing";
import { ResourcesFeatured } from "@/components/sections/resources/ResourcesFeatured";
import { ResourcesGuides } from "@/components/sections/resources/ResourcesGuides";
import { ResourcesHero } from "@/components/sections/resources/ResourcesHero";
import { ResourcesInsights } from "@/components/sections/resources/ResourcesInsights";
import { ResourcesSessions } from "@/components/sections/resources/ResourcesSessions";
import { ResourcesStories } from "@/components/sections/resources/ResourcesStories";
import { ResourcesTypes } from "@/components/sections/resources/ResourcesTypes";
import { ResourcesVideos } from "@/components/sections/resources/ResourcesVideos";
import { resources } from "@/content/resources";
import { buildMetadata } from "@/lib/seo";

/**
 * RESOURCES PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: resources.meta.title,
  description: resources.meta.description,
  path: resources.meta.path,
});

export default function ResourcesPage() {
  return (
    <>
      <ResourcesHero />

      <ResourcesFeatured />

      <ResourcesTypes />

      <ResourcesInsights />

      <ResourcesGuides />

      <ResourcesStories />

      <ResourcesSessions />

      <ResourcesVideos />

      <ResourcesClosing />

      {/* TODO(sections): remaining Resources sections go here as designs
          land. */}
    </>
  );
}
