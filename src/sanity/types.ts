// TypeScript types that match the GROQ query return shapes.
// These mirror the structure of the static products.ts interfaces
// so consuming code requires minimal changes.

export interface SanityProductVariant {
  variantId: string;
  size?: string;
  color?: string;
  colorHex?: string;
  inStock: boolean;
}

export interface SanityProductSpec {
  key: string;
  value: string;
}

export interface SanityProduct {
  _id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  wholesalePrice?: number;
  category: string;
  categorySlug?: string;
  image?: string | null;
  zone?: string;
  brand: string;
  brandSlug?: string;
  type: "part" | "apparel";
  specs?: SanityProductSpec[];
  compatibility?: string[];
  variants?: SanityProductVariant[];
}

export interface SanityCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface SanityBrand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string | null;
}

export interface SanityBoatModel {
  name: string;
  years?: string[];
  description?: string;
  image?: string | null;
}

export interface SanityBoatBrand {
  _id: string;
  name: string;
  slug: string;
  boatType: "bass" | "pontoon";
  description?: string;
  models?: SanityBoatModel[];
}

export interface SanityBoatZone {
  _id: string;
  boatType: "bass" | "pontoon";
  zoneId: string;
  label?: string;
  x?: number;
  y?: number;
  productSlugs: string[];
  products?: SanityProduct[];
}

export interface SanityRecommendedProduct {
  note?: string;
  category?: string;
  product: Pick<SanityProduct, "_id" | "sku" | "name" | "slug" | "price" | "brand" | "image">;
}

export interface SanityBoatRecommendation {
  _id: string;
  modelName: string;
  brandSlug?: string;
  boatType: "bass" | "pontoon";
  image?: string | null;
  description?: string;
  recommendedProducts?: SanityRecommendedProduct[];
}

export interface SanityPartnerBrand {
  name: string;
  emoji?: string;
  description?: string;
  href?: string;
}

export interface SanityBoatBrandDisplay {
  name: string;
  emoji?: string;
}

export interface SanityHomepage {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroCTALabel?: string;
  heroCTALink?: string;
  oemSavingsPercent?: string;
  featuredProducts?: SanityProduct[];
  partnerBrands?: SanityPartnerBrand[];
  boatBrandsDisplay?: SanityBoatBrandDisplay[];
}

export interface SanityFounder {
  name?: string;
  title?: string;
  emoji?: string;
  bio?: string;
  photo?: string | null;
}

export interface SanityValue {
  title?: string;
  emoji?: string;
  description?: string;
}

export interface SanityAboutPage {
  heroTitle?: string;
  heroSubtitle?: string;
  storyContent?: unknown[];
  founders?: SanityFounder[];
  values?: SanityValue[];
}

export interface SanityGiveaway {
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  prizeDetails?: string | null;
  endDate?: string | null;
  ctaLabel?: string | null;
  prizeImage?: string | null;
}

// Aliases to match existing code that imports Product / ProductVariant
export type Product = SanityProduct;
export type ProductVariant = SanityProductVariant;
