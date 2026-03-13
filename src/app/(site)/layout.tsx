import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";
import { SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraft } = await draftMode();

  return (
    <Providers>
      <Navbar />
      <main className="pt-16 min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
      <ChatWidget />
      <SanityLive />
      {isDraft && <VisualEditing />}
    </Providers>
  );
}
