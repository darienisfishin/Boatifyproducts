"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-ocean-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="group-hover:scale-110 transition-transform duration-300">
                <circle cx="18" cy="18" r="16" fill="url(#logoGrad)" />
                <path d="M8 20 C12 14, 18 14, 18 18 C18 22, 24 22, 28 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M8 24 C12 18, 18 18, 18 22 C18 26, 24 26, 28 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36">
                    <stop offset="0%" stopColor="#00bfbb" />
                    <stop offset="100%" stopColor="#00e88a" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Water drop accent */}
              <div className="absolute -top-1 -right-1 w-2 h-3 bg-ocean-300 rounded-full opacity-60 animate-droplet" />
            </div>
            <span className="text-xl font-extrabold gradient-text-fun tracking-tight">BOATIFY</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/shop" emoji="&#x1F6D2;">Shop Now</NavLink>
            <NavLink href="/boat-guide" emoji="&#x1F4CB;">Boat Guide</NavLink>
            <NavLink href="/find-your-boat" emoji="&#x1F6A4;">Find Your Boat</NavLink>
            <NavLink href="/about" emoji="&#x1F30A;">About Us</NavLink>
            <NavLink href="/contact" emoji="&#x2709;">Contact</NavLink>

            {/* Cart button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative px-4 py-2 text-sm font-bold text-ocean-800 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-all group ml-1"
            >
              <span className="group-hover:animate-wiggle inline-block">&#x1F6D2;</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-gradient-to-r from-ocean-500 to-marine-500 text-white text-[10px] flex items-center justify-center font-extrabold shadow-md animate-splash-in">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            <Link
              href="/oem/login"
              className="ml-2 px-5 py-2 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm fun-cta"
            >
              OEM Portal
            </Link>
          </div>

          {/* Mobile right side: cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-xl hover:bg-ocean-50 transition-all"
            >
              <span className="text-lg">&#x1F6D2;</span>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-gradient-to-r from-ocean-500 to-marine-500 text-white text-[9px] flex items-center justify-center font-extrabold shadow-md">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl hover:bg-ocean-50 transition-all active:scale-95"
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-ocean-100 animate-slide-up">
          <div className="px-4 py-4 space-y-1">
            <MobileLink href="/shop" emoji="&#x1F6D2;" onClick={() => setMobileOpen(false)}>Shop Now</MobileLink>
            <MobileLink href="/boat-guide" emoji="&#x1F4CB;" onClick={() => setMobileOpen(false)}>Boat Guide</MobileLink>
            <MobileLink href="/find-your-boat" emoji="&#x1F6A4;" onClick={() => setMobileOpen(false)}>Find Your Boat</MobileLink>
            <MobileLink href="/about" emoji="&#x1F30A;" onClick={() => setMobileOpen(false)}>About Us</MobileLink>
            <MobileLink href="/contact" emoji="&#x2709;" onClick={() => setMobileOpen(false)}>Contact</MobileLink>
            <Link
              href="/oem/login"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-5 py-3 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-xl font-bold text-sm mt-3 fun-cta"
            >
              OEM Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children, emoji }: { href: string; children: React.ReactNode; emoji: string }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm font-bold text-ocean-800 hover:text-ocean-600 hover:bg-ocean-50 rounded-xl transition-all group"
    >
      <span className="group-hover:animate-wiggle inline-block mr-1" dangerouslySetInnerHTML={{ __html: emoji }} />{" "}
      {children}
    </Link>
  );
}

function MobileLink({ href, children, emoji, onClick }: { href: string; children: React.ReactNode; emoji: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-ocean-800 hover:bg-ocean-50 rounded-xl transition-colors"
    >
      <span dangerouslySetInnerHTML={{ __html: emoji }} />
      {children}
    </Link>
  );
}
