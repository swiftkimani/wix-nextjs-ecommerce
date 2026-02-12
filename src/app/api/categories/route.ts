import { NextResponse } from "next/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(categories).orderBy(desc(categories.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, image } = body;

    const newCategory = await db.insert(categories).values({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      image,
    }).returning();

    return NextResponse.json(newCategory[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
