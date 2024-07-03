import { startGame } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
      const { imageID } = await req.json();;
      const game = await startGame(imageID);
      return new NextResponse(
        JSON.stringify({ sessionID: game.sessionID }),
        { status: 200 }
      );
    } catch (error) {
      console.error('Error starting game:', error);
      return new NextResponse(
        JSON.stringify({ error: 'Could not start the game.' }),
        { status: 500 }
      );
    }
 
}
