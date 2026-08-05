import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  return NextResponse.json(db.get('staff'));
}

export async function POST(req) {
  const data = await req.json();
  const newItem = db.insert('staff', data);
  return NextResponse.json(newItem);
}

export async function PUT(req) {
  const data = await req.json();
  const { id, ...updates } = data;
  const updatedItem = db.update('staff', id, updates);
  return NextResponse.json(updatedItem);
}
