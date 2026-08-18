"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * ERROR BOUNDARY
 * ---------------------------------------------------------------------------
 * Catches render errors in this route segment. Must be a Client Component —
 * that is a Next.js requirement for error boundaries.
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO(observability): forward to Sentry or similar once configured.
    console.error(error);
  }, [error]);

  return (
    <Section spacing="lg">
      <SectionHeader
        as="h1"
        size="4xl"
        title="Something went wrong"
        description="An unexpected error occurred. Try again, or head back to the homepage."
        actions={
          <>
            <Button onClick={reset} size="lg">
              Try again
            </Button>
            <Button href="/" variant="outline" size="lg">
              Back to home
            </Button>
          </>
        }
      />
    </Section>
  );
}
