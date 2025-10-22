import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const adminRoutes = ["/books/new"];
 
export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (!req.nextauth.token || !req.nextauth.token.role) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
    if (req.nextauth.token.role === "USER") {
      if (adminRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/api/auth/error", req.url));
      }
    }
  }
);

export const config = {
  matcher: ["/books/:path+", "/api/auth/:path*"],
};