"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SanityBoatBrand, SanityBoatZone } from "@/sanity/types";

interface Props {
  boatBrands: SanityBoatBrand[];
  bassZones: SanityBoatZone[];
  pontoonZones: SanityBoatZone[];
}

export default function FindYourBoatClient({ boatBrands, bassZones, pontoonZones }: Props) {
  const [boatType, setBoatType] = useState<"bass" | "pontoon" | null>(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [boatSelected, setBoatSelected] = useState(false);

  const availableBrands = boatType ? boatBrands.filter((b) => b.boatType === boatType) : [];
  const brand = boatBrands.find((b) => b.name === selectedBrand);
  const availableModels = brand?.models ?? [];
  const model = availableModels.find((m) => m.name === selectedModel);
  const availableYears = model?.years ?? [];

  const zones = boatType === "bass" ? bassZones : pontoonZones;

  const zoneProducts = useMemo(() => {
    if (!activeZone) return [];
    const zone = zones.find((z) => z.zoneId === activeZone);
    if (!zone) return [];
    return zone.products ?? [];
  }, [activeZone, zones]);

  function handleSelectBoat() {
    if (selectedYear && selectedModel && selectedBrand) {
      setBoatSelected(true);
    }
  }

  function handleReset() {
    setBoatType(null);
    setSelectedBrand("");
    setSelectedModel("");
    setSelectedYear("");
    setBoatSelected(false);
    setActiveZone(null);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!boatSelected ? (
        /* SELECTOR */
        <div className="max-w-3xl mx-auto">
          {/* Step 1: Boat Type */}
          <div className="mb-10">
            <StepHeader step={1} title="What kind of boat?" active={!boatType} completed={!!boatType} />
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <TypeCard
                selected={boatType === "bass"}
                onClick={() => {
                  setBoatType("bass");
                  setSelectedBrand("");
                  setSelectedModel("");
                  setSelectedYear("");
                }}
                title="Bass Boat"
                description="Phoenix, Skeeter, Ranger"
                emoji="&#x1F3A3;"
              />
              <TypeCard
                selected={boatType === "pontoon"}
                onClick={() => {
                  setBoatType("pontoon");
                  setSelectedBrand("");
                  setSelectedModel("");
                  setSelectedYear("");
                }}
                title="Pontoon"
                description="Bennington, Barletta, Lowe"
                emoji="&#x1F6E5;"
              />
            </div>
          </div>

          {/* Step 2: Brand */}
          {boatType && (
            <div className="mb-10 animate-slide-up">
              <StepHeader step={2} title="Pick your brand" active={!selectedBrand} completed={!!selectedBrand} />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {availableBrands.map((b) => (
                  <button
                    key={b.name}
                    onClick={() => {
                      setSelectedBrand(b.name);
                      setSelectedModel("");
                      setSelectedYear("");
                    }}
                    className={`p-5 rounded-2xl border-2 text-center font-bold text-sm transition-all brand-card ${
                      selectedBrand === b.name
                        ? "border-ocean-500 bg-ocean-50 text-ocean-700 shadow-lg shadow-ocean-500/15"
                        : "border-ocean-100 hover:border-ocean-300 text-ocean-800 hover:bg-ocean-50"
                    }`}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Model */}
          {selectedBrand && (
            <div className="mb-10 animate-slide-up">
              <StepHeader step={3} title="Select your model" active={!selectedModel} completed={!!selectedModel} />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                {availableModels.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => {
                      setSelectedModel(m.name);
                      setSelectedYear("");
                    }}
                    className={`rounded-2xl border-2 overflow-hidden text-left transition-all brand-card ${
                      selectedModel === m.name
                        ? "border-ocean-500 shadow-lg shadow-ocean-500/15"
                        : "border-ocean-100 hover:border-ocean-300"
                    }`}
                  >
                    <div className="relative h-24 bg-gradient-to-br from-ocean-100 to-marine-50 overflow-hidden">
                      {m.image && (
                        <Image
                          src={m.image}
                          alt={`${selectedBrand} ${m.name}`}
                          fill
                          className="object-cover"
                          sizes="200px"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </div>
                    <div className="p-3">
                      <span className="block font-bold text-sm text-ocean-900">{m.name}</span>
                      <span className="block text-xs text-ocean-500 mt-0.5 line-clamp-1">{m.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Year */}
          {selectedModel && (
            <div className="mb-10 animate-slide-up">
              <StepHeader step={4} title="What year?" active={!selectedYear} completed={!!selectedYear} />
              <div className="flex flex-wrap gap-2 mt-4">
                {availableYears.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-6 py-3 rounded-2xl border-2 font-bold text-sm transition-all brand-card ${
                      selectedYear === y
                        ? "border-ocean-500 bg-ocean-50 text-ocean-700 shadow-lg shadow-ocean-500/15"
                        : "border-ocean-100 text-ocean-800 hover:border-ocean-300 hover:bg-ocean-50"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirm */}
          {selectedYear && (
            <div className="text-center animate-slide-up">
              <div className="relative rounded-3xl overflow-hidden mb-6">
                <div className="relative h-48 sm:h-64 bg-gradient-to-br from-ocean-100 to-marine-50">
                  {model?.image && (
                    <Image
                      src={model.image}
                      alt={`${selectedYear} ${selectedBrand} ${selectedModel}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 600px"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <p className="text-sm text-ocean-200 mb-1">Your Selection</p>
                  <p className="text-2xl font-extrabold text-white">
                    {selectedYear} {selectedBrand} {selectedModel}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSelectBoat}
                className="px-10 py-4 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta"
              >
                Explore My Boat &#x2192;
              </button>
            </div>
          )}
        </div>
      ) : (
        /* BOAT PHOTO + INTERACTIVE HOTSPOTS VIEW */
        <div>
          {/* Selected boat header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <p className="text-sm text-ocean-500 mb-1">Your Boat</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-950">
                {selectedYear} {selectedBrand} {selectedModel}
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 border-2 border-ocean-200 text-ocean-600 rounded-xl text-sm font-bold hover:bg-ocean-50 transition-all splash-btn"
            >
              &#x21BB; Change Boat
            </button>
          </div>

          <p className="text-ocean-600 mb-6 text-lg">
            Tap the <span className="text-ocean-500 font-bold">glowing dots</span> on your boat to see
            which Boatify parts fit each area.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Boat Photo with Interactive Dots */}
            <div className="lg:col-span-2">
              <div className="boat-photo-container relative bg-gradient-to-br from-ocean-100 via-ocean-50 to-marine-50 rounded-3xl border-2 border-ocean-200 overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: "55%" }}>
                  {model?.image && (
                    <Image
                      src={model.image}
                      alt={`${selectedYear} ${selectedBrand} ${selectedModel}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      priority
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/40 via-transparent to-ocean-950/10" />

                  {zones.map((zone) => (
                    <button
                      key={zone.zoneId}
                      onClick={() => setActiveZone(zone.zoneId === activeZone ? null : zone.zoneId)}
                      className={`absolute boat-dot z-20 ${activeZone === zone.zoneId ? "!bg-marine-400 !scale-[1.4] ring-4 ring-ocean-300/50" : ""}`}
                      style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
                      title={zone.label ?? ""}
                    >
                      <span className="sr-only">{zone.label}</span>
                    </button>
                  ))}
                </div>

                {/* Zone label buttons */}
                <div className="flex flex-wrap gap-2 p-4 border-t border-ocean-200 bg-white/80 backdrop-blur-sm">
                  {zones.map((zone) => (
                    <button
                      key={zone.zoneId}
                      onClick={() => setActiveZone(zone.zoneId === activeZone ? null : zone.zoneId)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all splash-btn ${
                        activeZone === zone.zoneId
                          ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg shadow-ocean-500/20"
                          : "bg-ocean-50 text-ocean-700 border border-ocean-200 hover:border-ocean-400 hover:bg-ocean-100"
                      }`}
                    >
                      {zone.label} ({zone.productSlugs?.length ?? 0})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Parts Panel */}
            <div className="lg:col-span-1">
              {activeZone ? (
                <div className="animate-slide-up">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-ocean-400 to-marine-500" />
                    <h3 className="font-extrabold text-ocean-950 text-lg">
                      {zones.find((z) => z.zoneId === activeZone)?.label}
                    </h3>
                  </div>
                  <p className="text-ocean-500 text-sm mb-4">
                    {zoneProducts.length} part{zoneProducts.length !== 1 ? "s" : ""} fit this area
                  </p>
                  <div className="space-y-3">
                    {zoneProducts.map((product) => (
                      <Link
                        key={product.sku}
                        href={`/shop/${product.slug}`}
                        className="block p-4 bg-white rounded-2xl border border-ocean-100 hover:border-ocean-300 hover:shadow-lg transition-all group product-card"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-100 to-marine-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain rounded-xl" />
                            ) : (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-ocean-500">
                                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-ocean-900 group-hover:text-ocean-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-ocean-400 mt-0.5 font-mono">{product.sku}</p>
                            <div className="flex items-center justify-between mt-1.5">
                              <p className="text-base font-extrabold text-ocean-800">${product.price.toFixed(2)}</p>
                              <span className="text-xs text-ocean-500 font-semibold flex items-center gap-1">
                                Shop
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3" strokeLinecap="round">
                                  <path d="M9 18l6-6-6-6" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 px-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ocean-100 to-marine-50 flex items-center justify-center mx-auto mb-5 animate-bob">
                    <span className="text-3xl">&#x1F4CD;</span>
                  </div>
                  <h3 className="font-extrabold text-ocean-800 text-lg mb-2">Tap a Hotspot</h3>
                  <p className="text-ocean-500 text-sm leading-relaxed">
                    See those glowing dots on your boat? Tap any one to reveal the parts that fit right
                    there. Or use the zone buttons below the photo.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepHeader({
  step,
  title,
  active,
  completed,
}: {
  step: number;
  title: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0 transition-all ${
          completed
            ? "bg-gradient-to-br from-marine-500 to-ocean-500 text-white shadow-md"
            : active
            ? "bg-gradient-to-br from-ocean-500 to-ocean-600 text-white shadow-md"
            : "bg-ocean-100 text-ocean-400"
        }`}
      >
        {completed ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="w-4 h-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          step
        )}
      </div>
      <h3 className={`font-extrabold text-lg ${active ? "text-ocean-950" : "text-ocean-500"}`}>{title}</h3>
    </div>
  );
}

function TypeCard({
  selected,
  onClick,
  title,
  description,
  emoji,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  emoji: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-7 rounded-3xl border-2 text-left transition-all brand-card ${
        selected
          ? "border-ocean-500 bg-ocean-50 shadow-xl shadow-ocean-500/15"
          : "border-ocean-100 hover:border-ocean-300 hover:bg-ocean-50"
      }`}
    >
      <span className="text-4xl block mb-3" dangerouslySetInnerHTML={{ __html: emoji }} />
      <h4 className="font-extrabold text-ocean-950 text-lg">{title}</h4>
      <p className="text-sm text-ocean-500 mt-1">{description}</p>
    </button>
  );
}
