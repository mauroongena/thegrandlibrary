import { Container, Heading, Text, Theme } from "@radix-ui/themes";
import prisma from "@/lib/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import AddBookForm from "@/app/components/AddBookForm";

export default async function NewBookPage() {
  const genres = await prisma.genre.findMany({ orderBy: { title: "asc" } });

 async function createBook(formData: FormData) {
  "use server";

  const title = formData.get("title");
  const description = formData.get("description");
  const pages = formData.get("pages");
  const year = formData.get("year");
  const publisher = formData.get("publisher");
  const genreIds = formData.getAll("genres");
  const authorNames = formData
    .getAll("authors")
    .map((a) => a.toString().trim())
    .filter(Boolean);

  if (!title || !publisher) {
    throw new Error("Title and publisher are required.");
  }

  const newBook = await prisma.book.create({
    data: {
      title: title as string,
      description: (description as string) || null,
      pages: pages ? Number(pages) : null,
      year: year ? Number(year) : null,
      publisher: publisher as string,
    },
  });

  if (genreIds.length > 0) {
    await prisma.bookGenre.createMany({
      data: genreIds
        .filter((id) => id && id !== "none")
        .map((id) => ({
          bookId: newBook.id,
          genreId: Number(id),
        })),
    });
  }

  for (const authorName of authorNames) {
    let author = await prisma.author.findFirst({
      where: { title: authorName },
    });

    if (!author) {
      author = await prisma.author.create({
        data: { title: authorName },
      });
    }

    await prisma.authorBook.create({
      data: {
        bookId: newBook.id,
        authorId: author.id,
      },
    });
  }

  redirect("/books");
}


  return (
    <Theme appearance="dark" accentColor="blue" grayColor="gray">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
        <Container size="2">
          <div className="text-center mb-8">
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 mb-6"
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

            <Heading
              size="8"
              className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4"
            >
              Add New Book
            </Heading>
            <Text size="5" color="gray" className="text-gray-400">
              Expand your literary collection
            </Text>
          </div>

          <AddBookForm genres={genres} action={createBook} />
        </Container>
      </div>
    </Theme>
  );
}
