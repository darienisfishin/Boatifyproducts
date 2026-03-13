/**
 * Sanity → Prisma product sync webhook.
 * When a product is created or updated in Sanity, this route upserts
 * the corresponding Prisma Product record so orders and quotes remain
 * consistent with the current SKU, name, and pricing.
 */
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      _id: string;
      sku?: string;
      name?: string;
      slug?: { current?: string };
      description?: string;
      price?: number;
      wholesalePrice?: number;
      category?: string;
      brand?: string;
      productType?: string;
    }>(req, process.env.SANITY_REVALIDATION_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    // Only handle product documents
    if (body?._type !== "product" || !body.sku) {
      return NextResponse.json({ skipped: true });
    }

    await prisma.product.upsert({
      where: { sku: body.sku },
      create: {
        sku: body.sku,
        name: body.name ?? body.sku ?? "",
        slug: body.slug?.current ?? body.sku ?? "",
        description: body.description ?? "",
        price: body.price ?? 0,
        category: body.category ?? "Uncategorized",
        image: "",
        brand: body.brand ?? "Boatify",
        productType: body.productType ?? "part",
        wholesalePrice: body.wholesalePrice,
      },
      update: {
        name: body.name ?? body.sku ?? "",
        price: body.price ?? 0,
        wholesalePrice: body.wholesalePrice,
      },
    });

    return NextResponse.json({ synced: true, sku: body.sku });
  } catch (err) {
    console.error("Sanity sync error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
