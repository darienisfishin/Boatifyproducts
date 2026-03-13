import { defineQuery } from "next-sanity";

// ─── Product queries ───────────────────────────────────────────────────

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(name asc) {
    _id,
    sku,
    name,
    "slug": slug.current,
    description,
    price,
    wholesalePrice,
    "category": category->name,
    "categorySlug": category->slug.current,
    "image": image.asset->url,
    zone,
    "brand": brand->name,
    "brandSlug": brand->slug.current,
    "type": productType,
    specs,
    compatibility,
    variants
  }
`);

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    sku,
    name,
    "slug": slug.current,
    description,
    price,
    wholesalePrice,
    "category": category->name,
    "categorySlug": category->slug.current,
    "image": image.asset->url,
    zone,
    "brand": brand->name,
    "brandSlug": brand->slug.current,
    "type": productType,
    specs,
    compatibility,
    variants
  }
`);

export const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "product" && category->slug.current == $categorySlug] | order(name asc) {
    _id,
    sku,
    name,
    "slug": slug.current,
    description,
    price,
    wholesalePrice,
    "category": category->name,
    "categorySlug": category->slug.current,
    "image": image.asset->url,
    zone,
    "brand": brand->name,
    "brandSlug": brand->slug.current,
    "type": productType,
    specs,
    compatibility,
    variants
  }
`);

export const ALL_PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product"] { "slug": slug.current }
`);

// ─── Category & Brand queries ──────────────────────────────────────────

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description
  }
`);

export const ALL_BRANDS_QUERY = defineQuery(`
  *[_type == "brand"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    "logo": logo.asset->url
  }
`);

// ─── Homepage query ────────────────────────────────────────────────────

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroCTALabel,
    heroCTALink,
    oemSavingsPercent,
    "featuredProducts": featuredProducts[]-> {
      _id,
      sku,
      name,
      "slug": slug.current,
      description,
      price,
      wholesalePrice,
      "category": category->name,
      "image": image.asset->url,
      zone,
      "brand": brand->name,
      "type": productType,
      variants
    },
    partnerBrands,
    boatBrandsDisplay
  }
`);

// ─── About page query ──────────────────────────────────────────────────

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage"][0] {
    heroTitle,
    heroSubtitle,
    storyContent,
    founders[] {
      name,
      title,
      emoji,
      bio,
      "photo": photo.asset->url
    },
    values
  }
`);

// ─── Boat recommendation queries ───────────────────────────────────────

export const ALL_RECOMMENDATIONS_QUERY = defineQuery(`
  *[_type == "boatRecommendation"] | order(modelName asc) {
    _id,
    modelName,
    brandSlug,
    boatType,
    "image": image.asset->url,
    description,
    "recommendedProducts": recommendedProducts[] {
      note,
      category,
      "product": product-> {
        _id,
        sku,
        name,
        "slug": slug.current,
        price,
        "brand": brand->name,
        "image": image.asset->url
      }
    }
  }
`);

// ─── Boat brand & zone queries ─────────────────────────────────────────

export const ALL_BOAT_BRANDS_QUERY = defineQuery(`
  *[_type == "boatBrand"] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    boatType,
    description,
    models[] {
      name,
      years,
      description,
      "image": image.asset->url
    }
  }
`);

export const BOAT_ZONES_BY_TYPE_QUERY = defineQuery(`
  *[_type == "boatZone" && boatType == $boatType] | order(zoneId asc) {
    _id,
    boatType,
    zoneId,
    label,
    x,
    y,
    "productSlugs": products[]->slug.current,
    "products": products[]-> {
      _id,
      sku,
      name,
      "slug": slug.current,
      price,
      "brand": brand->name,
      productType
    }
  }
`);

// ─── Giveaway query ─────────────────────────────────────────────────────

export const GIVEAWAY_QUERY = defineQuery(`
  *[_type == "giveaway"][0] {
    title,
    subtitle,
    description,
    prizeDetails,
    endDate,
    ctaLabel,
    "prizeImage": prizeImage.asset->url
  }
`);
