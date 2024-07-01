import React, { useState } from 'react';

const Modal = ({ showModal, setShowModal }: { showModal: boolean, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Username:', username);
        setShowModal(false);
    };

    return (
        <>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                    <div className="bg-gray-100 p-6 rounded shadow-lg w-fit">
                        <h2 className="text-cyan-500 text-xl font-bold mb-4">Congratulations! You found all characters!</h2>
                        <p className="text-neutral-500 text-sm font-bold mb-4">Submit your score to the leaderboard</p>
                        <form onSubmit={handleSubmit}>
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
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;