import { PrismaClient } from "../src/app/_generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.authorBook.deleteMany();
  await prisma.bookGenre.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const passwordAdmin = await bcrypt.hash("admin123", 10);
  const passwordUser = await bcrypt.hash("user123", 10);
  const passwordGuest = await bcrypt.hash("guest123", 10);

  const users = await prisma.user.createMany({
    data: [
      {
        email: "admin@example.com",
        hashedPassword: passwordAdmin,
        role: "ADMIN",
      },
      {
        email: "user@example.com",
        hashedPassword: passwordUser,
        role: "USER",
      },
      {
        email: "guest@example.com",
        hashedPassword: passwordGuest,
        role: "GUEST",
      },
    ],
  });

  console.log(`${users.count} users created.`);
  const authors = await prisma.author.createMany({
    data: [
      { title: "George Orwell" },
      { title: "Jane Austen" },
      { title: "J.K. Rowling" },
      { title: "J.R.R. Tolkien" },
    ],
  });
  console.log(`${authors.count} authors created.`);

  const allAuthors = await prisma.author.findMany();

  const genres = await prisma.genre.createMany({
    data: [
      { title: "Fiction" },
      { title: "Fantasy" },
      { title: "Romance" },
      { title: "Dystopian" },
      { title: "Adventure" },
    ],
  });
  console.log(`${genres.count} genres created.`);

  const allGenres = await prisma.genre.findMany();

  const booksData = [
    {
      title: "1984",
      description: "A dystopian novel set in a totalitarian regime.",
      pages: 328,
      year: 1949,
      publisher: "Secker & Warburg",
    },
    {
      title: "Pride and Prejudice",
      description: "A romantic novel exploring manners and marriage.",
      pages: 279,
      year: 1813,
      publisher: "T. Egerton",
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      description: "A young wizard's journey begins at Hogwarts.",
      pages: 309,
      year: 1997,
      publisher: "Bloomsbury",
    },
    {
      title: "The Hobbit",
      description: "A hobbit embarks on a quest with dwarves and a wizard.",
      pages: 310,
      year: 1937,
      publisher: "George Allen & Unwin",
    },
  ];

  const books = await prisma.book.createMany({ data: booksData });
  console.log(`${books.count} books created.`);

  const allBooks = await prisma.book.findMany();

  const authorBooksData = [
    { authorId: allAuthors.find(a => a.title === "George Orwell")!.id, bookId: allBooks.find(b => b.title === "1984")!.id },
    { authorId: allAuthors.find(a => a.title === "Jane Austen")!.id, bookId: allBooks.find(b => b.title === "Pride and Prejudice")!.id },
    { authorId: allAuthors.find(a => a.title === "J.K. Rowling")!.id, bookId: allBooks.find(b => b.title === "Harry Potter and the Philosopher's Stone")!.id },
    { authorId: allAuthors.find(a => a.title === "J.R.R. Tolkien")!.id, bookId: allBooks.find(b => b.title === "The Hobbit")!.id },
  ];

  await prisma.authorBook.createMany({ data: authorBooksData });
  console.log(`${authorBooksData.length} author-book relations created.`);

  const bookGenresData = [
    { bookId: allBooks.find(b => b.title === "1984")!.id, genreId: allGenres.find(g => g.title === "Dystopian")!.id },
    { bookId: allBooks.find(b => b.title === "1984")!.id, genreId: allGenres.find(g => g.title === "Fiction")!.id },
    { bookId: allBooks.find(b => b.title === "Pride and Prejudice")!.id, genreId: allGenres.find(g => g.title === "Romance")!.id },
    { bookId: allBooks.find(b => b.title === "Harry Potter and the Philosopher's Stone")!.id, genreId: allGenres.find(g => g.title === "Fantasy")!.id },
    { bookId: allBooks.find(b => b.title === "Harry Potter and the Philosopher's Stone")!.id, genreId: allGenres.find(g => g.title === "Adventure")!.id },
    { bookId: allBooks.find(b => b.title === "The Hobbit")!.id, genreId: allGenres.find(g => g.title === "Fantasy")!.id },
    { bookId: allBooks.find(b => b.title === "The Hobbit")!.id, genreId: allGenres.find(g => g.title === "Adventure")!.id },
  ];

  await prisma.bookGenre.createMany({ data: bookGenresData });
  console.log(`${bookGenresData.length} book-genre relations created.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
