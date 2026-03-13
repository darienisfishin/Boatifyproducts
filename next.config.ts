import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "cdn1.polaris.com" },
      { protocol: "https", hostname: "www.barlettapontoonboats.com" },
      { protocol: "https", hostname: "8882038.fs1.hubspotusercontent-na1.net" },
      { protocol: "https", hostname: "www.loweboats.com" },
      { protocol: "https", hostname: "www.phoenixbassboats.com" },
      { protocol: "https", hostname: "www.skeeterboats.com" },
      { protocol: "https", hostname: "www.rangerboats.com" },
    ],
  },
};

export default nextConfig;
