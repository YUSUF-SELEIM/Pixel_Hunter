'use client'
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import imageData from '@/data/ImageData';

function NavigationButtons({ id }: { id: string }) {
    const { push } = useRouter();

    return (
        <div className="flex justify-between items-center mt-6">
            <button className="btn btn-circle btn-outline text-cyan-500"
                onClick={() => push(`/leaderboard/${getPreviousImageId(id)}`)}>
                <FaArrowLeft />
            </button>
            <h2 className="text-3xl font-bold text-cyan-500">Leaderboard</h2>
            <button className="btn btn-circle btn-outline text-cyan-500"
                onClick={() => push(`/leaderboard/${getNextImageId(id)}`)}
            >
                <FaArrowRight />
            </button>
        </div>
    )
}

export default NavigationButtons


// Helper functions to get the previous and next image IDs
function getPreviousImageId(currentId: string) {
    const index = imageData.findIndex(image => image.id === currentId);
    return imageData[index - 1] ? imageData[index - 1].id : imageData[imageData.length - 1].id;
}

function getNextImageId(currentId: string) {
    const index = imageData.findIndex(image => image.id === currentId);
    return imageData[index + 1] ? imageData[index + 1].id : imageData[0].id;
}