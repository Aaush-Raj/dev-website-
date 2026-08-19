"use client";

import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  Ref,
} from "react";

import { cn } from "@/lib/utils";

/**
 * UNCOPYABLE
 * ---------------------------------------------------------------------------
 * Wraps a decorative product illustration so it behaves like the screenshot it
 * imitates: its text cannot be selected, copied or dragged out.
 *
 * `select-none` blocks pointer selection; the handlers stop a keyboard
 * select-all or an image-drag from lifting the markup out.
 *
 * IMPORTANT: this is presentation, not protection. The markup is still in the
 * DOM and readable by anyone who looks. Its purpose is to stop these blocks
 * feeling like stray selectable text sitting beside real copy.
 *
 * These illustrations are all aria-hidden, so none of this affects assistive
 * technology — screen readers never reach the content. `aria-hidden` defaults
 * to true here for that reason; pass `aria-hidden={false}` only if a caller
 * genuinely needs the content exposed, which would also mean reconsidering
 * whether it should be uncopyable at all.
 */

type UncopyableProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "ref" | "onCopy" | "onCut" | "onDragStart" | "onContextMenu"
> & {
  children: ReactNode;
  className?: string;
  /** Render as a different element. Defaults to a div. */
  as?: ElementType;
  /** Forwarded to the rendered element — used where a caller measures it. */
  innerRef?: Ref<HTMLDivElement>;
  /** Escape hatch; see the note above before setting this false. */
  "aria-hidden"?: boolean;
};

export function Uncopyable({
  children,
  className,
  as: Component = "div",
  innerRef,
  "aria-hidden": ariaHidden = true,
  ...rest
}: UncopyableProps) {
  return (
    <Component
      ref={innerRef}
      aria-hidden={ariaHidden}
      className={cn("select-none", className)}
      onCopy={(event: React.ClipboardEvent) => event.preventDefault()}
      onCut={(event: React.ClipboardEvent) => event.preventDefault()}
      onDragStart={(event: React.DragEvent) => event.preventDefault()}
      onContextMenu={(event: React.MouseEvent) => event.preventDefault()}
      {...rest}
    >
      {children}
    </Component>
  );
}
