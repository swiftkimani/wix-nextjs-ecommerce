import { NextResponse } from 'next/server';
import { getSlides, addSlide } from '@/lib/data';

export async function GET() {
  const slides = getSlides();
  return NextResponse.json(slides);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, img, url, bg } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const slide = addSlide({
      title,
      description: description || '',
      img: img || '',
      url: url || '/',
      bg: bg || 'bg-gradient-to-r from-yellow-50 to-pink-50',
    });

    return NextResponse.json(slide, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
