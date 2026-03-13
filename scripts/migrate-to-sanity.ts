/**
 * One-time migration script: moves all static data from lib/ into Sanity.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Prerequisites:
 *   - NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 *   - NEXT_PUBLIC_SANITY_DATASET in .env.local (default: production)
 *   - SANITY_API_WRITE_TOKEN in .env.local (requires write permission)
 *
 * The script is idempotent: it uses _id-based patching so re-running is safe.
 */

import "dotenv/config";
import path from "path";
import { createClient } from "@sanity/client";
import { nanoid } from "nanoid";

// ─── Sanity client ──────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  console.error("❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
  process.exit(1);
}
if (!token) {
  console.error(
    "❌  SANITY_API_WRITE_TOKEN is not set.\n" +
      "   Create an API token with write access at https://www.sanity.io/manage"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-03-01",
  token,
  useCdn: false,
});

// ─── Static data imports ────────────────────────────────────────────────────
// We import from the TypeScript source files directly using tsx.
// Adjust these paths if the lib files are elsewhere.
const productsPath = path.resolve(process.cwd(), "src/lib/products.ts");
const boatsPath = path.resolve(process.cwd(), "src/lib/boats.ts");
const recsPath = path.resolve(process.cwd(), "src/lib/recommendations.ts");

async function loadModule(filePath: string) {
  return import(filePath);
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function makeCategoryId(name: string) {
  return `category-${slugify(name)}`;
}
function makeBrandId(name: string) {
  return `brand-${slugify(name)}`;
}
function makeProductId(sku: string) {
  return `product-${sku.toLowerCase()}`;
}
function makeBoatBrandId(name: string, type: string) {
  return `boatbrand-${slugify(name)}-${type}`;
}
function makeBoatZoneId(zoneId: string, boatType: string) {
  return `boatzone-${boatType}-${slugify(zoneId)}`;
}
function makeRecommendationId(modelName: string) {
  return `boatrec-${slugify(modelName)}`;
}

// ─── Main migration ──────────────────────────────────────────────────────────
async function migrate() {
  console.log(`\n🚢  Boatify → Sanity Migration`);
  console.log(`   Project: ${projectId}  Dataset: ${dataset}\n`);

  // ── 1. Load static data ──────────────────────────────────────────────────
  const productsModule = await loadModule(productsPath);
  const boatsModule = await loadModule(boatsPath);
  const recsModule = await loadModule(recsPath);

  const products: any[] = productsModule.products ?? [];
  const boatBrands: any[] = boatsModule.boatBrands ?? [];
  const bassBoatZones: any[] = boatsModule.bassBoatZones ?? [];
  const pontoonBoatZones: any[] = boatsModule.pontoonBoatZones ?? [];
  const boatRecommendations: any[] = recsModule.boatRecommendations ?? [];

  console.log(`📦  Found ${products.length} products`);
  console.log(`⛵  Found ${boatBrands.length} boat brands`);
  console.log(`🗺   Found ${bassBoatZones.length} bass zones, ${pontoonBoatZones.length} pontoon zones`);
  console.log(`📋  Found ${boatRecommendations.length} recommendations\n`);

  // ── 2. Collect unique categories and brands from products ────────────────
  const categoryNames = [...new Set(products.map((p: any) => p.category as string))];
  const brandNames = [...new Set(products.map((p: any) => p.brand as string))];

  // ── 3. Create category documents ────────────────────────────────────────
  console.log("📁  Migrating categories...");
  for (const name of categoryNames) {
    const doc = {
      _id: makeCategoryId(name),
      _type: "category",
      name,
      slug: { _type: "slug", current: slugify(name) },
    };
    await client.createOrReplace(doc);
    process.stdout.write(".");
  }
  console.log(`\n   ✅  ${categoryNames.length} categories\n`);

  // ── 4. Create brand documents ────────────────────────────────────────────
  console.log("🏷   Migrating product brands...");
  for (const name of brandNames) {
    const doc = {
      _id: makeBrandId(name),
      _type: "brand",
      name,
      slug: { _type: "slug", current: slugify(name) },
    };
    await client.createOrReplace(doc);
    process.stdout.write(".");
  }
  console.log(`\n   ✅  ${brandNames.length} brands\n`);

  // ── 5. Create product documents ──────────────────────────────────────────
  console.log("🛒  Migrating products...");
  for (const p of products) {
    // Convert specs from Record<string,string> to [{key,value}[]]
    const specs = p.specs
      ? Object.entries(p.specs as Record<string, string>).map(([key, value]) => ({
          _key: nanoid(),
          key,
          value,
        }))
      : undefined;

    // Convert variants — add _key to each
    const variants = p.variants
      ? p.variants.map((v: any) => ({ ...v, _key: v.variantId || nanoid() }))
      : undefined;

    // compatibility — add _key if array
    const compatibility = p.compatibility
      ? p.compatibility.map((c: string) => ({ _key: nanoid(), _type: "string", value: c }))
      : undefined;

    const doc: any = {
      _id: makeProductId(p.sku),
      _type: "product",
      sku: p.sku,
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      description: p.description,
      price: p.price,
      wholesalePrice: p.wholesalePrice,
      zone: p.zone,
      productType: p.type, // schema field name
      category: {
        _type: "reference",
        _ref: makeCategoryId(p.category),
      },
      brand: {
        _type: "reference",
        _ref: makeBrandId(p.brand),
      },
    };

    if (specs) doc.specs = specs;
    if (variants) doc.variants = variants;
    // compatibility as simple string array in Sanity (array of strings)
    if (p.compatibility?.length) {
      doc.compatibility = p.compatibility;
    }

    await client.createOrReplace(doc);
    process.stdout.write(".");
  }
  console.log(`\n   ✅  ${products.length} products\n`);

  // ── 6. Create boat brand documents ──────────────────────────────────────
  console.log("⛵  Migrating boat brands...");
  for (const b of boatBrands) {
    const boatType = b.type; // "bass" | "pontoon"
    const models = (b.models ?? []).map((m: any) => ({
      _key: nanoid(),
      name: m.name,
      years: m.years,
      description: m.description,
      // image will be null until manually uploaded to Sanity
    }));

    const doc = {
      _id: makeBoatBrandId(b.brand, boatType),
      _type: "boatBrand",
      name: b.brand,
      slug: { _type: "slug", current: slugify(b.brand) },
      boatType,
      models,
    };
    await client.createOrReplace(doc as any);
    process.stdout.write(".");
  }
  console.log(`\n   ✅  ${boatBrands.length} boat brands\n`);

  // ── 7. Create boat zone documents ────────────────────────────────────────
  console.log("🗺   Migrating boat zones...");
  const allZones = [
    ...bassBoatZones.map((z: any) => ({ ...z, boatType: "bass" })),
    ...pontoonBoatZones.map((z: any) => ({ ...z, boatType: "pontoon" })),
  ];

  for (const z of allZones) {
    const productRefs = (z.productSlugs ?? [])
      .map((slug: string) => {
        const product = products.find((p: any) => p.slug === slug);
        return product
          ? {
              _key: nanoid(),
              _type: "reference",
              _ref: makeProductId(product.sku),
            }
          : null;
      })
      .filter(Boolean);

    const doc = {
      _id: makeBoatZoneId(z.id, z.boatType),
      _type: "boatZone",
      boatType: z.boatType,
      zoneId: z.id,
      label: z.label,
      x: z.x,
      y: z.y,
      products: productRefs,
    };
    await client.createOrReplace(doc as any);
    process.stdout.write(".");
  }
  console.log(`\n   ✅  ${allZones.length} boat zones\n`);

  // ── 8. Create boat recommendation documents ──────────────────────────────
  console.log("📋  Migrating boat recommendations...");
  for (const rec of boatRecommendations) {
    const recommendedProducts = (rec.products ?? [])
      .map((rp: any) => {
        const product = products.find((p: any) => p.slug === rp.slug);
        if (!product) return null;
        return {
          _key: nanoid(),
          note: rp.note,
          category: rp.category,
          product: {
            _type: "reference",
            _ref: makeProductId(product.sku),
          },
        };
      })
      .filter(Boolean);

    const doc = {
      _id: makeRecommendationId(rec.modelName),
      _type: "boatRecommendation",
      modelName: rec.modelName,
      brandSlug: slugify(rec.modelName.split(" ")[0]),
      boatType: rec.boatType,
      description: rec.description ?? `Recommended build kit for the ${rec.modelName}.`,
      recommendedProducts,
    };
    await client.createOrReplace(doc as any);
    process.stdout.write(".");
  }
  console.log(`\n   ✅  ${boatRecommendations.length} recommendations\n`);

  // ── 9. Create homepage singleton ─────────────────────────────────────────
  console.log("🏠  Creating homepage singleton...");
  const featuredSlugs = ["led-navigation-light-kit", "automatic-bilge-pump-1100-gph"];
  const featuredRefs = featuredSlugs
    .map((slug) => {
      const product = products.find((p: any) => p.slug === slug);
      return product
        ? { _key: nanoid(), _type: "reference", _ref: makeProductId(product.sku) }
        : null;
    })
    .filter(Boolean);

  await client.createOrReplace({
    _id: "homepage",
    _type: "homepage",
    heroTitle: "Gear Up.",
    heroSubtitle: "Boats Without Woes",
    heroDescription:
      "Boatify supplies premium marine parts and accessories for bass boat and pontoon owners — direct to you or wholesale to OEM builders.",
    heroCTALabel: "Shop Now",
    heroCTALink: "/shop",
    oemSavingsPercent: "30",
    featuredProducts: featuredRefs,
    partnerBrands: [
      { _key: nanoid(), name: "Minn Kota", emoji: "⚡", description: "Trolling motors", href: "/shop" },
      { _key: nanoid(), name: "Humminbird", emoji: "📡", description: "Fish finders", href: "/shop" },
      { _key: nanoid(), name: "Garmin", emoji: "🛰", description: "Marine electronics", href: "/shop" },
    ],
    boatBrandsDisplay: [
      { _key: nanoid(), name: "Phoenix", emoji: "🎣" },
      { _key: nanoid(), name: "Skeeter", emoji: "⚡" },
      { _key: nanoid(), name: "Bennington", emoji: "⛵" },
    ],
  } as any);
  console.log("   ✅  Homepage singleton\n");

  // ── 10. Create about page singleton ─────────────────────────────────────
  console.log("ℹ️   Creating about page singleton...");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "About Boatify",
    heroSubtitle:
      "Two guys who love boats built something awesome for people who love boats. Boats Without Woes.",
    founders: [
      {
        _key: nanoid(),
        name: "Luke Dunkin",
        title: "Co-Founder & CEO",
        emoji: "⚓",
        bio: "With over 15 years of experience in marine manufacturing and supply chain management, Luke Dunkin brings deep operational expertise and an unwavering commitment to product quality.",
      },
      {
        _key: nanoid(),
        name: "Luke Cochran",
        title: "Co-Founder & COO",
        emoji: "🚤",
        bio: "Luke Cochran's 15+ years in the marine industry have been defined by a passion for innovation and customer experience. His vision for a seamless, technology-driven parts platform is the engine that powers Boatify.",
      },
    ],
    values: [
      {
        _key: nanoid(),
        title: "Quality First",
        emoji: "⭐",
        description:
          "Every product in our catalog meets rigorous marine-grade standards. We don't cut corners because your safety on the water depends on it.",
      },
      {
        _key: nanoid(),
        title: "Innovation",
        emoji: "💡",
        description:
          "From our interactive boat diagrams to streamlined PO processing, we use technology to make the parts buying experience simple and modern.",
      },
      {
        _key: nanoid(),
        title: "Partnership",
        emoji: "🤝",
        description:
          "We're not just a vendor — we're a partner. Whether you're building 100 boats a year or fixing up one, we're here to support your journey.",
      },
    ],
  } as any);
  console.log("   ✅  About page singleton\n");

  console.log("✅  Migration complete!\n");
  console.log("Next steps:");
  console.log("  1. Open https://www.sanity.io/manage to verify your data");
  console.log("  2. Add NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN to .env.local");
  console.log("  3. Upload boat model images manually in the Studio (/studio)");
  console.log("  4. Set up Sanity webhooks to point to /api/sanity/revalidate");
  console.log("  5. Run: npm run build\n");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
