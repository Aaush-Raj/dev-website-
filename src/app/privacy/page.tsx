import { PrivacyDocument } from "@/components/sections/privacy/PrivacyDocument";
import { privacy } from "@/content/privacy";
import { buildMetadata } from "@/lib/seo";

/**
 * PRIVACY POLICY PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition. The footer already linked to /privacy before this page
 * existed, so the route was 404ing.
 */

export const metadata = buildMetadata({
  title: privacy.meta.title,
  description: privacy.meta.description,
  path: privacy.meta.path,
});

export default function PrivacyPage() {
  return <PrivacyDocument />;
}
