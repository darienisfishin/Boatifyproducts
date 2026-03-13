"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock data for demo - in production this comes from the DB
const mockOrders = [
  { poNumber: "PO-2024-001", date: "2024-11-15", status: "delivered", total: 12450.00, items: 8 },
  { poNumber: "PO-2024-002", date: "2024-12-01", status: "shipped", total: 8200.00, items: 5 },
  { poNumber: "PO-2025-001", date: "2025-01-10", status: "in_production", total: 15800.00, items: 12 },
  { poNumber: "PO-2025-002", date: "2025-02-20", status: "confirmed", total: 6500.00, items: 4 },
];

const mockQuotes = [
  { quoteNumber: "QR-2025-001", date: "2025-02-15", status: "quoted", total: 9800.00, items: 6, rep: "Corey" },
  { quoteNumber: "QR-2025-002", date: "2025-02-28", status: "pending", total: null, items: 3, rep: "Corey" },
];

export default function OEMDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "quotes" | "settings">("orders");
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyText, setNotifyText] = useState(false);

  // Redirect to login if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-ocean-500 font-bold">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/oem/login");
    return null;
  }

  const user = session?.user as any;
  const company = user?.company || "Your Company";
  const repName = user?.salesRepName || "Corey";

  return (
    <div className="min-h-screen bg-ocean-50/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-950 via-deep-900 to-ocean-900 py-8 relative overflow-hidden">
        <div className="absolute inset-0 water-texture opacity-20" />
        <div className="absolute top-[20%] right-[10%] w-3 h-4 bg-ocean-400/15 rounded-full animate-droplet" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="fun-badge !bg-white/10 !text-ocean-200 !border-white/15 mb-2">&#x1F3ED; OEM Portal</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Welcome, {company}
              </h1>
              <p className="text-ocean-300 text-sm mt-1">Manage orders, request quotes, and track shipments</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/oem/catalog" className="px-5 py-2.5 bg-white/10 text-white border border-white/20 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                Browse Catalog &#x1F6D2;
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/oem/login" })}
                className="px-4 py-2.5 text-ocean-300 hover:text-white text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active POs" value="4" emoji="&#x1F4E6;" color="ocean" />
          <StatCard label="Open Quotes" value="2" emoji="&#x1F4CB;" color="marine" />
          <StatCard label="This Month" value="$22,300" emoji="&#x1F4B0;" color="deep" />
          <StatCard label="Total Savings" value="$9,560" emoji="&#x2B50;" color="sun" />
        </div>

        {/* Your Account Rep */}
        <div className="bg-gradient-to-r from-ocean-50 to-marine-50 rounded-2xl p-5 border border-ocean-200 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ocean-500 to-marine-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
              {repName[0]}
            </div>
            <div>
              <p className="text-sm text-ocean-500 font-medium">Your Account Rep</p>
              <p className="font-extrabold text-ocean-950">{repName}</p>
              <p className="text-xs text-ocean-500">corey@boatify.com &middot; (555) 234-5678</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-white text-ocean-700 border border-ocean-200 rounded-xl font-bold text-sm hover:bg-ocean-50 transition-all">
            Contact Rep &#x2709;
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["orders", "quotes", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-ocean-500 to-marine-500 text-white shadow-lg"
                  : "bg-white text-ocean-700 border border-ocean-200 hover:bg-ocean-50"
              }`}
            >
              {tab === "orders" && "&#x1F4E6; "}
              {tab === "quotes" && "&#x1F4CB; "}
              {tab === "settings" && "&#x2699; "}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-2xl border border-ocean-100 overflow-hidden">
            <div className="px-6 py-4 bg-ocean-50 border-b border-ocean-100 flex items-center justify-between">
              <h2 className="font-extrabold text-ocean-950">Purchase Orders</h2>
              <p className="text-xs text-ocean-500">Cin7 integration coming soon</p>
            </div>
            <div className="divide-y divide-ocean-50">
              {mockOrders.map((order) => (
                <div key={order.poNumber} className="px-6 py-4 flex items-center justify-between hover:bg-ocean-50/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-bold text-ocean-950 text-sm">{order.poNumber}</p>
                      <p className="text-xs text-ocean-500">{order.date} &middot; {order.items} items</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <StatusBadge status={order.status} />
                    <span className="font-extrabold text-ocean-800 text-sm">${order.total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quotes Tab */}
        {activeTab === "quotes" && (
          <div>
            {/* Request Quote CTA */}
            <div className="bg-gradient-to-r from-ocean-500 to-marine-500 rounded-2xl p-6 mb-6 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-lg">Need a Quote?</h3>
                  <p className="text-white/80 text-sm mt-1">Browse the catalog, select products, and we&apos;ll send you a custom quote within 24 hours.</p>
                </div>
                <Link
                  href="/oem/catalog"
                  className="shrink-0 px-6 py-3 bg-white text-ocean-700 rounded-xl font-bold text-sm hover:bg-ocean-50 transition-all"
                >
                  Request Quote &#x1F4CB;
                </Link>
              </div>
            </div>

            {/* Quote list */}
            <div className="bg-white rounded-2xl border border-ocean-100 overflow-hidden">
              <div className="px-6 py-4 bg-ocean-50 border-b border-ocean-100">
                <h2 className="font-extrabold text-ocean-950">My Quotes</h2>
              </div>
              <div className="divide-y divide-ocean-50">
                {mockQuotes.map((quote) => (
                  <div key={quote.quoteNumber} className="px-6 py-4 flex items-center justify-between hover:bg-ocean-50/30 transition-colors">
                    <div>
                      <p className="font-bold text-ocean-950 text-sm">{quote.quoteNumber}</p>
                      <p className="text-xs text-ocean-500">{quote.date} &middot; {quote.items} items &middot; Rep: {quote.rep}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <QuoteStatusBadge status={quote.status} />
                      <span className="font-extrabold text-ocean-800 text-sm">
                        {quote.total ? `$${quote.total.toLocaleString()}` : "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-2xl border border-ocean-100 p-6">
            <h2 className="font-extrabold text-ocean-950 mb-6">Notification Preferences</h2>
            <div className="space-y-4 max-w-md">
              <label className="flex items-center justify-between p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                <div>
                  <p className="font-bold text-ocean-900 text-sm">Email Notifications</p>
                  <p className="text-xs text-ocean-500">Get notified when POs are received, confirmed, and shipped</p>
                </div>
                <button
                  onClick={() => setNotifyEmail(!notifyEmail)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${notifyEmail ? "bg-ocean-500" : "bg-ocean-200"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifyEmail ? "left-6" : "left-0.5"}`} />
                </button>
              </label>

              <label className="flex items-center justify-between p-4 bg-ocean-50 rounded-xl border border-ocean-100">
                <div>
                  <p className="font-bold text-ocean-900 text-sm">Text/SMS Notifications</p>
                  <p className="text-xs text-ocean-500">Get text alerts for shipment tracking updates</p>
                </div>
                <button
                  onClick={() => setNotifyText(!notifyText)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${notifyText ? "bg-ocean-500" : "bg-ocean-200"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${notifyText ? "left-6" : "left-0.5"}`} />
                </button>
              </label>

              <div className="pt-4">
                <p className="text-xs text-ocean-400">
                  Notification preferences are saved to your account. Email and text alerts are currently in development &mdash; preferences will apply when the feature launches.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, emoji, color }: { label: string; value: string; emoji: string; color: string }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-ocean-100 hover:shadow-lg transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl" dangerouslySetInnerHTML={{ __html: emoji }} />
        <span className={`text-xs font-bold text-${color}-500 bg-${color}-50 px-2 py-0.5 rounded-full`}>{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-ocean-950">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    in_production: "bg-purple-50 text-purple-700 border-purple-200",
    shipped: "bg-ocean-50 text-ocean-700 border-ocean-200",
    delivered: "bg-green-50 text-green-700 border-green-200",
  };
  const labels: Record<string, string> = {
    pending: "&#x23F3; Pending",
    confirmed: "&#x2705; Confirmed",
    in_production: "&#x2699; In Production",
    shipped: "&#x1F69A; Shipped",
    delivered: "&#x1F4E6; Delivered",
  };
  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${styles[status] || styles.pending}`}
      dangerouslySetInnerHTML={{ __html: labels[status] || status }}
    />
  );
}

function QuoteStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    reviewed: "bg-blue-50 text-blue-700 border-blue-200",
    quoted: "bg-ocean-50 text-ocean-700 border-ocean-200",
    accepted: "bg-green-50 text-green-700 border-green-200",
    expired: "bg-gray-50 text-gray-500 border-gray-200",
  };
  const labels: Record<string, string> = {
    pending: "&#x23F3; Pending Review",
    reviewed: "&#x1F440; Under Review",
    quoted: "&#x1F4CB; Quote Sent",
    accepted: "&#x2705; Accepted",
    expired: "&#x23F0; Expired",
  };
  return (
    <span
      className={`text-xs font-bold px-2.5 py-1 rounded-full border ${styles[status] || styles.pending}`}
      dangerouslySetInnerHTML={{ __html: labels[status] || status }}
    />
  );
}
