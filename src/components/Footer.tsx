import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-ocean-950 text-white overflow-hidden">
      {/* Wave top divider */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40 C360 80, 720 0, 1080 40 C1260 60, 1380 20, 1440 40 L1440 0 L0 0 Z"
            fill="#083344"
          />
        </svg>
      </div>

      {/* Animated water drops in background */}
      <div className="absolute top-20 left-[10%] w-3 h-4 bg-ocean-400/10 rounded-full animate-droplet" />
      <div className="absolute top-32 right-[15%] w-2 h-3 bg-marine-400/8 rounded-full animate-droplet" style={{ animationDelay: "1.2s" }} />
      <div className="absolute bottom-20 left-[40%] w-4 h-5 bg-ocean-300/8 rounded-full animate-droplet" style={{ animationDelay: "0.6s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="16" fill="url(#footerGrad)" />
                <path d="M8 20 C12 14, 18 14, 18 18 C18 22, 24 22, 28 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M8 24 C12 18, 18 18, 18 22 C18 26, 24 26, 28 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
                <defs>
                  <linearGradient id="footerGrad" x1="0" y1="0" x2="36" y2="36">
                    <stop offset="0%" stopColor="#00bfbb" />
                    <stop offset="100%" stopColor="#00e88a" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-lg font-extrabold tracking-tight gradient-text-fun">BOATIFY</span>
            </div>
            <p className="text-ocean-300 text-sm leading-relaxed mb-4">
              Boats Without Woes. Premium marine parts from the brands you trust &mdash; for builders and boaters who love being on the water.
            </p>
            <div className="flex gap-3">
              <span className="fun-badge !bg-ocean-800/50 !text-ocean-200 !border-ocean-600/30">&#x26F5; Bass Boats</span>
              <span className="fun-badge !bg-ocean-800/50 !text-ocean-200 !border-ocean-600/30">&#x1F6E5; Pontoons</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-ocean-300 mb-4">Shop</h3>
            <ul className="space-y-2.5">
              <FooterLink href="/shop" emoji="&#x1F6D2;">All Products</FooterLink>
              <FooterLink href="/shop?category=Lighting+%26+Electrical" emoji="&#x1F4A1;">Lighting</FooterLink>
              <FooterLink href="/shop?category=Deck+Hardware" emoji="&#x2693;">Deck Hardware</FooterLink>
              <FooterLink href="/shop?category=Steering+%26+Controls" emoji="&#x1F3AF;">Steering</FooterLink>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-ocean-300 mb-4">Company</h3>
            <ul className="space-y-2.5">
              <FooterLink href="/about" emoji="&#x1F30A;">About Us</FooterLink>
              <FooterLink href="/contact" emoji="&#x2709;">Contact</FooterLink>
              <FooterLink href="/find-your-boat" emoji="&#x1F6A4;">Find Your Boat</FooterLink>
              <FooterLink href="/oem/login" emoji="&#x1F3ED;">OEM Portal</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-ocean-300 mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-ocean-200">
              <li className="flex items-center gap-2">
                <span className="text-ocean-400">&#x2709;</span>
                info@boatify.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ocean-400">&#x260E;</span>
                (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <span className="text-ocean-400">&#x1F552;</span>
                Mon-Fri 8am-5pm CST
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-ocean-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-ocean-400 text-xs">&copy; {new Date().getFullYear()} Boatify. All rights reserved. &#x1F30A;</p>
          <div className="flex gap-6">
            <span className="text-ocean-400 text-xs hover:text-ocean-200 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-ocean-400 text-xs hover:text-ocean-200 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children, emoji }: { href: string; children: React.ReactNode; emoji: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-ocean-200 hover:text-white transition-colors flex items-center gap-2 group">
        <span className="group-hover:animate-wiggle inline-block text-xs" dangerouslySetInnerHTML={{ __html: emoji }} />
        {children}
      </Link>
    </li>
  );
}
