"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isOpen, setIsOpen, clearCart, getItemKey } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[90] transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[95] shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-ocean-100 bg-gradient-to-r from-ocean-50 to-marine-50">
          <h2 className="font-extrabold text-ocean-950 text-lg flex items-center gap-2">
            <span>&#x1F6D2;</span> Your Cart
            {totalItems > 0 && (
              <span className="text-xs font-bold bg-gradient-to-r from-ocean-500 to-marine-500 text-white px-2.5 py-0.5 rounded-full">
                {totalItems} item{totalItems !== 1 ? "s" : ""}
              </span>
            )}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-xl hover:bg-ocean-100 flex items-center justify-center transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-ocean-600" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <div className="text-5xl mb-4">&#x1F6F6;</div>
              <p className="font-extrabold text-ocean-950 text-lg mb-1">Your cart is empty</p>
              <p className="text-ocean-500 text-sm mb-6">Time to gear up your ride!</p>
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm fun-cta"
              >
                Browse Parts &#x1F6A4;
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {items.map((item) => {
                const key = getItemKey(item);
                return (
                  <div key={key} className="bg-ocean-50/50 rounded-2xl p-4 border border-ocean-100">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="font-bold text-ocean-950 text-sm hover:text-ocean-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-ocean-500 font-mono mt-0.5">{item.product.sku}</p>
                        {/* Variant info */}
                        {item.selectedVariant && (
                          <div className="flex items-center gap-2 mt-1">
                            {item.selectedVariant.color && (
                              <span className="flex items-center gap-1 text-xs text-ocean-600">
                                <span
                                  className="w-3 h-3 rounded-full border border-ocean-200 inline-block"
                                  style={{ backgroundColor: item.selectedVariant.colorHex }}
                                />
                                {item.selectedVariant.color}
                              </span>
                            )}
                            {item.selectedVariant.size && (
                              <span className="text-xs text-ocean-600 bg-ocean-100 px-1.5 py-0.5 rounded font-bold">
                                {item.selectedVariant.size}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(key)}
                        className="text-ocean-400 hover:text-red-500 transition-colors shrink-0 p-1"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" strokeLinecap="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border-2 border-ocean-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center text-sm font-bold border-x-2 border-ocean-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-ocean-400">${item.product.price.toFixed(2)} each</p>
                        <p className="font-extrabold text-ocean-800">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-ocean-100 p-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="font-extrabold text-ocean-950 text-lg">Total</span>
              <span className="text-2xl font-extrabold text-ocean-800">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-3.5 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-base fun-cta mb-3">
              Checkout &#x1F680;
            </button>
            <div className="flex gap-3">
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="flex-1 py-2.5 text-center bg-ocean-50 text-ocean-700 rounded-xl font-bold text-sm border border-ocean-200 hover:bg-ocean-100 transition-colors splash-btn"
              >
                Keep Shopping
              </Link>
              <button
                onClick={clearCart}
                className="px-4 py-2.5 text-ocean-400 hover:text-red-500 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
