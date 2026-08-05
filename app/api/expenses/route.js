import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(await db.get('expenses'));
}

export async function POST(req) {
  const data = await req.json();
  
  if (typeof data.category !== 'string' || data.category.trim() === '') {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }
  if (typeof data.amount !== 'number' || data.amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const newItem = await db.insert('expenses', data);
  return NextResponse.json(newItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, ...updates } = data;
  
  if (updates.amount !== undefined && (typeof updates.amount !== 'number' || updates.amount <= 0)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const updatedItem = await db.update('expenses', id, updates);
  if (!updatedItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updatedItem);
}
