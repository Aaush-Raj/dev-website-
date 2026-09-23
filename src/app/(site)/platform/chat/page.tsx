import { ChatConnected } from "@/components/sections/chat/ChatConnected";
import { ChatDemo } from "@/components/sections/chat/ChatDemo";
import { ChatHero } from "@/components/sections/chat/ChatHero";
import { ChatMoment } from "@/components/sections/chat/ChatMoment";
import { ChatProblem } from "@/components/sections/chat/ChatProblem";
import { ChatTrusted } from "@/components/sections/chat/ChatTrusted";
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

      <ChatProblem />

      <ChatConnected />

      <ChatTrusted />

      <ChatMoment />

      <ChatDemo />

      {/* TODO(sections): remaining LurnyChat sections go here as designs
          land. */}
    </>
  );
}
