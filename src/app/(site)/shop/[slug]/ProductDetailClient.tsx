"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import type { SanityProduct, SanityProductVariant, SanityBoatZone } from "@/sanity/types";

interface Props {
  product: SanityProduct;
  related: SanityProduct[];
  bassZones: SanityBoatZone[];
  pontoonZones: SanityBoatZone[];
}

export default function ProductDetailClient({ product, related, bassZones, pontoonZones }: Props) {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<SanityProductVariant | undefined>(product.variants?.[0]);

  function handleAddToCart() {
    addItem(product as any, quantity, selectedVariant as any);
    showToast(`${product.name} added!`, "&#x1F6D2;");
  }

  const colors = product.variants ? [...new Map(product.variants.map((v) => [v.color, v])).values()] : [];
  const sizes = product.variants ? [...new Set(product.variants.filter((v) => v.size).map((v) => v.size!))] : [];

  function handleColorChange(color: string) {
    if (!product.variants) return;
    const currentSize = selectedVariant?.size;
    const match = product.variants.find((v) => v.color === color && v.size === currentSize) || product.variants.find((v) => v.color === color);
    setSelectedVariant(match);
  }

  function handleSizeChange(size: string) {
    if (!product.variants) return;
    const currentColor = selectedVariant?.color;
    const match = product.variants.find((v) => v.size === size && v.color === currentColor) || product.variants.find((v) => v.size === size);
    setSelectedVariant(match);
  }

  const productDetails = [
    { label: "SKU", value: product.sku },
    { label: "Brand", value: product.brand },
    { label: "Category", value: product.category },
    ...(product.zone && product.zone !== "n/a" ? [{ label: "Boat Zone", value: product.zone.charAt(0).toUpperCase() + product.zone.slice(1) }] : []),
    { label: "Availability", value: "In Stock" },
    { label: "Ships Within", value: "3-5 Business Days" },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-ocean-50/50 border-b border-ocean-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-ocean-500 hover:text-ocean-700 transition-colors font-medium">Home</Link>
            <span className="text-ocean-300">/</span>
            <Link href="/shop" className="text-ocean-500 hover:text-ocean-700 transition-colors font-medium">Shop</Link>
            <span className="text-ocean-300">/</span>
            <span className="text-ocean-800 font-bold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Product image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-ocean-100 via-ocean-50 to-marine-50 rounded-3xl flex items-center justify-center relative overflow-hidden border border-ocean-100">
              <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-ocean-200/60 to-marine-100/40 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-3xl" />
                ) : product.type === "apparel" ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24 text-ocean-400">
                    <path d="M6.5 2.5L2 7l3 1.5V20a1 1 0 001 1h12a1 1 0 001-1V8.5L22 7l-4.5-4.5h-11z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 2.5C9 4 10 6 12 6s3-2 3-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-24 h-24 text-ocean-400">
                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <div className="absolute top-4 left-4"><span className="fun-badge">{product.brand}</span></div>
              <div className="absolute top-4 right-4 text-xs text-ocean-500 font-mono bg-white/80 px-3 py-1 rounded-lg font-bold">{product.sku}</div>
            </div>
          </div>

          {/* Product details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="fun-badge">{product.category}</span>
                {product.brand !== "Boatify" && <span className="fun-badge !bg-ocean-100 !text-ocean-700">{product.brand}</span>}
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-extrabold text-ocean-800">${product.price.toFixed(2)}</span>
                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />In Stock
                </span>
              </div>
            </div>

            <p className="text-ocean-700 leading-relaxed mb-8">{product.description}</p>

            {/* Color selector */}
            {colors.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-bold text-ocean-900 mb-3">Color: <span className="text-ocean-600 font-medium">{selectedVariant?.color}</span></p>
                <div className="flex gap-3">
                  {colors.map((v) => (
                    <button key={v.variantId} onClick={() => handleColorChange(v.color!)} className={`w-10 h-10 rounded-full border-2 transition-all ${selectedVariant?.color === v.color ? "border-ocean-500 scale-110 shadow-lg ring-2 ring-ocean-500/30" : "border-ocean-200 hover:border-ocean-400"}`} style={{ backgroundColor: v.colorHex }} title={v.color ?? ""} />
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-bold text-ocean-900 mb-3">Size: <span className="text-ocean-600 font-medium">{selectedVariant?.size}</span></p>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button key={size} onClick={() => handleSizeChange(size)} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedVariant?.size === size ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-md" : "bg-ocean-50 text-ocean-700 border border-ocean-200 hover:border-ocean-400"}`}>{size}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Compatibility */}
            {product.compatibility && product.compatibility.length > 0 && (
              <div className="mb-6 bg-ocean-50 rounded-2xl p-5 border border-ocean-100">
                <p className="font-bold text-ocean-900 text-sm mb-2">&#x2705; Compatible With:</p>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((item) => (
                    <span key={item} className="text-xs bg-white text-ocean-700 px-2.5 py-1 rounded-lg border border-ocean-200 font-medium">{item}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border-2 border-ocean-200 rounded-2xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-lg font-bold active:scale-90">-</button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 h-12 text-center text-lg font-bold border-x-2 border-ocean-200 focus:outline-none" />
                <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-lg font-bold active:scale-90">+</button>
              </div>
              <span className="text-lg font-extrabold text-ocean-600">${(product.price * quantity).toFixed(2)}</span>
            </div>

            <button onClick={handleAddToCart} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta mb-6">
              Add to Cart &#x1F6D2;
            </button>

            {/* OEM callout */}
            {product.wholesalePrice && (
              <div className="bg-gradient-to-r from-ocean-50 to-marine-50 rounded-2xl p-5 border border-ocean-200 mb-6">
                <p className="font-bold text-ocean-900 text-sm mb-1">&#x1F3ED; OEM Builder?</p>
                <p className="text-ocean-600 text-sm">
                  Get this for <span className="font-extrabold text-ocean-800">${product.wholesalePrice.toFixed(2)}</span> (wholesale pricing) with a wholesale account. Min 50 units.{" "}
                  <Link href="/oem/login" className="text-ocean-600 font-bold underline hover:text-ocean-800">Sign in</Link>
                </p>
              </div>
            )}

            {/* Product details table */}
            <div className="border border-ocean-100 rounded-2xl overflow-hidden">
              <div className="px-5 py-3 bg-ocean-50 border-b border-ocean-100">
                <h3 className="font-extrabold text-ocean-950 text-sm">Product Details</h3>
              </div>
              <div className="divide-y divide-ocean-50">
                {productDetails.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-ocean-500 font-medium">{spec.label}</span>
                    <span className="text-sm font-bold text-ocean-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional specs (from Sanity) */}
            {product.specs && product.specs.length > 0 && (
              <div className="border border-ocean-100 rounded-2xl overflow-hidden mt-4">
                <div className="px-5 py-3 bg-ocean-50 border-b border-ocean-100">
                  <h3 className="font-extrabold text-ocean-950 text-sm">Specifications</h3>
                </div>
                <div className="divide-y divide-ocean-50">
                  {product.specs.map((s) => (
                    <div key={s.key} className="flex items-start justify-between px-5 py-3">
                      <span className="text-sm text-ocean-500 font-medium">{s.key}</span>
                      <span className="text-sm font-bold text-ocean-900 text-right max-w-[60%]">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Where does this fit? */}
        {(bassZones.length > 0 || pontoonZones.length > 0) && (
          <section className="mb-20">
            <h2 className="text-2xl font-extrabold text-ocean-950 mb-6">&#x1F6A4; Where Does This Fit?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {bassZones.length > 0 && (
                <div className="bg-ocean-50 rounded-2xl p-6 border border-ocean-100">
                  <h3 className="font-bold text-ocean-900 mb-3">&#x1F3A3; Bass Boats</h3>
                  <div className="flex flex-wrap gap-2">
                    {bassZones.map((z) => <span key={z.zoneId} className="fun-badge">{z.label}</span>)}
                  </div>
                  <Link href="/find-your-boat" className="text-sm text-ocean-600 font-bold mt-4 inline-block hover:text-ocean-800 transition-colors">See on your boat &rarr;</Link>
                </div>
              )}
              {pontoonZones.length > 0 && (
                <div className="bg-ocean-50 rounded-2xl p-6 border border-ocean-100">
                  <h3 className="font-bold text-ocean-900 mb-3">&#x1F6E5; Pontoon Boats</h3>
                  <div className="flex flex-wrap gap-2">
                    {pontoonZones.map((z) => <span key={z.zoneId} className="fun-badge">{z.label}</span>)}
                  </div>
                  <Link href="/find-your-boat" className="text-sm text-ocean-600 font-bold mt-4 inline-block hover:text-ocean-800 transition-colors">See on your boat &rarr;</Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-ocean-950">More in {product.category}</h2>
              <Link href="/shop" className="text-sm text-ocean-600 font-bold hover:text-ocean-800 transition-colors">View All &rarr;</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((rel) => (
                <Link key={rel.sku} href={`/shop/${rel.slug}`} className="product-card group">
                  <div className="bg-white rounded-2xl border border-ocean-100 overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-ocean-100 via-ocean-50 to-marine-50 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-200/60 to-marine-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        {rel.image ? (
                          <img src={rel.image} alt={rel.name} className="w-full h-full object-contain rounded-2xl" />
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-ocean-500">
                            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-ocean-950 text-sm group-hover:text-ocean-600 transition-colors line-clamp-1">{rel.name}</h3>
                      {rel.brand !== "Boatify" && <p className="text-xs text-ocean-400 font-bold">{rel.brand}</p>}
                      <p className="text-lg font-extrabold text-ocean-800 mt-1">${rel.price.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
