export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { ALL_RECOMMENDATIONS_QUERY } from "@/sanity/lib/queries";
import BoatGuideClient from "./BoatGuideClient";

export const metadata = {
  title: "Boat Guide | Boatify",
  description: "Model-specific product recommendations for bass boats and pontoons.",
};

export default async function BoatGuidePage() {
  const { data } = await sanityFetch({ query: ALL_RECOMMENDATIONS_QUERY });
  const recommendations = data ?? [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-30" />
        <div className="absolute top-[15%] left-[8%] w-4 h-5 bg-ocean-400/20 rounded-full animate-droplet" />
        <div className="absolute top-[25%] right-[12%] w-3 h-4 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[30%] right-[25%] w-32 h-32 border border-ocean-400/10 rounded-full animate-ripple" />
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-4">
            &#x1F4CB; Model-Specific Recommendations
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Boat <span className="gradient-text-fun">Guide</span>
          </h1>
          <p className="text-ocean-200/80 text-lg max-w-xl">
            Select your boat model and see exactly which products we recommend. No guesswork &mdash; just
            the right parts for your rig.
          </p>
        </div>
      </section>

      <BoatGuideClient recommendations={recommendations as any} />
    </div>
  );
}
