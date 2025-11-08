import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/_generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.json();
  const { userId, bookId, dueAt } = body;

  if (!userId || !bookId) {
    return NextResponse.json(
      { error: "userId and bookId are required" },
      { status: 400 }
    );
  }

  try {
    const loan = await prisma.loan.create({
      data: {
        userId,
        bookId,
        dueAt: new Date(dueAt),      
      },
    });

    return NextResponse.json({ loan }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 500 });
  }
}
