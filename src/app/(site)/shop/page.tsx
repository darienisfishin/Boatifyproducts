export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY, ALL_BRANDS_QUERY } from "@/sanity/lib/queries";
import type { SanityCategory, SanityBrand } from "@/sanity/types";
import ShopClient from "./ShopClient";

export const metadata = { title: "Shop | Boatify" };

export default async function ShopPage() {
  const [{ data: products }, { data: categoriesData }, { data: brandsData }] = await Promise.all([
    sanityFetch({ query: ALL_PRODUCTS_QUERY }),
    sanityFetch({ query: ALL_CATEGORIES_QUERY }),
    sanityFetch({ query: ALL_BRANDS_QUERY }),
  ]);

  const safeProducts = products ?? [];
  const categories = (categoriesData as SanityCategory[] | null)?.map((c) => c.name) ?? [];
  const brands = (brandsData as SanityBrand[] | null)?.map((b) => b.name) ?? [];

  return <ShopClient products={safeProducts as any} categories={categories} brands={brands} />;
}
