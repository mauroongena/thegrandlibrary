import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/client";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.role === "ADMIN";
    const isStudent = session?.role === "USER";

  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

  if (isStudent === false && isAdmin === false) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    });

    const userId = user?.id;

    const { bookId, value } = await req.json();
  if (!userId || !bookId) {
    return NextResponse.json({ error: "Missing userId or bookId" }, { status: 400 });
    }

  try {
    await prisma.rating.upsert({
      where: {
        userId_bookId: { userId, bookId },
      },
      update: {
        value,
      },
      create: {
        userId,
        bookId,
        value,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
