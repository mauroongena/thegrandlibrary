import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: { title: "asc" },
    });
    return NextResponse.json({ genres });
  } catch (err) {
    console.error("Error fetching genres:", err);
    return NextResponse.json({ error: "Failed to fetch genres" }, { status: 500 });
  }
}
