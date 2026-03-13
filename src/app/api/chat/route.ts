import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { client } from "@/sanity/client";
import { ALL_PRODUCTS_QUERY } from "@/sanity/lib/queries";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Fetch current product catalog from Sanity
    const products = await client.fetch(ALL_PRODUCTS_QUERY);

    const catalogSummary = (products ?? [])
      .map((p: any) =>
        `- ${p.name} (SKU: ${p.sku}, $${p.price}${p.wholesalePrice ? `, wholesale: $${p.wholesalePrice}` : ""}, category: ${p.category}, brand: ${p.brand ?? "Boatify"})`
      )
      .join("\n");

    const systemPrompt = `You are the Boatify parts assistant — friendly, knowledgeable, and concise. Boatify sells premium marine parts for bass boats and pontoons.

Your job:
1. Help customers find the right part for their boat
2. Answer questions about products, pricing, and compatibility
3. Direct OEM builders to the OEM portal (/oem/login) for wholesale pricing
4. If you can't find what they need, suggest they contact Boatify directly

Current product catalog:
${catalogSummary}

Guidelines:
- Keep responses short and helpful (2-4 sentences max unless listing products)
- When recommending products, mention the SKU and price
- For wholesale/OEM questions, mention the OEM portal
- Don't make up products that aren't in the catalog
- If unsure, say so and suggest browsing the shop at /shop`;

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 500,
      system: systemPrompt,
      messages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Chat error:", err);
    return NextResponse.json({ reply: "Sorry, I'm having trouble right now. Please try again." }, { status: 500 });
  }
}
