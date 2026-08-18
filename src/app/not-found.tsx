import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildMetadata } from "@/lib/seo";

/**
 * 404 PAGE
 * ---------------------------------------------------------------------------
 * noIndex: a 404 must never enter the search index.
 */

export const metadata = buildMetadata({
  title: "Page not found",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Section spacing="lg">
      <SectionHeader
        as="h1"
        size="4xl"
        eyebrow="404"
        title="We couldn't find that page"
        description="The page you're looking for may have been moved, renamed, or never existed."
        actions={
          <Button href="/" size="lg">
            Back to home
          </Button>
        }
      />
    </Section>
  );
}
