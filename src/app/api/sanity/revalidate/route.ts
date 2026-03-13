import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{
      _type: string;
      slug?: { current?: string };
    }>(req, process.env.SANITY_REVALIDATION_SECRET);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad Request" }, { status: 400 });
    }

    // Revalidate based on document type
    switch (body._type) {
      case "product":
        revalidatePath("/shop", "layout");
        if (body.slug?.current) {
          revalidatePath(`/shop/${body.slug.current}`);
        }
        revalidatePath("/oem/catalog");
        revalidatePath("/boat-guide");
        revalidatePath("/find-your-boat");
        revalidatePath("/");
        break;
      case "homepage":
        revalidatePath("/");
        break;
      case "aboutPage":
        revalidatePath("/about");
        break;
      case "boatRecommendation":
        revalidatePath("/boat-guide");
        break;
      case "boatZone":
        revalidatePath("/find-your-boat");
        revalidatePath("/shop", "layout");
        break;
      case "boatBrand":
        revalidatePath("/find-your-boat");
        break;
      case "category":
      case "brand":
        revalidatePath("/shop", "layout");
        revalidatePath("/oem/catalog");
        break;
      default:
        revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
