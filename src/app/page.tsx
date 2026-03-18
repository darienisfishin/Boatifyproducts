export const dynamic = "force-dynamic";

import { sanityFetch } from "@/sanity/lib/live";
import { GIVEAWAY_QUERY } from "@/sanity/lib/queries";
import type { SanityGiveaway } from "@/sanity/types";
import ComingSoonClient from "./(site)/ComingSoonClient";

export const metadata = {
  title: "Boatify — Coming Soon",
  description: "Premium marine parts for bass boats and pontoons. Something big is coming — enter our giveaway now.",
};

export default async function Home() {
  const { data: giveaway } = await sanityFetch({ query: GIVEAWAY_QUERY });

  return <ComingSoonClient giveaway={(giveaway as SanityGiveaway) ?? null} />;
}
