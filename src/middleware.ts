import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const adminRoutePatterns = [
  /^\/books\/new$/,
  /^\/books\/[^/]+\/edit$/,
  /^\/admin\/loans/, 
];

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;

  if (!req.nextauth?.token?.role) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  if (req.nextauth.token.role === "USER") {
    const isAdminRoute = adminRoutePatterns.some((pattern) =>
      pattern.test(pathname)
    );

    if (isAdminRoute) {
      return NextResponse.redirect(new URL("/api/auth/error", req.url));
    }
  }
});

export const config = {
  matcher: ["/books/:path*", "/api/auth/:path*", "/admin/:path*"],
};
