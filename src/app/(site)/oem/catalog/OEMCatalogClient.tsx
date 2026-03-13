"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { SanityProduct } from "@/sanity/types";

interface Props {
  products: SanityProduct[];
}

export default function OEMCatalogClient({ products: wholesaleProducts }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [showCart, setShowCart] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ocean-500 font-bold">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/oem/login");
    return null;
  }

  const user = session?.user as any;
  const company = user?.company || "Builder";

  const filtered = wholesaleProducts.filter((p) => {
    const catMatch = selectedCategory === "All" || p.category === selectedCategory;
    const brandMatch = selectedBrand === "All" || p.brand === selectedBrand;
    return catMatch && brandMatch;
  });

  const availableCategories = [...new Set(wholesaleProducts.map((p) => p.category))];
  const availableBrands = [...new Set(wholesaleProducts.map((p) => p.brand))];

  const cartItems = Object.entries(cart).filter(([, qty]) => qty > 0);
  const cartTotal = cartItems.reduce((sum, [sku, qty]) => {
    const p = wholesaleProducts.find((pr) => pr.sku === sku);
    return sum + (p && p.wholesalePrice ? p.wholesalePrice * qty : 0);
  }, 0);

  function updateCart(sku: string, qty: number) {
    setCart((prev) => ({ ...prev, [sku]: Math.max(0, qty) }));
  }

  function handleRequestQuote() {
    setQuoteSubmitted(true);
    setTimeout(() => setQuoteSubmitted(false), 5000);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-50/50 to-white">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-ocean-100 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-marine-500 flex items-center justify-center text-white text-sm font-extrabold shadow-lg shadow-ocean-500/20">
              {company.charAt(0)}
            </div>
            <div>
              <p className="font-extrabold text-ocean-950 text-sm">{company}</p>
              <p className="text-xs text-ocean-500 font-medium">Wholesale Catalog</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative px-5 py-2 bg-ocean-50 text-ocean-700 rounded-xl font-bold text-sm hover:bg-ocean-100 transition-colors border border-ocean-200 splash-btn"
            >
              &#x1F6D2; Quote Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-ocean-500 to-marine-500 text-white text-xs flex items-center justify-center font-extrabold shadow-md">
                  {cartItems.length}
                </span>
              )}
            </button>
            <Link
              href="/oem/dashboard"
              className="px-4 py-2 text-sm text-ocean-600 hover:bg-ocean-50 rounded-xl transition-colors font-medium"
            >
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/oem/login" })}
              className="px-4 py-2 text-sm text-ocean-600 hover:bg-ocean-50 rounded-xl transition-colors font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info banner */}
        <div className="bg-gradient-to-r from-ocean-600 to-marine-600 rounded-3xl p-6 mb-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden">
          <div className="absolute top-2 right-4 w-3 h-4 bg-white/10 rounded-full animate-droplet" />
          <div>
            <h2 className="font-extrabold text-lg">&#x1F389; Wholesale Pricing Active</h2>
            <p className="text-ocean-100 text-sm mt-1">
              Browse products from all our partner brands. Add items to your quote cart and request a
              custom quote from your sales rep.
            </p>
          </div>
          <div className="px-5 py-2.5 bg-white/20 rounded-2xl text-sm font-extrabold backdrop-blur-sm shrink-0">
            OEM PRICING
          </div>
        </div>

        {/* Quote submitted toast */}
        {quoteSubmitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-in">
            <span className="text-2xl">&#x2705;</span>
            <div>
              <p className="font-bold text-green-800 text-sm">Quote Request Submitted!</p>
              <p className="text-xs text-green-600">
                Your sales rep will review and send you a quote within 24 hours.
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Brand filters */}
            <div className="mb-4">
              <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-2">Brand</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedBrand("All")}
                  className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                    selectedBrand === "All"
                      ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25"
                      : "bg-white text-ocean-700 border border-ocean-200 hover:border-ocean-400"
                  }`}
                >
                  All Brands ({wholesaleProducts.length})
                </button>
                {availableBrands.map((brand) => {
                  const count = wholesaleProducts.filter((p) => p.brand === brand).length;
                  return (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                        selectedBrand === brand
                          ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25"
                          : "bg-white text-ocean-700 border border-ocean-200 hover:border-ocean-400"
                      }`}
                    >
                      {brand} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category filters */}
            <div className="mb-6">
              <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-2">Category</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                    selectedCategory === "All"
                      ? "bg-gradient-to-r from-deep-500 to-ocean-500 text-white shadow-lg shadow-deep-500/25"
                      : "bg-white text-ocean-700 border border-ocean-200 hover:border-ocean-400"
                  }`}
                >
                  All
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-sm font-bold transition-all ${
                      selectedCategory === cat
                        ? "bg-gradient-to-r from-deep-500 to-ocean-500 text-white shadow-lg shadow-deep-500/25"
                        : "bg-white text-ocean-700 border border-ocean-200 hover:border-ocean-400"
                    }`}
                  >
                    {cat.split(" & ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Product list */}
            <div className="space-y-4">
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-ocean-400 font-bold">No products match your filters</p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedBrand("All");
                    }}
                    className="text-sm text-ocean-500 underline mt-2"
                  >
                    Clear filters
                  </button>
                </div>
              )}
              {filtered.map((product) => {
                const wholesale = product.wholesalePrice ?? product.price * 0.7;
                const savings = product.price - wholesale;
                const qty = cart[product.sku] || 0;

                return (
                  <div
                    key={product.sku}
                    className="bg-white rounded-2xl border border-ocean-100 p-5 hover:shadow-lg transition-all product-card"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Product icon / image */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-100 to-marine-50 flex items-center justify-center shrink-0 overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="w-8 h-8 text-ocean-500"
                          >
                            <path
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h3 className="font-bold text-ocean-950">{product.name}</h3>
                              {product.brand !== "Boatify" && (
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-ocean-50 text-ocean-600 border border-ocean-200">
                                  {product.brand}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-ocean-500 mt-0.5 font-medium">
                              {product.sku} &middot; {product.category}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-ocean-400 line-through">
                              ${product.price.toFixed(2)}
                            </p>
                            <p className="text-lg font-extrabold text-ocean-800">
                              ${wholesale.toFixed(2)}
                            </p>
                            <p className="text-xs text-green-600 font-bold">Save ${savings.toFixed(2)}</p>
                          </div>
                        </div>
                        <p className="text-xs text-ocean-500 mt-2 line-clamp-2">{product.description}</p>

                        {/* Specs preview */}
                        {product.specs && product.specs.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {product.specs.slice(0, 3).map((s) => (
                              <span
                                key={s.key}
                                className="text-xs bg-ocean-50 text-ocean-600 px-2 py-0.5 rounded-full"
                              >
                                {s.key}: {s.value}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Quantity controls */}
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border-2 border-ocean-200 rounded-xl overflow-hidden">
                            <button
                              onClick={() => updateCart(product.sku, qty - 1)}
                              className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold active:scale-90"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={qty || ""}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                updateCart(product.sku, val);
                              }}
                              placeholder="0"
                              className="w-16 h-9 text-center text-sm font-bold border-x-2 border-ocean-200 focus:outline-none"
                            />
                            <button
                              onClick={() => updateCart(product.sku, (qty || 0) + 1)}
                              className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold active:scale-90"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs text-ocean-400 font-medium">Qty</span>
                          {qty > 0 && (
                            <span className="text-sm font-extrabold text-ocean-700 ml-auto">
                              ${(wholesale * qty).toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote cart sidebar */}
          <div className={`lg:w-80 shrink-0 ${showCart ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-3xl border border-ocean-100 sticky top-36 overflow-hidden shadow-sm">
              <div className="px-5 py-4 bg-gradient-to-r from-ocean-50 to-marine-50 border-b border-ocean-100">
                <h3 className="font-extrabold text-ocean-950">&#x1F4CB; Quote Cart</h3>
                <p className="text-xs text-ocean-500 mt-0.5">Add products and request a quote</p>
              </div>

              {cartItems.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="text-3xl mb-2">&#x1F4CB;</div>
                  <p className="text-sm text-ocean-500 font-medium">Your quote cart is empty</p>
                  <p className="text-xs text-ocean-400 mt-1">Add products to request pricing</p>
                </div>
              ) : (
                <>
                  <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                    {cartItems.map(([sku, qty]) => {
                      const p = wholesaleProducts.find((pr) => pr.sku === sku);
                      if (!p) return null;
                      const wp = p.wholesalePrice ?? p.price * 0.7;
                      return (
                        <div key={sku} className="flex items-start justify-between gap-2 text-sm">
                          <div className="min-w-0">
                            <p className="font-bold text-ocean-900 text-xs truncate">{p.name}</p>
                            <p className="text-xs text-ocean-500">
                              {qty} x ${wp.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-extrabold text-ocean-800 text-xs">
                              ${(wp * qty).toFixed(2)}
                            </span>
                            <button
                              onClick={() => updateCart(sku, 0)}
                              className="text-ocean-400 hover:text-red-500 transition-colors"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-3.5 h-3.5"
                                strokeLinecap="round"
                              >
                                <path d="M18 6L6 18M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-4 border-t border-ocean-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-extrabold text-ocean-950">Estimated Total</span>
                      <span className="text-xl font-extrabold text-ocean-800">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-ocean-400 mb-4">
                      Final pricing confirmed by your sales rep
                    </p>
                    <button
                      onClick={handleRequestQuote}
                      className="w-full py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm fun-cta"
                    >
                      Request Quote &#x1F4CB;
                    </button>
                    <p className="text-xs text-ocean-400 text-center mt-2 font-medium">
                      &#x2709; Your rep will respond within 24 hours
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
