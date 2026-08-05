import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db.get('inventory'));
}

export async function POST(req) {
  const data = await req.json();
  
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (typeof data.stock !== 'number' || data.stock < 0) {
    return NextResponse.json({ error: "Invalid stock" }, { status: 400 });
  }
  if (typeof data.price !== 'number' || data.price < 0) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const newItem = db.insert('inventory', data);
  return NextResponse.json(newItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, ...updates } = data;
  
  if (updates.stock !== undefined && (typeof updates.stock !== 'number' || updates.stock < 0)) {
    return NextResponse.json({ error: "Invalid stock" }, { status: 400 });
  }

  const updatedItem = db.update('inventory', id, updates);
  if (!updatedItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updatedItem);
}
