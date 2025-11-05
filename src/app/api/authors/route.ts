import prisma from "@/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authors = await prisma.author.findMany({
      orderBy: { title: "asc" },
    });
    return NextResponse.json({ authors });
  } catch (err) {
    console.error("Error fetching authors:", err);
    return NextResponse.json({ error: "Failed to fetch authors" }, { status: 500 });
  }
}
