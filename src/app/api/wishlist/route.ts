import { NextResponse } from "next/server";
import prisma from "@/lib/client";

export async function POST(req: Request) {
  try {
    const { bookId, userEmail } = await req.json();

    if (!bookId || !userEmail) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const wishlistItem = await prisma.wishlist.upsert({
      where: {
        userId_bookId: { userId: user.id, bookId: bookId },
      },
      update: {},
      create: {
        userId: user.id,
        bookId: bookId,
      },
    });

    return NextResponse.json({ success: true, wishlistItem });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
