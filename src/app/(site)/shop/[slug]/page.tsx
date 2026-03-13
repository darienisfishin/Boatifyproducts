import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/client";
import {
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  ALL_PRODUCT_SLUGS_QUERY,
  BOAT_ZONES_BY_TYPE_QUERY,
} from "@/sanity/lib/queries";
import ProductDetailClient from "./ProductDetailClient";
import type { SanityBoatZone } from "@/sanity/types";

interface Props {
  params: Promise<{ slug: string }>;
}

// Use client.fetch directly — sanityFetch can't run in generateStaticParams
// because it calls draftMode() which requires a request scope.
export async function generateStaticParams() {
  try {
    const data = await client.fetch<Array<{ slug: string }>>(ALL_PRODUCT_SLUGS_QUERY);
    return (data ?? []).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await sanityFetch({
    query: PRODUCT_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!product) return { title: "Product Not Found | Boatify" };
  return {
    title: `${product.name} | Boatify`,
    description: product.description ?? `Shop ${product.name} at Boatify.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  const [{ data: product }, { data: bassZonesRaw }, { data: pontoonZonesRaw }] =
    await Promise.all([
      sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } }),
      sanityFetch({ query: BOAT_ZONES_BY_TYPE_QUERY, params: { boatType: "bass" } }),
      sanityFetch({ query: BOAT_ZONES_BY_TYPE_QUERY, params: { boatType: "pontoon" } }),
    ]);

  if (!product) notFound();

  // Fetch related products (same category, exclude current)
  const { data: categoryProducts } = await sanityFetch({
    query: PRODUCTS_BY_CATEGORY_QUERY,
    params: { categorySlug: product.categorySlug ?? "" },
  });

  const related = (categoryProducts ?? [])
    .filter((p: { sku: string }) => p.sku !== product.sku)
    .slice(0, 4);

  // Filter zones to only those that contain this product's slug
  const bassZones = ((bassZonesRaw ?? []) as SanityBoatZone[]).filter((z) =>
    z.productSlugs?.includes(slug)
  );
  const pontoonZones = ((pontoonZonesRaw ?? []) as SanityBoatZone[]).filter((z) =>
    z.productSlugs?.includes(slug)
  );

  return (
    <ProductDetailClient
      product={product as any}
      related={related as any}
      bassZones={bassZones}
      pontoonZones={pontoonZones}
    />
  );
}
