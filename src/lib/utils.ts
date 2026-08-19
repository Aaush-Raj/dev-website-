import { extendTailwindMerge } from "tailwind-merge";

/**
 * Merge class names, resolving Tailwind conflicts in favour of the last value.
 *
 * clsx handles conditionals and arrays; tailwind-merge then dedupes classes
 * from the same utility group. This is what makes component-level overrides
 * work predictably:
 *
 *   cn("px-4 py-2", "px-6")           // -> "py-2 px-6"   (not both px-*)
 *   cn("text-sm", isLarge && "text-lg")
 *
 * ---------------------------------------------------------------------------
 * WHY extendTailwindMerge RATHER THAN twMerge
 * ---------------------------------------------------------------------------
 * tailwind-merge ships with knowledge of Tailwind's DEFAULT scales. Our theme
 * adds custom keys, and text-* is ambiguous: `text-hero` is a font size while
 * `text-neutral-900` is a colour. Without being told, tailwind-merge assumes a
 * bare `text-<word>` is a colour and silently drops the earlier one —
 * `cn("text-hero", "text-neutral-900")` collapses to just the colour, and the
 * heading renders at the inherited size.
 *
 * Registering the custom scales below keeps them in separate conflict groups,
 * so a size and a colour can coexist.
 *
 * Any future custom font-size, radius or shadow key must be added here too.
 */
export const cn = extendTailwindMerge({
  extend: {
    classGroups: {
      // Custom font sizes beyond Tailwind's defaults.
      "font-size": [{ text: ["hero"] }],
      // Custom line heights.
      leading: [{ leading: ["hero"] }],
      // Custom max-width keys used by <Container>.
      "max-w": [{ "max-w": ["narrow", "content", "nav", "hero", "wide"] }],
      // Custom shadows.
      "shadow-color": [],
      shadow: [{ shadow: ["brand", "accent"] }],
      // Section-rhythm padding keys.
      py: [{ py: ["section", "section-sm", "section-lg"] }],
      px: [{ px: ["gutter"] }],
      // Custom transition-duration keys.
      duration: [{ duration: ["instant", "fast", "normal", "slow", "slower"] }],
      ease: [{ ease: ["out", "in-out", "spring"] }],
    },
  },
});
