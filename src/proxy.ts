import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/api/unlock",
  "/api/giveaway/enter",
  "/api/chat",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Always allow: Next.js internals, static files, Sanity Studio, API unlock
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  ) {
    return NextResponse.next();
  }

  // Check for the unlock cookie
  const unlocked = req.cookies.get("boatify_access")?.value;
  const sitePassword = process.env.SITE_PASSWORD;

  if (unlocked && sitePassword && unlocked === sitePassword) {
    return NextResponse.next();
  }

  // Not unlocked — if already on the lock page, allow through
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Redirect everything else to the lock page
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
