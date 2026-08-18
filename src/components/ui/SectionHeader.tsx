import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

/**
 * SECTION HEADER
 * ---------------------------------------------------------------------------
 * The eyebrow / title / description trio that opens most landing-page
 * sections. Extracted because it recurs in nearly every section and the
 * internal spacing must stay identical between them.
 *
 *   <SectionHeader
 *     eyebrow="Features"
 *     title="Everything you need to learn faster"
 *     description="Short supporting sentence."
 *   />
 */

interface SectionHeaderProps {
  /** Small label above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level. Defaults to h2 — correct for a top-level page section. */
  as?: "h1" | "h2" | "h3";
  /** Visual size of the title, independent of the level above. */
  size?: "3xl" | "4xl" | "5xl";
  align?: "left" | "center";
  /** Optional CTA row rendered under the description. */
  actions?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  as = "h2",
  size = "4xl",
  align = "center",
  actions,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <Badge variant="brand">{eyebrow}</Badge>}

      <Heading as={as} size={size} align={align}>
        {title}
      </Heading>

      {description && (
        <Text size="lg" measure="wide" align={align}>
          {description}
        </Text>
      )}

      {actions && (
        <div
          className={cn(
            "mt-2 flex flex-wrap gap-3",
            align === "center" && "justify-center",
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
