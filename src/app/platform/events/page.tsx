import { LurnyEventsDemo } from "@/components/sections/lurny-events/LurnyEventsDemo";
import { LurnyEventsHero } from "@/components/sections/lurny-events/LurnyEventsHero";
import { LurnyEventsLifecycle } from "@/components/sections/lurny-events/LurnyEventsLifecycle";
import { LurnyEventsProblem } from "@/components/sections/lurny-events/LurnyEventsProblem";
import { lurnyEvents } from "@/content/lurny-events";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYEVENTS PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyEvents. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 *
 * Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: lurnyEvents.meta.title,
  description: lurnyEvents.meta.description,
  path: lurnyEvents.meta.path,
});

export default function LurnyEventsPage() {
  return (
    <>
      <LurnyEventsHero />

      <LurnyEventsProblem />

      <LurnyEventsLifecycle />

      <LurnyEventsDemo />
    </>
  );
}
