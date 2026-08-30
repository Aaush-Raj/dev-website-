import { BizHero } from "@/components/sections/biz/BizHero";
import { biz } from "@/content/biz";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYBIZ PAGE
 * ---------------------------------------------------------------------------
 * Product page for LurnyBiz. Header and footer come from the root layout, so
 * this file is only ever a composition of sections.
 */

export const metadata = buildMetadata({
  title: biz.meta.title,
  description: biz.meta.description,
  path: biz.meta.path,
});

export default function BizPage() {
  return (
    <>
      <BizHero />

      {/* TODO(sections): remaining LurnyBiz sections go here as designs
          land. */}
    </>
  );
}
