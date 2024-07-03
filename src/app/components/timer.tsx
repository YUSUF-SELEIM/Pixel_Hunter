import imageData from '@/data/ImageData';
import React, { useEffect } from 'react';

const Timer = (
    {
        imageID,
        gameOver,
        sessionID,
        setSessionID,
        timeTaken,
        setTimeTaken
    }: {
        imageID: string,
        gameOver: boolean,
        sessionID: string,
        setSessionID: (sessionID: string) => void,
        timeTaken: number,
        setTimeTaken: (timeTaken: number | ((prevTime: number) => number)) => void;
    }) => {
    useEffect(() => {
        const initiateGame = async () => {
            imageData.forEach((image) => {
                image.characters.forEach((character) => {
                    character.found = false;
                });
            });
            try {
                const response = await fetch('/api/start-game', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imageID }),
                });

                if (!response.ok) {
                    throw new Error('Failed to start the game.');
                }

                const data = await response.json();
                setSessionID(data.sessionID);
                console.log('Game started with session ID:', data.sessionID);
            } catch (error) {
                console.error('Error starting game:', error);
            }
        };

        initiateGame();
    }, [imageID, setSessionID]);

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined = undefined;

        // Start the timer when sessionID is set
        if (sessionID) {
            timer = setInterval(() => {
                setTimeTaken((prevTime: number) => prevTime + 10); // Update every 10 milliseconds
            }, 10);
        }

        if (gameOver || !sessionID) {
            clearInterval(timer);
        }

        // Cleanup on component unmount or when sessionID changes (game ends)
        return () => clearInterval(timer);
    }, [sessionID, gameOver, timeTaken, setTimeTaken]);

    const minutes = Math.floor(timeTaken / 60000);
    const seconds = Math.floor((timeTaken % 60000) / 1000);
    const milliseconds = timeTaken % 1000;

    return (
        <div className="ml-auto text-sm text-black">
            {sessionID ? (
                <>
                    Time Elapsed: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}.{milliseconds < 100 ? `0${Math.floor(milliseconds / 10)}` : Math.floor(milliseconds / 10)}
                </>
            ) : (
                null
            )}
        </div>
    );
};

export default Timer;