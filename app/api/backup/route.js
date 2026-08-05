import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const data = db.getFullState();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch backup' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Basic validation to ensure it looks like a valid Celine DB state
    if (!data.customers || !data.invoices || !data.inventory) {
      return NextResponse.json({ error: 'Invalid backup file structure' }, { status: 400 });
    }
    
    db.overwriteState(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to restore backup' }, { status: 500 });
  }
}
