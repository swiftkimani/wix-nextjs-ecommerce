import { NextResponse } from "next/server";
import { db } from "@/db";
import { products, categories, slides } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const [productCount] = await db.select({ count: sql<number>`count(*)` }).from(products);
    const [categoryCount] = await db.select({ count: sql<number>`count(*)` }).from(categories);
    const [slideCount] = await db.select({ count: sql<number>`count(*)` }).from(slides);
    
    // Calculate total revenue (assuming price is stored as string/decimal)
    // Note: This is a simple sum. In a real app, you'd sum orders, not inventory value.
    const [revenue] = await db.select({ 
      total: sql<number>`sum(cast(${products.price} as numeric))` 
    }).from(products);

    const recentProductsFragment = await db.select().from(products).orderBy(sql`${products.createdAt} desc`).limit(5);

    return NextResponse.json({
      totalProducts: Number(productCount.count),
      totalCategories: Number(categoryCount.count),
      totalSlides: Number(slideCount.count),
      totalRevenue: Number(revenue.total || 0),
      recentProducts: recentProductsFragment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
