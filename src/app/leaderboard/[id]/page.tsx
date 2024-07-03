import imageData from '@/data/ImageData';
import { getLeaderBoardOfAGame } from '@/lib/actions';
import React from 'react';
import NavigationButtons from '../../components/navigation-buttons';
import Header from '../../components/header';

async function Leaderboard({ params }: { params: { id: string } }) {
  const data = await getLeaderBoardOfAGame(params.id);
  // Find the current image details
  const currentImage = imageData.find(image => image.id === params.id);

  return (
    <div className='h-screen bg-white'>
      <Header>
        {null}
      </Header>
      <div className="p-4 bg-white shadow-lg text-black">
        <NavigationButtons id={params.id} />
        {currentImage && (
          <div className="text-center mb-6">
            <h3 className="text-2xl text-neutral-500">{currentImage.alt}</h3>
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="table w-full text-center">
            <thead className='text-cyan-500'>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Time Taken</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <tr key={user.userName}>
                  <td>{index + 1}</td>
                  <td>{user.userName}</td>
                  <td className='animate-pulse'>{user.timeTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;