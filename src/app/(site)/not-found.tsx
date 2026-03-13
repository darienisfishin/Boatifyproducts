import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      {/* Water effects */}
      <div className="absolute top-[15%] left-[10%] w-4 h-5 bg-ocean-300/15 rounded-full animate-droplet" />
      <div className="absolute top-[30%] right-[15%] w-3 h-4 bg-marine-300/10 rounded-full animate-droplet" style={{ animationDelay: "0.8s" }} />
      <div className="absolute bottom-[20%] left-[30%] w-5 h-6 bg-ocean-400/10 rounded-full animate-droplet" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-[25%] left-[50%] w-32 h-32 border border-ocean-200/15 rounded-full animate-ripple" />

      <div className="relative z-10">
        {/* Fun 404 display */}
        <div className="text-8xl sm:text-9xl font-extrabold gradient-text-fun mb-2 leading-none">
          404
        </div>
        <div className="text-5xl mb-6 animate-bob">&#x1F6F6;</div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-ocean-950 mb-3">
          You&apos;ve drifted off course!
        </h1>
        <p className="text-ocean-600 text-lg mb-8 max-w-md mx-auto">
          This page doesn&apos;t exist, but don&apos;t worry &mdash; we&apos;ll get you back to smooth waters.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3.5 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-base fun-cta"
          >
            Back to Home &#x1F3E0;
          </Link>
          <Link
            href="/shop"
            className="px-8 py-3.5 bg-ocean-50 text-ocean-700 border border-ocean-200 rounded-2xl font-bold text-base hover:bg-ocean-100 transition-all splash-btn"
          >
            Browse Shop &#x1F6D2;
          </Link>
        </div>

        {/* Fun suggestions */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/find-your-boat" className="fun-badge hover:scale-105 transition-transform">&#x1F6A4; Find Your Boat</Link>
          <Link href="/about" className="fun-badge hover:scale-105 transition-transform">&#x1F30A; About Us</Link>
          <Link href="/contact" className="fun-badge hover:scale-105 transition-transform">&#x2709; Contact</Link>
        </div>
      </div>
    </div>
  );
}
