"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { SanityGiveaway } from "@/sanity/types";

const BOAT_BRANDS = [
  "Bass Cat",
  "Caymas",
  "G3 Boats",
  "Nitro",
  "Phoenix",
  "Ranger",
  "Skeeter",
  "Stratos",
  "Tracker",
  "Triton",
  "None",
  "Other",
];

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(endDate: string): TimeLeft {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

// Stable particles — generated once, server-safe via useMemo pattern
const PARTICLES = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  left: ((i * 37 + 13) % 100).toFixed(1),
  top: ((i * 53 + 7) % 100).toFixed(1),
  size: (((i * 17) % 3) + 1).toFixed(1),
  duration: (((i * 7) % 8) + 6).toFixed(1),
  delay: (((i * 3) % 5)).toFixed(1),
  opacity: (((i * 11) % 6) / 10 + 0.2).toFixed(2),
}));

export default function ComingSoonClient({ giveaway }: { giveaway: SanityGiveaway | null }) {
  const subtitle = giveaway?.subtitle || "Something Big Is Coming";
  const title = giveaway?.title || "Win an Epic Boatify Package";
  const description = giveaway?.description || "Enter your details below for a chance to win. We'll notify the winner by email.";
  const prizeDetails = giveaway?.prizeDetails || "Details coming soon — stay tuned!";
  const ctaLabel = giveaway?.ctaLabel || "Enter to Win";
  const endDate = giveaway?.endDate ?? null;
  const prizeImage = giveaway?.prizeImage ?? null;

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [unlockOpen, setUnlockOpen] = useState(false);
  const [unlockPw, setUnlockPw] = useState("");
  const [unlockError, setUnlockError] = useState(false);

  useEffect(() => {
    if (!endDate) return;
    setTimeLeft(getTimeLeft(endDate));
    const id = setInterval(() => setTimeLeft(getTimeLeft(endDate)), 1000);
    return () => clearInterval(id);
  }, [endDate]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !brand) {
      setErrorMsg("Please fill in all fields and select your boat brand.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg("You must agree to receive marketing emails to enter.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/giveaway/enter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, boatBrand: brand, marketingConsent: consent }),
      });
      const data = await res.json();
      if (data.duplicate) {
        setStatus("duplicate");
      } else if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }, [name, email, brand, consent]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col" style={{ background: "#001221" }}>
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-cyan-400"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: Number(p.opacity),
              animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,117,177,0.15) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,159,227,0.1) 0%, transparent 70%)" }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-4 pt-16 pb-32">

        {/* Logo + brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(14,117,177,0.3)", border: "1px solid rgba(14,117,177,0.5)" }}>
            ⚓
          </div>
          <span className="text-white/60 text-sm font-semibold tracking-widest uppercase">Boatify</span>
        </div>

        {/* Tagline */}
        <p className="text-cyan-400 text-sm font-bold tracking-[0.3em] uppercase mb-4 text-center">{subtitle}</p>

        {/* Main headline */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-black text-center mb-6 leading-none"
          style={{ background: "linear-gradient(135deg, #ffffff 0%, #009fe3 50%, #00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          BOATIFY
        </h1>

        <p className="text-white/50 text-base sm:text-lg text-center max-w-md mb-12 leading-relaxed">
          The ultimate destination for premium marine parts. <br className="hidden sm:block" />
          We're putting the final touches on something special.
        </p>

        {/* Countdown */}
        {endDate && timeLeft && (
          <div className="flex gap-3 sm:gap-5 mb-12">
            {(["days", "hours", "minutes", "seconds"] as const).map((unit) => (
              <div key={unit} className="flex flex-col items-center">
                <div
                  className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-black text-white"
                  style={{ background: "rgba(14,117,177,0.25)", border: "1px solid rgba(0,159,227,0.3)", backdropFilter: "blur(10px)" }}
                >
                  {String(timeLeft[unit]).padStart(2, "0")}
                </div>
                <span className="text-white/40 text-xs font-semibold tracking-widest uppercase mt-2">{unit}</span>
              </div>
            ))}
          </div>
        )}

        {/* Giveaway card */}
        <div
          className="w-full max-w-xl rounded-3xl p-7 sm:p-10"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(20px)" }}
        >
          {/* Prize section */}
          <div className="text-center mb-8">
            {prizeImage && (
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6">
                <Image
                  src={prizeImage}
                  alt="Giveaway prize"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 576px"
                />
              </div>
            )}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-xs font-bold tracking-widest uppercase text-cyan-300" style={{ background: "rgba(0,159,227,0.15)", border: "1px solid rgba(0,159,227,0.3)" }}>
              🎁 Giveaway
            </div>
            <h2 className="text-white font-extrabold text-2xl sm:text-3xl leading-tight mb-3">{title}</h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{description}</p>
            {prizeDetails && (
              <div className="text-left rounded-2xl p-4 mt-4 text-sm text-white/70 leading-relaxed" style={{ background: "rgba(14,117,177,0.15)", border: "1px solid rgba(14,117,177,0.3)" }}>
                <p className="text-cyan-300 font-bold text-xs tracking-widest uppercase mb-2">The Prize</p>
                {prizeDetails}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 mb-8" />

          {/* Form */}
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-extrabold text-xl mb-2">You&apos;re entered!</h3>
              <p className="text-white/60 text-sm">Good luck! We&apos;ll notify the winner by email.</p>
            </div>
          ) : status === "duplicate" ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-white font-extrabold text-xl mb-2">Already registered!</h3>
              <p className="text-white/60 text-sm">Looks like you&apos;re already in. Good luck!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400 transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)" }}
                />
              </div>

              {/* Boat brand */}
              <div>
                <label className="block text-white/70 text-xs font-bold uppercase tracking-wider mb-3">What Brand Is Your Boat?</label>
                <div className="flex flex-wrap gap-2">
                  {BOAT_BRANDS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBrand(b)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                      style={
                        brand === b
                          ? { background: "rgba(14,117,177,0.9)", border: "1px solid #009fe3", color: "#ffffff" }
                          : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }
                      }
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Marketing consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5 flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className="w-5 h-5 rounded flex items-center justify-center transition-all"
                    style={
                      consent
                        ? { background: "rgba(14,117,177,0.9)", border: "1px solid #009fe3" }
                        : { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.3)" }
                    }
                  >
                    {consent && (
                      <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                        <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-white/60 text-xs leading-relaxed">
                  I agree to receive marketing emails from Boatify about products, promotions, and giveaways.
                </span>
              </label>

              {/* Error */}
              {status === "error" && (
                <p className="text-red-400 text-xs text-center">{errorMsg}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-2xl font-extrabold text-sm tracking-wide text-white transition-all disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #0e75b1 0%, #009fe3 100%)", boxShadow: "0 0 30px rgba(0,159,227,0.3)" }}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Entering...
                  </span>
                ) : ctaLabel}
              </button>
            </form>
          )}
        </div>

        {/* Footer note */}
        <p className="mt-8 text-white/25 text-xs text-center max-w-sm">
          No purchase necessary. Winner selected randomly and notified via email.
        </p>

        {/* Hidden admin unlock — tiny dot at bottom */}
        <div className="mt-16 flex flex-col items-center">
          <button
            onClick={() => { setUnlockOpen((o) => !o); setUnlockError(false); setUnlockPw(""); }}
            className="w-2 h-2 rounded-full opacity-20 hover:opacity-40 transition-opacity"
            style={{ background: "rgba(255,255,255,0.4)" }}
            aria-label="Admin access"
          />
          {unlockOpen && (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await fetch("/api/unlock", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ password: unlockPw }),
                });
                if (res.ok) {
                  window.location.href = "/shop";
                } else {
                  setUnlockError(true);
                }
              }}
              className="mt-3 flex items-center gap-2"
            >
              <input
                type="password"
                value={unlockPw}
                onChange={(e) => { setUnlockPw(e.target.value); setUnlockError(false); }}
                placeholder="••••••••"
                autoFocus
                className="w-32 px-3 py-1.5 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: `1px solid ${unlockError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.15)"}`,
                }}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white/60 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.07)" }}
              >
                →
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Animated waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: "120px" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full" style={{ animation: "wave-slide 8s ease-in-out infinite alternate" }}>
          <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(14,117,177,0.15)" />
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-full absolute inset-0" style={{ animation: "wave-slide 12s ease-in-out infinite alternate-reverse" }}>
          <path d="M0,80 C360,30 720,110 1080,50 C1260,20 1380,80 1440,70 L1440,120 L0,120 Z" fill="rgba(0,159,227,0.1)" />
        </svg>
      </div>

      {/* Particle animation keyframes */}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes wave-slide {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
      `}</style>
    </div>
  );
}
