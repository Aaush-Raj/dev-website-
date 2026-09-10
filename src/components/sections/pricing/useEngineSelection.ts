"use client";

import { useCallback, useMemo, useState } from "react";

import { pricing } from "@/content/pricing";

/**
 * PRICING — ENGINE SELECTION STATE
 * ---------------------------------------------------------------------------
 * One selection shared by everything on the page that can change it: the
 * "Add to enquiry" button on each engine card, the twelve checkboxes in the
 * enquiry form, the chips in the fixed selection bar, and the Fabric CTA.
 *
 * IT IS A HOOK RATHER THAN FOUR LOCAL STATES because the package's own script
 * keeps a single selection object for exactly this reason: selecting an engine
 * anywhere has to tick its form checkbox, relabel its card button and update
 * the bar at once. Four copies would drift apart on the first interaction.
 *
 * A Set keeps membership checks O(1) and, more usefully, makes "already
 * selected" impossible to get wrong — adding twice is a no-op rather than a
 * duplicate chip.
 */

/** Every engine that can be selected, in catalogue order plus Fabric. */
const ALL_ENGINES = [
  ...pricing.catalogue.engines.map((engine) => ({
    id: engine.id,
    name: engine.name,
    /** Dev and concept engines are reported separately in the payload. */
    interest: engine.badge?.tone === "dev" || engine.badge?.tone === "concept",
  })),
  { id: "fabric", name: pricing.fabric.engine.name, interest: false },
] as const;

export type EngineId = (typeof ALL_ENGINES)[number]["id"];

export function useEngineSelection() {
  const [selected, setSelected] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const toggle = useCallback((id: string) => {
    setSelected((current) => {
      const next = new Set(current);
      // Deliberately a toggle rather than separate add/remove: the card
      // button, the chip and the checkbox all mean "flip this one".
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const add = useCallback((id: string) => {
    setSelected((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setSelected((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  /** The selected engines in catalogue order, not click order. */
  const chosen = useMemo(
    () => ALL_ENGINES.filter((engine) => selected.has(engine.id)),
    [selected],
  );

  return {
    selected,
    has: useCallback((id: string) => selected.has(id), [selected]),
    toggle,
    add,
    remove,
    chosen,
    count: chosen.length,
    /** Every selectable engine, for the form's checkbox grid. */
    all: ALL_ENGINES,
  };
}

export type EngineSelection = ReturnType<typeof useEngineSelection>;
