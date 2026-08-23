import type { MetadataRoute } from "next";

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
