export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { ALL_PRODUCTS_QUERY, ALL_CATEGORIES_QUERY, ALL_BRANDS_QUERY } from "@/sanity/lib/queries";
import type { SanityCategory, SanityBrand } from "@/sanity/types";
import ShopClient from "./ShopClient";

export const metadata = { title: "Shop | Boatify" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; brand?: string }>;
}) {
  const [{ data: products }, { data: categoriesData }, { data: brandsData }, params] =
    await Promise.all([
      sanityFetch({ query: ALL_PRODUCTS_QUERY }),
      sanityFetch({ query: ALL_CATEGORIES_QUERY }),
      sanityFetch({ query: ALL_BRANDS_QUERY }),
      searchParams,
    ]);

  const safeProducts = products ?? [];
  const categories = (categoriesData as SanityCategory[] | null)?.map((c) => c.name) ?? [];
  const brands = (brandsData as SanityBrand[] | null)?.map((b) => b.name) ?? [];
  const initialCategory = params?.category ?? "All";
  const initialBrand = params?.brand ?? "All";

  return (
    <ShopClient
      products={safeProducts as any}
      categories={categories}
      brands={brands}
      initialCategory={initialCategory}
      initialBrand={initialBrand}
    />
  );
}
