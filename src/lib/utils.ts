import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, resolving Tailwind conflicts in favour of the last value.
 *
 * clsx handles conditionals and arrays; tailwind-merge then dedupes classes
 * from the same utility group. This is what makes component-level overrides
 * work predictably:
 *
 *   cn("px-4 py-2", "px-6")           // -> "py-2 px-6"   (not both px-*)
 *   cn("text-sm", isLarge && "text-lg")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
