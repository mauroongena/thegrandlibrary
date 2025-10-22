export { default } from "next-auth/middleware";
 
export const config = {
  matcher: ["/books/:path+", "/api/auth/:path*"],
};