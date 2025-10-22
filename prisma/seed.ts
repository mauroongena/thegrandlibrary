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
    ],
  });

  console.log(`${users.count} users created.`);
  const authors = await prisma.author.createMany({
    data: [
      { title: "Robert C. Martin" },
      { title: "Andrew Hunt & David Thomas" },
      { title: "Erich Gamma et al." },
      { title: "Martin Fowler" },
      { title: "Kyle Simpson" },
      { title: "Marijn Haverbeke" },
      { title: "Douglas Crockford" },
      { title: "Dan Vanderkam" },
      { title: "Alex Banks & Eve Porcello" },
      { title: "Michele Bertoli" },
      { title: "Anthony Accomazzo et al." },
      { title: "Mario Casciaro & Luciano Mammino" },
      { title: "Sam Newman" },
      { title: "Eric Evans" },
      { title: "Martin Kleppmann" },
      { title: "Alex Petrov" },
      { title: "Thomas H. Cormen et al." },
      { title: "Aditya Bhargava" },
      { title: "Gayle Laakmann McDowell" },
      { title: "Frederick P. Brooks Jr." },
      { title: "Tom DeMarco & Timothy Lister" },
      { title: "Jez Humble & David Farley" },
      { title: "Gene Kim et al." },
      { title: "Nicole Forsgren et al." },
      { title: "Donald E. Knuth" },
      { title: "Charles Petzold" },
      { title: "John Sonmez" },
      { title: "William E. Shotts Jr." },
    ],
  });
  console.log(`${authors.count} authors created.`);

  const allAuthors = await prisma.author.findMany();

  const genres = await prisma.genre.createMany({
    data: [
      { title: "Software Engineering" },
      { title: "Programming" },
      { title: "Frontend" },
      { title: "Backend" },
      { title: "Architecture" },
      { title: "Databases" },
      { title: "Algorithms" },
      { title: "DevOps" },
      { title: "Career" },
      { title: "Computer Science" },
    ],
  });
  console.log(`${genres.count} genres created.`);

  const allGenres = await prisma.genre.findMany();

  const booksData = [
    { title: "Clean Code", description: "Guidelines for writing clean, maintainable code.", pages: 464, year: 2008, publisher: "Prentice Hall" },
    { title: "The Pragmatic Programmer", description: "Practical tips and philosophy for modern developers.", pages: 352, year: 1999, publisher: "Addison-Wesley" },
    { title: "Design Patterns", description: "Classic reference on object-oriented software design.", pages: 395, year: 1994, publisher: "Addison-Wesley" },
    { title: "Refactoring", description: "Improving the design of existing code with refactoring techniques.", pages: 448, year: 1999, publisher: "Addison-Wesley" },
    { title: "You Don't Know JS (Yet)", description: "Deep dive into the mechanics of JavaScript.", pages: 278, year: 2020, publisher: "O'Reilly Media" },
    { title: "Eloquent JavaScript", description: "Modern introduction to JavaScript and web development.", pages: 472, year: 2018, publisher: "No Starch Press" },
    { title: "JavaScript: The Good Parts", description: "Insights into the best features of JavaScript.", pages: 176, year: 2008, publisher: "O'Reilly Media" },
    { title: "Effective TypeScript", description: "Practical guide to using TypeScript effectively.", pages: 264, year: 2019, publisher: "O'Reilly Media" },
    { title: "Learning React", description: "Introduction to building React applications.", pages: 350, year: 2020, publisher: "O'Reilly Media" },
    { title: "React Design Patterns and Best Practices", description: "Patterns for scalable React architecture.", pages: 286, year: 2017, publisher: "Packt Publishing" },
    { title: "Fullstack React", description: "Comprehensive guide to building React apps.", pages: 800, year: 2017, publisher: "Fullstack.io" },
    { title: "Node.js Design Patterns", description: "Best practices for scalable Node.js apps.", pages: 520, year: 2020, publisher: "Packt Publishing" },
    { title: "Building Microservices", description: "Principles and patterns for microservice architecture.", pages: 280, year: 2015, publisher: "O'Reilly Media" },
    { title: "Domain-Driven Design", description: "Model-driven approach to complex software systems.", pages: 560, year: 2003, publisher: "Addison-Wesley" },
    { title: "Designing Data-Intensive Applications", description: "Deep dive into system design and data architecture.", pages: 616, year: 2017, publisher: "O'Reilly Media" },
    { title: "Database Internals", description: "Understanding storage engines and distributed systems.", pages: 384, year: 2019, publisher: "O'Reilly Media" },
    { title: "Introduction to Algorithms", description: "Comprehensive guide to algorithm design and analysis.", pages: 1312, year: 2009, publisher: "MIT Press" },
    { title: "Grokking Algorithms", description: "Illustrated introduction to algorithms.", pages: 256, year: 2016, publisher: "Manning Publications" },
    { title: "Cracking the Coding Interview", description: "Prep guide for software engineering interviews.", pages: 706, year: 2015, publisher: "CareerCup" },
    { title: "The Mythical Man-Month", description: "Essays on software project management.", pages: 336, year: 1975, publisher: "Addison-Wesley" },
    { title: "Peopleware", description: "Managing software teams and productivity.", pages: 264, year: 1987, publisher: "Dorset House" },
    { title: "Continuous Delivery", description: "Principles and patterns for reliable software releases.", pages: 512, year: 2010, publisher: "Addison-Wesley" },
    { title: "The Phoenix Project", description: "DevOps novel about IT management and transformation.", pages: 432, year: 2013, publisher: "IT Revolution Press" },
    { title: "Accelerate", description: "Science of Lean software and DevOps performance.", pages: 288, year: 2018, publisher: "IT Revolution Press" },
    { title: "The Art of Computer Programming", description: "Comprehensive reference on algorithms and programming.", pages: 3168, year: 1997, publisher: "Addison-Wesley" },
    { title: "Code", description: "Explains the hidden language of computer systems.", pages: 400, year: 2000, publisher: "Microsoft Press" },
    { title: "The Clean Coder", description: "Professionalism and ethics in software development.", pages: 256, year: 2011, publisher: "Prentice Hall" },
    { title: "Soft Skills", description: "Developer's life manual for career and productivity.", pages: 504, year: 2014, publisher: "Manning Publications" },
    { title: "The Linux Command Line", description: "Complete guide to using the Linux shell.", pages: 480, year: 2012, publisher: "No Starch Press" },
  ];


  const books = await prisma.book.createMany({ data: booksData });
  console.log(`${books.count} books created.`);

  const allBooks = await prisma.book.findMany();

  const authorBooksData = [
    { authorId: allAuthors.find(a => a.title === "Robert C. Martin")!.id, bookId: allBooks.find(b => b.title === "Clean Code")!.id },
    { authorId: allAuthors.find(a => a.title === "Andrew Hunt & David Thomas")!.id, bookId: allBooks.find(b => b.title === "The Pragmatic Programmer")!.id },
    { authorId: allAuthors.find(a => a.title === "Erich Gamma et al.")!.id, bookId: allBooks.find(b => b.title === "Design Patterns")!.id },
    { authorId: allAuthors.find(a => a.title === "Martin Fowler")!.id, bookId: allBooks.find(b => b.title === "Refactoring")!.id },
    { authorId: allAuthors.find(a => a.title === "Kyle Simpson")!.id, bookId: allBooks.find(b => b.title === "You Don't Know JS (Yet)")!.id },
    { authorId: allAuthors.find(a => a.title === "Marijn Haverbeke")!.id, bookId: allBooks.find(b => b.title === "Eloquent JavaScript")!.id },
    { authorId: allAuthors.find(a => a.title === "Douglas Crockford")!.id, bookId: allBooks.find(b => b.title === "JavaScript: The Good Parts")!.id },
    { authorId: allAuthors.find(a => a.title === "Dan Vanderkam")!.id, bookId: allBooks.find(b => b.title === "Effective TypeScript")!.id },
    { authorId: allAuthors.find(a => a.title === "Alex Banks & Eve Porcello")!.id, bookId: allBooks.find(b => b.title === "Learning React")!.id },
    { authorId: allAuthors.find(a => a.title === "Michele Bertoli")!.id, bookId: allBooks.find(b => b.title === "React Design Patterns and Best Practices")!.id },
    { authorId: allAuthors.find(a => a.title === "Anthony Accomazzo et al.")!.id, bookId: allBooks.find(b => b.title === "Fullstack React")!.id },
    { authorId: allAuthors.find(a => a.title === "Mario Casciaro & Luciano Mammino")!.id, bookId: allBooks.find(b => b.title === "Node.js Design Patterns")!.id },
    { authorId: allAuthors.find(a => a.title === "Sam Newman")!.id, bookId: allBooks.find(b => b.title === "Building Microservices")!.id },
    { authorId: allAuthors.find(a => a.title === "Eric Evans")!.id, bookId: allBooks.find(b => b.title === "Domain-Driven Design")!.id },
    { authorId: allAuthors.find(a => a.title === "Martin Kleppmann")!.id, bookId: allBooks.find(b => b.title === "Designing Data-Intensive Applications")!.id },
    { authorId: allAuthors.find(a => a.title === "Alex Petrov")!.id, bookId: allBooks.find(b => b.title === "Database Internals")!.id },
    { authorId: allAuthors.find(a => a.title === "Thomas H. Cormen et al.")!.id, bookId: allBooks.find(b => b.title === "Introduction to Algorithms")!.id },
    { authorId: allAuthors.find(a => a.title === "Aditya Bhargava")!.id, bookId: allBooks.find(b => b.title === "Grokking Algorithms")!.id },
    { authorId: allAuthors.find(a => a.title === "Gayle Laakmann McDowell")!.id, bookId: allBooks.find(b => b.title === "Cracking the Coding Interview")!.id },
    { authorId: allAuthors.find(a => a.title === "Frederick P. Brooks Jr.")!.id, bookId: allBooks.find(b => b.title === "The Mythical Man-Month")!.id },
    { authorId: allAuthors.find(a => a.title === "Tom DeMarco & Timothy Lister")!.id, bookId: allBooks.find(b => b.title === "Peopleware")!.id },
    { authorId: allAuthors.find(a => a.title === "Jez Humble & David Farley")!.id, bookId: allBooks.find(b => b.title === "Continuous Delivery")!.id },
    { authorId: allAuthors.find(a => a.title === "Gene Kim et al.")!.id, bookId: allBooks.find(b => b.title === "The Phoenix Project")!.id },
    { authorId: allAuthors.find(a => a.title === "Nicole Forsgren et al.")!.id, bookId: allBooks.find(b => b.title === "Accelerate")!.id },
    { authorId: allAuthors.find(a => a.title === "Donald E. Knuth")!.id, bookId: allBooks.find(b => b.title === "The Art of Computer Programming")!.id },
    { authorId: allAuthors.find(a => a.title === "Charles Petzold")!.id, bookId: allBooks.find(b => b.title === "Code")!.id },
    { authorId: allAuthors.find(a => a.title === "Robert C. Martin")!.id, bookId: allBooks.find(b => b.title === "The Clean Coder")!.id },
    { authorId: allAuthors.find(a => a.title === "John Sonmez")!.id, bookId: allBooks.find(b => b.title === "Soft Skills")!.id },
    { authorId: allAuthors.find(a => a.title === "William E. Shotts Jr.")!.id, bookId: allBooks.find(b => b.title === "The Linux Command Line")!.id },
  ];

  await prisma.authorBook.createMany({ data: authorBooksData });
  console.log(`${authorBooksData.length} author-book relations created.`);

  const bookGenresData = [
    { bookId: allBooks.find(b => b.title === "Clean Code")!.id, genreId: allGenres.find(g => g.title === "Software Engineering")!.id },
    { bookId: allBooks.find(b => b.title === "The Pragmatic Programmer")!.id, genreId: allGenres.find(g => g.title === "Software Engineering")!.id },
    { bookId: allBooks.find(b => b.title === "Design Patterns")!.id, genreId: allGenres.find(g => g.title === "Architecture")!.id },
    { bookId: allBooks.find(b => b.title === "Refactoring")!.id, genreId: allGenres.find(g => g.title === "Software Engineering")!.id },
    { bookId: allBooks.find(b => b.title === "You Don't Know JS (Yet)")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "Eloquent JavaScript")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "JavaScript: The Good Parts")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "Effective TypeScript")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "Learning React")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "React Design Patterns and Best Practices")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "Fullstack React")!.id, genreId: allGenres.find(g => g.title === "Frontend")!.id },
    { bookId: allBooks.find(b => b.title === "Node.js Design Patterns")!.id, genreId: allGenres.find(g => g.title === "Backend")!.id },
    { bookId: allBooks.find(b => b.title === "Building Microservices")!.id, genreId: allGenres.find(g => g.title === "Architecture")!.id },
    { bookId: allBooks.find(b => b.title === "Domain-Driven Design")!.id, genreId: allGenres.find(g => g.title === "Architecture")!.id },
    { bookId: allBooks.find(b => b.title === "Designing Data-Intensive Applications")!.id, genreId: allGenres.find(g => g.title === "Databases")!.id },
    { bookId: allBooks.find(b => b.title === "Database Internals")!.id, genreId: allGenres.find(g => g.title === "Databases")!.id },
    { bookId: allBooks.find(b => b.title === "Introduction to Algorithms")!.id, genreId: allGenres.find(g => g.title === "Algorithms")!.id },
    { bookId: allBooks.find(b => b.title === "Grokking Algorithms")!.id, genreId: allGenres.find(g => g.title === "Algorithms")!.id },
    { bookId: allBooks.find(b => b.title === "Cracking the Coding Interview")!.id, genreId: allGenres.find(g => g.title === "Algorithms")!.id },
    { bookId: allBooks.find(b => b.title === "The Mythical Man-Month")!.id, genreId: allGenres.find(g => g.title === "Software Engineering")!.id },
    { bookId: allBooks.find(b => b.title === "Peopleware")!.id, genreId: allGenres.find(g => g.title === "Career")!.id },
    { bookId: allBooks.find(b => b.title === "Continuous Delivery")!.id, genreId: allGenres.find(g => g.title === "DevOps")!.id },
    { bookId: allBooks.find(b => b.title === "The Phoenix Project")!.id, genreId: allGenres.find(g => g.title === "DevOps")!.id },
    { bookId: allBooks.find(b => b.title === "Accelerate")!.id, genreId: allGenres.find(g => g.title === "DevOps")!.id },
    { bookId: allBooks.find(b => b.title === "The Art of Computer Programming")!.id, genreId: allGenres.find(g => g.title === "Computer Science")!.id },
    { bookId: allBooks.find(b => b.title === "Code")!.id, genreId: allGenres.find(g => g.title === "Computer Science")!.id },
    { bookId: allBooks.find(b => b.title === "The Clean Coder")!.id, genreId: allGenres.find(g => g.title === "Software Engineering")!.id },
    { bookId: allBooks.find(b => b.title === "Soft Skills")!.id, genreId: allGenres.find(g => g.title === "Career")!.id },
    { bookId: allBooks.find(b => b.title === "The Linux Command Line")!.id, genreId: allGenres.find(g => g.title === "Computer Science")!.id },
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
