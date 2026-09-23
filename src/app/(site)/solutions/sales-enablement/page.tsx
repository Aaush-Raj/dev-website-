import { SalesChat } from "@/components/sections/sales-enablement/SalesChat";
import { SalesHero } from "@/components/sections/sales-enablement/SalesHero";
import { SalesLoop } from "@/components/sections/sales-enablement/SalesLoop";
import { SalesMagic } from "@/components/sections/sales-enablement/SalesMagic";
import { SalesReality } from "@/components/sections/sales-enablement/SalesReality";
import { salesEnablement } from "@/content/sales-enablement";
import { buildMetadata } from "@/lib/seo";

/**
 * SALES ENABLEMENT PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: salesEnablement.meta.title,
  description: salesEnablement.meta.description,
  path: salesEnablement.meta.path,
});

export default function SalesEnablementPage() {
  return (
    <>
      <SalesHero />

      <SalesReality />

      <SalesLoop />

      <SalesMagic />

      <SalesChat />
    </>
  );
}
