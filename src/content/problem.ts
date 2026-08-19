/**
 * SECTION 2 CONTENT — social proof + the enterprise problem
 * ---------------------------------------------------------------------------
 * Copy kept out of the components so wording can change without touching
 * markup.
 */

export const socialProof = {
  label: "Trusted by enterprises across India & the GCC",

  /**
   * Client logos.
   *
   * PLACEHOLDER: these are abstract geometric marks standing in for the real
   * client logos, matched to the design's weight and grey. `mark` selects the
   * SVG shape in components/sections/problem/ClientMarks.tsx.
   *
   * TODO(assets): replace each entry with the real logo — swap `mark` for an
   * imported SVG and set `name` to the client's actual name. The `name` is
   * what screen readers announce, so it must be accurate before launch.
   */
  logos: [
    { name: "Client 1", mark: "orbit" },
    { name: "Client 2", mark: "lattice" },
    { name: "Client 3", mark: "fold" },
    { name: "Client 4", mark: "apex" },
    { name: "Client 5", mark: "hexloop" },
    { name: "Client 6", mark: "matrix" },
    { name: "Client 7", mark: "burst" },
    { name: "Client 8", mark: "chevron" },
  ] as const,
} as const;

export const problem = {
  eyebrow: "The enterprise problem",

  headline: "Training activity is measured. Capability is not.",

  description:
    "Enterprises run large learning programmes and still cannot answer the question their business asks: is the workforce capable of doing the work? Completion data does not answer it, and the systems that hold learning are disconnected from the systems that hold performance.",

  items: [
    {
      title: "Capability is undefined",
      description:
        "Role expectations live in job descriptions, not in a model anything can measure against.",
    },
    {
      title: "Content production is the bottleneck",
      description:
        "Product and policy change monthly. Course builds take quarters, in one language.",
    },
    {
      title: "Knowledge does not reach the moment of need",
      description:
        "SOPs sit in portals. The branch officer is in front of a customer.",
    },
    {
      title: "Nothing closes the loop",
      description:
        "What happens in the customer conversation never returns to what gets taught next.",
    },
  ],
} as const;
