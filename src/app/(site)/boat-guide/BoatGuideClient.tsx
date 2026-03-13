"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import type { SanityBoatRecommendation } from "@/sanity/types";

interface Props {
  recommendations: SanityBoatRecommendation[];
}

export default function BoatGuideClient({ recommendations }: Props) {
  const [selectedModel, setSelectedModel] = useState(recommendations[0]?.modelName ?? "");
  const recommendation = recommendations.find((r) => r.modelName === selectedModel);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const bassModels = recommendations.filter((r) => r.boatType === "bass");
  const pontoonModels = recommendations.filter((r) => r.boatType === "pontoon");

  function handleAddAll() {
    let count = 0;
    recommendation?.recommendedProducts?.forEach((rec) => {
      if (rec.product) {
        addItem(rec.product as any, 1);
        count++;
      }
    });
    showToast(`${count} products added to cart!`, "&#x1F6D2;");
  }

  if (recommendations.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-5xl mb-4">&#x1F6A4;</div>
        <p className="text-ocean-600 font-bold text-lg mb-2">No boat recommendations yet</p>
        <p className="text-ocean-400 text-sm mb-6">Add boat recommendations in the Studio to get started.</p>
        <Link href="/studio" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold fun-cta">
          Open Studio &#x2192;
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Model Selector */}
      <div className="mb-10">
        <h2 className="text-lg font-extrabold text-ocean-950 mb-4">Select Your Boat</h2>

        {/* Bass Boats */}
        {bassModels.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-2">&#x1F3A3; Bass Boats</p>
            <div className="flex flex-wrap gap-2">
              {bassModels.map((r) => (
                <button
                  key={r.modelName}
                  onClick={() => setSelectedModel(r.modelName)}
                  className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all splash-btn ${
                    selectedModel === r.modelName
                      ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25"
                      : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100 border border-ocean-200"
                  }`}
                >
                  {r.modelName}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pontoon Boats */}
        {pontoonModels.length > 0 && (
          <div>
            <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-2">&#x1F6E5; Pontoon Boats</p>
            <div className="flex flex-wrap gap-2">
              {pontoonModels.map((r) => (
                <button
                  key={r.modelName}
                  onClick={() => setSelectedModel(r.modelName)}
                  className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all splash-btn ${
                    selectedModel === r.modelName
                      ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/25"
                      : "bg-ocean-50 text-ocean-700 hover:bg-ocean-100 border border-ocean-200"
                  }`}
                >
                  {r.modelName}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Recommendation Display */}
      {recommendation && (
        <div className="bg-white rounded-3xl border border-ocean-100 overflow-hidden shadow-sm">
          {/* Model header */}
          <div className="bg-gradient-to-r from-ocean-50 to-marine-50 p-6 sm:p-8 border-b border-ocean-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="fun-badge">
                    {recommendation.boatType === "bass" ? "&#x1F3A3; Bass Boat" : "&#x1F6E5; Pontoon"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-950 mb-2">
                  {recommendation.modelName}
                </h2>
                <p className="text-ocean-600 text-sm sm:text-base">{recommendation.description}</p>
              </div>
              <button
                onClick={handleAddAll}
                className="shrink-0 px-6 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-sm fun-cta"
              >
                Add All to Cart &#x1F6D2;
              </button>
            </div>
          </div>

          {/* Product recommendations */}
          <div className="divide-y divide-ocean-50">
            {(recommendation.recommendedProducts ?? []).map((rec, i) => {
              const product = rec.product;
              if (!product) return null;

              return (
                <div key={product.sku} className="p-5 sm:p-6 hover:bg-ocean-50/30 transition-colors">
                  <div className="flex items-start gap-4">
                    {/* Number */}
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-ocean-500 to-marine-500 flex items-center justify-center text-white text-sm font-extrabold shadow-md">
                      {i + 1}
                    </div>

                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-ocean-500 uppercase tracking-wider mb-1">
                            {rec.category}
                          </p>
                          <Link
                            href={`/shop/${product.slug}`}
                            className="font-bold text-ocean-950 text-base hover:text-ocean-600 transition-colors"
                          >
                            {product.name}
                          </Link>
                          {product.brand !== "Boatify" && (
                            <p className="text-xs text-ocean-400 font-bold">by {product.brand}</p>
                          )}
                          <p className="text-ocean-600 text-sm mt-1.5 leading-relaxed">{rec.note}</p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-xl font-extrabold text-ocean-800">${product.price.toFixed(2)}</p>
                          <button
                            onClick={() => {
                              addItem(product as any, 1);
                              showToast(`${product.name} added!`, "&#x1F6D2;");
                            }}
                            className="mt-2 px-4 py-2 bg-ocean-50 text-ocean-700 border border-ocean-200 rounded-xl text-xs font-bold hover:bg-ocean-100 transition-all"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total estimate */}
          <div className="bg-ocean-50 p-6 border-t border-ocean-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-extrabold text-ocean-950">Estimated Total</p>
                <p className="text-xs text-ocean-500">
                  All {recommendation.recommendedProducts?.length ?? 0} recommended products
                </p>
              </div>
              <p className="text-2xl font-extrabold text-ocean-800">
                $
                {(
                  recommendation.recommendedProducts?.reduce(
                    (sum, rec) => sum + (rec.product?.price ?? 0),
                    0
                  ) ?? 0
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Don't see your boat? */}
      <div className="text-center mt-16 py-12 bg-gradient-to-r from-ocean-50 to-marine-50 rounded-3xl border border-ocean-100">
        <div className="text-4xl mb-4">&#x1F6A4;</div>
        <p className="text-2xl font-extrabold text-ocean-950 mb-2">Don&apos;t see your boat?</p>
        <p className="text-ocean-600 mb-6 max-w-md mx-auto">
          We&apos;re adding new models all the time. Contact us and we&apos;ll put together a custom
          recommendation for your specific rig.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="px-7 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold fun-cta"
          >
            Contact Us &#x2709;
          </Link>
          <Link
            href="/shop"
            className="px-7 py-3 bg-white text-ocean-700 border border-ocean-200 rounded-2xl font-bold hover:bg-ocean-50 transition-all splash-btn"
          >
            Browse All Products &#x1F6D2;
          </Link>
        </div>
      </div>
    </div>
  );
}
