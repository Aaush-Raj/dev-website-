import { EventsHero } from "@/components/sections/events/EventsHero";
import { EventsRecordings } from "@/components/sections/events/EventsRecordings";
import { events } from "@/content/events";
import { buildMetadata } from "@/lib/seo";

/**
 * WEBINARS & EVENTS PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: events.meta.title,
  description: events.meta.description,
  path: events.meta.path,
});

export default function EventsPage() {
  return (
    <>
      <EventsHero />

      <EventsRecordings />

      {/* TODO(sections): remaining Webinars & Events sections go here as
          designs land. */}
    </>
  );
}
