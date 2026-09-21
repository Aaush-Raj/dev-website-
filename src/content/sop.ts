/**
 * LURNYSOP PAGE CONTENT
 * ---------------------------------------------------------------------------
 * Copy for the LurnySOP product page at /platform/sop.
 *
 * Section 1 is defined below; further sections are added here as their designs
 * land. Copy is verbatim from the design pack's
 * "1 LurnySOP_Framework_Readiness_Hero_Assets/04_Left_Side_Text.txt".
 *
 * THE PANEL COPY IS NOT IN THAT FILE. The text file covers the left column
 * only — eyebrow, headline, supporting copy, buttons and the framework strip.
 * Everything under `panel` below is transcribed from the supplied comp
 * (`section1.png` and `02_..._Card_Transparent.png`, read at full size), which
 * is the only source for it. It is illustrative product UI, not a claim about
 * a live workspace, which is what the panel's own "Illustrative workspace"
 * chip says on screen.
 */

/** One framework tile in the readiness panel. */
export interface SopFramework {
  /** Stable key — also selects the glyph in SopFrameworkIcons. */
  id: string;
  name: string;
  /** The two status lines under the name, top to bottom. */
  status: readonly [string, string];
  /**
   * Which dot colour the two status lines take. "active" is the amber used
   * for work in progress, "idle" the slate used for untouched frameworks.
   */
  tone: "active" | "idle";
}

export const sop = {
  /** Page-level metadata, consumed by the route's `metadata` export. */
  meta: {
    title: "LurnySOP — Build towards ISO, GDPR and more, from day one",
    description:
      "Turn framework requirements into policies, clear responsibilities and everyday actions tailored to your organisation. LurnySOP guides implementation, tracks gaps and keeps evidence ready for review.",
    path: "/platform/sop",
  },

  hero: {
    eyebrow: "LurnySOP · Framework readiness",

    /**
     * Split at the design's line breaks so they are the content's decision,
     * not a wrapping accident. The em dash closes line 2 exactly as the comp
     * sets it — "and more—from day one."
     */
    headline: ["Build towards ISO,", "GDPR and more—", "from day one."],

    description:
      "Turn framework requirements into policies, clear responsibilities and everyday actions tailored to your organisation. LurnySOP guides implementation, tracks gaps and keeps evidence ready for review.",

    actions: {
      /*
       * The arrow on the secondary button is drawn as an SVG, so the label
       * here is the text alone — the design's trailing "→" is presentation.
       */
      primary: { label: "Book a demo", href: "/demo" },
      secondary: { label: "Explore frameworks", href: "#frameworks" },
    },

    /** The strip beneath the buttons, rendered middot-separated. */
    frameworks: [
      "ISO 27001",
      "ISO 27701",
      "ISO 42001",
      "SOC 2",
      "GDPR",
      "DPDP",
    ],

    /**
     * The readiness panel on the right. Rebuilt in markup rather than shipped
     * as the supplied crops — see SopReadinessPanel.tsx for why.
     */
    panel: {
      brand: { lead: "Lurny", accent: "SOP" },
      workspace: "Illustrative workspace",
      heading: "Framework readiness",
      subheading: "Requirements, actions and evidence in one place.",

      /** The first is the one the design shows selected. */
      tabs: ["Frameworks", "My tasks", "Evidence"],

      /**
       * Six tiles, in the comp's reading order: left column top to bottom,
       * then right. The grid lays them out two per row, so this order is
       * ISO 27001, GDPR, SOC 2, DPDP, ISO 27701, ISO 42001.
       */
      frameworks: [
        {
          id: "iso27001",
          name: "ISO 27001",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "gdpr",
          name: "GDPR",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "soc2",
          name: "SOC 2",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "dpdp",
          name: "DPDP",
          status: ["Implementation in progress", "Evidence pending"],
          tone: "active",
        },
        {
          id: "iso27701",
          name: "ISO 27701",
          status: ["Planned", "Not yet reviewed"],
          tone: "idle",
        },
        {
          id: "iso42001",
          name: "ISO 42001",
          status: ["Planned", "Not yet reviewed"],
          tone: "idle",
        },
      ] as const satisfies readonly SopFramework[],

      /** The card overlapping the panel's bottom edge. */
      nextStep: {
        eyebrow: "Your next step",
        title: "Review Access Control Procedure",
        owner: "Owner: IT lead",
        action: "Open review",
      },
    },
  },
} as const;
