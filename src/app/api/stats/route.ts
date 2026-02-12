import { NextResponse } from 'next/server';
import { getProducts, getCategories, getSlides } from '@/lib/data';

export async function GET() {
  const products = getProducts();
  const categories = getCategories();
  const slides = getSlides();

  const totalRevenue = products.reduce((sum, p) => sum + p.price, 0);

  return NextResponse.json({
    totalProducts: products.length,
    totalCategories: categories.length,
    totalSlides: slides.length,
    totalRevenue,
    recentProducts: products.slice(-5).reverse(),
  });
}
