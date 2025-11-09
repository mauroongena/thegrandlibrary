import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const adminRoutePatterns = [
  /^\/books\/new$/,
  /^\/books\/[^/]+\/edit$/,
  /^\/admin\/loans/,
  /^\/users$/,
];

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    const publicBookPages = /^\/books(\/\d+)?$/;

    if (!req.nextauth?.token?.role) {
      if (publicBookPages.test(pathname)) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    if (req.nextauth.token.role === "USER") {
      const userProfileMatch = pathname.match(/^\/users\/([^/]+)$/);
      
      if (userProfileMatch) {
        const requestedUserId = userProfileMatch[1];
        if (requestedUserId === req.nextauth.token.id) {
          return NextResponse.next();
        }
      }

      const isAdminRoute = adminRoutePatterns.some((pattern) =>
        pattern.test(pathname)
      );

      if (isAdminRoute) {
        return NextResponse.redirect(new URL("/api/auth/error", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/books/:path*", "/api/auth/:path*", "/admin/:path*", "/users/:path*"],
};
