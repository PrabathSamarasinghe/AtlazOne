import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  
  if (
    request.nextUrl.pathname.startsWith("/admin/dashboard") ||
    request.nextUrl.pathname.startsWith("/api/admin/")
  ) {
    if (!token) {
      if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
