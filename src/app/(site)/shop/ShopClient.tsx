"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import type { SanityProduct, SanityProductVariant } from "@/sanity/types";

interface Props {
  products: SanityProduct[];
  categories: string[];
  brands: string[];
}

export default function ShopClient({ products, categories, brands }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchBrand && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-30" />
        <div className="absolute top-[15%] left-[8%] w-4 h-5 bg-ocean-400/20 rounded-full animate-droplet" />
        <div className="absolute top-[25%] right-[12%] w-3 h-4 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[30%] right-[25%] w-32 h-32 border border-ocean-400/10 rounded-full animate-ripple" />
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-4">&#x1F6D2; Boats Without Woes</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Shop <span className="gradient-text-fun">Now</span>
          </h1>
          <p className="text-ocean-200/80 text-lg max-w-xl">
            {products.length} products from {brands.length} brands. Jack plates, transducer shields, lithium batteries, apparel, and more.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10">
          {/* Search */}
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ocean-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search parts, brands, SKUs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all font-medium"
            />
          </div>

          {/* Brand pills */}
          <div>
            <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-2">Brand</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedBrand("All")} className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all splash-btn ${selectedBrand === "All" ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25" : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100 border border-ocean-200"}`}>
                All Brands
              </button>
              {brands.map((brand) => (
                <button key={brand} onClick={() => setSelectedBrand(brand)} className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all splash-btn ${selectedBrand === brand ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25" : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100 border border-ocean-200"}`}>
                  {brand} ({products.filter((p) => p.brand === brand).length})
                </button>
              ))}
            </div>
          </div>

          {/* Category pills */}
          <div>
            <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-2">Category</p>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedCategory("All")} className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all splash-btn ${selectedCategory === "All" ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25" : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100 border border-ocean-200"}`}>
                All ({products.length})
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all splash-btn ${selectedCategory === cat ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25" : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100 border border-ocean-200"}`}>
                  {cat.split(" ")[0]} ({products.filter((p) => p.category === cat).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-ocean-500 mb-6 font-medium">{filtered.length} product{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">&#x1F50D;</div>
            <p className="text-ocean-600 font-bold text-lg">No products found</p>
            <p className="text-ocean-400 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}

        <div className="text-center mt-16 py-12 bg-ocean-50 rounded-3xl water-texture border border-ocean-100">
          <p className="text-2xl font-extrabold text-ocean-950 mb-2">Not sure what fits your boat?</p>
          <p className="text-ocean-600 mb-6">Use our boat guide to see exactly which products are recommended for your model.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/boat-guide" className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold fun-cta">Boat Guide &#x1F4CB;</Link>
            <Link href="/find-your-boat" className="inline-flex items-center gap-2 px-7 py-3 bg-white text-ocean-700 border border-ocean-200 rounded-2xl font-bold hover:bg-ocean-50 transition-all splash-btn">Find Your Boat &#x1F6A4;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: SanityProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<SanityProductVariant | undefined>(product.variants?.[0]);
  const { addItem } = useCart();
  const { showToast } = useToast();

  function handleAddToCart() {
    addItem(product as any, quantity, selectedVariant as any);
    showToast(`${product.name} added!`, "&#x1F6D2;");
    setQuantity(1);
  }

  const colors = product.variants ? [...new Map(product.variants.map((v) => [v.color, v])).values()] : [];

  return (
    <div id={product.slug} className="product-card bg-white rounded-2xl border border-ocean-100 overflow-hidden group">
      <Link href={`/shop/${product.slug}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-ocean-100 via-ocean-50 to-marine-50 flex items-center justify-center relative overflow-hidden cursor-pointer">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ocean-200/60 to-marine-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-2xl" />
            ) : product.type === "apparel" ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-ocean-500">
                <path d="M6.5 2.5L2 7l3 1.5V20a1 1 0 001 1h12a1 1 0 001-1V8.5L22 7l-4.5-4.5h-11z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 2.5C9 4 10 6 12 6s3-2 3-3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-ocean-500">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="absolute top-3 left-3">
            <span className="fun-badge !py-0.5 !px-2.5">{product.brand === "Boatify" ? product.category : product.brand}</span>
          </div>
          <div className="absolute top-3 right-3 text-xs text-ocean-500 font-mono bg-white/80 px-2 py-0.5 rounded-lg font-bold">{product.sku}</div>
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-bold text-ocean-950 text-base leading-snug mb-1 group-hover:text-ocean-600 transition-colors cursor-pointer">{product.name}</h3>
        </Link>
        {product.brand !== "Boatify" && <p className="text-xs text-ocean-400 font-bold mb-1">by {product.brand}</p>}
        <p className="text-ocean-500 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-extrabold text-ocean-800">${product.price.toFixed(2)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />In Stock
          </span>
        </div>
        {colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-ocean-600">Color:</span>
            <div className="flex gap-1.5">
              {colors.map((v) => (
                <button key={v.variantId} onClick={() => setSelectedVariant(v)} className={`w-6 h-6 rounded-full border-2 transition-all ${selectedVariant?.color === v.color ? "border-ocean-500 scale-110 shadow-md" : "border-ocean-200 hover:border-ocean-400"}`} style={{ backgroundColor: v.colorHex }} title={v.color ?? ""} />
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 mb-4">
          <label className="text-xs font-bold text-ocean-600 shrink-0">Qty</label>
          <div className="flex items-center border-2 border-ocean-200 rounded-xl overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold active:scale-90">-</button>
            <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 h-9 text-center text-sm font-bold border-x-2 border-ocean-200 focus:outline-none" />
            <button onClick={() => setQuantity(quantity + 1)} className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold active:scale-90">+</button>
          </div>
          <span className="text-xs text-ocean-500 ml-auto font-bold">${(product.price * quantity).toFixed(2)}</span>
        </div>
        <button onClick={handleAddToCart} className="w-full py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm fun-cta">Add to Cart</button>
        {product.type === "part" && product.zone !== "n/a" && (
          <Link href={`/find-your-boat?highlight=${product.slug}`} className="block text-center text-xs text-ocean-500 hover:text-ocean-700 mt-3 transition-colors font-medium">
            &#x1F6A4; See where this fits on your boat
          </Link>
        )}
      </div>
    </div>
  );
}
