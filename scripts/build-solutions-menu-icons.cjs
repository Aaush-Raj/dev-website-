/**
 * SOLUTIONS MEGA-MENU ICONS
 * ---------------------------------------------------------------------------
 * Copies the eleven supplied menu icons into public/assets/icons/solutions,
 * renamed to the kebab-case keys the navigation data uses.
 *
 * WHY THEY STAY PNG
 * Same reasoning as the engine icons in public/assets/icons/engines: each is a
 * painted mark with the lavender disc already baked in, at 96x96 with real
 * alpha. They are artwork rather than line glyphs, so redrawing them as SVG —
 * the way ResourcesMenuIcons does for its stroked set — would mean
 * reinterpreting eleven pieces of art by hand for no gain.
 *
 * They are NOT converted to webp: the menu shows them at 56px over a white
 * panel, the originals are a few kilobytes each, and PNG keeps the alpha edge
 * crisp at that size. The engines directory sets the same precedent.
 */

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "designs/Solutions-Mega-Menu-Icons");
const OUT = path.join(ROOT, "public/assets/icons/solutions");

/** Supplied filename -> the `icon` key used in content/navigation.ts. */
const ICONS = {
  "Capability-Building.png": "capability-building",
  "Frontline-Performance.png": "frontline-performance",
  "Employee-Onboarding.png": "employee-onboarding",
  "Compliance-Readiness.png": "compliance-readiness",
  "Knowledge-Management.png": "knowledge-management",
  "BFSI.png": "bfsi",
  "Telecom.png": "telecom",
  "Healthcare.png": "healthcare",
  "Manufacturing.png": "manufacturing",
  "Professional-Services.png": "professional-services",
  "Retail.png": "retail",
};

for (const [from, to] of Object.entries(ICONS)) {
  const source = path.join(SRC, from);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing supplied icon: ${from}`);
  }

  fs.copyFileSync(source, path.join(OUT, `${to}.png`));
  console.log(`${to}.png`);
}
