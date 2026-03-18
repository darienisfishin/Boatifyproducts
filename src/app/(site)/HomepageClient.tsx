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
  {
    name: "Jack Plates",
    emoji: "⚙️",
    desc: "Raise your motor for the perfect trim angle",
    gradient: "from-ocean-600 to-ocean-800",
    lightGradient: "from-ocean-50 to-ocean-100",
    borderColor: "border-ocean-200",
    textColor: "text-ocean-700",
  },
  {
    name: "Transducer Shields",
    emoji: "🛡️",
    desc: "Protect your sonar at full speed",
    gradient: "from-marine-500 to-marine-700",
    lightGradient: "from-marine-50 to-teal-50",
    borderColor: "border-marine-200",
    textColor: "text-marine-700",
  },
  {
    name: "Lithium Batteries",
    emoji: "⚡",
    desc: "More power. Less weight. All day ride.",
    gradient: "from-amber-500 to-orange-600",
    lightGradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
  },
  {
    name: "Apparel",
    emoji: "👕",
    desc: "Wear the brand out on the water",
    gradient: "from-violet-500 to-purple-700",
    lightGradient: "from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-700",
  },
  {
    name: "Accessories",
    emoji: "🔧",
    desc: "The finishing touches every boat needs",
    gradient: "from-slate-500 to-slate-700",
    lightGradient: "from-slate-50 to-gray-100",
    borderColor: "border-slate-200",
    textColor: "text-slate-700",
  },
];

export default function HomepageClient({ data }: Props) {
  const heroTitle = data?.heroTitle ?? "Boats Without Woes";
  const heroSubtitle = data?.heroSubtitle ?? "Premium marine parts — for builders, dealers & boaters who demand the best.";
  const heroCTALabel = data?.heroCTALabel ?? "Shop All Parts";
  const heroCTALink = data?.heroCTALink ?? "/shop";
  const oemSavings = data?.oemSavingsPercent ?? "30";
  const featuredProducts = data?.featuredProducts ?? [];
  const partnerBrands = data?.partnerBrands ?? [];
  const boatBrandsDisplay = data?.boatBrandsDisplay ?? [];

  const defaultBoatBrands = [
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
  ];

  const activeBrands = boatBrandsDisplay.length > 0 ? boatBrandsDisplay : defaultBoatBrands;

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════
          HERO — Full viewport, bold typography, animated water
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-ocean-950 via-[#012030] to-ocean-900 min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Deep water texture */}
        <div className="absolute inset-0 water-texture opacity-25" />

        {/* Animated bubbles */}
        {[
          { size: 5, top: "10%", left: "4%", delay: "0s", dur: "7s", opacity: 0.35 },
          { size: 3, top: "20%", right: "6%", delay: "1.2s", dur: "9s", opacity: 0.25 },
          { size: 7, top: "40%", left: "2%", delay: "2s", dur: "11s", opacity: 0.15 },
          { size: 4, top: "60%", right: "3%", delay: "0.5s", dur: "8s", opacity: 0.3 },
          { size: 3, top: "75%", left: "10%", delay: "3s", dur: "7s", opacity: 0.2 },
          { size: 6, top: "15%", left: "30%", delay: "1.5s", dur: "10s", opacity: 0.12 },
          { size: 3, top: "45%", right: "25%", delay: "4s", dur: "9s", opacity: 0.18 },
          { size: 5, top: "80%", right: "15%", delay: "2.5s", dur: "8s", opacity: 0.22 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-ocean-400/40 animate-droplet pointer-events-none"
            style={{
              top: b.top,
              left: "left" in b ? (b as any).left : undefined,
              right: "right" in b ? (b as any).right : undefined,
              width: b.size * 5,
              height: b.size * 6,
              opacity: b.opacity,
              animationDelay: b.delay,
              animationDuration: b.dur,
            }}
          />
        ))}

        {/* Large ripple rings */}
        <div className="absolute top-[25%] right-[5%] w-96 h-96 border border-ocean-400/6 rounded-full animate-ripple pointer-events-none" />
        <div className="absolute top-[55%] left-[-5%] w-72 h-72 border border-marine-400/5 rounded-full animate-ripple pointer-events-none" style={{ animationDelay: "3s" }} />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-32 w-full">
          <div className="max-w-4xl">
            {/* Pre-badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 text-sm">
                ⚓ Premium Marine Parts
              </span>
              <span className="fun-badge !bg-marine-500/20 !text-marine-200 !border-marine-400/20 text-sm">
                🚀 Free Shipping Over $99
              </span>
            </div>

            {/* Main headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.9] mb-6 tracking-tight">
              <span className="block text-white">Boats</span>
              <span className="block gradient-text-fun">Without</span>
              <span className="block text-white">Woes.</span>
            </h1>

            <p className="text-ocean-100/85 text-xl sm:text-2xl font-medium mb-3 max-w-2xl leading-snug">
              {heroSubtitle}
            </p>
            <p className="text-ocean-300/70 text-base sm:text-lg mb-10 max-w-xl leading-relaxed">
              Jack plates, transducer shields, lithium batteries, apparel and more — tested for bass boats and pontoons.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                href={heroCTALink}
                className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-ocean-400 to-marine-500 text-white rounded-2xl font-extrabold text-lg fun-cta shadow-2xl shadow-ocean-500/40"
              >
                <span>🛒</span>
                {heroCTALabel}
              </Link>
              <Link
                href="/find-your-boat"
                className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-2xl font-extrabold text-lg hover:bg-white/20 hover:border-white/40 transition-all splash-btn"
              >
                <span>🗺️</span>
                Find My Boat
              </Link>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
              {[
                { val: "100+", label: "Products", icon: "📦" },
                { val: `${oemSavings}%`, label: "OEM Savings", icon: "💰" },
                { val: "10+", label: "Boat Brands", icon: "🚤" },
                { val: "2-Day", label: "Shipping", icon: "🚀" },
              ].map((s) => (
                <div key={s.label} className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-white leading-none">{s.val}</div>
                  <div className="text-ocean-300/70 text-xs mt-1 font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Layered wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block" style={{ height: 120 }}>
            <path d="M0,60 C180,120 360,0 540,60 C720,120 900,0 1080,60 C1260,120 1380,40 1440,60 L1440,120 L0,120Z" fill="white" fillOpacity="0.06" />
            <path d="M0,80 C240,40 480,100 720,80 C960,60 1200,100 1440,80 L1440,120 L0,120Z" fill="white" fillOpacity="0.08" />
            <path d="M0,100 C360,60 720,120 1080,100 C1260,90 1380,110 1440,100 L1440,120 L0,120Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SHOP BY PART — Large colorful category cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ocean-400 via-marine-400 to-ocean-400" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="fun-badge mb-3">🔧 Shop by Part Type</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-ocean-950">
                What are you<br />
                <span className="gradient-text-fun">looking for?</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-ocean-600 font-bold hover:text-ocean-900 transition-colors group shrink-0 text-sm"
            >
              Browse all products
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Category cards — 2 big + 3 medium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CATEGORIES.map((cat, idx) => (
              <Link
                key={cat.name}
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                className={`group relative rounded-3xl border-2 ${cat.borderColor} bg-gradient-to-br ${cat.lightGradient} overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 ${idx < 2 ? "sm:row-span-1" : ""}`}
              >
                {/* Top gradient bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${cat.gradient}`} />

                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {cat.emoji}
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold text-ocean-950 mb-2">{cat.name}</h3>
                  <p className={`text-sm leading-relaxed ${cat.textColor} font-medium`}>{cat.desc}</p>
                  <div className={`mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold ${cat.textColor} group-hover:gap-2.5 transition-all`}>
                    Shop now
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════════════════════════ */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-ocean-50 water-texture relative overflow-hidden">
          <div className="absolute top-8 right-12 w-4 h-5 bg-ocean-300/20 rounded-full animate-droplet" />
          <div className="absolute bottom-12 left-8 w-3 h-4 bg-marine-300/15 rounded-full animate-droplet" style={{ animationDelay: "1.8s" }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <span className="fun-badge mb-3">⭐ Hand Picked</span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-ocean-950">
                  Featured <span className="gradient-text-fun">Products</span>
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ocean-700 border-2 border-ocean-200 rounded-2xl font-bold hover:bg-ocean-50 hover:border-ocean-300 transition-all splash-btn shrink-0"
              >
                View All 🛒
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          HOW IT WORKS — Horizontal step flow
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-[20%] right-[3%] w-48 h-48 border border-ocean-100 rounded-full animate-ripple pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="fun-badge mb-3">⚡ Simple as That</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ocean-950">
              Three steps to a <span className="gradient-text-fun">better ride</span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-ocean-200 via-ocean-400 to-marine-400" />

            <div className="grid md:grid-cols-3 gap-12 md:gap-8">
              {[
                {
                  step: 1,
                  emoji: "🗺️",
                  title: "Find Your Boat",
                  desc: "Enter your make and model. Our boat compatibility tool shows exactly which parts are built for your specific hull.",
                  cta: "Use Boat Guide",
                  href: "/boat-guide",
                },
                {
                  step: 2,
                  emoji: "🛒",
                  title: "Shop Your Parts",
                  desc: "Browse our curated catalog. OEM builders unlock wholesale pricing. Everyday boaters get access to the same great parts.",
                  cta: "Browse Shop",
                  href: "/shop",
                },
                {
                  step: 3,
                  emoji: "🔧",
                  title: "Install & Ride",
                  desc: "Fast shipping to your door. Every part drops right in — built to spec, guaranteed to perform, no guesswork needed.",
                  cta: "Start Now",
                  href: "/shop",
                },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center group">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-ocean-500 to-marine-500 flex items-center justify-center text-4xl shadow-xl shadow-ocean-500/20 group-hover:scale-105 transition-transform relative z-10">
                      {item.emoji}
                    </div>
                    <div className="absolute -top-2 -right-2 z-20 w-8 h-8 rounded-full bg-ocean-950 text-white text-xs font-extrabold flex items-center justify-center shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-extrabold text-ocean-950 mb-2">{item.title}</h3>
                  <p className="text-ocean-600 text-sm leading-relaxed mb-5 max-w-xs">{item.desc}</p>
                  <Link
                    href={item.href}
                    className="text-xs font-extrabold text-ocean-600 hover:text-ocean-900 transition-colors flex items-center gap-1 group-hover:gap-2"
                  >
                    {item.cta}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PARTNER BRANDS — Dark section
      ══════════════════════════════════════════════════════════════ */}
      {partnerBrands.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-ocean-950 via-[#012030] to-ocean-900 relative overflow-hidden">
          <div className="absolute inset-0 water-texture opacity-15" />
          <div className="absolute top-[10%] right-[5%] w-5 h-6 bg-ocean-400/20 rounded-full animate-droplet" />
          <div className="absolute bottom-[15%] left-[8%] w-4 h-5 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "1.5s" }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-3">🏆 Only the Best</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-white">
                Brands we <span className="gradient-text-fun">stand behind</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {partnerBrands.map((brand) => (
                brand.href ? (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/15 hover:border-white/25 transition-all group product-card block"
                  >
                    <BrandCardContent brand={brand} />
                  </Link>
                ) : (
                  <div
                    key={brand.name}
                    className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/15 hover:border-white/25 transition-all group product-card"
                  >
                    <BrandCardContent brand={brand} />
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full block" style={{ height: 64 }}>
              <path d="M0,32 C360,64 720,0 1080,32 C1260,48 1380,16 1440,32 L1440,64 L0,64Z" fill="white" />
            </svg>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          BOAT BRANDS — Scrolling ticker
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <span className="fun-badge mb-3">🚤 Boat Compatibility</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-ocean-950">
                Built for your <span className="gradient-text-fun">boat</span>
              </h2>
            </div>
            <Link
              href="/boat-guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold fun-cta shrink-0"
            >
              View Compatibility Guide 📋
            </Link>
          </div>
        </div>

        {/* Scrolling boat brand strip */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-4 sm:flex-wrap sm:justify-center sm:overflow-visible">
            {activeBrands.map((brand) => (
              <Link
                key={brand.name}
                href={`/boat-guide`}
                className="flex items-center gap-2.5 bg-ocean-50 border-2 border-ocean-100 rounded-2xl px-5 py-3 text-sm font-bold text-ocean-800 hover:border-ocean-400 hover:bg-ocean-100 hover:shadow-lg transition-all whitespace-nowrap shrink-0 group splash-btn"
              >
                {brand.emoji && <span className="text-lg group-hover:scale-110 transition-transform inline-block">{brand.emoji}</span>}
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FIND YOUR BOAT — Full-bleed CTA card
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-ocean-50 water-texture relative overflow-hidden">
        <div className="absolute top-6 right-10 w-3 h-4 bg-ocean-300/25 rounded-full animate-droplet" />
        <div className="absolute bottom-8 left-14 w-4 h-5 bg-marine-300/20 rounded-full animate-droplet" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[35%] right-[3%] w-40 h-40 border border-ocean-200/25 rounded-full animate-ripple" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-ocean-950 to-ocean-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left: text */}
              <div className="p-10 sm:p-14">
                <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-5">🗺️ Smart Fitment</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Not sure what <span className="gradient-text-fun">fits your boat</span>?
                </h2>
                <p className="text-ocean-200/80 text-lg leading-relaxed mb-8">
                  Our interactive boat guide shows exactly which parts work with your specific make, model, and year. No more wrong orders.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/boat-guide"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-ocean-400 to-marine-500 text-white rounded-2xl font-bold fun-cta shadow-xl shadow-ocean-500/30"
                  >
                    Open Boat Guide 📋
                  </Link>
                  <Link
                    href="/find-your-boat"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all splash-btn"
                  >
                    Find My Boat 🚤
                  </Link>
                </div>
              </div>
              {/* Right: visual card */}
              <div className="bg-white/5 flex items-center justify-center p-10 sm:p-14 min-h-[200px]">
                <div className="text-center">
                  <div className="text-8xl mb-4">🚤</div>
                  <div className="flex flex-col gap-2 max-w-xs">
                    {["Bass Cat • Caymas • G3 Boats", "Nitro • Phoenix • Ranger", "Skeeter • Stratos • Tracker"].map((row) => (
                      <div key={row} className="bg-white/10 rounded-xl px-4 py-2 text-xs font-bold text-ocean-200/80 text-center">
                        {row}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          OEM WHOLESALE — Dramatic savings banner
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-32 h-32 border border-ocean-100 rounded-full animate-ripple pointer-events-none" />
        <div className="absolute bottom-[15%] right-[5%] w-24 h-24 border border-marine-100/50 rounded-full animate-ripple pointer-events-none" style={{ animationDelay: "2.5s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: big number */}
            <div>
              <span className="fun-badge mb-5">🏭 For Builders & Dealers</span>
              <div className="flex items-end gap-2 mb-4">
                <span className="text-8xl sm:text-9xl font-extrabold gradient-text-fun leading-none">{oemSavings}%</span>
                <span className="text-3xl font-extrabold text-ocean-400 mb-3">off</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 mb-4">
                OEM wholesale pricing<br />for qualified builders.
              </h2>
              <p className="text-ocean-600 text-lg leading-relaxed mb-8 max-w-md">
                Apply once, order anytime. We work directly with OEM boat builders, marine dealers, and fleet operators to provide the best pricing in the industry.
              </p>
              <Link
                href="/oem/login"
                className="inline-flex items-center gap-3 px-9 py-4 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-extrabold text-lg fun-cta shadow-xl shadow-ocean-500/25"
              >
                Apply for OEM Access 🏭
              </Link>
            </div>

            {/* Right: benefits cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "💲", title: `Up to ${oemSavings}% Off`, desc: "Wholesale pricing on the full catalog" },
                { icon: "📋", title: "Net-30 Terms", desc: "PO orders for qualified accounts" },
                { icon: "📦", title: "Bulk Pricing", desc: "Volume discounts stacked on top" },
                { icon: "⚡", title: "Priority Order", desc: "Faster processing & fulfillment" },
              ].map((item) => (
                <div key={item.title} className="bg-ocean-50 border-2 border-ocean-100 rounded-3xl p-6 hover:border-ocean-300 hover:shadow-lg transition-all group product-card">
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{item.icon}</div>
                  <div className="font-extrabold text-ocean-950 text-sm mb-1">{item.title}</div>
                  <div className="text-ocean-500 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FINAL CTA — Dark full-bleed closer
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gradient-to-br from-ocean-950 via-[#012030] to-ocean-900 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-20" />
        <div className="absolute top-[15%] right-[6%] w-5 h-6 bg-ocean-400/20 rounded-full animate-droplet" />
        <div className="absolute bottom-[20%] left-[10%] w-4 h-5 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[40%] left-[3%] w-56 h-56 border border-ocean-400/6 rounded-full animate-ripple pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="text-7xl mb-6">⚓</div>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
            Ready to ride <span className="gradient-text-fun">better</span>?
          </h2>
          <p className="text-ocean-200/80 text-xl max-w-xl mx-auto mb-12 leading-relaxed">
            Premium parts. Expert knowledge. A team that loves the water as much as you do.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-ocean-400 to-marine-500 text-white rounded-2xl font-extrabold text-lg fun-cta shadow-2xl shadow-ocean-500/40"
            >
              <span>🛒</span>
              Shop All Parts
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 text-white border-2 border-white/20 rounded-2xl font-extrabold text-lg hover:bg-white/20 hover:border-white/35 transition-all splash-btn"
            >
              <span>📖</span>
              Our Story
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white/10 text-white border-2 border-white/20 rounded-2xl font-extrabold text-lg hover:bg-white/20 hover:border-white/35 transition-all splash-btn"
            >
              <span>✉️</span>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ── Brand card inner content (used in link and div variants) ── */
function BrandCardContent({ brand }: { brand: { name: string; emoji?: string; description?: string; href?: string } }) {
  return (
    <>
      {brand.emoji && (
        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform inline-block">{brand.emoji}</div>
      )}
      <h3 className="font-extrabold text-white text-lg mb-1">{brand.name}</h3>
      {brand.description && (
        <p className="text-ocean-300/80 text-sm leading-relaxed">{brand.description}</p>
      )}
      {brand.href && (
        <div className="text-ocean-400 text-xs font-bold mt-3 group-hover:text-ocean-200 transition-colors">
          Learn more →
        </div>
      )}
    </>
  );
}

/* ── Product Card ── */
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
    <div className="product-card bg-white rounded-2xl border border-ocean-100 overflow-hidden group flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
            <span className="fun-badge !py-0.5 !px-2.5 text-[10px]">
              {product.brand === "Boatify" ? product.category : product.brand}
            </span>
          </div>
          <div className="absolute top-3 right-3 text-[10px] text-ocean-500 font-mono bg-white/80 px-2 py-0.5 rounded-lg font-bold">
            {product.sku}
          </div>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-bold text-ocean-950 text-base leading-snug mb-1 group-hover:text-ocean-600 transition-colors cursor-pointer line-clamp-2">
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
              className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold"
            >-</button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 h-9 text-center text-sm font-bold border-x-2 border-ocean-200 focus:outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 flex items-center justify-center text-ocean-600 hover:bg-ocean-50 transition-colors text-sm font-bold"
            >+</button>
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
