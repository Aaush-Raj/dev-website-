import { NotesHero } from "@/components/sections/notes/NotesHero";
import { NotesProblem } from "@/components/sections/notes/NotesProblem";
import { notes } from "@/content/notes";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYNOTES PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyNotes. Header and footer come from the root layout,
 * so this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: notes.meta.title,
  description: notes.meta.description,
  path: notes.meta.path,
});

export default function NotesPage() {
  return (
    <>
      <NotesHero />

      <NotesProblem />

      {/* TODO(sections): remaining LurnyNotes sections go here as designs
          land. */}
    </>
  );
}
