import { Hero } from "@/components/sections/hero/Hero";
import { ClientStrip } from "@/components/sections/problem/ClientStrip";
import { Problem } from "@/components/sections/problem/Problem";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * LANDING PAGE
 * ---------------------------------------------------------------------------
 * A thin composition of section components — no layout or copy inline. Each
 * section lives in src/components/sections and reads its content from
 * src/content.
 */

export const metadata = buildMetadata({
  // `absolute` opts out of the "%s | eLurny" template — the homepage title
  // already contains the brand name.
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Social proof and the problem statement share a background, so they
          sit in one band rather than two abutting sections. */}
      <div className="bg-surface-subtle">
        <ClientStrip />
        <Problem />
      </div>

      {/* TODO(sections): remaining homepage sections go here as designs land. */}
    </>
  );
}
