import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      companyName,
      contactName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      taxId,
      website,
      boatBrands,
      annualVolume,
      message,
    } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !phone || !address || !city || !state || !zip) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, save to database and send email notification
    console.log("Contact submission received:", {
      companyName,
      contactName,
      email,
      phone,
      address,
      city,
      state,
      zip,
      taxId,
      website,
      boatBrands,
      annualVolume,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Application received. We'll be in touch within 1-2 business days.",
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
