import { NextResponse } from 'next/server';
import { getProducts, addProduct } from '@/lib/data';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, currency, image1, image2, url, featured } = body;

    if (!name || !price) {
      return NextResponse.json({ error: 'Name and price are required' }, { status: 400 });
    }

    const product = addProduct({
      name,
      description: description || '',
      price: Number(price),
      currency: currency || 'Ksh',
      image1: image1 || '',
      image2: image2 || '',
      url: url || '/test',
      featured: featured ?? true,
    });

    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
