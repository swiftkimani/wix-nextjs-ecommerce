import { NextResponse } from 'next/server';
import { getCategories, addCategory } from '@/lib/data';

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, image, slug } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const category = addCategory({
      name,
      image: image || '',
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
    });

    return NextResponse.json(category, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
