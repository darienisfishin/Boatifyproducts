export const dynamic = "force-dynamic";

import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityAboutPage, SanityFounder, SanityValue } from "@/sanity/types";

export const metadata = {
  title: "About Boatify",
  description: "Two guys who love boats built something awesome. Learn about the Boatify story.",
};

const defaultFounders: SanityFounder[] = [
  { name: "Luke Dunkin", title: "Co-Founder & CEO", emoji: "&#x2693;", bio: "With over 15 years of experience in marine manufacturing and supply chain management, Luke Dunkin brings deep operational expertise and an unwavering commitment to product quality. His background spans roles at some of the most respected boat builders in the Southeast, giving him an insider's understanding of what OEM builders truly need from a parts supplier." },
  { name: "Luke Cochran", title: "Co-Founder & COO", emoji: "&#x1F6A4;", bio: "Luke Cochran's 15+ years in the marine industry have been defined by a passion for innovation and customer experience. From sales and distribution to digital transformation, Luke has been at the forefront of modernizing how the boating world does business. His vision for a seamless, technology-driven parts platform is the engine that powers Boatify." },
];

const defaultValues: SanityValue[] = [
  { title: "Quality First", emoji: "&#x2B50;", description: "Every product in our catalog meets rigorous marine-grade standards. We don't cut corners because your safety on the water depends on it." },
  { title: "Innovation", emoji: "&#x1F4A1;", description: "From our interactive boat diagrams to streamlined PO processing, we use technology to make the parts buying experience simple and modern." },
  { title: "Partnership", emoji: "&#x1F91D;", description: "We're not just a vendor — we're a partner. Whether you're building 100 boats a year or fixing up one, we're here to support your journey." },
];

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  const about = data as SanityAboutPage | null;

  const heroSubtitle = about?.heroSubtitle ?? "Two guys who love boats built something awesome for people who love boats. Boats Without Woes.";
  const founders = about?.founders?.length ? about.founders : defaultFounders;
  const values = about?.values?.length ? about.values : defaultValues;
  const hasStoryContent = about?.storyContent && (about.storyContent as unknown[]).length > 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-30" />
        {/* Water drops */}
        <div className="absolute top-[15%] right-[10%] w-4 h-5 bg-ocean-400/20 rounded-full animate-droplet" />
        <div className="absolute top-[40%] left-[5%] w-3 h-4 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "1s" }} />
        <div className="absolute top-[20%] left-[50%] w-5 h-6 bg-ocean-300/12 rounded-full animate-droplet" style={{ animationDelay: "0.5s" }} />
        {/* Ripple */}
        <div className="absolute top-[35%] right-[20%] w-32 h-32 border border-ocean-400/10 rounded-full animate-ripple" />
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-4">&#x1F30A; Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            About <span className="gradient-text-fun">Boatify</span>
          </h1>
          <p className="text-ocean-200/80 text-lg max-w-2xl mx-auto">{heroSubtitle}</p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ocean-950 mb-4">
              How It <span className="gradient-text-fun">Started</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-marine-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            {hasStoryContent ? (
              <PortableText
                value={about!.storyContent as any}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-ocean-700 text-lg leading-relaxed">{children}</p>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="text-ocean-900">{children}</strong>
                    ),
                  },
                }}
              />
            ) : (
              <>
                <p className="text-ocean-700 text-lg leading-relaxed">
                  Boatify was born out of a shared passion for the water and a relentless drive to do things better. Co-founded by <strong className="text-ocean-900">Luke Dunkin</strong> and <strong className="text-ocean-900">Luke Cochran</strong>, two lifelong boating enthusiasts with a combined 30+ years of experience in the marine industry, Boatify represents a new chapter in how boat builders and boaters source the parts they need.
                </p>
                <p className="text-ocean-700 text-lg leading-relaxed">
                  Over the years, Luke Dunkin and Luke Cochran saw firsthand the challenges that OEM boat builders and everyday boaters faced when it came to finding quality marine parts. From fragmented supply chains and inconsistent product quality to outdated ordering processes that hadn&apos;t kept pace with the digital age, there was a clear gap in the market that needed filling.
                </p>
                <p className="text-ocean-700 text-lg leading-relaxed">
                  In founding Boatify, Luke and Luke set out with a simple mission: to bring innovation and excellence to the marine parts space. They envisioned a platform where boat builders could seamlessly browse, select, and order the exact parts they need with confidence, whether they&apos;re outfitting a new line of bass boats or upgrading a pontoon for a perfect day on the lake.
                </p>
                <p className="text-ocean-700 text-lg leading-relaxed">
                  Today, Boatify serves both OEM builders and direct-to-consumer customers across the nation. With a carefully curated selection of premium marine parts, wholesale pricing for qualified builders, and an innovative boat-matching system that shows you exactly where every part fits, Boatify is setting a new standard for the industry. Our commitment to quality, service, and ease of use drives everything we do, and we&apos;re just getting started.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 bg-ocean-50 water-texture relative overflow-hidden">
        <div className="absolute top-10 right-8 w-3 h-4 bg-ocean-300/20 rounded-full animate-droplet" style={{ animationDelay: "0.3s" }} />
        <div className="absolute bottom-12 left-12 w-4 h-5 bg-marine-300/15 rounded-full animate-droplet" style={{ animationDelay: "1.5s" }} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="fun-badge mb-3">&#x1F91D; The Dream Team</span>
            <h2 className="text-3xl font-extrabold text-ocean-950">
              Meet the <span className="gradient-text-fun">Founders</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {founders.map((f) => (
              <FounderCard key={f.name} name={f.name ?? ""} title={f.title ?? ""} emoji={f.emoji ?? "&#x2693;"} bio={f.bio ?? ""} photo={f.photo} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute top-[30%] left-[5%] w-24 h-24 border border-ocean-200/15 rounded-full animate-ripple" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="fun-badge mb-3">&#x1F4AA; What Drives Us</span>
            <h2 className="text-3xl font-extrabold text-ocean-950">
              What We <span className="gradient-text-fun">Stand For</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <ValueCard key={v.title} title={v.title ?? ""} emoji={v.emoji ?? "&#x2B50;"} description={v.description ?? ""} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 relative overflow-hidden">
        <div className="absolute top-[10%] right-[8%] w-5 h-6 bg-ocean-400/15 rounded-full animate-droplet" />
        <div className="absolute bottom-[15%] left-[12%] w-4 h-5 bg-marine-400/10 rounded-full animate-droplet" style={{ animationDelay: "1.2s" }} />
        <div className="absolute top-[40%] left-[5%] w-48 h-48 border border-ocean-400/8 rounded-full animate-ripple" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-5">
            Ready to <span className="gradient-text-fun">Dive In</span>?
          </h2>
          <p className="text-ocean-200/80 text-lg mb-10">
            Whether you&apos;re an OEM builder looking for wholesale parts or a boater searching for the perfect upgrade, we&apos;ve got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/shop" className="px-9 py-4 bg-white text-ocean-800 rounded-2xl font-bold text-lg fun-cta">
              Shop Now &#x1F6D2;
            </Link>
            <Link href="/contact" className="px-9 py-4 border-2 border-white/25 text-white rounded-2xl font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all splash-btn">
              Contact Us &#x2709;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FounderCard({ name, title, bio, emoji, photo }: { name: string; title: string; bio: string; emoji: string; photo?: string | null }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-ocean-100 hover:shadow-xl transition-all product-card">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ocean-500 to-marine-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-ocean-500/20 overflow-hidden">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span dangerouslySetInnerHTML={{ __html: emoji }} />
          )}
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-ocean-950">{name}</h3>
          <p className="text-sm text-ocean-600 font-medium">{title}</p>
        </div>
      </div>
      <p className="text-ocean-700 text-sm leading-relaxed">{bio}</p>
    </div>
  );
}

function ValueCard({ title, description, emoji }: { title: string; description: string; emoji: string }) {
  return (
    <div className="bg-white rounded-3xl p-7 border border-ocean-100 hover:border-ocean-300 hover:shadow-xl transition-all product-card group">
      <div className="text-3xl mb-4 group-hover:animate-wiggle" dangerouslySetInnerHTML={{ __html: emoji }} />
      <h3 className="font-extrabold text-ocean-950 mb-2 text-lg">{title}</h3>
      <p className="text-ocean-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
