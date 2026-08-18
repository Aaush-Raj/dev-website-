import { absoluteUrl, siteConfig } from "@/lib/site";

/**
 * JSON-LD STRUCTURED DATA
 * ---------------------------------------------------------------------------
 * Schema.org markup that lets search engines and LLMs understand what the
 * site is, rather than merely indexing its words. Drives rich results
 * (sitelinks, org knowledge panel, FAQ accordions) in Google.
 *
 * Emitted via the <JsonLd /> component — see src/components/seo/JsonLd.tsx.
 */

type Schema = Record<string, unknown>;

/** The company itself. Belongs in the root layout so it appears site-wide. */
export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/assets/images/logo.png"),
    },
    description: siteConfig.description,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.links),
  };
}

/** The website, including the sitelinks search box declaration. */
export function webSiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: siteConfig.lang,
  };
}

/**
 * The product. This is the schema that most directly communicates what eLurny
 * DOES — worth keeping accurate.
 *
 * TODO(content): confirm applicationCategory and pricing once finalised.
 */
export function softwareApplicationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

/**
 * Breadcrumb trail. Google renders this as the path shown above a result.
 * @param items ordered crumbs, root first. Paths are site-relative.
 */
export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * FAQ markup. Only use on pages where the questions are genuinely visible to
 * users — Google penalises FAQ schema that does not match on-page content.
 */
export function faqSchema(
  items: ReadonlyArray<{ question: string; answer: string }>,
): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
