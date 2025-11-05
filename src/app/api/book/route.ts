import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    const bookId = Number(idParam);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Book ID must be a number" }, { status: 400 });
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        genres: { include: { genre: true } },
        author: { include: { author: true } },
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json({ book });
  } catch (err) {
    console.error("Error fetching book:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, publisher, pages, year, description, genreIds = [], authorIds = [] } = body;

    if (!id) return NextResponse.json({ error: "Book ID is required" }, { status: 400 });

    const updatedBook = await prisma.book.update({
      where: { id: Number(id) },
      data: {
        title,
        publisher,
        pages,
        year,
        description,
        genres: {
          deleteMany: {},
          create: genreIds.map((genreId: number) => ({ genreId })),
        },
        author: {
          deleteMany: {},
          create: authorIds.map((authorId: number) => ({ authorId })),
        },
      },
      include: {
        genres: { include: { genre: true } },
        author: { include: { author: true } },
      },
    });

    return NextResponse.json({ book: updatedBook });
  } catch (err) {
    console.error("Error updating book:", err);
    return NextResponse.json(
      { error: "Failed to update book" },
      { status: 500 }
    );
  }
}
