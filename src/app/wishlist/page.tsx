import prisma from "@/lib/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import Image from "next/image";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/signin");

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: user.id },
    include: {
      book: {
        include: {
          author: {
            include: {
              author: true,
            },
          },
          genres: {
            include: { genre: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => {
            const book = item.book;

            const authorNames =
              book.author.length > 0
                ? book.author.map((a) => a.author.title).join(", ")
                : "Unknown author";

            const genreNames =
              book.genres.length > 0
                ? book.genres.map((g) => g.genre.title).join(", ")
                : "No genres";

            return (
              <div
                key={item.id}
                className="border border-gray-700 bg-gray-800/40 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4 shadow-md hover:shadow-blue-500/10 transition-all duration-200"
              >
                <div className="flex-shrink-0">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={96}
                      height={128}
                      className="w-24 h-32 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gray-700 flex items-center justify-center rounded-md">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 flex flex-col justify-between gap-1">
                  <div>
                    <Link
                      href={`/books/${book.id}`}
                      className="text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors line-clamp-2"
                    >
                      {book.title}
                    </Link>
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-blue-400">Author(s):</span>{" "}
                      {authorNames}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-blue-400">Publisher:</span>{" "}
                      {book.publisher || "Unknown"}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-blue-400">Pages:</span>{" "}
                      {book.pages || "N/A"}
                    </p>
                    <p className="text-gray-300 text-sm">
                      <span className="font-medium text-blue-400">Genres:</span>{" "}
                      {genreNames}
                    </p>
                  </div>

                  <form
                    action={async () => {
                      "use server";
                      await prisma.wishlist.delete({
                        where: {
                          userId_bookId: {
                            userId: user.id,
                            bookId: book.id,
                          },
                        },
                      });
                      redirect("/wishlist");
                    }}
                    className="mt-2 self-end"
                  >
                    <Button type="submit" variant="soft" color="red" size="2">
                      Remove
                    </Button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
