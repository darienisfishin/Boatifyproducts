export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import type { SanityHomepage } from "@/sanity/types";
import HomepageClient from "./HomepageClient";

export const metadata = {
  title: "Boatify | Boats Without Woes",
  description:
    "Premium marine parts for OEM builders, dealers, and boaters. Jack plates, transducer shields, lithium batteries, apparel, and more.",
};

export default async function HomePage() {
  const { data } = await sanityFetch({ query: HOMEPAGE_QUERY });

  return <HomepageClient data={data as SanityHomepage | null} />;
}
