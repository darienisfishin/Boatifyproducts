import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const user = await (prisma as any).user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "oem") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const quote = await (prisma as any).quote.findUnique({
      where: { id },
      include: {
        items: {
          include: { product: true },
        },
        salesRep: true,
        user: {
          select: {
            id: true,
            name: true,
            company: true,
            email: true,
          },
        },
      },
    });

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // Ensure user can only see their own quotes
    if (quote.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Failed to fetch quote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
