export interface BoatRecommendation {
  modelName: string;
  brandSlug: string;
  boatType: "bass" | "pontoon";
  image?: string;
  description: string;
  products: {
    slug: string;
    note: string;
    category: string;
  }[];
}

export const boatRecommendations: BoatRecommendation[] = [
  {
    modelName: "Ranger Z520L",
    brandSlug: "ranger",
    boatType: "bass",
    image: "/boats/ranger/z520l.jpg",
    description: "Ranger's flagship 20'9\" bass boat running a Mercury 250 Pro XS. Here's what we recommend to get it fully dialed.",
    products: [
      {
        slug: "bms-action-series-jack-plate-6",
        note: "The 6\" Action Series is the most popular plate for the Z520L with a Mercury 250 Pro XS. Built-in pump means less transom clutter.",
        category: "Jack Plate",
      },
      {
        slug: "pro-guide-pgl36vm75-36v-trolling",
        note: "The 75Ah 36V replaces three lead-acid batteries at half the weight. All-day runtime for spot-lock and navigating between spots.",
        category: "Trolling Motor Battery",
      },
      {
        slug: "pro-guide-pgl24m100-st-starting",
        note: "Starting battery with 1,000 CCA equivalent. Also powers your graphs and LiveScope all day. Meets Mercury Marine lithium requirements.",
        category: "Starting Battery",
      },
      {
        slug: "pro-guide-pgc-1236-2-bank-charger",
        note: "Two banks: 12V for your starting battery, 36V for your trolling motor battery. One charger handles everything.",
        category: "Charger",
      },
      {
        slug: "tss-tg-gt-6-garmin-shield",
        note: "Most Z520L owners run Garmin. This shield protects your GT52/GT54 from stumps and trailer bunks without affecting sonar quality.",
        category: "Transducer Shield",
      },
      {
        slug: "tss-ffs-beast-sonar-mount",
        note: "Premium rear transom mount for your LiveScope. Interlocking teeth for precise 10-degree rotation. Spring Back Bracket protects from underwater obstacles.",
        category: "LiveScope Mount",
      },
      {
        slug: "bms-quick-slip-connector",
        note: "Quick-release height adjustment for your Minn Kota. No more fumbling with the factory knob.",
        category: "Trolling Motor Accessory",
      },
      {
        slug: "led-navigation-light-kit",
        note: "USCG-approved LED nav lights. Low power draw, 2-nautical-mile visibility.",
        category: "Lighting",
      },
    ],
  },
  {
    modelName: "Skeeter FXR21",
    brandSlug: "skeeter",
    boatType: "bass",
    image: "/boats/skeeter/fxr21.jpg",
    description: "Skeeter's 21-foot tournament rig typically paired with a Yamaha SHO 250. Here's the ideal setup.",
    products: [
      {
        slug: "bms-standard-series-jack-plate-6",
        note: "The Standard Series with remote pump is the lightest hydraulic plate available. Great match for the FXR21's transom.",
        category: "Jack Plate",
      },
      {
        slug: "pro-guide-pgl36vm60-36v-trolling",
        note: "The 60Ah 36V is plenty for most tournament days on the FXR21. Saves ~136 lbs over three lead-acid batteries.",
        category: "Trolling Motor Battery",
      },
      {
        slug: "pro-guide-pgl24m100-12v-100ah",
        note: "100Ah deep cycle for your electronics. Powers multiple 12\" screens and LiveScope all day.",
        category: "Electronics Battery",
      },
      {
        slug: "pro-guide-pgc-1236-2-bank-charger",
        note: "12V + 36V charger. Each bank has full protection suite. IP68 submersible rated.",
        category: "Charger",
      },
      {
        slug: "tss-lowrance-total-scan-shield",
        note: "Many Skeeter owners run Lowrance. This shield fits Total Scan and Active Imaging transducers.",
        category: "Transducer Shield",
      },
      {
        slug: "tss-ffs-elite-trolling-motor-mount",
        note: "Trolling motor shaft mount for your Active Target or LiveScope. 5-degree rotation increments for precise aiming.",
        category: "FFS Mount",
      },
      {
        slug: "flush-mount-rod-holder",
        note: "Stainless steel 30-degree flush-mount rod holders. Great for trolling and transport rigging.",
        category: "Fishing Accessory",
      },
    ],
  },
  {
    modelName: "Phoenix 721 Pro XP",
    brandSlug: "phoenix",
    boatType: "bass",
    image: "/boats/phoenix/721-pro-xp.jpg",
    description: "Phoenix's high-performance 21-footer. Often paired with a Mercury 250 Pro XS or Yamaha 250 SHO.",
    products: [
      {
        slug: "bms-extreme-gen3-jack-plate-6",
        note: "The Extreme Gen 3 handles motors up to 550 HP. Future-proof if you ever upgrade to a V8 or V10 outboard.",
        category: "Jack Plate",
      },
      {
        slug: "pro-guide-pgl31m180-dp-dual-purpose",
        note: "180Ah dual-purpose battery handles both starting and deep-cycle. Bluetooth monitoring and NMEA 2000 integration.",
        category: "Dual Purpose Battery",
      },
      {
        slug: "pro-guide-pgl36vm75-36v-trolling",
        note: "75Ah for maximum runtime. Built-in heating for early spring tournament mornings.",
        category: "Trolling Motor Battery",
      },
      {
        slug: "pro-guide-pgc-1236-2-bank-charger",
        note: "Pairs perfectly with the 12V dual-purpose + 36V trolling setup.",
        category: "Charger",
      },
      {
        slug: "tss-humminbird-mega-si-shield",
        note: "Phoenix often comes with Humminbird. This shield fits Mega SI transducers on Solix and Helix units.",
        category: "Transducer Shield",
      },
      {
        slug: "bms-balanced-prop-nut",
        note: "Reduces trolling motor noise and vibration. Tool-free prop removal is a bonus.",
        category: "Trolling Motor Accessory",
      },
      {
        slug: "recirculating-livewell-kit",
        note: "Keep your tournament fish alive with proper aeration. Adjustable timer cycles every 2-15 minutes.",
        category: "Livewell",
      },
    ],
  },
  {
    modelName: "Bennington QX Sport",
    brandSlug: "bennington",
    boatType: "pontoon",
    image: "/boats/bennington/qx-sport.jpg",
    description: "Bennington's sport pontoon with performance package. A great platform for fishing and family fun.",
    products: [
      {
        slug: "pro-guide-pgl24m100-12v-100ah",
        note: "100Ah deep cycle powers your fish finder, stereo, and accessory electronics all day long.",
        category: "Electronics Battery",
      },
      {
        slug: "pro-guide-pgc-310-3-bank-charger",
        note: "3-bank charger handles your entire battery setup. Each bank independently configurable.",
        category: "Charger",
      },
      {
        slug: "led-navigation-light-kit",
        note: "USCG-approved LED nav lights for safe operation day and night.",
        category: "Lighting",
      },
      {
        slug: "rgb-led-boat-lighting-strip-kit",
        note: "16 feet of RGB LEDs for accent lighting. 20 colors and multiple flash modes. Perfect for evening cruises.",
        category: "Accent Lighting",
      },
      {
        slug: "stainless-steel-led-cup-holder",
        note: "Stainless steel cup holders with blue LED accent rings. Fits cans, bottles, and tumblers.",
        category: "Deck Accessory",
      },
      {
        slug: "pontoon-rail-fitting-square",
        note: "316 stainless steel rail fittings for extending or repairing fence sections.",
        category: "Deck Hardware",
      },
      {
        slug: "marine-grab-handle",
        note: "Polished SS grab handles for pontoon gates and boarding areas. Concealed-screw design.",
        category: "Safety",
      },
    ],
  },
  {
    modelName: "Barletta Cabrio 22UC",
    brandSlug: "barletta",
    boatType: "pontoon",
    image: "/boats/barletta/cabrio-22uc.jpg",
    description: "Barletta's 22-foot center console pontoon. Versatile enough for fishing and cruising.",
    products: [
      {
        slug: "pro-guide-pgl24m100-12v-100ah",
        note: "100Ah deep cycle handles all your electronics and house loads. Less than half the weight of lead-acid.",
        category: "Electronics Battery",
      },
      {
        slug: "pro-guide-pgl24m100-st-starting",
        note: "Starting battery with ProBoost emergency jump-start capability. Peace of mind on the water.",
        category: "Starting Battery",
      },
      {
        slug: "pro-guide-pgc-310-3-bank-charger",
        note: "3-bank onboard charger. Can stay plugged in year-round with intelligent maintenance.",
        category: "Charger",
      },
      {
        slug: "tss-ap-gt-6-garmin-armor-plate",
        note: "Simple transom-mount armor plate for your Garmin transducer. Great protection at a lower price point.",
        category: "Transducer Protection",
      },
      {
        slug: "stainless-steel-pull-up-cleat-6-inch",
        note: "Flush-mount pop-up cleats eliminate trip hazards on the deck. Handles up to 2,000 lbs.",
        category: "Deck Hardware",
      },
      {
        slug: "ribbed-dock-fender",
        note: "Heavy-duty fenders sized for boats 20-30 feet. Includes fender lines.",
        category: "Docking",
      },
      {
        slug: "dual-usb-charger-socket",
        note: "Dual USB ports with voltmeter. Keep your phone charged and monitor your battery voltage.",
        category: "Electrical",
      },
    ],
  },
];

export function getRecommendationByModel(modelName: string) {
  return boatRecommendations.find((r) => r.modelName === modelName);
}
