import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Modal = ({ showModal, sessionID, timeTaken }: { showModal: boolean, sessionID: string, timeTaken: number }) => {
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();

    const handleSubmit = async () => {
        console.log('Username:', username);
        setIsLoading(true);
        try {
            const response = await fetch('/api/submit-score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionID, username, timeTaken }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit score.');
            }

            const data = await response.json();
            console.log('Score submitted:', data);
            document.querySelectorAll('.character-marker').forEach((marker) => marker.remove());

            push(`/leaderboard/${data.imageID}`);
        } catch (error) {
            console.error('Error submitting score:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                    <div className="bg-gray-100 p-6 rounded shadow-lg w-fit">
                        <h2 className="text-cyan-500 text-xl font-bold mb-4">Congratulations! You found all characters!</h2>
                        <p className="text-neutral-500 text-sm font-bold mb-4">Submit your score to the leaderboard</p>
                        <div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="border border-gray-300 text-neutral-600 rounded p-2 w-full mb-4 bg-transparent"
                                placeholder="Username"
                                required
                            />
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white py-2 px-4 rounded"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    <div className='flex items-center space-x-4'>
                                        <div>Submit</div>
                                        {isLoading && <span className="loading loading-spinner"></span>}
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
