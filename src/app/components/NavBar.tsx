import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "./SignOut";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.role === "ADMIN";

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        >
          Your Library
        </Link>

        <div className="flex items-center gap-6 text-gray-300">
          <Link
            href="/books"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Books
          </Link>

          {isAdmin && (
            <Link
              href="/books/new"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              New Book
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin/loans"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Loans
            </Link>
          )}

          {session && (
            <Link
              href="/wishlist"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Wishlist
            </Link>
          )}

          {session ? (
            <SignOut />
          ) : (
            <Link
              href="/api/auth/signin"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
