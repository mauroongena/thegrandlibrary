import prisma from "@/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get("id");
    if (!idParam) {
      return NextResponse.json({ error: "Missing book id" }, { status: 400 });
    }

    const bookId = Number(idParam);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book id" }, { status: 400 });
    }

    await prisma.authorBook.deleteMany({ where: { bookId } });
    await prisma.bookGenre.deleteMany({ where: { bookId } });
    await prisma.wishlist.deleteMany({ where: { bookId } });
    await prisma.rating.deleteMany({ where: { bookId } });
    await prisma.loan.deleteMany({ where: { bookId } });

    await prisma.book.delete({ where: { id: bookId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while deleting the book" },
      { status: 500 }
    );
  }
}
