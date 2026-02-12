import { NextResponse } from "next/server";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const data = await db.select().from(products).orderBy(desc(products.createdAt));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, currency, image1 } = body;

    const newProduct = await db.insert(products).values({
      name,
      description,
      price: price.toString(), // Ensure decimal is string for Drizzle
      currency: currency || 'KSh',
      image1,
    }).returning();

    return NextResponse.json(newProduct[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
