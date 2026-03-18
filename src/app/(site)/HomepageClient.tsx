"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";
import type { SanityHomepage, SanityProduct, SanityProductVariant } from "@/sanity/types";

interface Props {
  data: SanityHomepage | null;
}

const CATEGORIES = [
  { name: "Jack Plates", emoji: "⚙️", slug: "jack-plates", desc: "Raise your motor for the perfect trim" },
  { name: "Transducer Shields", emoji: "🛡️", slug: "transducer-shields", desc: "Protect your sonar at speed" },
  { name: "Lithium Batteries", emoji: "⚡", slug: "lithium-batteries", desc: "More power, less weight" },
  { name: "Apparel", emoji: "👕", slug: "apparel", desc: "Wear the brand on the water" },
  { name: "Accessories", emoji: "🔧", slug: "accessories", desc: "Essentials for every ride" },
];

const PARTICLES = [
  { top: "12%", left: "6%", size: 3, delay: "0s", dur: "6s", opacity: 0.4 },
  { top: "18%", right: "8%", size: 4, delay: "1s", dur: "8s", opacity: 0.3 },
  { top: "35%", left: "15%", size: 2, delay: "2s", dur: "7s", opacity: 0.25 },
  { top: "50%", right: "18%", size: 5, delay: "0.5s", dur: "9s", opacity: 0.2 },
  { top: "65%", left: "8%", size: 3, delay: "3s", dur: "6s", opacity: 0.35 },
  { top: "75%", right: "5%", size: 2, delay: "1.5s", dur: "7s", opacity: 0.3 },
  { top: "22%", left: "45%", size: 6, delay: "0.8s", dur: "10s", opacity: 0.15 },
  { top: "55%", left: "35%", size: 3, delay: "2.5s", dur: "8s", opacity: 0.2 },
  { top: "40%", right: "35%", size: 4, delay: "1.2s", dur: "6s", opacity: 0.25 },
  { top: "80%", left: "25%", size: 2, delay: "3.5s", dur: "7s", opacity: 0.3 },
];

export default function HomepageClient({ data }: Props) {
  const heroTitle = data?.heroTitle ?? "Boats Without Woes";
  const heroSubtitle = data?.heroSubtitle ?? "Premium marine parts — for builders, dealers & boaters who demand the best.";
  const heroDescription = data?.heroDescription ?? "Jack plates, transducer shields, lithium batteries, apparel and more. The parts that make every ride better.";
  const heroCTALabel = data?.heroCTALabel ?? "Shop Now";
  const heroCTALink = data?.heroCTALink ?? "/shop";
  const oemSavings = data?.oemSavingsPercent ?? "30";
  const featuredProducts = data?.featuredProducts ?? [];
  const partnerBrands = data?.partnerBrands ?? [];
  const boatBrandsDisplay = data?.boatBrandsDisplay ?? [];

  return (
    <div className="min-h-screen">

      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background texture */}
        <div className="absolute inset-0 water-texture opacity-20" />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-ocean-400/30 animate-droplet"
            style={{
              top: p.top,
              left: "left" in p ? p.left : undefined,
              right: "right" in p ? (p as any).right : undefined,
              width: p.size * 4,
              height: p.size * 5,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}

        {/* Large ripple rings */}
        <div className="absolute top-[30%] right-[8%] w-64 h-64 border border-ocean-400/8 rounded-full animate-ripple" />
        <div className="absolute top-[50%] left-[3%] w-48 h-48 border border-marine-400/6 rounded-full animate-ripple" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[15%] left-[30%] w-80 h-80 border border-ocean-400/5 rounded-full animate-ripple" style={{ animationDelay: "4s" }} />

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-10">
          <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,48 C240,96 480,0 720,48 C960,96 1200,0 1440,48 L1440,96 L0,96Z" fill="white" fillOpacity="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-6 inline-flex">
              ⚓ Premium Marine Parts
            </span>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-5">
              <span className="gradient-text-fun">{heroTitle}</span>
            </h1>

            <p className="text-ocean-100/90 text-xl sm:text-2xl font-medium mb-3 max-w-2xl">
              {heroSubtitle}
            </p>
            <p className="text-ocean-200/70 text-base sm:text-lg mb-10 max-w-xl leading-relaxed">
              {heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link
                href={heroCTALink}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ocean-400 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta shadow-xl shadow-ocean-500/30"
              >
                {heroCTALabel} 🛒
              </Link>
              <Link
                href="/find-your-boat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/35 transition-all splash-btn"
              >
                Find Your Boat 🚤
              </Link>
            </div>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: "📦", label: "100+ Products", sub: "Ready to ship" },
                { icon: "💰", label: `Save Up to ${oemSavings}%`, sub: "vs. OEM pricing" },
                { icon: "🏆", label: "Top Brands", sub: "Built for performance" },
                { icon: "🚀", label: "Fast Shipping", sub: "Free over $99" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{stat.label}</div>
                    <div className="text-ocean-300/80 text-xs">{stat.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="fun-badge mb-3">⭐ Editor's Picks</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950">
                  Featured <span className="gradient-text-fun">Products</span>
                </h2>
              </div>
              <Link href="/shop" className="hidden sm:inline-flex items-center gap-2 text-ocean-600 font-bold hover:text-ocean-800 transition-colors group">
                View All
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/shop" className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold fun-cta">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── CATEGORIES ───────────────────────────────────────────────── */}
      <section className="py-20 bg-ocean-50 water-texture relative overflow-hidden">
        <div className="absolute top-8 right-12 w-4 h-5 bg-ocean-300/20 rounded-full animate-droplet" style={{ animationDelay: "0.5s" }} />
        <div className="absolute bottom-10 left-8 w-3 h-4 bg-marine-300/15 rounded-full animate-droplet" style={{ animationDelay: "1.8s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="fun-badge mb-3">🔧 Everything You Need</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950">
              Shop by <span className="gradient-text-fun">Category</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop`}
                className="group bg-white rounded-3xl p-6 border border-ocean-100 hover:border-ocean-300 hover:shadow-xl hover:-translate-y-1 transition-all text-center product-card"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform inline-block">{cat.emoji}</div>
                <h3 className="font-extrabold text-ocean-950 text-sm leading-tight mb-1">{cat.name}</h3>
                <p className="text-ocean-500 text-xs leading-relaxed">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-40 h-40 border border-ocean-100/50 rounded-full animate-ripple" />
        <div className="absolute bottom-[15%] right-[5%] w-56 h-56 border border-marine-100/40 rounded-full animate-ripple" style={{ animationDelay: "3s" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <span className="fun-badge mb-3">⚡ Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950">
              How It <span className="gradient-text-fun">Works</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                emoji: "🚤",
                title: "Find Your Boat",
                desc: "Use our interactive boat selector to identify your make and model. We'll show you exactly which parts are built for your boat.",
              },
              {
                step: "02",
                emoji: "🛒",
                title: "Add to Cart",
                desc: "Browse our curated catalog, select the right parts, and checkout in minutes. OEM builders unlock wholesale pricing automatically.",
              },
              {
                step: "03",
                emoji: "🔧",
                title: "Install & Ride",
                desc: "Fast shipping right to your door. Our parts drop right in — built to spec, ready to install, guaranteed to perform.",
              },
            ].map((step) => (
              <div key={step.step} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-ocean-500 to-marine-500 flex items-center justify-center text-3xl shadow-xl shadow-ocean-500/20 group-hover:scale-105 transition-transform">
                    {step.emoji}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ocean-950 text-white text-xs font-extrabold flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-extrabold text-ocean-950 mb-2">{step.title}</h3>
                <p className="text-ocean-600 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNER BRANDS ───────────────────────────────────────────── */}
      {partnerBrands.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 relative overflow-hidden">
          <div className="absolute inset-0 water-texture opacity-15" />
          <div className="absolute top-[15%] right-[10%] w-4 h-5 bg-ocean-400/20 rounded-full animate-droplet" />
          <div className="absolute bottom-[20%] left-[8%] w-5 h-6 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "1.2s" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-3">🏆 The Best Brands</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Our <span className="gradient-text-fun">Partners</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partnerBrands.map((brand) => (
                <div
                  key={brand.name}
                  className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/15 hover:border-white/25 transition-all group product-card"
                >
                  {brand.emoji && (
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{brand.emoji}</div>
                  )}
                  <h3 className="font-extrabold text-white text-base mb-1">{brand.name}</h3>
                  {brand.description && (
                    <p className="text-ocean-300/80 text-sm leading-relaxed">{brand.description}</p>
                  )}
                  {brand.href && (
                    <Link href={brand.href} className="text-ocean-400 text-xs font-bold hover:text-ocean-200 transition-colors mt-3 inline-block">
                      Learn more →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Wave bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16">
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
              <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64Z" fill="white" />
            </svg>
          </div>
        </section>
      )}

      {/* ─── SUPPORTED BOAT BRANDS ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="fun-badge mb-3">🚤 Boat Compatibility</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950">
              We Support <span className="gradient-text-fun">Your Boat</span>
            </h2>
            <p className="text-ocean-600 mt-3 max-w-xl mx-auto text-sm">
              Boatify parts are tested and verified for the top bass and pontoon boat brands on the water today.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {(boatBrandsDisplay.length > 0
              ? boatBrandsDisplay
              : [
                  { name: "Bass Cat", emoji: "🐱" },
                  { name: "Caymas", emoji: "🚤" },
                  { name: "G3 Boats", emoji: "⚓" },
                  { name: "Nitro", emoji: "💥" },
                  { name: "Phoenix", emoji: "🔥" },
                  { name: "Ranger", emoji: "🎯" },
                  { name: "Skeeter", emoji: "🦟" },
                  { name: "Stratos", emoji: "⚡" },
                  { name: "Tracker", emoji: "🗺️" },
                  { name: "Triton", emoji: "🔱" },
                ]
            ).map((brand) => (
              <div
                key={brand.name}
                className="flex items-center gap-2 bg-ocean-50 border border-ocean-100 rounded-2xl px-5 py-3 text-sm font-bold text-ocean-800 hover:border-ocean-300 hover:bg-ocean-100 transition-all"
              >
                {brand.emoji && <span>{brand.emoji}</span>}
                {brand.name}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/boat-guide"
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold fun-cta"
            >
              View Boat Compatibility Guide 📋
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FIND YOUR BOAT CTA ───────────────────────────────────────── */}
      <section className="py-20 bg-ocean-50 water-texture relative overflow-hidden">
        <div className="absolute top-6 right-10 w-3 h-4 bg-ocean-300/25 rounded-full animate-droplet" />
        <div className="absolute bottom-8 left-14 w-4 h-5 bg-marine-300/20 rounded-full animate-droplet" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[35%] right-[5%] w-32 h-32 border border-ocean-200/20 rounded-full animate-ripple" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl p-10 sm:p-14 border border-ocean-100 shadow-2xl shadow-ocean-200/40 text-center product-card">
            <div className="text-5xl mb-5">🗺️</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 mb-4">
              Not sure what fits your <span className="gradient-text-fun">boat</span>?
            </h2>
            <p className="text-ocean-600 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              Use our interactive boat diagram to see exactly which Boatify parts are recommended for your specific make, model, and year. No guesswork, no returns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/boat-guide"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta"
              >
                Open Boat Guide 📋
              </Link>
              <Link
                href="/find-your-boat"
                className="inline-flex items-center gap-2 px-8 py-4 bg-ocean-50 text-ocean-700 border-2 border-ocean-200 rounded-2xl font-bold text-lg hover:bg-ocean-100 hover:border-ocean-300 transition-all splash-btn"
              >
                Find My Boat 🚤
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OEM WHOLESALE BANNER ─────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-15" />
        <div className="absolute top-[20%] left-[5%] w-5 h-6 bg-ocean-400/20 rounded-full animate-droplet" />
        <div className="absolute bottom-[25%] right-[8%] w-4 h-5 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[40%] right-[15%] w-60 h-60 border border-ocean-400/6 rounded-full animate-ripple" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-5">🏭 OEM & Wholesale</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Building boats? <span className="gradient-text-fun">Save {oemSavings}%</span>
          </h2>
          <p className="text-ocean-200/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Qualified OEM builders and dealers get access to wholesale pricing across our entire catalog. Apply once, order anytime.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto mb-10">
            {[
              { icon: "💲", title: `Up to ${oemSavings}% Off`, desc: "Wholesale pricing on everything" },
              { icon: "📋", title: "PO Orders", desc: "Net-30 terms for qualified accounts" },
              { icon: "📦", title: "Bulk Pricing", desc: "The more you order, the more you save" },
            ].map((item) => (
              <div key={item.title} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-white font-extrabold mb-1">{item.title}</div>
                <div className="text-ocean-300/80 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>

          <Link
            href="/oem/login"
            className="inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-ocean-400 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta shadow-xl shadow-ocean-500/25"
          >
            Apply for OEM Access 🏭
          </Link>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-[25%] left-[5%] w-36 h-36 border border-ocean-100 rounded-full animate-ripple" />
        <div className="absolute bottom-[20%] right-[8%] w-24 h-24 border border-marine-100/50 rounded-full animate-ripple" style={{ animationDelay: "2.5s" }} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="text-5xl mb-5">⚓</div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-ocean-950 mb-5">
            Ready to <span className="gradient-text-fun">Ride Better</span>?
          </h2>
          <p className="text-ocean-600 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Premium parts, expert knowledge, and a team that loves the water as much as you do. Let's make your next ride the best one yet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-9 py-4 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta shadow-xl shadow-ocean-500/25"
            >
              Shop All Parts 🛒
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-9 py-4 bg-ocean-50 text-ocean-700 border-2 border-ocean-200 rounded-2xl font-bold text-lg hover:bg-ocean-100 hover:border-ocean-300 transition-all splash-btn"
            >
              Our Story 📖
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 bg-white text-ocean-700 border-2 border-ocean-200 rounded-2xl font-bold text-lg hover:bg-ocean-50 transition-all splash-btn"
            >
              Contact Us ✉️
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── Product Card ─────────────────────────────────────────────────────── */
function ProductCard({ product }: { product: SanityProduct }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<SanityProductVariant | undefined>(
    product.variants?.[0]
  );
  const { addItem } = useCart();
  const { showToast } = useToast();

  function handleAddToCart() {
    addItem(product as any, quantity, selectedVariant as any);
    showToast(`${product.name} added!`, "🛒");
    setQuantity(1);
  }

  const colors = product.variants
    ? [...new Map(product.variants.map((v) => [v.color, v])).values()]
    : [];

  return (
    <div className="product-card bg-white rounded-2xl border border-ocean-100 overflow-hidden group flex flex-col">
      <Link href={`/shop/${product.slug}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-ocean-100 via-ocean-50 to-marine-50 flex items-center justify-center relative overflow-hidden cursor-pointer">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ocean-200/60 to-marine-100/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-2xl" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-ocean-500">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="absolute top-3 left-3">
            <span className="fun-badge !py-0.5 !px-2.5">
              {product.brand === "Boatify" ? product.category : product.brand}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-bold text-ocean-950 text-base leading-snug mb-1 group-hover:text-ocean-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        {product.brand !== "Boatify" && (
          <p className="text-xs text-ocean-400 font-bold mb-1">by {product.brand}</p>
        )}
        <p className="text-ocean-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-extrabold text-ocean-800">${product.price.toFixed(2)}</span>
          <span className="inline-flex items-center gap-1 text-xs text-green-600 font-bold bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            In Stock
          </span>
        </div>

        {colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-ocean-600">Color:</span>
            <div className="flex gap-1.5">
              {colors.map((v) => (
                <button
                  key={v.variantId}
                  onClick={() => setSelectedVariant(v)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    selectedVariant?.color === v.color
                      ? "border-ocean-500 scale-110 shadow-md"
                      : "border-ocean-200 hover:border-ocean-400"
                  }`}
                  style={{ backgroundColor: v.colorHex }}
                  title={v.color ?? ""}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <label className="text-xs font-bold text-ocean-600 shrink-0">Qty</label>
          <div className="flex items-center border-2 border-ocean-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold active:scale-90"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 h-9 text-center text-sm font-bold border-x-2 border-ocean-200 focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold active:scale-90"
            >
              +
            </button>
          </div>
          <span className="text-xs text-ocean-500 ml-auto font-bold">${(product.price * quantity).toFixed(2)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm fun-cta"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
