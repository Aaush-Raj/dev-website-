/**
 * SECTION 9 CONTENT — enterprise outcomes
 * ---------------------------------------------------------------------------
 * Four headline metrics beside a grouped bar chart comparing branch readiness
 * with Lurny against the pre-deployment baseline.
 *
 * The figures are illustrative marketing content, not live data.
 *
 * TODO(legal): confirm these numbers and their attributions before launch —
 * named-client claims ("Private bank, 14,000 employees") usually need sign-off.
 */

export const outcomes = {
  eyebrow: "Enterprise outcomes",

  /** Split so the line breaks where the design breaks it on lg+. */
  headline: ["Measured in the", "business, not in the LMS"] as const,

  /**
   * The four stat blocks, in reading order — the grid fills row by row, so
   * this order is [top-left, top-right, bottom-left, bottom-right].
   *
   * `value` and `suffix` are separate because the suffix is set noticeably
   * smaller and lower than the numeral in the design. `tone` picks the colour
   * of the left rule: the design accents exactly one stat in amber so the eye
   * has somewhere to land.
   */
  stats: [
    {
      value: "38",
      suffix: "%",
      label: "Faster time to branch readiness",
      footnote: "Private bank, 14,000 employees",
      tone: "brand",
    },
    {
      value: "2.1",
      suffix: "x",
      label: "Cross-sell conversations per branch",
      footnote: "Twelve-month deployment",
      tone: "accent",
    },
    {
      value: "1,200",
      suffix: "",
      label: "Branches live in two quarters",
      footnote: "Phased rollout, 11 languages",
      tone: "brand",
    },
    {
      value: "72",
      suffix: "%",
      label: "Reduction in content production time",
      footnote: "Measured against prior vendor cycle",
      tone: "brand",
    },
  ],

  /**
   * The grouped bar chart. Values are on the 0-80 scale the design's y-axis
   * shows; `axisMax` drives both the gridlines and the bar heights, so the
   * chart stays correct if the figures change.
   */
  chart: {
    series: [
      { key: "lurny", label: "With Lurny", tone: "brand" },
      { key: "baseline", label: "Baseline", tone: "accent" },
    ],
    axisMax: 80,
    /** Gridline / tick values, bottom to top. */
    ticks: [0, 20, 40, 60, 80],
    groups: [
      { label: "Q1", lurny: 43, baseline: 27 },
      { label: "Q2", lurny: 60, baseline: 31 },
      { label: "Q3", lurny: 67, baseline: 34 },
      { label: "Q4", lurny: 76, baseline: 36 },
    ],
    caption:
      "Branch readiness score against the pre-deployment baseline, four quarters",
  },
} as const;
