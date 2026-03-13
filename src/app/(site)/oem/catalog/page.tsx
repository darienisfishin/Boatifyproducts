export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PRODUCTS_QUERY } from "@/sanity/lib/queries";
import OEMCatalogClient from "./OEMCatalogClient";
import type { SanityProduct } from "@/sanity/types";

export const metadata = {
  title: "OEM Wholesale Catalog | Boatify",
  description: "Wholesale pricing for qualified OEM boat builders.",
};

export default async function OEMCatalogPage() {
  const { data } = await sanityFetch({ query: ALL_PRODUCTS_QUERY });

  // Pre-filter on server: only parts with wholesale pricing
  const wholesaleProducts = ((data ?? []) as SanityProduct[]).filter(
    (p) => p.type === "part" && p.wholesalePrice
  );

  return <OEMCatalogClient products={wholesaleProducts} />;
}
