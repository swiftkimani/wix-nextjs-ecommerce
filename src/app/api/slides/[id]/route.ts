import { NextResponse } from 'next/server';
import { updateSlide, deleteSlide } from '@/lib/data';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = updateSlide(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = deleteSlide(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Slide not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
