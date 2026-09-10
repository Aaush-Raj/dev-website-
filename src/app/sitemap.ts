import type { MetadataRoute } from "next";

// Required for `output: "export"` — metadata routes must opt in to static.
export const dynamic = "force-static";

import { absoluteUrl } from "@/lib/site";

/**
 * SITEMAP
 * ---------------------------------------------------------------------------
 * Generates /sitemap.xml at build time. Referenced from robots.txt, so search
 * engines discover every page without relying on crawling link graphs.
 *
 * Add each new route here as it is built. `priority` is relative within the
 * site (1.0 = most important); `changeFrequency` is a hint, not a guarantee.
 */

interface Route {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}

const routes: Route[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/platform/pitch", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/pulse", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/magic", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/chat", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/saathi", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/kxp", priority: 0.8, changeFrequency: "monthly" },
  { path: "/platform/notes", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/frontline", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/onboarding", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/solutions/capability-building",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/solutions/sales-enablement",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  { path: "/solutions/compliance", priority: 0.8, changeFrequency: "monthly" },
  // Pricing sits high: it is a primary nav destination and a conversion page.
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/resources", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/insights", priority: 0.7, changeFrequency: "weekly" },
  // Individual insight articles. Each is written once and rarely revised, so
  // they sit a step below the index that lists them.
  {
    path: "/resources/insights/ready-at-work",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/resources/insights/content-creation",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/resources/insights/frontline-conversations",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/resources/insights/living-baselines",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/resources/insights/context-advantage",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  {
    path: "/resources/insights/flow-of-work",
    priority: 0.6,
    changeFrequency: "yearly",
  },
  { path: "/resources/events", priority: 0.7, changeFrequency: "weekly" },
  { path: "/resources/guides", priority: 0.7, changeFrequency: "weekly" },
  // TODO(routes): add pages as they are created, e.g.
  // { path: "/about",   priority: 0.7, changeFrequency: "monthly" },
  // { path: "/privacy", priority: 0.3, changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
