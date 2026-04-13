import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TOKEN = "eugvrp-admin-session-2026-secure";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protejăm orice rută care începe cu /admin, EXCEPT /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const session = request.cookies.get("admin-session");

    if (!session || session.value !== SESSION_TOKEN) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
