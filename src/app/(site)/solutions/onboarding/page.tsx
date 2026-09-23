import { OnboardingApproach } from "@/components/sections/onboarding/OnboardingApproach";
import { OnboardingReality } from "@/components/sections/onboarding/OnboardingReality";
import { OnboardingHero } from "@/components/sections/onboarding/OnboardingHero";
import { onboarding } from "@/content/onboarding";
import { buildMetadata } from "@/lib/seo";

/**
 * EMPLOYEE ONBOARDING PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: onboarding.meta.title,
  description: onboarding.meta.description,
  path: onboarding.meta.path,
});

export default function OnboardingPage() {
  return (
    <>
      <OnboardingHero />

      <OnboardingReality />

      <OnboardingApproach />
    </>
  );
}
