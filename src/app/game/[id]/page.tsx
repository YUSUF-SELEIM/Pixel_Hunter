'use client';
import { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/header';
import Footer from '../../components/footer';

const imageData = [
  {
    id: '1',
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/I-1.webp',
    alt: 'Image 1',
    title: 'Image 1',
    description: 'Description of Image 1',
  },
  {
    id: '2',
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/I-3.webp',
    alt: 'Image 2',
    title: 'Image 2',
    description: 'Description of Image 2',
  },
  {
    id: '3',
    src: 'https://wsrv.nl/?url=https://raw.githubusercontent.com/YUSUF-SELEIM/Pixel_Hunter/main/illustrations/I-2.webp',
    alt: 'Image 3',
    title: 'Image 3',
    description: 'Description of Image 3',
  },
];

const characters = ['Waldo', 'Wenda', 'Wizard', 'Odlaw'];

function Game({ params }: { params: { id: string } }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState<{ x: string; y: string }>({ x: '0%', y: '0%' });
  const [circlePosition, setCirclePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [circleVisible, setCircleVisible] = useState(false);

  const image = imageData.find((img) => img.id === params.id);

  if (!image) {
    return <div>Image not found</div>;
  }

  const handleImageClick = (e: {
    stopPropagation: () => void;
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    // Adjust popup position based on click location relative to image edges
    let popupX = `${xPercent}%`;
    let popupY = `${yPercent}%`;

    // Adjust for different screen sizes
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (xPercent >= 75) {
        popupX = `${xPercent - 45}%`; // Adjust popup to the left
      }
      if (yPercent >= 50) {
        popupY = `${yPercent - 50}%`; // Adjust popup above
      }
    } else {
      // Adjustments for larger screens
      if (xPercent >= 75) {
        popupX = `${xPercent - 15}%`; // Adjust popup to the left
      }
      if (yPercent >= 90) {
        popupY = `${yPercent - 10}%`; // Adjust popup above
      }
    }

    setPopupPosition({ x: popupX, y: popupY });
    setCirclePosition({ x: xPercent, y: yPercent });
    setPopupVisible(true);
    setCircleVisible(true);
  };

  const handleHidePopup = () => {
    setPopupVisible(false);
    setCircleVisible(false);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 relative overflow-x-hidden" onClick={handleHidePopup}>
        <div className="relative w-full h-full" onClick={handleImageClick}>
          <Image
            src={image.src}
            alt={image.alt}
            layout="responsive"
            width={2000}
            height={1000}
            className="cursor-crosshair"
          />
          {circleVisible && (
            <div
              className="absolute rounded-full border-4 border-red-500 border-dashed"
              style={{
                top: `calc(${circlePosition.y}% - 25px)`,
                left: `calc(${circlePosition.x}% - 25px)`,
                width: '50px',
                height: '50px',
              }}
            />
          )}
        </div>
        {popupVisible && (
          <div
            className="absolute bg-white shadow-lg p-4 rounded"
            style={{
              top: `calc(${popupPosition.y} + 5%)`,
              left: `calc(${popupPosition.x} + 7%)`,
              transform: 'translate(-50%, -50%)', // Center align the popup
              ...(window.innerWidth <= 768 && {
                // Mobile adjustments
                top: `calc(${popupPosition.y} + 5%)`,
                left: `calc(${popupPosition.x} + 17%)`,
                transform: 'translate(-50%, 0)',
              }),
            }}
          >
            {characters.map((character) => (
              <div key={character} className="md:text-xl text-xs md:p-2 cursor-pointer text-black hover:bg-gray-200">
                {character}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Game;
