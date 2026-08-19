/**
 * DASHBOARD MOCKUP DATA
 * ---------------------------------------------------------------------------
 * The figures shown in the hero's product mockup. Extracted so the visual can
 * be re-pointed at different sample data without editing SVG or layout.
 *
 * NOTE: this is illustrative sample data for the marketing visual, not live
 * product output.
 */

export const dashboard = {
  title: "Capability Readiness",

  filters: ["Retail Banking", "Q2 2024"] as const,

  sidebar: [
    { label: "Overview", icon: "grid" },
    { label: "Capabilities", icon: "grid" },
    { label: "Roles", icon: "users" },
    { label: "People", icon: "users" },
    { label: "Analytics", icon: "chart" },
    { label: "Actions", icon: "action" },
    { label: "Reports", icon: "report" },
    { label: "Settings", icon: "settings" },
  ] as const,

  readiness: {
    label: "Overall readiness",
    value: 86,
    caption: "Ready",
    deltaLabel: "vs last quarter",
    delta: "8 pts",
    targetLabel: "Target",
    target: "90%",
  },

  radar: {
    label: "Readiness by capability",
    axes: [
      { label: "Customer\nEngagement", value: 0.82 },
      { label: "Risk\nManagement", value: 0.74 },
      { label: "Operational\nExcellence", value: 0.62 },
      { label: "Compliance", value: 0.7 },
    ],
  },

  heatmap: {
    label: "Role competency heatmap",
    columns: ["RM", "CSO", "BO", "BM", "Ops", "CA"] as const,
    rows: [
      { label: "Customer Engagement", cells: [3, 3, 3, 2, 1, 2] },
      { label: "Risk Management", cells: [1, 2, 3, 2, 2, 3] },
      { label: "Digital Fluency", cells: [2, 0, 1, 2, 1, 1] },
      { label: "Operational Excellence", cells: [2, 1, 2, 3, 2, 1] },
      { label: "Compliance", cells: [1, 2, 2, 1, 3, 2] },
      { label: "Product Knowledge", cells: [3, 1, 2, 2, 1, 2] },
    ],
    /** Index maps to the legend below: 0=Gap, 1=Developing, 2=Moderate, 3=Strong */
    legend: ["Strong", "Moderate", "Developing", "Gap"] as const,
  },

  branchCard: {
    title: "Branch readiness",
    value: "86%",
    lines: ["Retail Banking", "1,200 branches"],
    chart: {
      points: [0.5, 0.62, 0.78] as const,
      labels: ["Q4 '23", "Q1 '24", "Q2 '24"] as const,
      yLabels: ["100%", "75%", "50%", "25%", "0%"] as const,
    },
  },

  actionCard: {
    label: "Recommended action",
    title: "Strengthen Risk Management",
    detail: "23% of roles below target",
    link: "View action plan",
  },
} as const;
