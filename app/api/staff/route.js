import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(await db.get('staff'));
}

export async function POST(req) {
  const data = await req.json();
  const newItem = await db.insert('staff', data);
  return NextResponse.json(newItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, ...updates } = data;
  const updatedItem = await db.update('staff', id, updates);
  return NextResponse.json(updatedItem);
}
