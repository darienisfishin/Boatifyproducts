export interface BoatModel {
  name: string;
  years: string[];
  description: string;
  image: string; // path to real manufacturer photo
}

export interface BoatBrand {
  brand: string;
  type: "pontoon" | "bass";
  description: string;
  models: BoatModel[];
}

export const boatBrands: BoatBrand[] = [
  {
    brand: "Bennington",
    type: "pontoon",
    description: "Premium pontoon boats known for exceptional build quality and luxury.",
    models: [
      { name: "S Line", years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"], description: "Bestselling and most accessible series, 16'-25' lengths.", image: "/boats/bennington/s-line.jpg" },
      { name: "SX Line", years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"], description: "Enhanced comfort and style in 22'-26' lengths.", image: "/boats/bennington/sx-line.jpg" },
      { name: "R Line", years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"], description: "Highly customizable with luxury floorplans, 23'-30'.", image: "/boats/bennington/r-line.jpg" },
      { name: "QX Line", years: ["2020", "2021", "2022", "2023", "2024", "2025", "2026"], description: "Flagship series with state-of-the-art amenities, 23'-30'.", image: "/boats/bennington/qx-line.jpg" },
      { name: "L Line", years: ["2021", "2022", "2023", "2024", "2025", "2026"], description: "Ultra-luxury line with premium materials and technology.", image: "/boats/bennington/l-line.jpg" },
    ],
  },
  {
    brand: "Barletta",
    type: "pontoon",
    description: "Innovative construction with exceptionally smooth and quiet rides.",
    models: [
      { name: "Aria", years: ["2021", "2022", "2023", "2024", "2025"], description: "Classic pontoon layout refined with Barletta quality.", image: "/boats/barletta/aria.jpg" },
      { name: "Cabrio", years: ["2021", "2022", "2023", "2024", "2025"], description: "Balanced premium construction with accessible pricing.", image: "/boats/barletta/cabrio.jpg" },
      { name: "Corsa", years: ["2021", "2022", "2023", "2024", "2025"], description: "Sportier, performance-oriented design.", image: "/boats/barletta/corsa.jpeg" },
      { name: "Lusso", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "The most robust, seaworthy pontoon on the market.", image: "/boats/barletta/lusso.jpg" },
      { name: "Reserve", years: ["2021", "2022", "2023", "2024", "2025"], description: "Unapologetically premium flagship with fiberglass exterior.", image: "/boats/barletta/reserve.jpg" },
    ],
  },
  {
    brand: "Lowe",
    type: "pontoon",
    description: "Reliable, value-oriented pontoon boats with lifetime warranty.",
    models: [
      { name: "Ultra Series", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Compact and versatile, Ultra 160 to Ultra 202.", image: "/boats/lowe/ultra.png" },
      { name: "SS Series", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Performance-oriented with up to 300 HP options.", image: "/boats/lowe/ss.png" },
      { name: "SF Series", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Purpose-built for serious anglers, SF 194 to SF 234.", image: "/boats/lowe/sf.png" },
      { name: "RS Series", years: ["2024", "2025"], description: "Newest premium series with fiberglass helm.", image: "/boats/lowe/rs.png" },
      { name: "LS Series", years: ["2024", "2025"], description: "Style and features balance between Ultra and RS.", image: "/boats/lowe/ls.png" },
    ],
  },
  {
    brand: "Phoenix",
    type: "bass",
    description: "High-performance tournament bass boats with all-composite construction.",
    models: [
      { name: "518 Pro", years: ["2022", "2023", "2024", "2025"], description: "Compact and affordable entry into Phoenix lineup.", image: "/boats/phoenix/518-pro.webp" },
      { name: "819 Pro", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Perfect blend of affordability and performance, 19'8\".", image: "/boats/phoenix/819-pro.webp" },
      { name: "20 PHX", years: ["2022", "2023", "2024", "2025"], description: "Versatile 20'6\" platform with massive storage.", image: "/boats/phoenix/20-phx.webp" },
      { name: "721 Pro XP", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Revolutionary bow shroud design at 20'11\".", image: "/boats/phoenix/721-pro-xp.webp" },
      { name: "921 Elite", years: ["2021", "2022", "2023", "2024", "2025"], description: "Flagship model with industry-leading bow design.", image: "/boats/phoenix/921-elite.webp" },
    ],
  },
  {
    brand: "Skeeter",
    type: "bass",
    description: "Iconic bass fishing brand with decades of tournament-winning heritage.",
    models: [
      { name: "ZX200", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Performance, features, and affordability combined.", image: "/boats/skeeter/zx200.webp" },
      { name: "ZXR20", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Compact ZXR with near-flagship performance.", image: "/boats/skeeter/zxr20.webp" },
      { name: "ZXR21", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Impressive speed and agility with updated front deck.", image: "/boats/skeeter/zxr21.webp" },
      { name: "FXR20 Apex", years: ["2021", "2022", "2023", "2024", "2025"], description: "Flagship engineering in a 20-foot package.", image: "/boats/skeeter/fxr20-apex.webp" },
      { name: "FXR21 Apex", years: ["2021", "2022", "2023", "2024", "2025"], description: "Pinnacle of Skeeter engineering, 21-foot tournament machine.", image: "/boats/skeeter/fxr21-apex.webp" },
    ],
  },
  {
    brand: "Ranger",
    type: "bass",
    description: "Legendary bass boat manufacturer since 1968 with exceptional build quality.",
    models: [
      { name: "Z519", years: ["2021", "2022", "2023", "2024", "2025"], description: "Versatile bass boat with immense front deck.", image: "/boats/ranger/z519.jpg" },
      { name: "Z520", years: ["2025"], description: "Proven hull with traditional turn-key ignition.", image: "/boats/ranger/z520.jpg" },
      { name: "Z520R", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "R.I.D.E. digital system with push-to-start, 20'11\".", image: "/boats/ranger/z520r.jpg" },
      { name: "Z521", years: ["2025"], description: "Flagship hull with Mercury digital gauges.", image: "/boats/ranger/z521.jpg" },
      { name: "Z521R", years: ["2020", "2021", "2022", "2023", "2024", "2025"], description: "Ultimate flagship with full R.I.D.E. system, 21'9\".", image: "/boats/ranger/z521r.jpg" },

    ],
  },
];

export function getBrandsByType(type: "pontoon" | "bass") {
  return boatBrands.filter((b) => b.type === type);
}

export function getModelsForBrand(brandName: string) {
  return boatBrands.find((b) => b.brand === brandName)?.models ?? [];
}

export function getYearsForModel(brandName: string, modelName: string) {
  const brand = boatBrands.find((b) => b.brand === brandName);
  const model = brand?.models.find((m) => m.name === modelName);
  return model?.years ?? [];
}

// Boat zones and their part mappings for the interactive diagram
export interface BoatZone {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  productSlugs: string[];
}

export const bassBoatZones: BoatZone[] = [
  { id: "bow", label: "Bow", x: 15, y: 30, productSlugs: ["led-navigation-light-kit", "universal-trolling-motor-mount", "fluke-style-anchor-kit"] },
  { id: "front-deck", label: "Front Deck", x: 30, y: 35, productSlugs: ["pro-angler-bass-boat-seat", "marine-bass-boat-carpet-kit", "stainless-steel-pull-up-cleat-6-inch", "recirculating-livewell-kit"] },
  { id: "helm", label: "Helm / Console", x: 50, y: 40, productSlugs: ["rotary-steering-helm-kit", "4-gauge-marine-instrument-panel", "dual-usb-charger-socket", "dual-bank-battery-switch", "stainless-steel-led-cup-holder", "marine-grab-handle"] },
  { id: "rear-deck", label: "Rear Deck", x: 70, y: 35, productSlugs: ["flush-mount-rod-holder", "pro-angler-bass-boat-seat", "marine-bass-boat-carpet-kit"] },
  { id: "stern", label: "Stern / Transom", x: 85, y: 40, productSlugs: ["marine-fuel-line-assembly-kit", "hydraulic-trim-tab-set"] },
  { id: "hull", label: "Hull / Below Deck", x: 50, y: 65, productSlugs: ["automatic-bilge-pump-1100-gph", "ribbed-dock-fender", "rgb-led-boat-lighting-strip-kit"] },
];

export const pontoonBoatZones: BoatZone[] = [
  { id: "bow-gate", label: "Bow Gate", x: 15, y: 40, productSlugs: ["led-navigation-light-kit", "marine-grab-handle", "fluke-style-anchor-kit"] },
  { id: "front-lounge", label: "Front Lounge", x: 30, y: 35, productSlugs: ["stainless-steel-led-cup-holder", "stainless-steel-pull-up-cleat-6-inch"] },
  { id: "helm", label: "Helm Station", x: 50, y: 30, productSlugs: ["rotary-steering-helm-kit", "4-gauge-marine-instrument-panel", "dual-usb-charger-socket", "dual-bank-battery-switch"] },
  { id: "rail", label: "Rails & Fencing", x: 50, y: 15, productSlugs: ["pontoon-rail-fitting-square", "flush-mount-rod-holder", "rgb-led-boat-lighting-strip-kit"] },
  { id: "rear-lounge", label: "Rear Lounge", x: 75, y: 35, productSlugs: ["stainless-steel-led-cup-holder", "marine-grab-handle", "recirculating-livewell-kit"] },
  { id: "stern", label: "Stern / Motor", x: 90, y: 40, productSlugs: ["marine-fuel-line-assembly-kit", "hydraulic-trim-tab-set"] },
  { id: "pontoons", label: "Pontoons / Below", x: 50, y: 70, productSlugs: ["automatic-bilge-pump-1100-gph", "ribbed-dock-fender"] },
];
