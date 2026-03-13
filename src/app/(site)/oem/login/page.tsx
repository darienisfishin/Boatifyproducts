"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function OEMLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Check your credentials and try again.");
    } else {
      router.push("/oem/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-50 to-marine-50 water-texture relative overflow-hidden">
      {/* Decorative water drops */}
      <div className="fixed top-20 right-16 w-4 h-5 bg-ocean-300/20 rounded-full animate-droplet" />
      <div className="fixed bottom-32 left-20 w-5 h-6 bg-marine-300/15 rounded-full animate-droplet" style={{ animationDelay: "1.2s" }} />
      <div className="fixed top-40 left-[10%] w-3 h-4 bg-ocean-400/10 rounded-full animate-droplet" style={{ animationDelay: "0.5s" }} />
      <div className="fixed top-[60%] right-[8%] w-4 h-5 bg-marine-400/10 rounded-full animate-droplet" style={{ animationDelay: "1.8s" }} />

      {/* Ripples */}
      <div className="fixed top-[25%] left-[15%] w-40 h-40 border border-ocean-200/15 rounded-full animate-ripple" />
      <div className="fixed bottom-[20%] right-[20%] w-28 h-28 border border-marine-200/10 rounded-full animate-ripple" style={{ animationDelay: "0.8s" }} />

      <div className="w-full max-w-md mx-4 relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <svg width="44" height="44" viewBox="0 0 36 36" fill="none" className="group-hover:scale-110 transition-transform duration-300">
              <circle cx="18" cy="18" r="16" fill="url(#loginGrad)" />
              <path d="M8 20 C12 14, 18 14, 18 18 C18 22, 24 22, 28 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M8 24 C12 18, 18 18, 18 22 C18 26, 24 26, 28 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
              <defs>
                <linearGradient id="loginGrad" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stopColor="#00bfbb" />
                  <stop offset="100%" stopColor="#00e88a" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-2xl font-extrabold gradient-text-fun tracking-tight">BOATIFY</span>
          </Link>
          <div className="mt-4">
            <span className="fun-badge mb-2">&#x1F3ED; Builder Access</span>
          </div>
          <h1 className="text-xl font-extrabold text-ocean-950 mt-3">OEM Builder Portal</h1>
          <p className="text-sm text-ocean-600 mt-1">Sign in with your admin-provided credentials to access wholesale pricing, quotes, and PO management</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl shadow-ocean-500/10 border border-ocean-100 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-ocean-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@company.com"
                className="w-full px-4 py-3 rounded-xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-ocean-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm fun-cta disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In &#x1F680;"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-ocean-100 text-center">
            <p className="text-xs text-ocean-500">
              Need an account?{" "}
              <Link href="/contact" className="text-ocean-600 font-bold hover:text-ocean-800 transition-colors">
                Apply for OEM access
              </Link>
            </p>
            <p className="text-xs text-ocean-400 mt-1">
              OEM accounts are created by Boatify administrators only.
            </p>
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-ocean-200/50 text-center">
          <p className="text-xs text-ocean-600 font-bold mb-1">&#x1F511; Demo Credentials</p>
          <p className="text-xs text-ocean-500 font-mono">builder@boatify.com / boatify2024</p>
        </div>

        {/* Benefits preview */}
        <div className="mt-4 flex justify-center gap-3">
          <span className="fun-badge !text-xs">&#x1F4B0; 30% Off</span>
          <span className="fun-badge !text-xs">&#x1F4CB; Get Quotes</span>
          <span className="fun-badge !text-xs">&#x1F4E6; Track Orders</span>
        </div>
      </div>
    </div>
  );
}
