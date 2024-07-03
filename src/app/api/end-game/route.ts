import { endGame } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { sessionID, elapsedTime } = await req.json();
    const game = await endGame(sessionID, elapsedTime);
    return new NextResponse(
      JSON.stringify({ timeTaken: game.timeTaken }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error ending game:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Could not end the game.' }),
      { status: 500 }
    );
  }
}