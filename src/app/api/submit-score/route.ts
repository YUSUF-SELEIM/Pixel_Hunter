import { submitUsernameWithSession } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { sessionID, username } = await req.json();
    const game = await submitUsernameWithSession(sessionID, username);
    return new NextResponse(
      JSON.stringify({ timeTaken: game.timeTaken, imageID: game.imageID }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting username with session ID:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Could not submit username with session ID.' }),
      { status: 500 }
    );
  }
}