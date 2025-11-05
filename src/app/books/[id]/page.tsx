import prisma from "@/lib/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToWishlistButton from "@/app/components/AddToWishlistButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BookPageProps {
  params: { id: string };
}

export default async function BookPage({ params }: BookPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const session = await getServerSession(authOptions);

  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
    include: {
      genres: {
        include: { genre: true },
      },
      author: {
        include: { author: true },
      },
      wishlist: session?.user?.email
        ? {
            where: { user: { email: session.user.email } },
          }
        : undefined,
    },
  });

  if (!book) return notFound();

  const isInWishlist = !!book.wishlist?.length;

  const authorNames =
    book.author.length > 0
      ? book.author.map((a) => a.author.title).join(", ")
      : "Unknown author";

  const genreNames = book.genres.map((g) => g.genre.title);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-8 group"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Collection
        </Link>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4">
              {book.title}
            </h1>

            <p className="text-lg text-gray-300 mb-2">
              <span className="font-semibold text-blue-400">Author(s): </span>
              {authorNames}
            </p>

            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-full">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm font-medium">Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-700/50 rounded-xl border border-gray-600 p-8 flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-gray-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <p className="text-gray-400 text-sm">Book Cover</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-blue-400">
                    Publisher
                  </h3>
                </div>
                <p className="text-gray-300 text-lg">{book.publisher}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    <h3 className="text-sm font-semibold text-blue-400">
                      Pages
                    </h3>
                  </div>
                  <p className="text-gray-300 text-xl font-bold">{book.pages}</p>
                </div>

                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <h3 className="text-sm font-semibold text-blue-400">Year</h3>
                  </div>
                  <p className="text-gray-300 text-xl font-bold">{book.year}</p>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-semibold text-blue-400">
                    Additional Info
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">
                  <strong>Genres:</strong>{" "}
                  {genreNames.length > 0
                    ? genreNames.join(", ")
                    : "No genre assigned"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <h2 className="text-xl font-semibold text-blue-400">
                Description
              </h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {book.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8 pt-6 border-t border-gray-700">
            {session?.user && (
              <AddToWishlistButton
                bookId={book.id}
                userEmail={session.user.email!}
                initiallyAdded={isInWishlist} 
              />
            )}

            <Link
              href="/books"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/10 border border-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Collection
            </Link>

            <Link
              href={`/books/${book.id}/edit`}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:transform hover:-translate-y-0.5"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
