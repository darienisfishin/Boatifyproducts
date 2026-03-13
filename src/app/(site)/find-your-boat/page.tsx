export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { ALL_BOAT_BRANDS_QUERY, BOAT_ZONES_BY_TYPE_QUERY } from "@/sanity/lib/queries";
import FindYourBoatClient from "./FindYourBoatClient";

export const metadata = {
  title: "Find Your Boat | Boatify",
  description: "Select your boat and discover exactly which parts fit where.",
};

export default async function FindYourBoatPage() {
  const [{ data: boatBrands }, { data: bassZones }, { data: pontoonZones }] = await Promise.all([
    sanityFetch({ query: ALL_BOAT_BRANDS_QUERY }),
    sanityFetch({ query: BOAT_ZONES_BY_TYPE_QUERY, params: { boatType: "bass" } }),
    sanityFetch({ query: BOAT_ZONES_BY_TYPE_QUERY, params: { boatType: "pontoon" } }),
  ]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-30" />
        <div className="absolute top-10 right-24 w-4 h-5 bg-ocean-400/20 rounded-full animate-droplet" />
        <div
          className="absolute bottom-12 left-16 w-3 h-4 bg-marine-400/15 rounded-full animate-droplet"
          style={{ animationDelay: "0.8s" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="absolute bottom-0 w-full h-full"
          >
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ocean-400/15 border border-ocean-400/25 mb-4 text-sm font-semibold text-ocean-200">
            &#x1F50D; Interactive Boat Explorer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Find Your Boat</h1>
          <p className="text-ocean-200/80 text-lg max-w-xl">
            Pick your ride, then tap the glowing dots to discover exactly which parts fit where.
          </p>
        </div>
      </section>

      <FindYourBoatClient
        boatBrands={(boatBrands ?? []) as any}
        bassZones={(bassZones ?? []) as any}
        pontoonZones={(pontoonZones ?? []) as any}
      />
    </div>
  );
}
