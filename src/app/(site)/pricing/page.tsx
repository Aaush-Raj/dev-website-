import { PricingPage } from "@/components/sections/pricing/PricingPage";
import { pricing } from "@/content/pricing";
import { buildMetadata } from "@/lib/seo";

/**
 * PRICING PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only a
 * composition.
 *
 * The page is a single component rather than a stack of sections: its plan
 * cards, engine catalogue, Fabric CTA, enquiry form and selection bar all read
 * and write one shared selection.
 */

export const metadata = buildMetadata({
  title: pricing.meta.title,
  description: pricing.meta.description,
  path: pricing.meta.path,
});

export default function Pricing() {
  return <PricingPage />;
}
