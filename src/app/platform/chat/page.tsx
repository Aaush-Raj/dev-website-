import { ChatHero } from "@/components/sections/chat/ChatHero";
import { chat } from "@/content/chat";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYCHAT PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyChat. Header and footer come from the root layout, so
 * this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: chat.meta.title,
  description: chat.meta.description,
  path: chat.meta.path,
});

export default function ChatPage() {
  return (
    <>
      <ChatHero />

      {/* TODO(sections): remaining LurnyChat sections go here as designs
          land. */}
    </>
  );
}
