import { BizAction } from "@/components/sections/biz/BizAction";
import { BizCustomer } from "@/components/sections/biz/BizCustomer";
import { BizDemo } from "@/components/sections/biz/BizDemo";
import { BizHero } from "@/components/sections/biz/BizHero";
import { BizIntegration } from "@/components/sections/biz/BizIntegration";
import { BizProblem } from "@/components/sections/biz/BizProblem";
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

      <BizProblem />

      <BizIntegration />

      <BizCustomer />

      <BizAction />

      <BizDemo />
    </>
  );
}
