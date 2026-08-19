import { Hero } from "@/components/sections/hero/Hero";
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
      {/* TODO(sections): remaining homepage sections go here as designs land. */}
    </>
  );
}
