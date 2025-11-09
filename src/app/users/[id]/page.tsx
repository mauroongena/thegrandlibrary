import prisma from "@/lib/client";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const user = await prisma.user.findUnique({
    where: { id: id },
    include: {
      wishlist: {
        include: {
          book: true,
        },
      },
      loans: {
        include: {
          book: true,
        },
        where: {
          returnedAt: null,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            User Profile
          </h1>
          <p className="text-gray-400 mt-2">{user.email}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Currently Loaned Books</h2>
            {user.loans.length > 0 ? (
              <ul className="space-y-3">
                {user.loans.map((loan) => (
                  <li key={loan.id} className="text-gray-300">
                    <Link 
                      href={`/books/${loan.book.id}`}
                      className="hover:text-blue-300 transition-colors"
                    >
                      {loan.book.title}
                    </Link>
                    <p className="text-sm text-gray-400">
                      Due: {loan.dueAt ? new Date(loan.dueAt).toLocaleDateString("en-GB") : 'Not set'}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No books currently on loan</p>
            )}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Wishlist</h2>
            {user.wishlist.length > 0 ? (
              <ul className="space-y-3">
                {user.wishlist.map((item) => (
                  <li key={item.id} className="text-gray-300">
                    <Link 
                      href={`/books/${item.book.id}`}
                      className="hover:text-blue-300 transition-colors"
                    >
                      {item.book.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No books in wishlist</p>
            )}
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/users"
            className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
          >
            Back to Users List
          </Link>
        </div>
      </div>
    </div>
  );
}
