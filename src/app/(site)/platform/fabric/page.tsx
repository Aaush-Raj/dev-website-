import { FabricDoes } from "@/components/sections/fabric/FabricDoes";
import { FabricLayers } from "@/components/sections/fabric/FabricLayers";
import { FabricHero } from "@/components/sections/fabric/FabricHero";
import { fabric } from "@/content/fabric";
import { buildMetadata } from "@/lib/seo";

/**
 * LURNYFABRIC PAGE
 * ---------------------------------------------------------------------------
 * Header and footer come from the root layout, so this file is only ever a
 * composition of sections. Sections 2+ are added here as their designs land.
 */

export const metadata = buildMetadata({
  title: fabric.meta.title,
  description: fabric.meta.description,
  path: fabric.meta.path,
});

export default function FabricPage() {
  return (
    <>
      <FabricHero />

      <FabricLayers />

      <FabricDoes />
    </>
  );
}
