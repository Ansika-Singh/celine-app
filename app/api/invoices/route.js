import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(await db.get('invoices'));
}

export async function POST(req) {
  const data = await req.json();
  
  if (typeof data.amount !== 'number' || data.amount < 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  if (typeof data.customer !== 'string' || data.customer.trim() === '') {
    return NextResponse.json({ error: "Invalid customer" }, { status: 400 });
  }
  if (!Array.isArray(data.items)) {
    return NextResponse.json({ error: "Invalid items array" }, { status: 400 });
  }
  if (!["Paid", "Unpaid", "Overdue"].includes(data.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  
  const newItem = await db.insert('invoices', data);
  return NextResponse.json(newItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, ...updates } = data;
  
  if (updates.amount !== undefined && (typeof updates.amount !== 'number' || updates.amount < 0)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  if (updates.status !== undefined && !["Paid", "Unpaid", "Overdue"].includes(updates.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const updatedItem = await db.update('invoices', id, updates);
  if (!updatedItem) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updatedItem);
}
