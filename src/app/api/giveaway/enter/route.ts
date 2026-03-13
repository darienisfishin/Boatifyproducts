import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, boatBrand, marketingConsent } = await req.json();

    if (!name?.trim() || !email?.trim() || !boatBrand?.trim()) {
      return NextResponse.json({ success: false, message: "Name, email, and boat brand are required." }, { status: 400 });
    }

    if (!marketingConsent) {
      return NextResponse.json({ success: false, message: "You must agree to receive marketing emails to enter." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Please enter a valid email address." }, { status: 400 });
    }

    // Check for duplicate
    const existing = await (prisma as any).giveawayEntry.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return NextResponse.json({ success: false, duplicate: true, message: "You're already registered! Good luck." });
    }

    await (prisma as any).giveawayEntry.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        boatBrand: boatBrand.trim(),
        marketingConsent: true,
      },
    });

    return NextResponse.json({ success: true, message: "You're entered! Good luck." });
  } catch (err) {
    console.error("Giveaway entry error:", err);
    return NextResponse.json({ success: false, message: "Something went wrong. Please try again." }, { status: 500 });
  }
}
