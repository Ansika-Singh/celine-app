import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db.get('customers'));
}

export async function POST(req) {
  const data = await req.json();
  
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (data.udhar !== undefined && typeof data.udhar !== 'number') {
    return NextResponse.json({ error: "Invalid udhar amount" }, { status: 400 });
  }
  if (data.status !== undefined && !["Good", "Warning", "Critical"].includes(data.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const newItem = db.insert('customers', data);
  return NextResponse.json(newItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, ...updates } = data;
  
  if (updates.name !== undefined && (typeof updates.name !== 'string' || updates.name.trim() === '')) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }
  if (updates.udhar !== undefined && typeof updates.udhar !== 'number') {
    return NextResponse.json({ error: "Invalid udhar amount" }, { status: 400 });
  }

  const updatedItem = db.update('customers', id, updates);
  if (!updatedItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updatedItem);
}
