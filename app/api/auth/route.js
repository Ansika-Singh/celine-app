import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const MAX_ATTEMPTS = 3;
const LOCKOUT_TIME = 5 * 60 * 1000; // 5 minutes

export async function POST(request) {
  try {
    const { pin } = await request.json();
    const auth = await db.getAuth();

    // 1. Check if currently locked out
    if (auth.lockoutUntil && auth.lockoutUntil > Date.now()) {
      return NextResponse.json(
        { 
          success: false, 
          error: "locked_out",
          lockoutUntil: auth.lockoutUntil 
        }, 
        { status: 429 }
      );
    }

    // Clear expired lockout
    if (auth.lockoutUntil && auth.lockoutUntil <= Date.now()) {
      auth.failedAttempts = 0;
      auth.lockoutUntil = null;
      await db.updateAuth(auth);
    }

    // 2. Verify PIN
    if (pin === auth.pin) {
      // Success: Reset state
      await db.updateAuth({ failedAttempts: 0, lockoutUntil: null });
      return NextResponse.json({ success: true });
    }

    // 3. Handle Failure
    const newAttempts = auth.failedAttempts + 1;
    let newLockout = null;

    if (newAttempts >= MAX_ATTEMPTS) {
      newLockout = Date.now() + LOCKOUT_TIME;
    }

    await db.updateAuth({ 
      failedAttempts: newAttempts, 
      lockoutUntil: newLockout 
    });

    if (newLockout) {
      return NextResponse.json(
        { 
          success: false, 
          error: "locked_out",
          lockoutUntil: newLockout 
        }, 
        { status: 429 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: "invalid_pin",
        attemptsRemaining: MAX_ATTEMPTS - newAttempts 
      }, 
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
