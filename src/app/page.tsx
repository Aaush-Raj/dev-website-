import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

/**
 * LANDING PAGE
 * ---------------------------------------------------------------------------
 * This page should stay a thin composition of section components — no layout
 * or copy inline. Each section lives in src/components/sections and reads its
 * content from src/content.
 *
 * Currently a placeholder shell; real sections get built as the designs land.
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
      <Section spacing="lg">
        <SectionHeader
          eyebrow="Scaffold ready"
          title="eLurny landing page"
          description="Design tokens, UI primitives, layout shell and SEO infrastructure are in place. Sections get built here as the designs arrive."
          as="h1"
          size="5xl"
          actions={
            <>
              <Button href="/signup" size="lg">
                Get started
              </Button>
              <Button href="/#features" variant="outline" size="lg">
                Learn more
              </Button>
            </>
          }
        />
      </Section>
    </>
  );
}
