"use client";

import { useState } from "react";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-ocean-950 via-deep-900 to-ocean-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-30" />
        <div className="absolute top-[15%] right-[10%] w-4 h-5 bg-ocean-400/20 rounded-full animate-droplet" />
        <div className="absolute top-[35%] left-[5%] w-3 h-4 bg-marine-400/15 rounded-full animate-droplet" style={{ animationDelay: "0.8s" }} />
        <div className="absolute top-[25%] left-[60%] w-5 h-6 bg-ocean-300/12 rounded-full animate-droplet" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] right-[25%] w-28 h-28 border border-ocean-400/10 rounded-full animate-ripple" />
        <div className="absolute bottom-0 left-0 right-0 h-20">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80Z" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-4">&#x2709; Let&apos;s Talk</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
            Contact <span className="gradient-text-fun">Us</span>
          </h1>
          <p className="text-ocean-200/80 text-lg max-w-xl">
            Want to become an OEM partner? Got questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-extrabold text-ocean-950 mb-6">Get in Touch</h2>

            <div className="space-y-5">
              <ContactInfo
                emoji="&#x2709;"
                label="Email"
                value="info@boatify.com"
              />
              <ContactInfo
                emoji="&#x260E;"
                label="Phone"
                value="(555) 123-4567"
              />
              <ContactInfo
                emoji="&#x1F552;"
                label="Hours"
                value="Mon-Fri 8am-5pm CST"
              />
            </div>

            <div className="mt-10 p-6 bg-gradient-to-br from-ocean-50 to-marine-50 rounded-2xl border border-ocean-200 water-texture">
              <h3 className="font-extrabold text-ocean-900 text-sm mb-2">&#x1F3ED; OEM Builder Applications</h3>
              <p className="text-ocean-600 text-xs leading-relaxed">
                Fill out this form with your company details and we&apos;ll set up your wholesale account &mdash; no follow-up questions needed. You&apos;ll receive your login credentials within 1-2 business days.
              </p>
              <div className="flex gap-2 mt-3">
                <span className="fun-badge !text-xs">30% Off</span>
                <span className="fun-badge !text-xs">50 Unit Min</span>
                <span className="fun-badge !text-xs">30 Day Ship</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-gradient-to-br from-marine-50 to-ocean-50 rounded-3xl p-12 text-center border border-marine-200">
                <div className="text-5xl mb-5">&#x1F389;</div>
                <h3 className="text-2xl font-extrabold text-ocean-950 mb-2">Application Received!</h3>
                <p className="text-ocean-600 max-w-md mx-auto">
                  Thank you for your interest in Boatify. Our team will review your information and set up your account within 1-2 business days.
                </p>
                <div className="flex justify-center gap-3 mt-6">
                  <span className="fun-badge">&#x2705; We got it</span>
                  <span className="fun-badge">&#x1F552; 1-2 days</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-3xl p-6 border border-ocean-100 shadow-sm">
                  <h3 className="font-extrabold text-ocean-900 mb-4 flex items-center gap-2">
                    <span>&#x1F3E2;</span> Company Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Company Name" name="companyName" required />
                    <FormField label="Contact Name" name="contactName" required />
                    <FormField label="Email Address" name="email" type="email" required />
                    <FormField label="Phone Number" name="phone" type="tel" required />
                    <FormField label="Website" name="website" placeholder="https://" />
                    <FormField label="Tax ID / EIN" name="taxId" placeholder="XX-XXXXXXX" />
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-ocean-100 shadow-sm">
                  <h3 className="font-extrabold text-ocean-900 mb-4 flex items-center gap-2">
                    <span>&#x1F4CD;</span> Business Address
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <FormField label="Street Address" name="address" required />
                    </div>
                    <FormField label="City" name="city" required />
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-ocean-700 mb-1.5">State *</label>
                        <select
                          name="state"
                          required
                          className="w-full px-3 py-2.5 rounded-xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all bg-white"
                        >
                          <option value="">Select</option>
                          {US_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <FormField label="ZIP Code" name="zip" required />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-ocean-100 shadow-sm">
                  <h3 className="font-extrabold text-ocean-900 mb-4 flex items-center gap-2">
                    <span>&#x1F4CB;</span> Business Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField label="Boat Brands You Build/Service" name="boatBrands" placeholder="e.g., Bennington, Ranger, Phoenix" />
                    <div>
                      <label className="block text-xs font-bold text-ocean-700 mb-1.5">Estimated Annual Volume</label>
                      <select
                        name="annualVolume"
                        className="w-full px-3 py-2.5 rounded-xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all bg-white"
                      >
                        <option value="">Select range</option>
                        <option value="under-50k">Under $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-250k">$100,000 - $250,000</option>
                        <option value="250k-500k">$250,000 - $500,000</option>
                        <option value="over-500k">Over $500,000</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-ocean-700 mb-1.5">Additional Notes</label>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Tell us about your business, specific parts needs, or any questions..."
                        className="w-full px-3 py-2.5 rounded-xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-ocean-500 to-marine-500 text-white rounded-2xl font-bold text-lg fun-cta disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeLinecap="round" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application &#x1F680;"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-ocean-700 mb-1.5">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-ocean-200 focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/20 outline-none text-sm transition-all"
      />
    </div>
  );
}

function ContactInfo({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-100 to-marine-50 flex items-center justify-center text-lg shrink-0">
        <span dangerouslySetInnerHTML={{ __html: emoji }} />
      </div>
      <div>
        <p className="text-xs text-ocean-500 font-bold">{label}</p>
        <p className="text-sm font-bold text-ocean-900">{value}</p>
      </div>
    </div>
  );
}
