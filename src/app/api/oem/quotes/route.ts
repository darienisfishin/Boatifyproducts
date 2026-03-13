import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await (prisma as any).user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "oem") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const quotes = await (prisma as any).quote.findMany({
      where: { userId: user.id },
      include: {
        items: {
          include: { product: true },
        },
        salesRep: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Failed to fetch quotes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await (prisma as any).user.findUnique({
      where: { email: session.user.email },
      include: { salesRep: true },
    });

    if (!user || user.role !== "oem") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { items, notes } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Items are required" }, { status: 400 });
    }

    // Generate quote number
    const count = await (prisma as any).quote.count();
    const quoteNumber = `QR-${new Date().getFullYear()}-${String(count + 1).padStart(3, "0")}`;

    // Use user's assigned rep, or fall back to first available rep
    let salesRepId = user.salesRepId;
    if (!salesRepId) {
      const firstRep = await (prisma as any).salesRep.findFirst();
      salesRepId = firstRep?.id;
    }

    if (!salesRepId) {
      return NextResponse.json({ error: "No sales rep available" }, { status: 500 });
    }

    const quote = await (prisma as any).quote.create({
      data: {
        quoteNumber,
        userId: user.id,
        salesRepId,
        notes: notes || null,
        items: {
          create: items.map((item: { productId: string; quantity: number; notes?: string }) => ({
            productId: item.productId,
            quantity: item.quantity,
            notes: item.notes || null,
          })),
        },
      },
      include: {
        items: {
          include: { product: true },
        },
        salesRep: true,
      },
    });

    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    console.error("Failed to create quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
