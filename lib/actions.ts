import { prisma } from '@/lib/prisma'

// Function to start a game
export const startGame = async (imageID: string) => {
  try {
    const newGame = await prisma.game.create({
      data: {
        imageID
      },
    });
    return { sessionID: newGame.id };
  } catch (error) {
    console.error("Error starting game:", error);
    throw new Error('Could not start the game.');
  }
};

// Function to submit username with session ID
export const submitUsernameAndTimeTaken = async (sessionID: string, userName: string, timeTaken: number) => {
  try {
    // Format time taken into minutes, seconds, and milliseconds
    const minutes = Math.floor(timeTaken / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((timeTaken % (1000 * 60)) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((timeTaken % 1000) / 10).toString().padStart(2, '0');

    const formattedTime = `${minutes}:${seconds}:${milliseconds}`;

    const updatedGame = await prisma.game.update({
      where: { id: sessionID },
      data: {
        userName,
        timeTaken: formattedTime,
      },
    });

    return { timeTaken: updatedGame.timeTaken, imageID: updatedGame.imageID };
  } catch (error) {
    console.error("Error submitting username with session ID:", error);
    throw new Error('Could not submit username with session ID.');
  }
};

export const getLeaderBoardOfAGame = async (imageID: string) => {
  try {
    const leaderBoard = await prisma.game.findMany({
      where: {
        imageID,
        userName: {
          not: '',
        },
      },
      select: {
        userName: true,
        timeTaken: true,
      },
      orderBy: {
        timeTaken: 'asc',
      },
    });

    return leaderBoard;
  } catch (error) {
    console.error("Error getting leaderboard of a game:", error);
    throw new Error('Could not get leaderboard of a game.');
  }
}