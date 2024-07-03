import { submitUsernameAndTimeTaken } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { sessionID, username, timeTaken } = await req.json();
    const game = await submitUsernameAndTimeTaken(sessionID, username, timeTaken);
    return new NextResponse(
      JSON.stringify({ timeTaken: game.timeTaken, imageID: game.imageID }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting username and Time Taken with session ID:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Could not submit username Time Taken with session ID.' }),
      { status: 500 }
    );
  }
}