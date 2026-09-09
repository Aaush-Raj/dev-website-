import { CustomersCta } from "@/components/sections/customers/CustomersCta";
import { CustomersHero } from "@/components/sections/customers/CustomersHero";
import { CustomersStories } from "@/components/sections/customers/CustomersStories";
import { customers } from "@/content/customers";
import { buildMetadata } from "@/lib/seo";

/**
 * CUSTOMER STORIES PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections.
 */

export const metadata = buildMetadata({
  title: customers.meta.title,
  description: customers.meta.description,
  path: customers.meta.path,
});

export default function CustomersPage() {
  return (
    <>
      <CustomersHero />

      <CustomersStories />

      <CustomersCta />
    </>
  );
}
