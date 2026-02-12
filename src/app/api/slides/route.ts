import { NextResponse } from "next/server";
import { db } from "@/db";
import { slides } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(slides).orderBy(desc(slides.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch slides" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image, link } = body;

    const newSlide = await db.insert(slides).values({
      title,
      description,
      image,
      link,
    }).returning();

    return NextResponse.json(newSlide[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create slide" }, { status: 500 });
  }
}
